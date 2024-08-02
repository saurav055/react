import React, { useEffect } from "react"
import { Grid, Box, Typography } from '@mui/material'
import { menus } from './data'
import hit from "service"
import { base_url, file_url } from "service/endpoints"

const Footer = (props) => {

    const [corporateInfo, setCorporateInfo] = React.useState({
        about_us: "1664288942366.pdf",
        desclaimer: "1664293537741.pdf",
        price_policy: "1664289043047.pdf",
        refund_policy: "1664289137592.pdf",
        terms: "1664293517381.pdf"
    })
    useEffect(() => {
        hit(base_url + "user/extraData", "post").then(x => {
           
            if (!x.err) {
                setCorporateInfo(x.data)
            }
        })
    }, [])

    return (
        <React.Fragment>
            <Box
                sx={[(theme) => ({
                    backgroundImage: `linear-gradient(90deg,${theme.palette.primary.main} 10%, #ffffff 100%)`
                })]} py={3} px={4}
            >
                <Box>
                    <Typography fontSize={{ mobile: ".7em", laptop: "1.3em" }}>About Glisten Astrology</Typography>
                    <Box height="2px" width={{ mobile: "60px", laptop: "70px" }} my={1} backgroundColor="secondary.main" />
                    <Typography fontSize={{ mobile: ".68em", laptop: "1.2em" }} fontWeight={200}>Glisten Astrology is the ultra excellence service provider in terms of online and offline horoscope readings and making precised predictions and forecasts across the globe. The highly qualified Vedic and Western Astrology astrologers have been em-paneled  after a long and extensive selection process. And above all, it was borne in mind while pricing our services that befit to the global community at a very sustainable affordability. Get the best future predictions related to Marriage, love life, Career or Health through online text chat, fixed query or report etc.</Typography>
                </Box>
                <Grid container spacing={2} mt={2} justifyContent="space-between">
                    {menus.map(menu => (
                        <Grid item>
                            <Typography fontSize={{ mobile: ".7em", laptop: "1.3em" }}>{menu.title}</Typography>
                            <Box height="2px" width={{ mobile: "60px", laptop: "70px" }} my={1} backgroundColor="secondary.main" />
                            <Box sx={{ display: "flex", flexDirection: menu.type == "icons" ? "row" : "column" }}>
                                {!menu.corporate&&menu.list.map(sub => (
                                    <Typography fontSize={{ mobile: ".68em", laptop: "1.1em" }} fontWeight={300}>{sub}</Typography>
                                ))}
                                 {menu.corporate&&menu.list.map(sub => (
                                    <Typography onClick={()=>{
                                        window.open(file_url+"images/"+corporateInfo[`${sub.link}`],"_blank")
                                    }} fontSize={{ mobile: ".68em", laptop: "1.1em" }} fontWeight={300}>{sub?.title}</Typography>
                                ))}
                            </Box>
                        </Grid>
                    ))}
                </Grid>

            </Box>
            <Typography fontSize={{ mobile: "0.8em", laptop: "1em" }} sx={{ backgroundColor: "general_black.main", color: "text.white" }} py={2} textAlign="center">Copy rights and disclaimer: All rights reserved with Glisten Astrology  </Typography>
        </React.Fragment>
    )
}

export default Footer