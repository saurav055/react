import * as React from 'react';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import { Button, Card } from '@mui/material'

import Typography from '@mui/material/Typography';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import { ScreenContainer } from 'components';
import { Astrologer, LOGO } from 'assets';
import { useLocation, useNavigate } from 'react-router-dom'
import { image_url } from 'service/endpoints';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import { db } from 'firebase_config';

export default function AstrologerProfile() {
    const navigate = useNavigate()
    const location=useLocation()
    const {data}=location?.state
    const [onlines,setOnlines]=React.useState([])
    const onlineUsers=useSelector(state=>state.onlineusers)?.list

    React.useEffect(() => {
        let ou=onlineUsers.filter(x=>(moment().unix()-x.lastOnline)<30).map(x=>x?._id)
        setOnlines(ou)
    }, [onlineUsers])
    const [inchat, setInChat] = React.useState(false)
    let inChat = doc(db, "inchat", String(data?._id))

    React.useEffect(() => {
        let unsub = onSnapshot(inChat, (snapshot) => {
            getDoc(inChat).then(x=>{
                let data=x?.data()
                if(data?.lastSeen){
                    if(moment().diff(moment(data?.lastSeen),"second")<10){
                        setInChat(true)
                    }else{
                        setInChat(false)
                    }
                }else{
                    setInChat(false)
                }
            })
        },
            (error) => {

            })
        return () => {
            unsub()
        }
    }, [data])
    return (
        <ScreenContainer>

            <Card sx={{ backgroundColor: 'primary.shade1', marginX: { laptop: '10%', mobile: '10%' }, flexDirection: { mobile: 'column', laptop: 'row' }, display: 'flex' }} >

                <Box style={{ flexDirection: 'column',position:"relative", display: 'flex', backgroundColor: 'primary.shade1', justifyContent: 'center', alignItems: 'center' }}>
                    <Box
                        component="img"
                        src={image_url+data?.profile_pic}
                        sx={{ width: { laptop: '12em', mobile: '10em' }, marginY: '1em', marginX: '2em' }}
                    />
                    <Box style={{ display: 'flex' }}>
                        <Typography sx={{ textAlign: 'center', fontSize: '1.5em', marginY: '1em', display: 'flex' }} color={'black'} >{data?.name} {data.lname}</Typography>

                    </Box>
                    <div style={{height:"20px",width:"20px",borderRadius:40,top:"15px",right:"15px",background:inchat?"red":(onlines.includes(data?._id)?"green":"grey"),position:"absolute"}} />

                </Box>
                <Box sx={{ display: 'flex', flex: 1, backgroundColor: 'primary.main', flexDirection: 'column' }}>
                    <Typography sx={{ textAlign: 'center', fontSize: '1.5em', marginX: '1em', marginY: '1em', display: 'flex' }} >{data?.primary_skills}</Typography>

                    <Typography sx={{ marginBottom: '1em', textAlign: 'justify', fontSize: '1em', marginX: '1.7em', display: 'flex' }} >{data?.about_me}</Typography>
                    <Box sx={{ flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection: { laptop: 'row' }, display: 'flex' }}>
                        <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', paddingRight: '2%', borderRight: 1, borderColor: 'primary.contrastText' }}>
                            <Typography sx={{ fontSize: { mobile: '.8em', laptop: "1.2em" }, textAlign: 'center' }}>{data?.experience} year <br /> Experience</Typography>
                        </Box>
                        <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', paddingRight: '2%', borderRight: 1, borderColor: 'primary.contrastText' }}>
                            <Typography sx={{ fontSize: { mobile: '.8em', laptop: "1.2em" }, textAlign: 'center' }}>48000 Chats</Typography>
                        </Box>
                        <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', paddingRight: '2%', }}>
                            <Typography sx={{ fontSize: { mobile: '.8em', laptop: "1.2em" }, textAlign: 'center' }}>Solution To Problems</Typography>
                        </Box>
                    </Box>
                    <Box sx={{ marginY: '1.7em', flex: 1, display: 'flex', justifyContent: 'center' }}>
                        <Button
                            onClick={() => {
                                navigate("/chat_intake_form", { replace: true,state:{astro:data} })
                            }}
                            color={'secondary'} size={'large'} variant="contained" startIcon={<ChatOutlinedIcon />}>
                            Start Chatting
                        </Button>
                    </Box>

                </Box>



            </Card>
        </ScreenContainer >
    );
}