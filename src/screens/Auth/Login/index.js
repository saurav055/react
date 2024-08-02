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
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { ScreenContainer } from 'components';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import hit from 'service';
import { auth } from 'service/endpoints';
import { setAuthorize, setToastOpen } from 'redux_store/actions';
import { storeData } from 'storage';
import { setModalVisible } from 'redux_store/features/modal';
function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}


export default function Login() {
    const navigate = useNavigate();
    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     const data = new FormData(event.currentTarget);
    //     // eslint-disable-next-line no-console
    //     console.log({
    //         email: data.get('email'),
    //         password: data.get('password'),
    //     });
    // };
    const [email, setEmail] = React.useState("")
    const [password,setPassword]=React.useState("")
    const [loading, setLoading] = React.useState(false)
    const dispatch = useDispatch()

    const handleSubmit = async () => {
        try {
            setLoading(true)
            dispatch(setModalVisible(true))
            let res = await hit(auth.astro_signin, "post", JSON.stringify({
                email,
                password
            }))
            if (!res.err) {
                storeData("@token",res.data.token)
                dispatch(setAuthorize({ authorize: true, user: res.data,token:res.data.token }))
                dispatch(setToastOpen({ open: true, message: "Login successfully" }))
                navigate("/astrologer", { replace:true})
            } else {
                dispatch(setToastOpen({ open: true, message: res.msg, type: "error" }))

            }
        } catch (err) {

        } finally {
            dispatch(setModalVisible(false))

        }

    };
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
                            value={email}
                            onChange={e=>setEmail(e.target.value)}
                            fullWidth
                            name="Email"
                            label="Email"
                            type="email"
                            id="email"
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
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            value={password}
                            onChange={e=>setPassword(e.target.value)}
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
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
                        <Box item xs>
                            <Typography
                                sx={{
                                    '&:hover': {
                                        cursor: "pointer"
                                    }
                                }}
                                onClick={() => {
                                    navigate('/forget_password', { replace: true })
                                }} color={'secondary'}  >
                                Forgot password?
                            </Typography>
                        </Box>
                        <Box item>
                            <Typography
                                sx={{
                                    '&:hover': {
                                        cursor: "pointer"
                                    }
                                }}
                                onClick={() => {
                                    navigate('/astro_register', { replace: true })
                                   
                                }}
                                color={'secondary'} >
                                {"Don't have an account? Register"}
                            </Typography>
                        </Box>
                    </Box>
                    <Box height="10vh" display="flex" alignItems="center" sx={{ marginX: 'auto', alignSelf: 'center', alignItems: 'center', marginY: '1em' }}>
                        <Button onClick={() => {
                             handleSubmit()

                        }} variant="contained" color="secondary" size={"large"} sx={{ width: { laptop: '30%', mobile: '60%' }, marginX: 'auto', fontSize: "1em" }} >Login</Button>
                    </Box>

                </Card>
            </Box>
        </ScreenContainer>
    );
}