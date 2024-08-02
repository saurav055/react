import * as React from 'react';
import { Button, TextField, InputLabel, TextareaAutosize, Select, MenuItem, Box, FormControl, useTheme, Card, Typography, StepLabel, Step, Stepper, Avatar } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DatePicker from '@mui/lab/DatePicker';
import { ScreenContainer } from 'components';
import en from 'react-phone-number-input/locale/en.json'
import CountrySelect from './CountrySelect'
import OtpInput from 'react-otp-input';
import { setFormData } from 'redux_store/features/AstroForm'
import OutlinedInput from '@mui/material/OutlinedInput';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox'
import { useNavigate } from 'react-router';
import { useSelector, useDispatch } from 'react-redux'
import { setToastOpen } from 'redux_store/actions';
import { auth } from 'service/endpoints';
import hit from 'service';
import { setModalVisible } from 'redux_store/features/modal';
import moment from 'moment';
const steps = ['Personal Details', 'Skill Details', 'Other Details'];


export default function AstroRegister() {
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());
    const dispatch = useDispatch()
    const formdatas = useSelector(state => state.form)?.data
    const isStepOptional = (step) => {
        return false
        return step === 1;
    };

    const isStepSkipped = (step) => {
        return skipped.has(step);
    };

    const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleSkip = () => {
        if (!isStepOptional(activeStep)) {
            // You probably want to guard against something like this,
            // it should never occur unless someone's actively trying to break something.
            throw new Error("You can't skip a step that isn't optional.");
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped((prevSkipped) => {
            const newSkipped = new Set(prevSkipped.values());
            newSkipped.add(activeStep);
            return newSkipped;
        });
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    return (
        <ScreenContainer>
            <Stepper sx={{
                width: { mobile: "90%", laptop: "70%" },
                marginX: "auto",
                marginY: "2em"
            }} activeStep={activeStep}>
                {steps.map((label, index) => {
                    const stepProps = {};
                    const labelProps = {};
                    if (isStepOptional(index)) {
                        labelProps.optional = (
                            <Typography variant="caption">Optional</Typography>
                        );
                    }
                    if (isStepSkipped(index)) {
                        stepProps.completed = false;
                    }
                    return (
                        <Step key={label} {...stepProps}>
                            <StepLabel {...labelProps}>{label}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
            <Box sx={{ flex: 1, diplay: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%', marginX: 'auto' }}>
                {activeStep == 0 && <PersonalDetailForm handleNext={handleNext} />}
                {activeStep == 1 && <SkillDetails handleNext={handleNext} />}
                {activeStep == 2 && <OtherDetails handleNext={handleNext} />}
                {activeStep == 3 && <ThanksForSubmission handleNext={handleNext} />}

            </Box>
        </ScreenContainer>
    );
}

const ThanksForSubmission = () => {
    const navigate = useNavigate()
    return (
        <Card sx={{ backgroundColor: 'primary.shade1', paddingY: "2em", height: '100%', flexDirection: "column", justifyContent: "center", display: "flex", marginX: { laptop: '30%', mobile: '10%' } }}>
            <Typography textAlign="center" fontWeight={500} fontSize={{ mobile: "1.1em", laptop: "1.5em" }}>Thanks For Submission</Typography>
            <Button onClick={() => navigate("/", { replace: true })} color="secondary" sx={{ marginX: "auto", marginTop: "1em" }} variant="contained">Continue</Button>
        </Card>
    )
}

const PersonalDetailForm = ({ handleNext }) => {
    const [value, setValue] = React.useState(0)
    const data = useSelector(state => state.form)?.data
    const dispatch = useDispatch()
    const theme = useTheme()

    const handleCheckNext = () => {
        if (data?.name?.trim() == "" || data?.phone.trim() == "" || data?.password.trim() == "" || data?.email?.trim() == "") {
            dispatch(setToastOpen({ open: true, message: "Please fill all the information", type: "error" }))
        } else {
            handleNext()
        }
    }

 
    return (
        <Card sx={{ backgroundColor: 'primary.shade1', paddingTop: "2em", height: '100%', marginX: { laptop: '30%', mobile: '10%' } }}>
            <Typography textAlign="center" fontWeight={500} fontSize={{ mobile: "1.1em", laptop: "1.5em" }}>Personal Details</Typography>
            <Box sx={{ width: { laptop: '70%', mobile: '80%' }, flexDirection: 'column', alignSelf: 'center', display: 'flex', marginX: 'auto', marginY: "1em" }} >
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="Name"
                    label="Name"
                    type="text"
                    id="name"
                    value={data?.name}
                    onChange={e => {
                        dispatch(setFormData({ name: e.target.value }))
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
                    value={data?.email}
                    name="Email"
                    label="Email"
                    type="email"
                    id="email"
                    onChange={e => {
                        dispatch(setFormData({ email: e.target.value }))
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
                <Box marginTop={2} marginBottom={1} display="flex" flexDirection="row" alignItems="center">
                    <CountrySelect
                        labels={en}
                        value={data?.country_code}
                        onChange={t => {
                            dispatch(setFormData({ country_code: t }))
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
                            dispatch(setFormData({ phone: e.target.value }))
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
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    value={data?.password}
                    onChange={e => {
                        dispatch(setFormData({ password: e.target.value }))
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
            </Box>
            <Box height="10vh" display="flex" alignItems="center" sx={{ marginX: 'auto', alignSelf: 'center', alignItems: 'center', marginY: '1em' }}>
                <Button onClick={() => { handleCheckNext() }} variant="contained" color="secondary" size={"large"} sx={{ width: { laptop: '30%', mobile: '60%' }, marginX: 'auto', fontSize: "1em" }} >Next</Button>
            </Box>
        </Card>
    )
}



const SkillDetails = ({ handleNext }) => {
    const data = useSelector(state => state.form)?.data
    const dispatch = useDispatch()
    const imageTypeSupported = ["image/jpeg", "image/jpg", "image/png"]
    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            if (imageTypeSupported.includes(event.target.files[0]?.type)) {
               dispatch(setFormData({profile_pic: event.target.files[0]}));
            } else {
                alert("Please select image only")
            }

        }
    }

    const handleCheckNext=()=>{
        if(data?.profile_pic==""){
            dispatch(setToastOpen({open:true,message:"Profile picture is required!",type:"error"}))
            return
        }
        if(data?.gender?.trim()==""||data?.dob?.trim()==""||data?.primary_skills?.length==0||data?.all_skills?.length==0||data?.experience?.trim()==""||data?.daily_limit==""){
            dispatch(setToastOpen({open:true,message:"all field are required!",type:"error"}))
            return
        }
        handleNext()
    }

    return (
        <Card sx={{ backgroundColor: 'primary.shade1', paddingTop: "2em", height: '100%', marginX: { laptop: '20%', mobile: '10%' } }}>
            <Typography textAlign="center" fontWeight={500} fontSize={{ mobile: "1.1em", laptop: "1.5em" }}>Skill Details</Typography>
            <Box sx={{ position: "relative", display: "flex", marginX: "auto", height: 70, width: 70 }} >
                    <Avatar src={data?.profile_pic!="" ? URL.createObjectURL(data?.profile_pic) : ""} sx={{ display: "flex", marginX: "auto", height: 70, width: 70, borderRadius: 70 }} />
                    <input accept='image/*' type={"file"} onChange={onImageChange} className="filetype" style={{ height: 70, width: 70, position: "absolute", opacity: 0 }} />
                </Box>
            <Typography textAlign="center" fontWeight={200} color="secondary.main">Profile pic *(jpg, png, jpeg only) Please check reference</Typography>
            <Box sx={{ width: { laptop: '70%', mobile: '80%' }, flexDirection: 'column', alignSelf: 'center', display: 'flex', marginX: 'auto', marginY: "1em" }} >
                <Box display={"flex"} flexDirection={{ mobile: "column", laptop: "row" }}>
                    <FormControl fullWidth sx={{
                        marginRight: { mobile: "0px", laptop: "10px" },
                        marginTop: "1rem",
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
                            value={data?.gender}

                            label="Age"
                            onChange={(e) => {
                                dispatch(setFormData({ gender: e.target.value }))
                            }}
                        >
                            <MenuItem value={"Male"}>Male</MenuItem>
                            <MenuItem value={"Female"}>Female</MenuItem>
                            <MenuItem value={"Other"}>Other</MenuItem>
                        </Select>
                    </FormControl>
                    <DatePicker
                        label="DOB*"
                        value={moment(data?.dob,"DD/MM/YYYY")}
                        onChange={e => {
                            dispatch(setFormData({dob: e.format("DD/MM/YYYY") }))
                        }}
                        inputFormat="DD/MM/YYYY"
                        renderInput={(params) => <TextField {...params} fullWidth sx={{
                            marginTop: "1rem",

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
                </Box>
                <Box display={"flex"} flexDirection={{ mobile: "column", laptop: "row" }}>
                    <Box display="flex" flex={1} marginRight={{ mobile: 0, laptop: "10px" }}>
                        <MultipleSelectCheckmarks value={data?.primary_skills} onChange={v=>{
                            dispatch(setFormData({primary_skills:v}))
                        }} label="Primary Skills*" data={["Vedic", "Nadi", "Numerology", "Prashna", "Lal Kitab", "Tarot", "Counselor","Ghost Nullifying","Psychic Reading"]} />
                    </Box>
                    <Box display="flex" flex={1}>
                        <MultipleSelectCheckmarks onChange={v=>{
                            dispatch(setFormData({all_skills:v}))
                        }} value={data?.all_skills}  label="All Skills*" data={["Vedic", "Nadi", "Numerology", "Prashna", "Lal Kitab", "Tarot", "Counselor","Ghost Nullifying","Psychic Reading"]} />
                    </Box>
                </Box>
                <Box display={"flex"} flexDirection={{ mobile: "column", laptop: "row" }}>
                    <TextField
                        required
                        fullWidth
                        name="experience"
                        label="Working Year of experience*"
                        type="number"
                        value={data?.experience}
                        onChange={e=>{
                            dispatch(setFormData({experience:e.target.value}))
                        }}
                        id="email"
                        autoComplete="email"
                        sx={{
                            marginRight: { mobile: "0px", laptop: "10px" },
                            marginTop: "1em",
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
                        required
                        fullWidth
                        name="Email"
                        label="How many hours you can contribute daily? *"
                        type="number"
                        value={data?.daily_limit}
                        onChange={e=>{
                            dispatch(setFormData({daily_limit:e.target.value}))
                        }}
                        id="email"
                        sx={{
                            marginTop: "1em",
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
            </Box>
            <Box height="10vh" display="flex" alignItems="center" sx={{ marginX: 'auto', alignSelf: 'center', alignItems: 'center', marginY: '1em' }}>
                <Button onClick={() => { handleCheckNext() }} variant="contained" color="secondary" size={"large"} sx={{ width: { laptop: '30%', mobile: '60%' }, marginX: 'auto', fontSize: "1em" }} >Next</Button>
            </Box>
        </Card>
    )
}

const OtherDetails = ({ handleNext }) => {
    const data = useSelector(state => state.form)?.data
    const dispatch = useDispatch()
    const [selected,setSelected]=React.useState(1)
    const [otp,setOTP]=React.useState("")
    const checkNext=async()=>{
        if(data?.onboard_reason==""||data?.preferred_interview_time==""||data?.current_city==""){
            dispatch(setToastOpen({open:true,message:"All field are required",type:"error"}))
            return
        }
        try{
            dispatch(setModalVisible(true))
            let res=await hit(auth.astro_signup,"post",{...data,profile_pic:"",mode:"sendotp"})
            if(!res.err){
                dispatch(setToastOpen({open:true,message:"Otp sent to your email",type:"success"}))
                setSelected(2)
            }else{
                dispatch(setToastOpen({open:true,message:res.msg,type:"error"}))
            }
        }catch(err){

        }finally{
            dispatch(setModalVisible(false))
        }
    }
  
    const getFormData = object => Object.keys(object).reduce((formData, key) => {
        formData.append(key, object[key]);
        return formData;
    }, new FormData());

    const verifyOTP=async()=>{
        try{
            dispatch(setModalVisible(true))

            let res=await hit(auth.astro_signup,"post",getFormData({...data,mode:"confirmotp",otp}))
            if(!res.err){
                dispatch(setToastOpen({open:true,message:"Astrologer account successfully created!",type:"success"}))
                handleNext()
            }else{
                dispatch(setToastOpen({open:true,message:res.msg,type:"error"}))

            }
        }catch(err){

        }finally{
            dispatch(setModalVisible(false))

        }
    }

    return (
        <Card sx={{ backgroundColor: 'primary.shade1', paddingTop: "2em", height: '100%', marginX: { laptop: '20%', mobile: '10%' } }}>
           {selected==2&&<OTPBox otp={otp} setOTP={setOTP} checkNext={checkNext} verifyOTP={verifyOTP} />}
           {selected==1&&<><Typography textAlign="center" fontWeight={500} fontSize={{ mobile: "1.1em", laptop: "1.5em" }}>Other Details</Typography>
            <Box sx={{ width: { laptop: '70%', mobile: '80%' }, flexDirection: 'column', alignSelf: 'center', display: 'flex', marginX: 'auto', marginY: "1em" }} >
                <Box display={"flex"} flexDirection={{ mobile: "column", laptop: "row" }}>
                    <TextField
                        required
                        fullWidth
                        name="Email"
                        label="Why do you think we should onboard you? *"
                        type="text"
                        value={data?.onboard_reason}
                        onChange={e=>{
                            dispatch(setFormData({onboard_reason:e.target.value}))
                        }}
                        id="email"
                        autoComplete="email"
                        sx={{
                            marginRight: { mobile: "0px", laptop: "10px" },
                            marginTop: "1em",
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
                        required
                        fullWidth
                        name="Email"
                        label="What is a suitable time for interview? *"
                        type="email"
                        value={data?.preferred_interview_time}
                        onChange={e=>{
                            dispatch(setFormData({preferred_interview_time:e.target.value}))
                        }}
                        id="email"
                        autoComplete="email"
                        sx={{
                            marginTop: "1em",
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
                <Box display={"flex"} flexDirection={{ mobile: "column", laptop: "row" }}>
                    <TextField
                        required
                        fullWidth
                        name="Email"
                        label="Current Address"
                        type="text"
                        id="email"
                        value={data?.current_city}
                        onChange={e=>{
                            dispatch(setFormData({current_city:e.target.value}))
                        }}
                        autoComplete="email"
                        sx={{
                            marginRight: { mobile: "0px", laptop: "10px" },
                            marginTop: "1em",
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
                        required
                        fullWidth
                        name="Email"
                        label="Main source of business ( other than astrology)?"
                        type="text"
                        id="email"
                        autoComplete="email"
                        value={data?.main_bussiness_source}
                        onChange={e=>{
                            dispatch(setFormData({main_bussiness_source:e.target.value}))
                        }}
                        sx={{
                            marginTop: "1em",
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
                <Box >
                    <Typography marginTop="1em" marginBottom="0.5em">Long bio</Typography>
                    <TextareaAutosize
                        value={data?.about_me}
                        onChange={e=>{
                            dispatch(setFormData({about_me:e.target.value}))
                        }}
                        maxRows={4}
                        style={{
                            width: "100%",
                            minHeight: "100px",
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
            </Box>
            <Box height="10vh" display="flex" alignItems="center" sx={{ marginX: 'auto', alignSelf: 'center', alignItems: 'center', marginY: '1em' }}>
                <Button onClick={() => { checkNext() }} variant="contained" color="secondary" size={"large"} sx={{ width: { laptop: '30%', mobile: '60%' }, marginX: 'auto', fontSize: "1em" }} >Submit</Button>
            </Box></>}
        </Card>
    )
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const OTPBox = ({otp,setOTP,checkNext,verifyOTP}) => {
    return (
        <>
            <Box style={{ width: '100%', alignItems: 'center', display: 'flex', justifyContent: 'center' }}>
            </Box>
            <Typography sx={{ textAlign: 'center', fontSize: '1.5em', marginY: '1em' }} >Enter Otp</Typography>
            <Box sx={{ width: { laptop: '70%', mobile: '80%' }, flexDirection: 'column', alignSelf: 'center', alignItems: 'center', display: 'flex', marginX: 'auto' }} >
                <OtpInput
                    value={otp}
                    onChange={(t) => {setOTP(t)}}
                    inputStyle={{ width: '4em', height: '4em' }}
                    numInputs={4}
                    
                    separator={<span>&nbsp;&nbsp;&nbsp;</span>}
                />

            </Box>
            <Box sx={{ justifyContent: 'space-between', textAlign: 'center', marginY: '2em' }}>

            </Box>
            <Box height="10vh" display="flex" alignItems="center" sx={{ marginX: 'auto', alignSelf: 'center', alignItems: 'center', marginY: '0em' }}>
                <Button onClick={() => { checkNext()}} variant="contained" color="secondary" size={"large"} sx={{ width: { laptop: '30%', mobile: '60%' }, marginX: 'auto', fontSize: "1em" }} >Resend</Button>
            </Box>
            <Box height="10vh" display="flex" alignItems="center" sx={{ marginX: 'auto', alignSelf: 'center', alignItems: 'center', marginBottom: '1em' }}>
                <Button onClick={() => { verifyOTP() }} variant="contained" color="secondary" size={"large"} sx={{ width: { laptop: '30%', mobile: '60%' }, marginX: 'auto', fontSize: "1em" }} >Verify Otp</Button>
            </Box>
        </>
    )
}

function MultipleSelectCheckmarks({ data, label ,value,onChange}) {
    const [personName, setPersonName] = React.useState([]);

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        if(onChange){
            onChange(
                // On autofill we get a the stringified value.
                typeof value === 'string' ? value.split(',') : value,
            );
        }else{
            setPersonName(
                // On autofill we get a the stringified value.
                typeof value === 'string' ? value.split(',') : value,
            );
        }
       
    };

    return (
        <FormControl sx={{ marginTop: "1em" }} fullWidth>
            <InputLabel id="demo-multiple-checkbox-label">{label}</InputLabel>
            <Select
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                multiple
                value={value??personName}
                onChange={handleChange}
                input={<OutlinedInput sx={{
                    "& label.Mui-focused": {
                        color: "secondary.main"
                    }
                    , "& .MuiOutlinedInput-root": {
                        "&.Mui-focused fieldset": {
                            borderColor: "secondary.main"
                        }
                    }
                }} label={label} />}
                renderValue={(selected) => selected.join(', ')}
                MenuProps={MenuProps}
            >
                {data.map((name) => (
                    <MenuItem key={name} value={name}>
                        <Checkbox checked={value?.indexOf(name) > -1} />
                        <ListItemText primary={name} />
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}


