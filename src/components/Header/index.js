import * as React from 'react';
import PropTypes from 'prop-types';
import { Menu, MenuItem, Avatar, Divider, CssBaseline, useTheme, useMediaQuery, Button, Box, Typography, Slide, useScrollTrigger, AppBar } from '@mui/material'

import { menus } from './data';
import { LOGO } from 'assets'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router';
import { useSelector,useDispatch } from 'react-redux'
import {setAuthorize} from 'redux_store/actions'
import { file_url, image_url } from 'service/endpoints';
import { logout } from 'redux_store/features/Auth';
function HideOnScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default function Header(props) {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorEl1, setAnchorEl1] = React.useState(null);
  const auth = useSelector(state => state.auth)
  const open = Boolean(anchorEl);
  const open1 = Boolean(anchorEl1)
  const dispatch=useDispatch()
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClick1 = (event) => {
    setAnchorEl1(event.currentTarget);
  };
  const handleClose1 = () => {
    setAnchorEl1(null);
  };
  return (
    <React.Fragment>
      <CssBaseline />
      {/* <AppBar sx={{ color: "text.primary" }}> */}
      <Box sx={[(theme) => ({
        backgroundImage: `linear-gradient(90deg,${theme.palette.primary.main} 10%, #ffffff 100%)`
      })]} py={3} px={4} boxShadow={1} >
        <Box display="flex" flexDirection="row" justifyContent="space-between" alignItems="center">
          <Box display="flex" flexDirection="column" alignItems="center">
            <Box
              onClick={() => navigate("/", { replace: true })}
              component="img"
              src={LOGO}
              sx={{
                display: { mobile: "none", tablet: "inline-block" },
                objectFit: "contain",
                height: "auto",
                borderRadius: '50%',
                width: { laptop: "120px", mobile: "130px" },
                '&:hover': {
                  cursor: "pointer"
                }
              }}
              alt="Logo"
            />
            <Typography textAlign="center" fontWeight={500} fontSize={"1.9rem"}><span style={{ fontWeight: 500 }}>G</span>listen <span style={{ fontWeight: 500 }}>A</span>strology</Typography>
            <Typography fontWeight={500} fontSize={{ mobile: "0.8em", laptop: "1em" }} textAlign="center">We  @Glistenastrology.com  destined <br />
              <Typography fontSize={{ mobile: "0.8em", laptop: "1em" }} fontWeight={500}><i>“In the pursuit of future Excellence”</i></Typography></Typography>
          </Box>
          <Box display={"flex"} flexDirection={"column"}>
            <Typography display={{ mobile: "none", tablet: "inline-block" }} fontFamily="Dancing Script" fontSize={{ mobile: "1.5em", tablet: "1.8em", laptop: "3.5em" }}><i>Services @Glisten Astrology.com</i></Typography>
            <Typography textAlign={"center"} display={{ mobile: "none", tablet: "inline-block" }} color="white" style={{backgroundColor:"red"}}  fontSize={{ mobile: "1em", tablet: "1.1em", laptop: "1.1em" }}><i>{"\nHow to reach us > Log In > Transfer Money to Wallet > Fixed Inquiry/Online Chat"}</i></Typography>
          </Box>
          {!auth.authorize ? <Box height="10vh" display="flex" alignItems="center">
            <Button onClick={handleClick} variant="contained" color="secondary" size={"large"} sx={{ fontSize: "0.9em" }} >Login</Button>
          </Box>
            : <Box height="10vh" display="flex" alignItems="center">
              <Avatar 
              src={image_url+auth?.user?.profile_pic}
              onClick={handleClick1} 
              sx={{
                height:"3vw",
                width:"3vw",
                transitionProperty:"all",
                transitionTimingFunction:"ease-in-out",
                "&:hover": {
                  cursor: "pointer",
                  transform:"scale(1.1)"
                }
              }} />
            </Box>}
        </Box>
        <Box display="flex" flexDirection="row" flexWrap="wrap" justifyContent="space-between" mt={2}>
          {menus.map(menu => <HoveredTypoWithDrop item={menu} />)}
        </Box>
      </Box>
      {/* </AppBar> */}
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
          onMouseLeave: handleClose,
          sx: [(theme) => ({
            backgroundImage: `linear-gradient(90deg,${theme.palette.primary.main} 10%, #ffffff 100%)`,
          })]
        }}
      >
        <MenuItem sx={{
          fontSize: { mobile: "0.6em", laptop: "0.7em" }, fontWeight: 300, transition: "all .2s ease-in-out", "&:hover": {
            transform: "scale(1.02)"
          }
        }} onClick={() => {
          navigate('/user_login', { replace: true })
          handleClose()
        }}>Login as Customer</MenuItem>
        <MenuItem sx={{
          fontSize: { mobile: "0.6em", laptop: "0.7em" }, fontWeight: 300, transition: "all .2s ease-in-out", "&:hover": {
            transform: "scale(1.02)"
          }
        }} onClick={() => {
          navigate('/login', { replace: true })
          handleClose()
        }}>Login as Astrologer</MenuItem>
      </Menu>
      <Menu
        anchorEl={anchorEl1}
        open={open1}
        onClose={handleClose1}
        onClick={handleClose1}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
          onMouseLeave: handleClose,
          sx: [(theme) => ({
            backgroundImage: `linear-gradient(90deg,${theme.palette.primary.main} 10%, #ffffff 100%)`,
          })]
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Box onClick={() => {
          navigate("/user_profile", { replace: true })
        }} minWidth="20em" display="flex" flexDirection="column" alignItems="center" sx={{
          "&:hover": {
            cursor: "pointer"
          }
        }}>
           <Avatar 
              src={image_url+auth?.user?.profile_pic}
              sx={{
                height:"2.5em",
                width:"2.5em",
              }} />
          {/* <AccountCircleIcon fontSize={"large"} sx={{ fontSize: "2.5em" }} /> */}
          <Typography>{auth?.user?.user_name}</Typography>
          <Typography>{auth?.user?.email}</Typography>
        </Box>
        <Divider />
        <MenuItem
          onClick={() => {
            navigate("/notifications", { replace: true })
          }}
          sx={{
            "&:hover": {
              backgroundColor: "red",
              color: "white"
            }
          }}>
          Notification
        </MenuItem>
        <MenuItem
          onClick={() => {
            navigate("/transactions", { replace: true })
          }}
          sx={{
            "&:hover": {
              backgroundColor: "red",
              color: "white"
            }
          }}>Transaction (Wallet)
        </MenuItem>
        {/* <MenuItem
          onClick={() => {
            navigate("/order_history", { replace: true })
          }}
          sx={{
            "&:hover": {
              backgroundColor: "red",
              color: "white"
            }
          }}>
          Order History
        </MenuItem> */}

        {/* <MenuItem sx={{
          "&:hover":{
           backgroundColor: "red",
           color: "white"
          }
        }}>
        Customer Support
        </MenuItem> */}
        <MenuItem
        onClick={() => {
          navigate("/", { replace: true })
          dispatch(logout())
        }}
        sx={{
          "&:hover": {
            backgroundColor: "red",
            color: "white"
          }
        }} >
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}

const HoveredTypoWithDrop = ({ item }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up("laptop"))
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const navigate = useNavigate();

  const handleClose = () => {
    setAnchorEl(null);
  };

  return <React.Fragment
  >
    <Typography
      onClick={item.type == 1 ? (event) => handleClick(event) : 
      (event)=>navigate(item.link,{replace:true})
      }
      onMouseOver={matches ? handleClick : null}
      id="basic-button"
      marginLeft={1}
      aria-controls="basic-menu"
      aria-haspopup="true"
      aria-expanded={open ? 'true' : undefined}
      sx={[{
        fontSize: { mobile: "1em", laptop: "1.2em" },
        fontWeight: 500
      }, (theme) => ({
        '&:hover': {
          cursor: "pointer"
        }
      })]}
    >
      {item.title}
    </Typography>
    {(item.type == 1 || item.type == 2) && <Menu
      id="basic-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      PaperProps={{
        elevation: 0,
        sx: {
          backgroundColor: "transparent",
          paddingBottom: "0px !important"
        }
      }}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      MenuListProps={{
        'aria-labelledby': 'basic-button',
        onMouseLeave: handleClose,
        sx: {
          paddingTop: "1.8em",
        }
      }}
    >
      <Box

        sx={[(theme) => ({
          backgroundImage: `linear-gradient(90deg,${theme.palette.primary.main} 10%, #ffffff 100%)`,
          boxShadow: `3px 1px 3px ${theme.palette.secondary.dark}`
        })]}
      >
        {item.list.map(submenu => (<MenuItem sx={{
          fontSize: { mobile: "0.8em", laptop: "1em" }, fontWeight: 300, transition: "all .2s ease-in-out", "&:hover": {
            transform: "scale(1.02)",
            backgroundColor: "red",
            color: "white"
          }
        }} onClick={() => {
          if (item.type == 2) {
            navigate("/astrolger_list")
          } else {
            navigate("/fixed_enquiry/" + submenu?.title,{state:{permanent:item.permanent,showFocus:item?.showFocus,forecast_type:submenu}})

          }
          handleClose()
        }
        }>{submenu?.title}</MenuItem>))}
      </Box>
    </Menu>}
  </React.Fragment>
}


const WhenOnScrollComponent = () => {
  return (
    <AppBar position="sticky" sx={{ color: "text.primary" }}>
      <Box sx={[(theme) => ({
        backgroundImage: `linear-gradient(90deg,${theme.palette.primary.main} 10%, #ffffff 100%)`
      })]} py={3} px={4} >

        <Box display="flex" flexDirection="row" flexWrap="wrap" justifyContent="space-between" mt={2}>
          {menus.map(menu => <HoveredTypoWithDrop item={menu} />)}
        </Box>
      </Box>
    </AppBar>
  )
}