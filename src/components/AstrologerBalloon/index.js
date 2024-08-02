import { Card, Typography, useMediaQuery } from '@mui/material';
import { Box, Image, styled } from '@mui/system';
import { Astrologer } from 'assets';
import * as React from 'react';
import Carousel from 'react-elastic-carousel'
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import { image_url } from 'service/endpoints';
import moment from 'moment';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import { db } from 'firebase_config';
const GradientDiv = styled('div')(({ theme }) => ({
    backgroundImage: theme.palette.primary.cardGradient,
}))
function AstrologerBallon(params) {
    const matches = useMediaQuery('(min-width:640px)');
    const astrolist = useSelector(state => state.astrolist)?.list
    const onlineUsers = useSelector(state => state.onlineusers)?.list
    const [onlines, setOnlines] = React.useState([])
    const navigate = useNavigate()
    const [astroloSort, setAstroSort] = React.useState([])
    React.useEffect(() => {
        let ou = onlineUsers.filter(x => (moment().unix() - x.lastOnline) < 30).map(x => x?._id)
        setOnlines(ou)
        let ons = astrolist?.filter(x => ou.includes(x._id))
        let offs = astrolist?.filter(x => !ou.includes(x._id))
        setAstroSort(ons.concat(offs))
    }, [onlineUsers, astrolist])


    return (
        <>
            <Typography sx={{ textAlign: 'center', fontFamily: "Dancing Script", fontSize: { mobile: '1.2em', laptop: '2em' }, marginY: 2 }}>Chat with our astrologers</Typography>
            <Box sx={{ marginX: { mobile: 4, laptop: 10 } }}>
                <Carousel renderArrow={({ type, onClick }) => {
                    return (
                        type == "PREV" ? <ArrowCircleLeftOutlinedIcon
                            style={{
                                marginY: 'auto', height: '100%', marginX: 'auto',
                            }}
                            onClick={onClick}

                        /> :
                            <ArrowCircleRightOutlinedIcon
                                style={{ marginY: 'auto', height: '100%' }}
                                onClick={onClick}
                            />
                    )
                }
                } showArrows={true} pagination={false} itemsToShow={matches ? 3 : 1}>
                    {
                        astroloSort.slice(0, 5).map((astrologer, index) => {
                            return (
                                <AstroComponent onlines={onlines} astrologer={astrologer} />
                            )
                        })
                    }
                </Carousel>
                <Carousel renderArrow={({ type, onClick }) => {
                    return (
                        type == "PREV" ? <ArrowCircleLeftOutlinedIcon
                            style={{
                                marginY: 'auto', height: '100%', marginX: 'auto',
                            }}
                            onClick={onClick}

                        /> :
                            <ArrowCircleRightOutlinedIcon
                                style={{ marginY: 'auto', height: '100%' }}
                                onClick={onClick}
                            />
                    )
                }
                } showArrows={true} pagination={false} itemsToShow={matches ? 3 : 1}>
                    {
                        astroloSort.slice(5,).map((astrologer, index) => {

                            return (
                                <AstroComponent onlines={onlines} astrologer={astrologer} />
                            )

                        })
                    }
                </Carousel>

            </Box>
        </>
    )
}

const AstroComponent = ({ astrologer, onlines }) => {
    const navigate = useNavigate()
    const [inchat, setInChat] = React.useState(false)
    let inChat = doc(db, "inchat", String(astrologer?._id))

    React.useEffect(() => {
        let unsub = onSnapshot(inChat, (snapshot) => {
            getDoc(inChat).then(x=>{
                let data=x?.data()
                if(data?.lastSeen){
                    console.log(moment().diff(moment(data?.lastSeen),"second"))
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
    }, [astrologer])
    return (<GradientDiv

        onClick={() => {
            navigate("/astro_profile", { replace: true, state: { data: astrologer } })
        }} sx={{
            boxShadow: "3px 3px 3px #fbb917",
            '&:hover': {
                cursor: "pointer"
            },
            marginBottom: 1, justifyContent: 'center', position: "relative", height: { laptop: 350, mobile: 300 }, alignItems: 'center', flex: 1, marginX: 3, display: 'flex', borderRadius: 5, border: '1px grooved primary.main', flexDirection: 'column',
        }}>
        <Box

            component="img"
            sx={{
                height: { mobile: 150, laptop: 150, },
                width: { mobile: 150, laptop: 150, },

                borderRadius: '50%'
            }}
            alt="Astrologer Image"
            src={image_url + astrologer?.profile_pic}
        />
        <Typography sx={{ fontSize: { laptop: '1.3em' }, marginY: 1, }}>{astrologer?.name} {astrologer.lname}</Typography>
        <Typography sx={{ fontSize: { laptop: '1.3em' }, fontWeight: 500,
     fontSize: { laptop: '1em' }, fontWeight: 500,
     display: "inline-block",
     overflow: "hidden",
     textOverflow: "ellipsis",
     whiteSpace: "nowrap",
     width: "400px",
     textAlign:"center"
    }}>{astrologer?.primary_skills}</Typography>
        <div style={{ height: "20px", width: "20px", borderRadius: 40, top: "15px", right: "15px", background:inchat?"red" :(onlines.includes(astrologer?._id) ? "green" : "grey"), position: "absolute" }} />
    </GradientDiv>)
}
export default AstrologerBallon;