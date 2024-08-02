import * as React from 'react';
import { Button, TextField, InputLabel, TextareaAutosize, Select, MenuItem, Box, FormControl, useTheme, Card, Typography, StepLabel, Step, Stepper, Avatar } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DatePicker from '@mui/lab/DatePicker';
import en from 'react-phone-number-input/locale/en.json'
import CountrySelect from './CountrySelect'
import OtpInput from 'react-otp-input';

import OutlinedInput from '@mui/material/OutlinedInput';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox'
import { useSelector,useDispatch } from 'react-redux';
import { auth, image_url, user as uendpoints } from 'service/endpoints';
import hit from 'service';
import { setUserData } from 'redux_store/features/Auth';
import { setToastOpen } from 'redux_store/actions';
import { setModalVisible } from 'redux_store/features/modal';
import moment from 'moment';



export default function EditAstroProfile() {
    const user = useSelector(state => state.auth)?.user
    const [data, setData] = React.useState(null)
    const dispatch=useDispatch()
    React.useEffect(() => {
        if (user) {
            setData(user)
        }
    }, [user])
    const [image, setImage] = React.useState(null)


    const getFormData = object => Object.keys(object).reduce((formData, key) => {
        formData.append(key, object[key]);
        return formData;
    }, new FormData());

    const submit = async() => {
        try {
            dispatch(setModalVisible(true))
            let d={...data}
            delete d.bank_detail
            if(image){
                d.profile_pic=image
            }else{
                delete d.profile_pic
            }
            let res = await hit(uendpoints.astro_update, "post", getFormData(d))
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

        <Box sx={{ flex: 1, diplay: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%', marginX: 'auto' }}>
            <Card sx={{ backgroundColor: 'primary.shade1', paddingTop: "2em", height: '100%', marginX: { laptop: '20%', mobile: '10%' } }}>
                <PersonalDetailForm image={image} setImage={setImage} data={data} setData={setData} />
                <SkillDetails data={data} setData={setData} />
                <OtherDetails submit={submit} data={data} setData={setData} />
            </Card>
        </Box>)
}


const PersonalDetailForm = ({ data, setData, image, setImage }) => {
    const [country, setCountry] = React.useState('US')
    const imageTypeSupported = ["image/jpeg", "image/jpg", "image/png"]
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
        <>
            <Typography textAlign="center" fontWeight={500} fontSize={{ mobile: "1.1em", laptop: "1.5em" }}>Personal Details</Typography>
            <Box sx={{ position: "relative", display: "flex", marginX: "auto", height: 70, width: 70 }} >

                <Avatar src={image ? URL.createObjectURL(image) : image_url + data?.profile_pic} sx={{ display: "flex", marginX: "auto", height: 70, width: 70, borderRadius: 70 }} />
                <input accept='image/*' type={"file"} onChange={onImageChange} className="filetype" style={{ height: 70, width: 70, position: "absolute", opacity: 0 }} />
            </Box>
            <Typography textAlign="center" fontWeight={200} color="secondary.main">Profile pic *(jpg, png, jpeg only) Please check reference</Typography>

            <Box sx={{ width: { laptop: '70%', mobile: '80%' }, flexDirection: 'column', alignSelf: 'center', display: 'flex', marginX: 'auto', marginY: "1em" }} >
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="Name"
                    label="Name"
                    value={data?.name}
                    onChange={e => {
                        setData({ ...data, name: e.target.value })
                    }}
                    type="text"
                    id="name"
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
                        onChange={v => {
                            setData({ ...data, country_code: v })
                        }}
                    />
                    <TextField
                        required
                        fullWidth
                        name="phone"
                        label="Phone Number"
                        type="tel"
                        id="phone"
                        value={data?.phone}
                        onChange={e => {
                            setData({ ...data, phone: e.target.value })
                        }}
                        pattern=""
                        autoComplete="phone"
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

            </Box>

        </>
    )
}



const SkillDetails = ({ data, setData }) => {
    return (
        <>
            <Typography textAlign="center" fontWeight={500} fontSize={{ mobile: "1.1em", laptop: "1.5em" }}>Skill Details</Typography>
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
                            onChange={e => {
                                setData({ ...data, gender: e.target.value })
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
                        onChange={(newValue) => {
                            setData({ ...data, dob: newValue.format("DD/MM/YYYY") });
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
                        <MultipleSelectCheckmarks
                            onChange={v => {
                                setData({ ...data, primary_skills: v })
                            }} value={data?.primary_skills}
                            label="Primary Skills*" data={["Vedic", "Nadi", "Numerology", "Prashna", "Lal Kitab", "Tarot", "Counselor"]} />
                    </Box>
                    <Box display="flex" flex={1}>
                        <MultipleSelectCheckmarks
                            onChange={v => {
                                setData({ ...data, all_skills: v })
                            }} value={data?.all_skills}
                            label="All Skills*" data={["Vedic", "Nadi", "Numerology", "Prashna", "Lal Kitab", "Tarot", "Counselor"]} />
                    </Box>
                </Box>
                <Box display={"flex"} flexDirection={{ mobile: "column", laptop: "row" }}>
                    <TextField
                        required
                        fullWidth
                        name="Email"
                        label="Working Year of experience*"
                        type="number"
                        id="email"
                        value={data?.experience}
                        onChange={e => {
                            setData({ ...data, experience: e.target.value })
                        }}
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
                        type="email"
                        id="email"
                        value={data?.daily_limit}
                        onChange={e => {
                            setData({ ...data, daily_limit: e.target.value })
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
            </Box>
        </>
    )
}

const OtherDetails = ({ data, setData ,submit}) => {
    return (
        <>
            <Typography textAlign="center" fontWeight={500} fontSize={{ mobile: "1.1em", laptop: "1.5em" }}>Other Details</Typography>
            <Box sx={{ width: { laptop: '70%', mobile: '80%' }, flexDirection: 'column', alignSelf: 'center', display: 'flex', marginX: 'auto', marginY: "1em" }} >
                <Box display={"flex"} flexDirection={{ mobile: "column", laptop: "row" }}>
                    <TextField
                        required
                        fullWidth
                        name="Email"
                        label="Why do you think we should onboard you? *"
                        type="text"
                        id="email"
                        value={data?.onboard_reason}
                        onChange={e => {
                            setData({ ...data, onboard_reason: e.target.value })
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


                </Box>
                <Box display={"flex"} flexDirection={{ mobile: "column", laptop: "row" }}>
                    <TextField
                        required
                        fullWidth
                        name="Email"
                        label="Which city do you currently live in?"
                        type="text"
                        value={data?.current_city}
                        onChange={e => {
                            setData({ ...data, current_city: e.target.value })
                        }}
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
                        // type="email"
                        // id="email"
                        value={data?.main_bussiness_source}
                        onChange={e => {
                            setData({ ...data, main_bussiness_source: e.target.value })
                        }}
                        // autoComplete="email"
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
                        maxRows={4}
                        value={data?.about_me}
                        onChange={e => {
                            setData({ ...data, about_me: e.target.value })
                        }}
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
                <Button onClick={() => {submit() }} variant="contained" color="secondary" size={"large"} sx={{ width: { laptop: '30%', mobile: '60%' }, marginX: 'auto', fontSize: "1em" }} >Submit</Button>
            </Box>
        </>
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


function MultipleSelectCheckmarks({ data, label, value, onChange }) {
    const [personName, setPersonName] = React.useState([]);

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        if (onChange) {
            onChange(
                // On autofill we get a the stringified value.
                typeof value === 'string' ? value.split(',') : value,
            );
        } else {
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
                value={value ?? personName}
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


