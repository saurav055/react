import React from 'react'
import { Box, Typography, Button,Paper, Avatar } from '@mui/material'
import { ScreenContainer } from 'components'
export default function OrderHistory() {
    return (
        <ScreenContainer style={{ paddingX: { "mobile": "5%", laptop: "10%", minHeight: "50vh" } }} >
            <Box sx={[theme => ({ border: `1px solid ${theme.palette.divider}`, boxShadow: `2px 2px 4px ${theme.palette.divider}`, borderRadius: "20px", paddingY: "1em" })]}>
                <Typography textAlign="center" fontSize="1.5em">Order History</Typography>
            </Box>
            <Box display="flex" py="1em" sx={[theme=>({borderBottom:`1px solid ${theme.palette.divider}`})]}>
            {["Chat","report"].map(x=><Button variant="outlined" sx={{marginRight:"10px"}} >{x}</Button>)}
            </Box>
            <Box display="flex" flexDirection="column" justifyContent="center" py="1em">
                <Button sx={{alignSelf:"center",marginY:"2em"}} variant="contained" color="error" >Delete all chat orders</Button>
                <Box  display="flex" justifyContent="space-evenly">
                {[1,2,3].map((x,i)=>{
                    return(
                        <Paper sx={{width:{mobile:"300px",laptop:"450px"},height:"250px",px:"2em",transitionProperty:"all",transitionDuration:500,transitionTimingFunction:"ease-in-out","&:hover":{
                            transform:"scale(1.02)",
                            boxShadow:"2px 2px 4px gray"
                        }}}>
                            <Box display="flex" flexDirection="row" py="1em" justifyContent="space-between" alignItems="center">
                                <Box sx={{width:"10%"}} />
                                <Typography fontSize={"1.1em"} fontWeight={500}>Order ID: #456123798</Typography>
                                <Box sx={{width:"10%"}}><Typography color="error" fontSize={"0.8em"}>HELP</Typography></Box>
                            </Box>
                            <Box display="flex" justifyContent="space-between">
                            <Box>
                                <Typography  fontSize={"1.1em"}>Liahs</Typography>
                                <Typography  fontSize={"0.9em"}>Status: <Typography component="span" color="success.main">Completed</Typography></Typography>
                                <Typography   fontSize={"0.9em"}>1 Dec 2021, 12:00 AM</Typography>
                                <Typography   fontSize={"0.9em"}>Rate: ₹ 0/min</Typography>
                                <Typography  fontSize={"0.9em"}>Duration: 6 minutes</Typography>
                                <Typography   fontSize={"0.9em"}>Deduction: ₹ 0</Typography>
                                <Typography>★★★★★</Typography>
                                <Typography  fontSize={"0.9em"}>Review: Great Astrologer</Typography>
                            </Box>
                            <Box>
                                <Avatar  />
                            </Box>
                            </Box>
                        </Paper>
                    )
                })}
                </Box>
            </Box>
        </ScreenContainer>
    )
}