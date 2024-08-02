import React from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import CancelIcon from '@mui/icons-material/Cancel';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { Card, Typography } from '@mui/material'
import { Zodaic } from 'assets';
import { useNavigate } from 'react-router-dom'
import { image_url } from 'service/endpoints';

export default function ResponsiveDialog({ open,selectedService, setOpen }) {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('tablet'));
    const navigate = useNavigate()

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
                sx={{ maxWidth: { laptop: "60%", mobile: "95%" }, marginX: "auto" }}
                aria-labelledby="responsive-dialog-title"
            >
                <Card sx={{ backgroundColor: 'primary.shade1', flexDirection: "column", display: 'flex', paddingTop: "1em" }} >
                    <CancelIcon onClick={() => setOpen(false)} sx={{ alignSelf: "flex-end", marginRight: "1em" }} color="primary" fontSize="large" />
                    <Box sx={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
                        <Box
                            component="img"
                            src={Zodaic}
                            sx={{ objectFit: "contain", height: "auto", width: { laptop: '12em', mobile: '8em' }, marginY: '0.5em', marginX: 'auto' }}
                        />
                        <Box sx={{ display: "flex", flex: 1, justifyContent: "space-between" }}>
                            <Box flex={1}>
                            <Typography marginBottom="0.5em" marginX="1.1em" fontSize="1.1em" display="flex" alignItems="center"> Category : <Typography fontWeight={300}>{selectedService?.category}</Typography></Typography>
                                <Typography marginBottom="0.5em" marginX="1.1em" fontSize="1.1em" display="flex" alignItems="center"> Email/Whatsapp : <Typography fontWeight={300}>{selectedService?.whatsapp_no}</Typography></Typography>
                                <Typography marginBottom="0.5em" marginX="1.1em" fontSize="1.1em" display="flex" alignItems="center"> Gender : <Typography fontWeight={300}>{selectedService?.gender}</Typography></Typography>
                                <Typography marginBottom="0.5em" marginX="1.1em" fontSize="1.1em" display="flex" alignItems="center"> DOB : <Typography fontWeight={300}>{selectedService?.dob} {selectedService?.tob}</Typography></Typography>
                                <Typography marginBottom="0.5em" marginX="1.1em" fontSize="1.1em" display="flex" alignItems="center"> Birth Address : <Typography fontWeight={300}>{selectedService?.pob}</Typography></Typography>
                                <Typography marginBottom="0.5em" marginX="1.1em" fontSize="1.1em" display="flex" alignItems="center"> Focus Area : <Typography fontWeight={300}> {selectedService?.focous_area}</Typography></Typography>
                                <Typography marginBottom="0.5em" marginX="1.1em" fontSize="1.1em" display="flex" alignItems="center"> Martial Status : <Typography fontWeight={300}>{selectedService?.marital_status}</Typography></Typography>
                                <Typography marginBottom="0.5em" marginX="1.1em" fontSize="1.1em" display="flex" alignItems="center"> Payment : <Typography fontWeight={300}> Stripe</Typography></Typography>
                            </Box>
                        </Box>
                        <Typography fontWeight={300} sx={{ marginBottom: '1em',minWidth:"500px", textAlign: 'justify', fontSize: '1em', marginX: '1.1em', }} > <Typography component="span" fontSize="1.1em" > Question: </Typography>{selectedService?.description}</Typography>
                        {selectedService?.marked_completed&&<Typography fontWeight={300} sx={{ marginBottom: '1em', textAlign: 'justify', fontSize: '1em', marginX: '1.1em', }} > <Typography component="span" fontSize="1.1em" > Response: </Typography><a target={"_blank"} href={image_url+selectedService?.media}> Show</a></Typography>}

                    </Box>
                </Card>
            </Dialog>
        </div>
    );
}
