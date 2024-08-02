import React from 'react'
import { Box, Typography, Button } from '@mui/material'
import { ScreenContainer } from 'components'
import {list_data} from './data'
import { useDispatch, useSelector } from 'react-redux'
import { listBroadCastThunk } from 'redux_store/features/broadcast'
export default function Notifications() {
    const [open,setOpen]=React.useState(false)
    const dispatch=useDispatch()
    const broadCasts=useSelector(state=>state.broadcast)?.data
    React.useEffect(()=>{
        dispatch(listBroadCastThunk())
    },[])
    return (
        <Box marginTop={{mobile:"1em",laptop:"3em"}} marginX="20px" justifyContent="center">
            {/* <Button variant='contained' onClick={()=>setOpen(true)} sx={{marginBottom:"12px"}}>Broadcast Message</Button> */}
            <Box sx={[theme => ({ border: `1px solid ${theme.palette.divider}`, boxShadow: `2px 2px 4px ${theme.palette.divider}`, borderRadius: "20px", paddingY: "1em" })]}>
                
                <Typography textAlign="center" fontSize="1.5em">Message Broadcasts</Typography>
            </Box>
            {broadCasts.map((x,index)=>{
                return(
                    <Box key={index} marginTop="1em"  sx={[theme => ({ border: `1px solid ${theme.palette.divider}`,backgroundColor:"primary.shade1", boxShadow: `2px 2px 4px ${theme.palette.divider}`, borderRadius: "20px",paddingX:"1em", paddingY: "1em" })]}>
                        <Typography fontSize="1.1em">{x.title}</Typography>
                        <Typography fontWeight={200}>{x.message}</Typography>
                        <Typography fontWeight={200} textAlign="right" fontSize="0.8em">{x.date}</Typography>
                    </Box>
                )
            })}
        </Box>
    )
}