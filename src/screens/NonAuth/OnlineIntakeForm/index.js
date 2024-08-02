import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { Card, FormGroup } from '@mui/material'
import Typography from '@mui/material/Typography';
import { FormControl, FormControlLabel, Checkbox, Select, InputLabel, MenuItem } from '@mui/material'
import { ScreenContainer } from 'components';
import { useLocation, useNavigate } from 'react-router-dom'
import { DatePicker, TimePicker } from '@mui/lab';
import { useDispatch, useSelector } from 'react-redux';
import hit from 'service';
import { setUserData } from 'redux_store/features/Auth';
import { setToastOpen } from 'redux_store/actions';
import { setModalVisible } from 'redux_store/features/modal';
import moment from 'moment';
export default function OnlineIntake() {
    const navigate = useNavigate();
    const [selected, setSelected] = React.useState(0)
    const location=useLocation()
    const {astro}=location?.state
    const user=useSelector(state=>state.auth)?.user
    const dispatch=useDispatch()
    const [formState,setFormState]=React.useState({
        first_name:"",
        last_name:"",
        gender:"Male",
        birth_place:"",
        focust_area:"",
        dob:moment().format("DD/MM/YYYY"),
        tob: moment().format("HH:mm"),
        marital_status:"Single",
        payment:"Wallet",
    })
    const [matchState,setMatchState]=React.useState({
        birth_place:"",
        dob:moment().format("DD/MM/YYYY"),
        tob: moment().format("HH:mm"),
    })
    const getDetailsFirstMessage=()=>{
        let text =`First Name: ${formState?.first_name} \nLast Name: ${formState.last_name}\nGender: ${formState.gender}\nPlace of birth: ${formState?.birth_place} \nFocus Area: ${formState.focust_area} \nDate of birth: ${formState?.dob} ${formState?.tob} \nMarital Status: ${formState?.marital_status}`
        return text+`Matcher Details:\nDate of birth:${matchState?.dob} ${matchState?.tob} \nPlace of birth: ${matchState?.birth_place}`
    }
    const addTransaction=async()=>{
        try{
            dispatch(setModalVisible(true))
            let res = await hit("/user/addTransaction", "post", {
                "amount": -138,
                "description": `Deduction for chatting with astrologer ${astro?.name}`,
                astrologer_id:astro?._id
            })
            if (!res.err) {
                navigate("/chat",{state:{astro,user,first_message:getDetailsFirstMessage()}})
                getUserDetails()
            }else{
                dispatch(setToastOpen({open:true,message:"Insufficient funds",type:"warning"}))
            }
        }catch(err){

        }finally{
            dispatch(setModalVisible(false))
        }
    }
    const getUserDetails=async()=>{
        try{
            dispatch(setModalVisible(true))
            let res = await hit("/user/getProfile", "post", {})
            if (!res.err) {
                dispatch(setUserData({user:res.data}))
                
            }
        }catch(err){

        }finally{
            dispatch(setModalVisible(false))
        } 
    }
    return (
        <ScreenContainer>
            <Card sx={{ backgroundColor: 'primary.shade1', height: '100%', paddingY: "1em", marginX: { laptop: '15%', mobile: '10%' } }}>
                <Typography sx={{ textAlign: 'center', fontSize: '1.6em' }} >Chat Intake Form</Typography>
                <Box width={{ "mobile": "90%", laptop: "80%" }} py={"1em"} mt="1em" px={"1em"} border="1px solid" borderRadius={"5px"} borderColor="primary.main" marginX="auto">
                    <Typography fontSize={"1.2em"} fontWeight={500}>Online Enquiry Options </Typography>
                    {/* <FormGroup> */}
                    <FormControlLabel checked={selected == 0} onChange={() => {
                        setSelected(0)
                    }} control={<Checkbox />} sx={{ fontWeight: 200 }} label="Dynamic Chat  ₹164 Per Minute" />
                    {/* <FormControlLabel checked={selected == 0} onChange={() => {
                        setSelected(0)
                    }} control={<Checkbox />} sx={{ fontWeight: 200 }} label="2 Minutes Online Chat : $3.99" /> */}
                    {/* <FormControlLabel checked={selected == 1} onChange={() => {
                        setSelected(1)
                    }} control={<Checkbox />} sx={{ fontWeight: 200 }} label="5 minutes Online : $8.99" />
                    <FormControlLabel checked={selected == 2} onChange={() => {
                        setSelected(2)
                    }} control={<Checkbox />} sx={{ fontWeight: 200 }} label="Dynamic (Unlimited) Online Per Minute : $1.49" /> */}
                    {/* </FormGroup> */}
                </Box>
                <Box display="flex" flexDirection={{ mobile: "column", laptop: "row" }} sx={{ width: { laptop: '80%', mobile: '90%' }, marginX: 'auto' }} >
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="First name"
                        label="First name"
                        type="text"
                        value={formState.first_name}
                        onChange={e => {
                            setFormState({ ...formState, first_name: e.target.value })
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
                        fullWidth
                        name="Last name"
                        label="Last name"
                        type="text"
                        value={formState.last_name}
                        onChange={e => {
                            setFormState({ ...formState, last_name: e.target.value })
                        }}
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
                            value={formState.gender}
                            onChange={e => {
                                setFormState({ ...formState, gender: e.target.value })
                            }}
                            label="Age"
                        // onChange={handleChange}
                        >
                            <MenuItem value={"Male"}>Male</MenuItem>
                            <MenuItem value={"Female"}>Female</MenuItem>
                            <MenuItem value={"Other"}>Other</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <Box display="flex" flexDirection={{ mobile: "column", laptop: "row" }} sx={{ width: { laptop: '80%', mobile: '90%' }, marginX: 'auto' }}>
                    <DatePicker
                        label="Date of Birth*"
                        value={moment(formState.dob,"DD/MM/YYYY")}
                        onChange={e => {
                            setFormState({ ...formState, dob: e?.format("DD/MM/YYYY") })
                        }}
                        inputFormat='DD/MM/YYYY'
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
                        value={moment(formState.tob, "HH:mm")}
                        onChange={e => {
                            setFormState({ ...formState, tob: e.format("HH:mm") })
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
                        value={formState.birth_place}
                        onChange={e => {
                            setFormState({ ...formState, birth_place: e.target.value })
                        }}
                        name="Place of birth"
                        label="Place of birth, State & Country"
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
                <Box display="flex" flexDirection={{ mobile: "column", laptop: "row" }} sx={{ width: { laptop: '80%', mobile: '90%' }, marginX: 'auto' }} >
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        value={formState.focust_area}
                        onChange={e => {
                            setFormState({ ...formState, focust_area: e.target.value })
                        }}
                        name="focus_area"
                        label="Focus area"
                        type="text"
                        id="focus_area"
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
                        <InputLabel id="gender_input">Martial Status*</InputLabel>
                        <Select
                            labelId="gender_input"
                            id="gender_input"
                            // value={age}
                            value={formState.marital_status}
                            onChange={e => {
                                setFormState({ ...formState, marital_status: e.target.value })
                            }}
                            label="Age"
                        // onChange={handleChange}
                        >
                            <MenuItem value={"Single"}>Single</MenuItem>
                            <MenuItem value={"Married"}>Married</MenuItem>
                            <MenuItem value={"In Relationship"}>In Relationship</MenuItem>
                            <MenuItem value={"Divorced"}>Divorced</MenuItem>
                        </Select>
                    </FormControl>

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
                        <InputLabel id="gender_input">Payment*</InputLabel>
                        <Select
                            labelId="gender_input"
                            id="gender_input"
                            // value={age}
                            value={formState.payment}
                            onChange={e => {
                                setFormState({ ...formState, payment: e.target.value })
                            }}
                            label="Age"
                        // onChange={handleChange}
                        >
                            <MenuItem value={"Wallet"}>Wallet</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <Box sx={{ width: { laptop: '80%', mobile: '90%' } }} marginTop={"1em"} marginX="auto">
                    <Typography fontWeight={500}>In case of Match Making (Details of the Partner)</Typography>

                </Box>
                <Box display="flex" flexDirection={{ mobile: "column", laptop: "row" }} sx={{ width: { laptop: '80%', mobile: '90%' }, marginX: 'auto' }}>
                    <DatePicker
                        label="Date of Birth*"
                        inputFormat='DD/MM/YYYY'
                        value={moment(matchState.dob,"DD/MM/YYYY")}
                        onChange={e => {
                            setMatchState({ ...matchState, dob: e?.format("DD/MM/YYYY") })
                        }}
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
                       
                        value={moment(matchState.tob, "HH:mm")}
                        onChange={e => {
                            setMatchState({ ...matchState, tob: e.format("HH:mm") })
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
                        type="text"
                        value={matchState?.birth_place}
                        onChange={e => {
                            setMatchState({ ...matchState, birth_place: e.target.value })
                        }}
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
                <Box display="flex" justifyContent="center" mt="1em">
                    <Button onClick={() => {
                        if(user?._id){
                            addTransaction()
                        }else{
                            dispatch(setToastOpen({open:true,message:"Please login first to chat with astrologer!",type:"error"}))
                        }

                    }} variant="contained" color="secondary" size={"large"} alignSelf="center" sx={{ width: { laptop: '30%', mobile: '60%' }, fontSize: "1em" }} >Start Chat</Button>
                </Box>
            </Card>
            
        </ScreenContainer>
    );
}