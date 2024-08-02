import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { Card } from '@mui/material'
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { LOGO } from 'assets';
import { useNavigate } from 'react-router';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { ScreenContainer } from 'components';
import hit from 'service'
import { auth } from 'service/endpoints'
import { useDispatch } from 'react-redux';
import { setToastOpen } from 'redux_store/actions';
import { setModalVisible } from 'redux_store/features/modal';
export default function UserLogin() {
    const [email, setEmail] = React.useState("")
    const [loading, setLoading] = React.useState(false)
    const dispatch = useDispatch()
    const handleSubmit = async () => {
        try {
            setLoading(true)
            dispatch(setModalVisible(true))
            let res = await hit(auth.signup, "post", JSON.stringify({
                email,
                mode: "signin"
            }))
            if (!res.err) {
                dispatch(setToastOpen({ open: true, message: "Otp is sent to your email" }))
                navigate("/confirm_otp", { state:{email},replace:true})
            } else {
                dispatch(setToastOpen({ open: true, message: res.msg, type: "error" }))

            }
        } catch (err) {

        } finally {
            dispatch(setModalVisible(false))
        }

    };
    const navigate = useNavigate()
    return (
        <ScreenContainer>
            <Box sx={{ flex: 1, diplay: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%', marginX: 'auto' }}>
                <Card sx={{ backgroundColor: 'primary.shade1', height: '100%', marginX: { laptop: '30%', mobile: '10%' } }}>

                    <Box style={{ width: '100%', alignItems: 'center', display: 'flex', justifyContent: 'center' }}>
                        <Box sx={{ backgroundColor: 'primary.shade1', padding: '10px', borderRadius: '120px', marginY: '1.5em' }} >
                            <LockOpenIcon color={'secondary'} sx={{ fontSize: '2em' }} ></LockOpenIcon>
                        </Box>
                    </Box>
                    <Typography sx={{ textAlign: 'center', fontSize: '1.5em' }} >Login</Typography>
                    <Box sx={{ width: { laptop: '70%', mobile: '80%' }, flexDirection: 'column', alignSelf: 'center', display: 'flex', marginX: 'auto' }} >
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="Email"
                            label="Email"
                            type="email"
                            id="email"
                            value={email}
                            onChange={e => {
                                setEmail(e.target.value)
                            }}
                            autoComplete="email"
                            sx={{
                                "& label.Mui-focused": {
                                    color: "secondary.main"
                                }
                                , "& .MuiOutlinedInput-root": {
                                    "&.Mui-focused fieldset": {
                                        borderColor: "secondary.main"
                                    }
                                }
                            }
                            }
                        />

                    </Box>
                    <Box sx={{ justifyContent: 'space-between', textAlign: 'center', marginY: '2em' }}>

                    </Box>
                    <Box height="10vh" display="flex" alignItems="center" sx={{ marginX: 'auto', alignSelf: 'center', alignItems: 'center', marginY: '1em' }}>
                        <Button onClick={() => {
                            handleSubmit()

                        }} variant="contained" color="secondary" size={"large"} sx={{ width: { laptop: '30%', mobile: '60%' }, marginX: 'auto', fontSize: "1em" }} >Send Otp</Button>
                    </Box>

                </Card>
            </Box>
        </ScreenContainer>
    );
}