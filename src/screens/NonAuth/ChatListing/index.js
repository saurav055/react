import styles from "./styles.css";
import {
    MainContainer,
    ChatContainer,
    MessageList,
    Message,
    MessageInput,
} from "@chatscope/chat-ui-kit-react";
import React, { useCallback, useState } from "react";
import Avatar from "@chatscope/chat-ui-kit-react/dist/cjs/Avatar";
import { LOGO } from "assets";
import Sidebar from "@chatscope/chat-ui-kit-react/dist/cjs/Sidebar";
import Search from "@chatscope/chat-ui-kit-react/dist/cjs/Search";
import ConversationList from "@chatscope/chat-ui-kit-react/dist/cjs/ConversationList";
import Conversation from "@chatscope/chat-ui-kit-react/dist/cjs/Conversation";
import { useNavigate } from "react-router";
import { collection, setDoc, doc, query, onSnapshot, where, orderBy } from "firebase/firestore";
import { db } from '../../../firebase_config'
import { useSelector } from "react-redux";
import { image_url } from "service/endpoints";
import useSound from 'use-sound';
import boopSfx from '../../../assets/pikachu.mp3';

const ChatListing = () => {
    const [play]=useSound(boopSfx)
    const navigate = useNavigate()
    const user = useSelector(state => state.auth)?.user
    const [list,setList]=React.useState([])
    const [shouldPlay,setShouldPlay]=React.useState(false)
   
    React.useEffect(() => {
        let un = onSnapshot(query(collection(db,"chats"), where("user_ids", "array-contains",String(user?._id)), orderBy("createdAt", "asc")), (snapshot) => {
            let messagesC = [];
            snapshot.forEach((doc) => {
                messagesC.push(doc.data());
            })
            setList(messagesC)
        },
            (error) => {
                console.log("Error",error)
            })
        return ()=>{
            un()
        }
    }, [])
    return (

        <div style={{
            height: "50%",
            width: '100%',
            overflow: 'hidden'
        }}>
            <MainContainer  >
                <Sidebar style={{ width: '100%', marginTop: '.5em' }} scrollable={true}>
                    <Search placeholder="Search..." />
                    <ConversationList>
                        {list?.map(x=>{
                            let client=x?.users?.filter(user=>user.type=="Client")[0]
                            console.log(client)
                            return(
                              <Conversation
                              onClick={() => { navigate('/astrologerchat',{state:{user:client,astro:user}}) }}
                              name={client?.name+` (${client?.email})`} lastSenderName="" info={x.text}>
                              <Avatar src={image_url+client?.profile_pic} name={client?.user_name} status="available" />
                          </Conversation>
                        )})}
                    </ConversationList>
                </Sidebar>

            </MainContainer>
        </div>
    )
}
export default ChatListing;