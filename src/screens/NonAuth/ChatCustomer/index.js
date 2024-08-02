import {
    MainContainer,
    ChatContainer,
    MessageList,
    Message,
    MessageInput,
} from "@chatscope/chat-ui-kit-react";
import React, { useState } from "react";
import ConversationHeader from "@chatscope/chat-ui-kit-react/dist/cjs/ConversationHeader";
import Avatar from "@chatscope/chat-ui-kit-react/dist/cjs/Avatar";
import MessageSeparator from "@chatscope/chat-ui-kit-react/dist/cjs/MessageSeparator";
import { LOGO, User } from "assets";
import { Box } from "@mui/system";
import { Button, Typography } from "@mui/material";
import { useNavigate, useLocation } from "react-router";
import moment from "moment";
import InputToolbox from "@chatscope/chat-ui-kit-react/dist/cjs/InputToolbox";
import SendButton from "@chatscope/chat-ui-kit-react/dist/cjs/Buttons/SendButton";
import { collection, setDoc, doc, query, onSnapshot, orderBy, addDoc ,increment} from "firebase/firestore";
import { db } from '../../../firebase_config'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { setModalVisible } from "redux_store/features/modal";
import { useDispatch } from "react-redux";
import { setUserData } from "redux_store/features/Auth";
import hit from "service";
import { setToastOpen } from "redux_store/actions";

const CustomerChat = () => {
    const navigate = useNavigate();
    const location = useLocation()
    const { astro, user,first_message } = location?.state ?? {}

    const getRoomName = () => {
        let ids = [astro?._id, user?._id].sort()
        return ids.join("_")
    }
    let chatRef = doc(db, "chats", getRoomName())
    let messagesRef = collection(db, "chats", getRoomName(), "messages")
    const [amount,setAmount]=React.useState(2)
    const [messages, setMessages] = useState([
    ])
    const [open,setOpen]=React.useState(false)
    React.useEffect(() => {
        let unsub = onSnapshot(query(messagesRef, orderBy("createdAt", "asc")), (snapshot) => {
            let messagesC = [];
            snapshot.forEach((doc) => {
                messagesC.push(doc.data());
            });
            messagesC = messagesC.map(msg => ({ message: msg.text, position: "single", direction: msg?.user?._id == user?._id ? "outgoing" : "incoming", sender: "Emily", sentTime: moment(msg.createdAt?.seconds * 1000).format("hh:mm a") }))
            setMessages(messagesC)
        },
            (error) => {

            })
        return () => {
            unsub()
        }
    }, [])

    React.useEffect(()=>{
        if(first_message){
            sendMessage(first_message)
        }
    },[])
    const sendMessage = (message) => {
        addDoc(messagesRef, {
            text: message,
            type: "text",
            createdAt: new Date(),
            user: {
                _id: user._id,
            },
        })
        setDoc(chatRef, {
            text: message,
            type: "text",
            lastMessage:{text:message,createdAt:moment.now(),user:user?._id},
            createdAt: new Date(),
            user_ids: [user._id, astro._id],
            users: [user, astro],
            [astro._id]:increment(1),
            [user._id]: 0
        })

    }
    return (
        <Box sx={{ width: '100%', height: '100%', padding: 0 }} >
            <Box onClick={() => {
                setOpen(true)
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
                <Button sx={{ alignSelf: "center", marginRight: 1 }} variant="contained" color="error" >End Chat</Button>

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
                            <Avatar src={User} name={`${astro?.name}`} />
                            <ConversationHeader.Content userName={`${astro?.name}`} info={<Timer addAmount={()=>setAmount(amount+2)} astro={astro} />} />

                            <ConversationHeader.Actions>
                                {/* <InfoButton /> */}

                                <ConversationHeader.Content userName="Amount" info={`$${amount}`} />
                            </ConversationHeader.Actions>
                        </ConversationHeader>
                        <ChatContainer style={{ backgroundColor: 'red', paddingTop: '2.7em' }} >
                            <MessageList style={{ backgroundColor: "#fddc8b" }} >
                                <MessageSeparator content="Saturday, 30 November 2019" />
                                {
                                    messages.map((i) => {
                                        console.log("Message", i)
                                        return (
                                            <Message style={{}} model={i}>
                                                <Message.Footer sentTime={i?.sentTime} />

                                                {/* <Avatar src={User} name={"Emily"} /> */}
                                            </Message>
                                        )
                                    })
                                }



                            </MessageList>
                            <MessageInput placeholder="Type message here" onSend={(i) => {
                                sendMessage(i)
                            }} sendButton={true} attachButton={false} >

                            </MessageInput>
                            <InputToolbox>
                                {/* <AttachmentButton /> */}
                                <SendButton disabled />
                            </InputToolbox>
                        </ChatContainer>
                    </Box>
                </MainContainer>
            </Box>
            <AlertDialog open={open} setOpen={setOpen} title={"Confirm"} message={"Are you sure want to end this chat?"} onAgree={()=>{navigate("/");setOpen(false)}} onDisagree={()=>{
                setOpen(false)
            }} />
        </Box >
    )
}


function Timer({max,astro,addAmount}){
    const [counter, setCounter] = React.useState(0);
    const [counter1, setCounter1] = React.useState(0);
    const [open,setOpen]=React.useState(false)
    const dispatch=useDispatch()
    const navigate=useNavigate()
    React.useEffect(() =>{
        if(counter < 60){
            setTimeout(()=>setCounter(counter + 1), 1000);
        }else{
            setOpen(true)
        }
    },[counter]);

    React.useEffect(()=>{
        if(counter<300){
            setCounter1(counter1+1)
        }
        
    },[counter])
    const onAgree=()=>{
        addTransaction()
    }
    const addTransaction=async()=>{
        try{
            dispatch(setModalVisible(true))
            let res = await hit("/user/addTransaction", "post", {
                "amount": -138,
                "description": `Deduction for chatting with astrologer ${astro?.name}`,
                astrologer_id:astro?._id
            })
            if (!res.err) {
                addAmount()
                getUserDetails()
            }else{
                dispatch(setToastOpen({open:true,message:"Insufficient funds",type:"warning"}))
            }
        }catch(err){

        }finally{
            dispatch(setModalVisible(false))
        }
    }
    const getUserDetails=async()=>{
        try{
            dispatch(setModalVisible(true))
            let res = await hit("/user/getProfile", "post", {})
            if (!res.err) {
                dispatch(setUserData({user:res.data}))
                
            }
        }catch(err){

        }finally{
            setCounter(0)
            dispatch(setModalVisible(false))
        } 
    }
    function timeConvert(n) {
        if (n == undefined) {
            return "00:00"
        }
        if (n == "undefined") {
            return "00:00"
        }
        n = n.toString()
        var num = Math.round(n);
        var hours = (num / 60);
        var rhours = Math.floor(hours)
        var minutes = (hours - rhours) * 60;
        var rminutes = Math.round(minutes);
        return (rhours > 9 ? rhours : "0" + rhours) + ":" + (rminutes > 9 ? rminutes : "0" + rminutes);
    }
    return(
        <span>
            {timeConvert(counter1)}
            <AlertDialog title={"Confimr"} open={open} onDisagree={()=>{
                navigate("/")
            }} setOpen={setOpen} onAgree={onAgree} message={"Are you sure you want to continute it will require $2 for 5 minute extra"} />
        </span>
    )
}

 function AlertDialog({message,open,setOpen,title,onAgree,onDisagree}) {
   const navigate=useNavigate()
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    return (
      <div>
        <Button variant="outlined" onClick={handleClickOpen}>

        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
           {title}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {message}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={()=>{
                 onDisagree()
                 setOpen(false)
            }}>No</Button>
            <Button onClick={()=>{
                onAgree()
                setOpen(false)
            }} autoFocus>
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
export default CustomerChat;