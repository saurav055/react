import React from 'react'
import { Box, Typography } from '@mui/material'
import { ScreenContainer } from 'components'

export default function AboutUs() {
    return (
        <ScreenContainer >
            <Box width={{ mobile: "90%", laptop: "80%" }} justifyContent={'center'} alignItems={'center'} marginX="auto">
                <Typography textAlign="center" fontSize={"2em"} fontWeight={500}>Owners of the Domain Glisten Astrology </Typography>
                {/* <Typography textAlign="center" fontSize={"1.5em"} fontWeight={500}> Astrology reveals the will of the God</Typography> */}
                <br />
                <Typography textAlign="center" lineHeight={"1.5em"} fontSize={"1em"} >
                    <Typography lineHeight={"1.5em"} fontSize={"2em"} >
                        Dr. Gurdev Singh Thakur
                    </Typography>
                    CEO & Chief Astrologer
                    <br />
                    E-mail ID: glistenastrology1968@gmail.com
                    <br />

                    Phone Number: +91-8219888758 (only Whatsapp preferred)
                </Typography>
                <br />
                <Typography textAlign="center" lineHeight={"1.5em"} fontSize={"1em"} >
                    <Typography lineHeight={"1.5em"} fontSize={"2em"} >
                        Mr. Yashoodev Singh Thakur
                    </Typography>
                    Dy CEO-I and Legal Advisor
                    <br />
                    E-mail ID: glistenastrology1968@gmail.com
                    <br />

                    Phone Number: +91-7807253655 (only Whatsapp preferred)
                </Typography>
                <br />
                <Typography textAlign="center" lineHeight={"1.5em"} fontSize={"1em"} >
                    <Typography lineHeight={"1.5em"} fontSize={"2em"} >
                        Ms. Priyanka Thakur
                    </Typography>
                    Dy CEO-II and Dy Chief Astrologer
                    <br />
                    E-mail ID: glistenastrology1968@gmail.com
                    <br />

                    Phone Number: +91-8580544191(only Whatsapp preferred)
                </Typography>
            </Box>
        </ScreenContainer >
    )

}