import * as React from 'react';
import { Typography, Box, Button, Card } from '@mui/material'
import { ScreenContainer } from 'components';
import OtpInput from 'react-otp-input';
import { useNavigate, useLocation } from 'react-router';
import { useDispatch } from 'react-redux';
import { setToastOpen, setAuthorize } from 'redux_store/actions'
import hit from 'service'
import { auth } from 'service/endpoints'
import { storeData } from 'storage';
import { setModalVisible } from 'redux_store/features/modal';

export default function ConfirmOtp() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const [loading, setLoading] = React.useState(false)
    const [otp, setOTP] = React.useState("")
    const resendOTP = async () => {
        try {
            setLoading(true)
            dispatch(setModalVisible(true))
            let res = await hit(auth.signup, "post", JSON.stringify({
                email: location.state.email,
                mode: "signin"
            }))
            if (!res.err) {
                dispatch(setToastOpen({ open: true, message: "Otp is resent to your email" }))

            } else {
                dispatch(setToastOpen({ open: true, message: res.msg, type: "error" }))

            }
        } catch (err) {

        } finally {
            setLoading(false)
            dispatch(setModalVisible(false))
        }
    }
    const verifyOTP = async () => {
        try {
            setLoading(true)
            dispatch(setModalVisible(true))

            let res = await hit(auth.signup, "post", JSON.stringify({
                email: location.state.email,
                mode: "confirm",
                otp
            }))
            if (!res.err) {
                console.log(res.data)
                dispatch(setToastOpen({ open: true, message: "login successfully!" }))
                storeData("@token",res.data.token)
                dispatch(setAuthorize({ authorize: true, user: res.data.data,token:res.data.token }))
                navigate("/", { replace: true })

            } else {
                dispatch(setToastOpen({ open: true, message: res.msg, type: "error" }))

            }
        } catch (err) {

        } finally {
            setLoading(false)
            dispatch(setModalVisible(false))
        }
    }
    return (
        <ScreenContainer>
            <Box sx={{ flex: 1, diplay: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%', marginX: 'auto' }}>
                <Card sx={{ backgroundColor: 'primary.shade1', height: '100%', marginX: { laptop: '30%', mobile: '10%' } }}>

                    <Box style={{ width: '100%', alignItems: 'center', display: 'flex', justifyContent: 'center' }}>
                    </Box>
                    <Typography sx={{ textAlign: 'center', fontSize: '1.5em', marginY: '1em' }} >Enter Otp</Typography>
                    <Box sx={{ width: { laptop: '70%', mobile: '80%' }, flexDirection: 'column', alignSelf: 'center', alignItems: 'center', display: 'flex', marginX: 'auto' }} >
                        <OtpInput
                            value={otp}
                            onChange={(text) => { setOTP(text) }}
                            inputStyle={{ width: '4em', height: '4em' }}
                            numInputs={4}
                            separator={<span>&nbsp;&nbsp;&nbsp;</span>}
                        />

                    </Box>
                    <Box sx={{ justifyContent: 'space-between', textAlign: 'center', marginY: '2em' }}>

                    </Box>
                    <Box height="10vh" display="flex" alignItems="center" sx={{ marginX: 'auto', alignSelf: 'center', alignItems: 'center', marginY: '0em' }}>
                        <Button onClick={() => { resendOTP() }} variant="contained" color="secondary" size={"large"} sx={{ width: { laptop: '30%', mobile: '60%' }, marginX: 'auto', fontSize: "1em" }} >Resend</Button>
                    </Box>
                    <Box height="10vh" display="flex" alignItems="center" sx={{ marginX: 'auto', alignSelf: 'center', alignItems: 'center', marginBottom: '1em' }}>
                        <Button onClick={() => {

                            verifyOTP()
                        }} variant="contained" color="secondary" size={"large"} sx={{ width: { laptop: '30%', mobile: '60%' }, marginX: 'auto', fontSize: "1em" }} >Verify Otp</Button>
                    </Box>

                </Card>
            </Box>
        </ScreenContainer>
    );
}