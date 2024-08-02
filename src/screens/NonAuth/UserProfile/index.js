import * as React from 'react';
import { Button, TextField, InputLabel, TextareaAutosize, Select, MenuItem, Box, FormControl, useTheme, Card, Typography, StepLabel, Step, Stepper, Avatar } from '@mui/material';
import en from 'react-phone-number-input/locale/en.json'
import CountrySelect from './CountrySelect'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { ScreenContainer } from 'components'
import { DatePicker, TimePicker } from '@mui/lab';
import { image_url, auth } from 'service/endpoints';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment'
import hit from 'service';
import { setUserData } from 'redux_store/features/Auth';
import { setToastOpen } from 'redux_store/actions';
export default function UserProfile(props) {
    const [country, setCountry] = React.useState('US')
    const [value, setValue] = React.useState(0)
    const theme = useTheme()
    const user = useSelector(state => state?.auth)?.user
    const [image, setImage] = React.useState(null)
    const dispatch=useDispatch()
    const imageTypeSupported = ["image/jpeg", "image/jpg", "image/png"]
    const [data, setData] = React.useState({
        name: "",
        lname: "",
        gender: "",
        dob: moment().format("DD/MM/YYYY"),
        address:"",
        phone:"",
        country_code:"91",
        tob:moment().format("HH:mm"),
        place_of_birth: "",
        pin_code: ""
    })

    React.useEffect(()=>{
        if(user&&user?.email){
            setData(user)
        }
    },[user])

    const updateProfile = async () => {
        try {
            let formdata = new FormData()
            formdata.append("name", data.name)
            formdata.append("lname", data.lname)
            formdata.append("gender", data.gender)
            formdata.append("dob", data.dob)
            formdata.append("tob", data.tob)
            formdata.append("place_of_birth", data.place_of_birth)
            formdata.append("address",data?.address)
            formdata.append("country_code",data?.country_code)
            formdata.append("phone",data?.phone)
            formdata.append("pin_code", data.pin_code)
            if(image){
                formdata.append("profile_pic",image)
            }
            let res = await hit(auth.update, "post", formdata)
            
            if (!res.err) {
                dispatch(setUserData({ user: res.data }))
                dispatch(setToastOpen({ open: true, message: "user updated successfully!" ,type:"success"}))
            } else {
                dispatch(setToastOpen({ open: true, message: res.msg, type: "error" }))
            } 

        } catch (err) {

        } finally {

        }
    }

    const onImageChange = (event) => {

        if (event.target.files && event.target.files[0]) {
            if (imageTypeSupported.includes(event.target.files[0]?.type)) {
                setImage(event.target.files[0]);
            } else {
                alert("Please select image only")
            }

        }
    }
    return (
        <ScreenContainer>
            <Card sx={{ backgroundColor: 'primary.shade1', paddingTop: "2em", height: '100%', marginX: { laptop: '20%', mobile: '10%' } }}>
                <Typography textAlign="center" fontWeight={500} fontSize={{ mobile: "1.1em", laptop: "1.5em" }}>Profile</Typography>
                {/* <AccountCircleIcon color="primary" sx={{ display: "flex", marginX: "auto", fontSize: 70, }} /> */}
                <Box sx={{ position: "relative", display: "flex", marginX: "auto", height: 70, width: 70 }} >
                    <Avatar src={image ? URL.createObjectURL(image) : image_url + user?.profile_pic} sx={{ display: "flex", marginX: "auto", height: 70, width: 70, borderRadius: 70 }} />
                    <input accept='image/*' type={"file"} onChange={onImageChange} className="filetype" style={{ height: 70, width: 70, position: "absolute", opacity: 0 }} />
                </Box>
                <Typography textAlign="center" fontWeight={200} color="secondary.main">Profile pic *(jpg, png, jpeg only) Please check reference</Typography>
                <Box display="flex" flexDirection={{ mobile: "column", laptop: "row" }} sx={{ width: { laptop: '80%', mobile: '90%' }, marginX: 'auto' }} >
                    <TextField
                        margin="normal"
                        required
                        value={data.name}
                        onChange={e => {
                            setData({ ...data, name: e.target.value })
                        }}
                        fullWidth
                        name="First name"
                        label="First name"
                        type="text"
                        id="first_name"
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
                        fullWidth
                        name="Last name"
                        label="Last name"
                        value={data.lname}
                        onChange={e => {
                            setData({ ...data, lname: e.target.value })
                        }}
                        type="text"
                        id="last_name"
                        sx={{
                            marginLeft: { laptop: "1em" },
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
                    <FormControl
                        margin="normal"
                        fullWidth sx={{
                            marginLeft: { mobile: "0px", laptop: "1em" },
                            "& label.Mui-focused": {
                                color: "secondary.main"
                            }
                            , "& .MuiOutlinedInput-root": {
                                "&.Mui-focused fieldset": {
                                    borderColor: "secondary.main"
                                }
                            }
                        }
                        }>
                        <InputLabel id="gender_input">Gender*</InputLabel>
                        <Select
                            labelId="gender_input"
                            id="gender_input"
                            // value={age}
                            value={data.gender}
                            onChange={e => {
                                setData({ ...data, gender: e.target.value })
                            }}
                            label="Age"
                        // onChange={handleChange}
                        >
                            <MenuItem value={"male"}>Male</MenuItem>
                            <MenuItem value={"female"}>Female</MenuItem>
                            <MenuItem value={"other"}>Other</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <Box display="flex" flexDirection={{ mobile: "column", laptop: "row" }} sx={{ width: { laptop: '80%', mobile: '90%' }, marginX: 'auto' }}>
                    <DatePicker
                        label="Date of Birth*"
                        value={moment(data.dob,"DD/MM/YYYY")}
                        onChange={e => {

                            setData({ ...data, dob: e.format("DD/MM/YYYY") })
                        }}
                        inputFormat="DD/MM/YYYY"
                        renderInput={(params) => <TextField {...params}
                            margin="normal"
                            fullWidth sx={{

                                "& label.Mui-focused": {
                                    color: "secondary.main"
                                }
                                , "& .MuiOutlinedInput-root": {
                                    "&.Mui-focused fieldset": {
                                        borderColor: "secondary.main"
                                    }
                                }
                            }
                            } />}
                    />
                    <TimePicker
                        label="Time of Birth: *"

                        value={moment(data.tob, "HH:mm")}
                        onChange={e => {
                            setData({ ...data, tob: e.format("HH:mm") })
                        }}
                        ampm={false}
                        ampmInClock={false}
                        renderInput={(params) => <TextField {...params}
                            fullWidth
                            margin="normal"
                            sx={{
                                marginX: { laptop: "1em" },
                                "& label.Mui-focused": {
                                    color: "secondary.main"
                                }
                                , "& .MuiOutlinedInput-root": {
                                    "&.Mui-focused fieldset": {
                                        borderColor: "secondary.main"
                                    }
                                }
                            }
                            } />}
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        name="Place of birth"
                        label="Place of birth, State & Country"
                        value={data.place_of_birth}
                        onChange={e => {
                            setData({ ...data, place_of_birth: e.target.value })
                        }}
                        type="text"
                        id="last_name"
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
                <Box display="flex" flexDirection={{ mobile: "column", laptop: "row" }} sx={{ width: { laptop: '80%', mobile: '90%' }, marginX: 'auto' }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="First name"
                        label="PinCode"
                        type="text"
                        value={data.pin_code}
                        onChange={e => {
                            setData({ ...data, pin_code: e.target.value })
                        }}
                        id="first_name"
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
                        name="address"
                        label="Current Address"
                        type="text"
                        value={data.address}
                        onChange={e => {
                            setData({ ...data, address: e.target.value })
                        }}
                        id="address"
                        sx={{
                            marginLeft: { laptop: "1em" },
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
                <Box marginTop={2}  sx={{ width: { laptop: '80%', mobile: '90%' }, marginX: 'auto' }} marginBottom={1} display="flex" flexDirection="row" alignItems="center">
                    <CountrySelect
                        labels={en}
                        value={data?.country_code}
                        onChange={t => {
                           setData({ ...data,country_code: t })
                        }}
                    />
                    <TextField
                        required
                        fullWidth
                        name="phone"
                        label="Phone Number"
                        type="tel"
                        id="phone"
                        pattern=""
                        autoComplete="phone"
                        value={data?.phone}
                        onChange={e => {
                            setData({...data,phone: e.target.value })
                        }}
                        sx={{
                            flex: 1,
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
                    <Button onClick={() => { updateProfile() }} variant="contained" color="secondary" size={"large"} sx={{ width: { laptop: '30%', mobile: '60%' }, marginX: 'auto', fontSize: "1em" }} >Update Profile</Button>
                </Box>
            </Card>
        </ScreenContainer>
    );
}