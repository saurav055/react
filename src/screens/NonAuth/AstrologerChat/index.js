import {
    MainContainer,
    ChatContainer,
    MessageList,
    Message,
    MessageInput,
} from "@chatscope/chat-ui-kit-react";
import React, { useEffect, useState } from "react";
import ConversationHeader from "@chatscope/chat-ui-kit-react/dist/cjs/ConversationHeader";
import Avatar from "@chatscope/chat-ui-kit-react/dist/cjs/Avatar";
import MessageSeparator from "@chatscope/chat-ui-kit-react/dist/cjs/MessageSeparator";
import { LOGO, User } from "assets";
import InfoButton from "@chatscope/chat-ui-kit-react/dist/cjs/Buttons/InfoButton";
import TypingIndicator from "@chatscope/chat-ui-kit-react/dist/cjs/TypingIndicator";
import { Box } from "@mui/system";
import { Button, Typography } from "@mui/material";
import { useNavigate ,useLocation} from "react-router";
import moment from "moment";
import { collection, setDoc, doc, query, onSnapshot, orderBy, addDoc ,increment} from "firebase/firestore";
import { db } from '../../../firebase_config'
import { image_url } from "service/endpoints";

const AstrologerChat = () => {
    const navigate = useNavigate();
    const location = useLocation()
    const { astro, user } = location?.state ?? {}
    const [messages, setMessages] = useState([])
    const getRoomName = () => {
        let ids = [astro?._id, user?._id].sort()
        return ids.join("_")
    }
 

    let chatRef = doc(db, "chats", getRoomName())
    let messagesRef = collection(db, "chats", getRoomName(), "messages")
    let inChat=doc(db,"inchat",String(astro?._id))
  
    React.useEffect(() => {
        let unsub = onSnapshot(query(messagesRef, orderBy("createdAt", "asc")), (snapshot) => {
            let messagesC = [];
            snapshot.forEach((doc) => {
                messagesC.push(doc.data());
            });
            messagesC = messagesC.map(msg => ({ message: msg.text, position: "single", direction: msg?.user?._id == astro?._id ? "outgoing" : "incoming", sender: "Emily", sentTime: moment(msg.createdAt?.seconds * 1000).format("hh:mm a") }))
            setMessages(messagesC)
        },
            (error) => {

            })
        return () => {
            unsub()
        }
    }, [])

    let i=null
    React.useEffect(()=>{
        i=setInterval(()=>{
            setDoc(inChat,{lastSeen:moment.now()})
        },3000)
        return ()=>{
            clearInterval(i)
            setDoc(inChat,{lastSeen:0})
        }
    },[])
    const sendMessage = (message) => {
        addDoc(messagesRef, {
            text: message,
            type: "text",
            createdAt: new Date(),
            user: {
                _id: astro._id,
            },
        })
        setDoc(chatRef, {
            text: message,
            type: "text",
            lastMessage:{text:message,createdAt:moment.now(),user:astro?._id},
            createdAt: new Date(),
            user_ids: [user._id, astro._id],
            users: [user, astro],
            [astro._id]:0,
            [user._id]:increment(1)
        })

    }
    return (
        <Box sx={{ width: '100%', height: '100%' }} >
            <Box onClick={() => {
                // navigate('/')
            }} sx={{
                height: '10%', "&:hover": {
                    cursor: "pointer"
                }, backgroundColor: 'primary.main', alignItems: 'center', display: 'flex', paddingLeft: 4
                ,
                justifyContent: 'space-between'
            }} >
                <Box sx={{ height: '80%', display: 'flex', }} >
                    <Box component='img' src={LOGO} sx={{ height: '80%', width: 'auto', borderRadius: '50%' }} >

                    </Box>
                    <Box sx={{ flexDirection: 'column', display: 'flex', marginLeft: 1 }} >
                        <Typography sx={{ fontSize: '1em', textAlign: 'center' }} >Glisten Astrology</Typography>
                        <Typography fontWeight={500} fontSize={{ marginLeft: 1, mobile: "0.5em", laptop: ".7em" }} textAlign="center">We  @Glistenastrology.com  destined <br />
                            <Typography fontSize={{ mobile: "0.5em", laptop: ".7em" }} fontWeight={500}><i>“In the pursuit of future Excellence”</i></Typography></Typography>
                    </Box>
                </Box>
                <Button
                    onClick={() => {

                        navigate('/astrologer/chat_list')

                    }}
                    sx={{ alignSelf: "center", marginRight: 1 }} variant="contained" color="error" >End Chat</Button>

            </Box>
            <Box sx={{
                height: "90%",
                width: { laptop: '60%', mobile: "100%" }
                // overflow: 'auto'
                , marginX: 'auto',

            }}>
                <MainContainer  >

                    <Box position="relative" width="100%">
                        <ConversationHeader style={{ position: "absolute", width: "100%" }}>
                            <Avatar src={image_url+user?.profile_pic} name={`${user?.name}`} />
                            <ConversationHeader.Content userName={`${user?.name} (${user?.email})`} info="01:50" />
                            <ConversationHeader.Actions>
                                {/* <InfoButton /> */}
                                <ConversationHeader.Content userName="Amount" info="$20" />

                            </ConversationHeader.Actions>
                        </ConversationHeader>
                        <ChatContainer style={{ backgroundColor: 'red' }} >
                            <MessageList style={{ backgroundColor: "#fddc8b", paddingTop: '3em' }} >
                                <MessageSeparator content="Saturday, 30 November 2019" />
                                {
                                    messages.map((i) => {
                                        return (
                                            <Message style={{}} model={i}>
                                                <Message.Footer sentTime={i?.sentTime} />
                                            </Message>
                                        )
                                    })
                                }



                            </MessageList>
                            <MessageInput placeholder="Type message here" onSend={(i) => {
                                sendMessage(i)
                            }} sendButton={true} attachButton={false} />

                        </ChatContainer>
                    </Box>
                </MainContainer>
            </Box>
        </Box >
    )
}
export default AstrologerChat;