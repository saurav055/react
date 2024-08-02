import { Button, Card, Rating, Typography, useMediaQuery } from '@mui/material';
import { Box, Image, styled } from '@mui/system';
import { Astrologer } from 'assets';
import * as React from 'react';
import Carousel from 'react-elastic-carousel'
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import { useNavigate } from 'react-router';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import VerifiedIcon from '@mui/icons-material/Verified';
import { image_url } from 'service/endpoints';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import { db } from 'firebase_config';
const GradientDiv = styled('div')(({ theme }) => ({
    backgroundImage: theme.palette.primary.cardGradient,
}))

function AstrologerComponent({ astro }) {
    const matches = useMediaQuery('(min-width:640px)');
    const navigate = useNavigate()
    const [onlines, setOnlines] = React.useState([])
    const onlineUsers = useSelector(state => state.onlineusers)?.list

    React.useEffect(() => {
        let ou = onlineUsers.filter(x => (moment().unix() - x.lastOnline) < 30).map(x => x?._id)
        setOnlines(ou)
    }, [onlineUsers])
    const [inchat, setInChat] = React.useState(false)
    let inChat = doc(db, "inchat", String(astro?._id))

    React.useEffect(() => {
        let unsub = onSnapshot(inChat, (snapshot) => {
            getDoc(inChat).then(x => {
                let data = x?.data()
                if (data?.lastSeen) {
                    if (moment().diff(moment(data?.lastSeen), "second") < 10) {
                        setInChat(true)
                    } else {
                        setInChat(false)
                    }
                } else {
                    setInChat(false)
                }
            })
        },
            (error) => {

            })
        return () => {
            unsub()
        }
    }, [astro])
    return (
        <>

            <GradientDiv

                onClick={() => {
                    navigate("/astro_profile", { replace: true, state: { data: astro } })
                }} sx={{
                    boxShadow: "3px 3px 3px #fbb917",
                    '&:hover': {
                        cursor: "pointer"
                    },
                    marginBottom: 1, justifyContent: 'center', position: "relative", paddingX: 'auto', width: { laptop: 420, mobile: 330 }, alignItems: 'center', height: { laptop: 280, mobile: 320 }, paddingX: 1, marginX: 1, display: 'flex', marginY: '1em', borderRadius: 5, border: '1px grooved primary.main', flexDirection: 'row',
                }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
                    <Box

                        component="img"
                        sx={{
                            height: { mobile: 110, laptop: 110, },
                            width: { mobile: 110, laptop: 110, },
                            marginY: '1em',
                            borderRadius: '50%',
                        }}
                        alt="Astrologer Image"
                        src={image_url + astro.profile_pic}
                    />
                    <Typography sx={{ fontSize: { laptop: '1em' }, marginY: .5, }}>{astro?.name} {astro?.lname}</Typography>
                    <Typography sx={{
                        fontSize: { laptop: '1em' }, fontWeight: 500,
                        display: "inline-block",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        width: "200px",
                    }}>{astro?.primary_skills}</Typography>
                    <Typography sx={{ fontSize: { laptop: '1em' }, fontWeight: 500 }}>Experience: {astro?.experience} Years </Typography>
                </Box>
                <Box sx={{ alignItems: 'flex-end', flex: 1, justifyContent: 'center' }} >
                    <Box sx={{ marginY: '1.7em', flex: 1, height: 50, display: 'flex', justifyContent: 'center' }}>
                        <Button onClick={() => {
                            navigate("/chat_intake_form", { replace: true })

                        }} color={'secondary'} size={'large'} variant="contained" startIcon={<ChatOutlinedIcon />}>
                            Chat
                        </Button>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <ChatOutlinedIcon sx={{}} />

                        <Typography sx={{ fontSize: { laptop: '1em' }, marginY: .5, textAlign: 'center' }}>36k min chat</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <VerifiedIcon sx={{}} />

                        <Typography sx={{ fontSize: { laptop: '1em' }, marginY: .5, textAlign: 'center' }}>Verified</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Rating
                            disabled={true}
                            name="simple-controlled"
                            value={astro?.rating ?? "5"}
                            onChange={(event, newValue) => {

                            }}
                        />
                    </Box>

                </Box>
                <div style={{ height: "20px", width: "20px", borderRadius: 40, top: "15px", right: "15px", background: inchat ? "red" : (onlines.includes(astro?._id) ? "green" : "grey"), position: "absolute" }} />

            </GradientDiv>

        </>
    )
}
export default AstrologerComponent;