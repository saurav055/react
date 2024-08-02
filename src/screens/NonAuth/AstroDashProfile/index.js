import * as React from 'react';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import { Button, Card,Typography } from '@mui/material'

import { Astrologer, LOGO } from 'assets';
import { useNavigate } from 'react-router-dom'
import { EditOutlined } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { image_url } from 'service/endpoints';

export default function AstrologerProfile() {
    const navigate = useNavigate()
    const user=useSelector(state=>state?.auth?.user)
    return (
            <Box marginTop={{mobile:"1em",laptop:"3em"}} display="flex" justifyContent="center">
            <Card sx={{ backgroundColor: 'primary.shade1', marginX: { laptop: '20%', mobile: '10%' },width:"100%", flexDirection:"column", display: 'flex' }} >
                <Typography fontWeight={500} marginTop="2em" marginLeft="2em" fontSize={{mobile:"1.1em",laptop:"1.5em"}}>Profile</Typography>
                <Box style={{ flexDirection: 'column', display: 'flex', backgroundColor: 'primary.shade1', justifyContent: 'center', alignItems: 'center' }}>
                    <Box
                        component="img"
                        src={image_url+user?.profile_pic}
                        sx={{objectFit:"contain",height:"auto", width: { laptop: '12em', mobile: '8em' }, marginY: '0.5em', marginX: '2em' }}
                    />
                    <Box marginBottom="1em">
                        <Typography sx={{ textAlign: 'center', fontSize: '1.5em' }} color={'black'} >{user?.name} {user?.lname}</Typography>
                        <Typography fontWeight={300}>{user?.email}, {user?.phone}</Typography>
                    </Box>

                </Box>
                <Box sx={{ display: 'flex', flex: 1, backgroundColor: 'primary.main', flexDirection: 'column' }}>
                    <Typography sx={{fontSize: '1.5em', marginY: '1em'}}  marginX="1em" >Vedic Astrology</Typography>
                    <Typography marginBottom="0.5em" marginX="1.1em" fontSize="1.1em" display="flex" alignItems="center"> Primary Skills :<Typography fontWeight={300}>{user?.primary_skills}</Typography></Typography>
                    
                    <Typography fontWeight={300} sx={{ marginBottom: '1em', textAlign: 'justify', fontSize: '1em', marginX: '1.1em',}} > <Typography component="span"  fontSize="1.1em" > Bio: </Typography>{user?.about_me}</Typography>
                    <Box sx={{ flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection: { laptop: 'row' }, display: 'flex' }}>
                        <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', paddingRight: '2%', borderRight: 1, borderColor: 'primary.contrastText' }}>
                            <Typography sx={{ fontSize: { mobile: '.8em', laptop: "1.2em" }, textAlign: 'center' }}>{user?.experience} year <br /> Experience</Typography>
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
                                navigate("/astrologer/edit_profile")
                            }}
                            color={'secondary'} size={'large'} variant="contained" startIcon={<EditOutlined />}>
                            Update Profile
                        </Button>
                    </Box>

                </Box>
            </Card>
            </Box>
    );
}