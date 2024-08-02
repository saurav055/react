import { Button, Card, CardActions, CardContent, CardMedia, Typography, useMediaQuery } from '@mui/material';
import { Box, Image, styled } from '@mui/system';
import { Astrologer, BChart, Horoscope, Numerology } from 'assets';
import * as React from 'react';
import Carousel from 'react-elastic-carousel'
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
const GradientDiv = styled('div')(({ theme }) => ({
    backgroundColor: "#fef1d1",
}))
function ServicesBallon(params) {
    const matches = useMediaQuery('(min-width:640px)');
    const data = [
        { image: BChart, title: 'Create your Horoscope Free', about: "" },
        { image: Numerology, title: "Daily Free Numerology", about: "" },
        { image: Horoscope, title: "Daily Free Predictions as per the Zodiac Sings (Western Astrology)", about: "" }
    ]
    React.useEffect(() => {
        console.log(matches)
    }, [matches])
    return (
        <Box sx={{ paddingY: 2 }}>
            <Typography sx={{ textAlign: 'center', fontSize: { mobile: '1.2em', laptop: '2em' }, marginY: 2 }}>Daily Free Horoscopes and allied free Services </Typography>
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
                        data.map((i) => {
                            return (
                                <Card sx={{ marginX: 2, marginY: 1, height: 350, borderRadius: 2, boxShadow: '0px 2px 0px #fbb917', backgroundColor: '#feeab9' }}>
                                    <CardMedia
                                        component="img"
                                        height="170"
                                        image={i.image}
                                        alt="green iguana"
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {i.title}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" lineHeight={'2em'}>
                                            Lizards are a widespread group of squamate reptiles, with over 6,000
                                            species, ranging across all continents except Antarctica
                                        </Typography>
                                    </CardContent>
                                </Card>
                            )
                        })
                    }
                </Carousel>
            </Box>
        </Box>
    )
}
export default ServicesBallon;