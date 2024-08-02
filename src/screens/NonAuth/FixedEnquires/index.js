import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import { Card, FormGroup } from "@mui/material";
import Typography from "@mui/material/Typography";
import {
  FormControl,
  Snackbar,
  Select,
  InputLabel,
  MenuItem,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { ScreenContainer } from "components";
import { useNavigate } from "react-router";
import { Zodaic } from "assets";
import { DatePicker, TimePicker } from "@mui/lab";
import { user } from "service/endpoints";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import hit from "service";
import { useLocation } from "react-router-dom";
import { setToastOpen } from "redux_store/actions";
import { setModalVisible } from "redux_store/features/modal";
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function FixedEnquires(props) {
  const navigate = useNavigate();
  const [selected, setSelected] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const authorize = useSelector((state) => state?.auth)?.authorize;
  const dispatch = useDispatch();
  const { permanent, showFocus, forecast_type } = useLocation().state;
  const params = useParams();
  const [data, setData] = React.useState({
    name: "",
    lname: "",
    dob: moment().format("DD/MM/YYYY"),
    tob: moment().format("HH:mm"),
    pob: "",
    focous_area: "",
    country_code: "1",
    forecast_type: "",
    year: false,
    quarter: false,
    half: false,
    description: "",
    marital_status: "",
    gender: "",
    category: params.title,
  });
  React.useEffect(() => {
    console.log("Data", data);
  }, [data]);
  React.useEffect(() => {
    if (showFocus) {
      if (forecast_type?.title == "Quarterly Forecast $ 39.99") {
        setData({
          ...data,
          quarter: true,
          forecast_type: forecast_type?.title,
        });
      } else if (forecast_type?.title == "Half yearly forecast $ 74.99") {
        setData({ ...data, half: true, forecast_type: forecast_type?.title });
      } else if (forecast_type?.title == "Yearly Forecast $ 139.99") {
        setData({ ...data, year: true, forecast_type: forecast_type?.title });
      } else {
        setData({ ...data, forecast_type: forecast_type?.title });
      }
    } else {
      setData({ ...data, focous_area: forecast_type?.title });
    }
  }, [forecast_type, showFocus]);
  const [patnerdetails, setPartnerDetails] = React.useState({
    dob: moment().format("DD/MM/YYYY"),
    tob: moment().format("HH:mm"),
    pob: "",
  });
  const handleClick = () => {
    setOpen(true);
  };
  const permamnents = [""];

  const handleSubmit = async () => {
    if (!authorize) {
      navigate("/user_login");
      return;
    }
    try {
      dispatch(setModalVisible(true));
      const res = await hit(user.postService, "post", {
        ...data,
        patnerdetails,
        permanent: permanent ? true : false,
        amount: forecast_type?.price ?? 0,
      });
      if (!res.err) {
        dispatch(
          setToastOpen({
            open: true,
            message: "Successfully submitted!",
            type: "success",
          })
        );
        navigate("/");
      } else {
        dispatch(setToastOpen({ open: true, message: res.msg, type: "error" }));
      }
    } catch (err) {
    } finally {
      dispatch(setModalVisible(false));
    }
  };

  return (
    <ScreenContainer>
      <Card
        sx={{
          backgroundColor: "primary.shade1",
          height: "100%",
          paddingY: "1em",
          marginX: { laptop: "15%", mobile: "10%" },
        }}
      >
        <Box display="flex" flexDirection="column" alignItems="center">
          <Box
            component="img"
            src={Zodaic}
            style={{ height: "9rem", width: "9rem" }}
          />
          <Typography fontSize="1.3rem" fontWeight={500}>
            {params.title}
          </Typography>
        </Box>
        <Box
          display="flex"
          flexDirection={{ mobile: "column", laptop: "row" }}
          sx={{ width: { laptop: "80%", mobile: "90%" }, marginX: "auto" }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            name="First name"
            label="First name"
            type="text"
            id="first_name"
            value={data?.name}
            onChange={(e) => {
              setData({ ...data, name: e.target.value });
            }}
            sx={{
              "& label.Mui-focused": {
                color: "secondary.main",
              },
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: "secondary.main",
                },
              },
            }}
          />
          <TextField
            margin="normal"
            fullWidth
            name="Last name"
            label="Last name"
            type="text"
            id="last_name"
            value={data?.lname}
            onChange={(e) => {
              setData({ ...data, lname: e.target.value });
            }}
            sx={{
              marginLeft: { laptop: "1em" },
              "& label.Mui-focused": {
                color: "secondary.main",
              },
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: "secondary.main",
                },
              },
            }}
          />
          <FormControl
            margin="normal"
            fullWidth
            sx={{
              marginLeft: { mobile: "0px", laptop: "1em" },
              "& label.Mui-focused": {
                color: "secondary.main",
              },
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: "secondary.main",
                },
              },
            }}
          >
            <InputLabel id="gender_input">Gender*</InputLabel>
            <Select
              labelId="gender_input"
              id="gender_input"
              value={data?.gender}
              label="Age"
              onChange={(v) => {
                setData({ ...data, gender: v.target.value });
              }}
            >
              <MenuItem value={"Male"}>Male</MenuItem>
              <MenuItem value={"Female"}>Female</MenuItem>
              <MenuItem value={"Other"}>Other</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box
          display="flex"
          flexDirection={{ mobile: "column", laptop: "row" }}
          sx={{ width: { laptop: "80%", mobile: "90%" }, marginX: "auto" }}
        >
          <DatePicker
            label="Date of Birth*"
            value={moment(data?.dob, "DD/MM/YYYY")}
            toolbarPlaceholder={null}
            onChange={(newValue) => {
              setData({ ...data, dob: newValue.format("DD/MM/YYYY") });
            }}
            inputFormat="DD/MM/YYYY"
            renderInput={(params) => (
              <TextField
                {...params}
                margin="normal"
                fullWidth
                sx={{
                  "& label.Mui-focused": {
                    color: "secondary.main",
                  },
                  "& .MuiOutlinedInput-root": {
                    "&.Mui-focused fieldset": {
                      borderColor: "secondary.main",
                    },
                  },
                }}
              />
            )}
          />
          <TimePicker
            label="Time of Birth: *"
            value={moment(data?.tob, "HH:mm")}
            onChange={(newValue) => {
              setData({ ...data, tob: newValue.format("HH:mm") });
            }}
            ampm={false}
            ampmInClock={false}
            renderInput={(params) => (
              <TextField
                {...params}
                fullWidth
                margin="normal"
                sx={{
                  marginX: { laptop: "1em" },
                  "& label.Mui-focused": {
                    color: "secondary.main",
                  },
                  "& .MuiOutlinedInput-root": {
                    "&.Mui-focused fieldset": {
                      borderColor: "secondary.main",
                    },
                  },
                }}
              />
            )}
          />
          <TextField
            margin="normal"
            fullWidth
            name="Place of birth"
            label="Place of birth, State & Country"
            type="text"
            id="last_name"
            value={data?.pob}
            onChange={(e) => {
              setData({ ...data, pob: e.target.value });
            }}
            sx={{
              "& label.Mui-focused": {
                color: "secondary.main",
              },
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: "secondary.main",
                },
              },
            }}
          />
        </Box>
        <Box
          display="flex"
          flexDirection={{ mobile: "column", laptop: "row" }}
          sx={{ width: { laptop: "80%", mobile: "90%" }, marginX: "auto" }}
        >
          {showFocus && (
            <FormControl
              margin="normal"
              fullWidth
              sx={{
                marginRight: { mobile: "0px", laptop: "1em" },
                "& label.Mui-focused": {
                  color: "secondary.main",
                },
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: "secondary.main",
                  },
                },
              }}
            >
              <InputLabel id="gender_input">Focus area*</InputLabel>
              <Select
                labelId="gender_input"
                id="gender_input"
                value={data?.focous_area}
                onChange={(e) => {
                  setData({ ...data, focous_area: e.target.value });
                }}
              >
                <MenuItem value={"Love"}>Love</MenuItem>
                <MenuItem value={"Career"}>Career</MenuItem>
                <MenuItem value={"Health"}>Health</MenuItem>
                <MenuItem value={"Match Making"}>Match Making</MenuItem>
                <MenuItem value={"Ghost Nullifying"}>Ghost Nullifying</MenuItem>
                <MenuItem value={"Other"}>Other</MenuItem>
              </Select>
            </FormControl>
          )}

          <FormControl
            margin="normal"
            fullWidth
            sx={{
              "& label.Mui-focused": {
                color: "secondary.main",
              },
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: "secondary.main",
                },
              },
            }}
          >
            <InputLabel id="gender_input">Martial Status*</InputLabel>
            <Select
              labelId="gender_input"
              id="gender_input"
              value={data?.marital_status}
              onChange={(e) => {
                setData({ ...data, marital_status: e.target.value });
              }}
            >
              <MenuItem value={"Single"}>Single</MenuItem>
              <MenuItem value={"Married"}>Married</MenuItem>
              <MenuItem value={"In Relationship"}>In Relationship</MenuItem>
              <MenuItem value={"Divorced"}>Divorced</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box
          display="flex"
          flexDirection={{ mobile: "column", laptop: "row" }}
          sx={{ width: { laptop: "80%", mobile: "90%" }, marginX: "auto" }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            name="focus_area"
            label="Your email or Whatsapp number for your answer"
            type="text"
            id="focus_area"
            value={data?.whatsapp_no}
            onChange={(e) => {
              setData({ ...data, whatsapp_no: e.target.value });
            }}
            sx={{
              "& label.Mui-focused": {
                color: "secondary.main",
              },
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: "secondary.main",
                },
              },
            }}
          />
        </Box>
        <Box
          display="flex"
          flexDirection={{ mobile: "column", laptop: "row" }}
          sx={{ width: { laptop: "80%", mobile: "90%" }, marginX: "auto" }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            name="focus_area"
            label="Explain Problem/focus area in brief"
            type="text"
            id="focus_area"
            value={data?.description}
            onChange={(e) => {
              setData({ ...data, description: e.target.value });
            }}
            sx={{
              "& label.Mui-focused": {
                color: "secondary.main",
              },
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: "secondary.main",
                },
              },
            }}
          />
        </Box>
        {params?.title == "Match Making" && (
          <>
            <Box
              sx={{ width: { laptop: "80%", mobile: "90%" } }}
              marginTop={"1em"}
              marginX="auto"
            >
              <Typography fontWeight={500}>
                In case of Match Making (Details of the Partner)
              </Typography>
            </Box>
            <Box
              display="flex"
              flexDirection={{ mobile: "column", laptop: "row" }}
              sx={{ width: { laptop: "80%", mobile: "90%" }, marginX: "auto" }}
            >
              <DatePicker
                label="Date of Birth*"
                value={moment(patnerdetails?.dob, "DD/MM/YYYY")}
                onChange={(newValue) => {
                  setPartnerDetails({
                    ...patnerdetails,
                    dob: newValue.format("DD/MM/YYYY"),
                  });
                }}
                inputFormat="DD/MM/YYYY"
                renderInput={(params) => (
                  <TextField
                    {...params}
                    margin="normal"
                    fullWidth
                    sx={{
                      "& label.Mui-focused": {
                        color: "secondary.main",
                      },
                      "& .MuiOutlinedInput-root": {
                        "&.Mui-focused fieldset": {
                          borderColor: "secondary.main",
                        },
                      },
                    }}
                  />
                )}
              />
              <TimePicker
                label="Time of Birth: *"
                value={moment(patnerdetails?.tob, "HH:mm")}
                onChange={(newValue) => {
                  setPartnerDetails({
                    ...patnerdetails,
                    tob: newValue.format("HH:mm"),
                  });
                }}
                ampm={false}
                ampmInClock={false}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    margin="normal"
                    sx={{
                      marginX: { laptop: "1em" },
                      "& label.Mui-focused": {
                        color: "secondary.main",
                      },
                      "& .MuiOutlinedInput-root": {
                        "&.Mui-focused fieldset": {
                          borderColor: "secondary.main",
                        },
                      },
                    }}
                  />
                )}
              />
              <TextField
                margin="normal"
                fullWidth
                name="Place of birth"
                label="Place of birth, State & Country"
                type="text"
                id="last_name"
                value={patnerdetails?.pob}
                onChange={(newValue) => {
                  setPartnerDetails({
                    ...patnerdetails,
                    pob: newValue.target.value,
                  });
                }}
                sx={{
                  "& label.Mui-focused": {
                    color: "secondary.main",
                  },
                  "& .MuiOutlinedInput-root": {
                    "&.Mui-focused fieldset": {
                      borderColor: "secondary.main",
                    },
                  },
                }}
              />
            </Box>
          </>
        )}
        <Box display="flex" justifyContent="center" mt="1em">
          <Button
            onClick={() => {
              handleSubmit();
            }}
            variant="contained"
            color="secondary"
            size={"large"}
            alignSelf="center"
            sx={{ width: { laptop: "30%", mobile: "60%" }, fontSize: "1em" }}
          >
            Submit
          </Button>
        </Box>
      </Card>
    </ScreenContainer>
  );
}
