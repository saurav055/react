import React from 'react'
import { Box, Typography, Button } from '@mui/material'
import { ScreenContainer } from 'components'
import {list_data} from './data'
export default function Notifications() {
    return (
        <ScreenContainer style={{ paddingX: { "mobile": "5%", laptop: "10%", minHeight: "50vh" } }} >
            <Box sx={[theme => ({ border: `1px solid ${theme.palette.divider}`, boxShadow: `2px 2px 4px ${theme.palette.divider}`, borderRadius: "20px", paddingY: "1em" })]}>
                <Typography textAlign="center" fontSize="1.5em">Notifications</Typography>
            </Box>
            {list_data.map((x,index)=>{
                return(
                    <Box key={index} marginTop="1em"  sx={[theme => ({ border: `1px solid ${theme.palette.divider}`,backgroundColor:"primary.shade1", boxShadow: `2px 2px 4px ${theme.palette.divider}`, borderRadius: "20px",paddingX:"1em", paddingY: "1em" })]}>
                        <Typography fontSize="1.1em">{x.title}</Typography>
                        <Typography fontWeight={200}>{x.subtitle}</Typography>
                        <Typography fontWeight={200} textAlign="right" fontSize="0.8em">{x.date}</Typography>
                    </Box>
                )
            })}
        </ScreenContainer>
    )
}