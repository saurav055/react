import * as React from 'react';
import { Button, TextField, InputLabel, TextareaAutosize, Select, MenuItem, Box, FormControl, useTheme, Card, Typography, StepLabel, Step, Stepper } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DatePicker from '@mui/lab/DatePicker';
import en from 'react-phone-number-input/locale/en.json'
import OtpInput from 'react-otp-input';

import OutlinedInput from '@mui/material/OutlinedInput';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox'
import { useDispatch, useSelector } from 'react-redux';
import { auth, image_url, user as uendpoints } from 'service/endpoints';

import hit from 'service';
import { setToastOpen } from 'redux_store/actions';
import { setUserData } from 'redux_store/features/Auth';
import { setModalVisible } from 'redux_store/features/modal';


export default function AstroBankDetail() {

    return (

        <Box sx={{ flex: 1, diplay: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%', marginX: 'auto' }}>
            <Card sx={{ backgroundColor: 'primary.shade1', marginTop: "2em", paddingTop: "2em", height: '100%', marginX: { laptop: '20%', mobile: '10%' } }}>
                <PersonalDetailForm />
            </Card>
        </Box>)
}


const PersonalDetailForm = ({ handleNext }) => {
    const user = useSelector(state => state.auth)?.user
    const dispatch=useDispatch()
    const [data, setData] = React.useState({
        name_on_account: "",
        bank_name: "",
        account_number: "",
        swift_ifsc: "",
        account_type: ""
    })
    React.useEffect(() => {
        if (user?.bank_detail?.name_on_account && user?.bank_detail?.name_on_account != "") {
            setData(user?.bank_detail)
        }
    }, [user])

    const getFormData = object => Object.keys(object).reduce((formData, key) => {
        formData.append(key, object[key]);
        return formData;
    }, new FormData());

    const submit = async() => {
        try {
            dispatch(setModalVisible(true))
            let d={bank_detail:data}
            
            let res = await hit(uendpoints.astro_update, "post", d)
            if (!res.err) {
                dispatch(setToastOpen({ open: true, message: "Successfully updated!", type: "success" }))
                dispatch(setUserData({user:res.data}))
            } else {
                dispatch(setToastOpen({ open: true, message: res.msg, type: "error" }))

            }
        } catch (err) {

        } finally {
            dispatch(setModalVisible(false))
        }
    }


    return (
        <>
            <Typography textAlign="center" fontWeight={500} fontSize={{ mobile: "1.1em", laptop: "1.5em" }}>Bank Details</Typography>
            <Box sx={{ width: { laptop: '70%', mobile: '80%' }, flexDirection: 'column', alignSelf: 'center', display: 'flex', marginX: 'auto', marginY: "1em" }} >
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="Name"
                    label="Name of the recipient"
                    type="text"
                    id="name"
                    value={data?.name_on_account}
                    onChange={e => {
                        setData({ ...data, name_on_account: e.target.value })
                    }}
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
                    name="Email"
                    label="Bank name"
                    type="text"
                    id="email"
                    value={data?.bank_name}
                    onChange={e => {
                        setData({ ...data, bank_name: e.target.value })
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

                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Bank IFSC/SWIFT code"
                    type="text"
                    id="password"

                    value={data?.swift_ifsc}
                    onChange={e => {
                        setData({ ...data, swift_ifsc: e.target.value })
                    }}
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
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Account Number"
                    type="number"
                    value={data?.account_number}
                    onChange={e => {
                        setData({ ...data, account_number: e.target.value })
                    }}
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
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Account Type"
                    type="text"
                    value={data?.account_type}
                    onChange={e => {
                        setData({ ...data, account_type: e.target.value })
                    }}
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
            <Box height="10vh" display="flex" alignItems="center" sx={{ marginX: 'auto', alignSelf: 'center', alignItems: 'center', marginY: '1em' }}>
                <Button onClick={() => {
                    submit()
                 }} variant="contained" color="secondary" size={"large"} sx={{ width: { laptop: '30%', mobile: '60%' }, marginX: 'auto', fontSize: "1em" }} >Update Detail</Button>
            </Box>

        </>
    )
}

