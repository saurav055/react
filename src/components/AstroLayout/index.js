import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { useLocation, useNavigate } from 'react-router';
import { Outlet } from 'react-router-dom';
import { Chat, Dashboard, DashboardCustomize } from '@mui/icons-material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ForumIcon from '@mui/icons-material/Forum';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import ReceiptIcon from '@mui/icons-material/Receipt';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from 'redux_store/features/Auth';
import { collection, setDoc, doc, query, onSnapshot, where, orderBy } from "firebase/firestore";
import { db } from '../../firebase_config'
import useSound from 'use-sound';
import soundp from '../../assets/iphone_sound.mp3'
import moment from 'moment';
import { useState } from 'react';
import { useEffect } from 'react';
const drawerWidth = 240;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(9)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

const useAudio = url => {
    const [audio] = useState(new Audio(url));
    const [playing, setPlaying] = useState(false);

    const toggle = () => setPlaying(!playing);

    useEffect(() => {
        playing ? audio.play() : audio.pause();
    },
        [playing]
    );

    useEffect(() => {
        audio.addEventListener('ended', () => setPlaying(false));
        return () => {
            audio.removeEventListener('ended', () => setPlaying(false));
        };
    }, []);

    return [playing, toggle];
};


export default function AstrologerDashboard() {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [current, setCurrent] = React.useState()
    const [play, { stop }] = useSound(soundp)
    let location = useLocation();
    const navigate = useNavigate()
    let dispatch = useDispatch()
    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };
    const user = useSelector(state => state.auth)?.user
    const [shouldPlay, setShouldPlay] = React.useState(false)

    // useEffect(()=>{
    //    play()
    // },[])
    React.useEffect(() => {
        let un = onSnapshot(query(collection(db, "chats"), where("user_ids", "array-contains", String(user?._id)), orderBy("createdAt", "asc")), (snapshot) => {
            let messagesC = [];
            snapshot.forEach((doc) => {
                messagesC.push(doc.data());
                let data = doc.data()
                if (data?.lastMessage) {
                    if (data?.lastMessage?.user != user?._id) {
                        let diff = (moment.now() - data?.lastMessage?.createdAt) / 1000
                        if (diff < 6) {
                            // alert("New message arrived please look into chat section")
                            play()
                        }
                    }
                }
            })
            console.log("MEssaes", messagesC)
            setShouldPlay(true)

        },
            (error) => {
                // stop()
                console.log("Error", error)
            })
        return () => {
            // stop()
            un()
        }
    }, [play])
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" open={open}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{
                            marginRight: '36px',
                            ...(open && { display: 'none' }),
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        Glisten Astrology
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open}>
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    {['Dashboard', 'Chat', 'Profile', "Enquries", 'Bank Detail', 'Transaction', "Message Broadcast"].map((text, index) => (
                        <ListItem onClick={() => {
                            if (index == 0) {
                                navigate('/astrologer')

                            }
                            else if (index == 1) {
                                navigate('/astrologer/chat_list')
                            }
                            else if (index == 2) {
                                navigate('/astrologer/profile')
                            } else if (index == 3) {
                                navigate('/astrologer/services')

                            }
                            else if (index == 4) {
                                navigate('/astrologer/bank')
                            }
                            else if (index == 5) {
                                navigate('/astrologer/transaction')
                            } else if (index == 6) {
                                navigate('/astrologer/broadcast')
                            }
                        }} button key={text}>
                            <ListItemIcon>
                                {index == 0 && <Dashboard />}
                                {index == 1 && <Chat />}
                                {index == 2 && <AccountBoxIcon />}
                                {index == 3 && <QueryBuilderIcon />}
                                {index == 4 && <AccountBalanceIcon />}
                                {index == 5 && <ReceiptIcon />}
                                {index == 6 && <ReceiptIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <List>
                    {['Logout'].map((text, index) => (
                        <ListItem
                            onClick={() => {
                                dispatch(logout())
                                navigate('/', { replace: true })
                            }}
                            button key={text}>
                            <ListItemIcon>
                                {<LogoutIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 0, height: '50%', overflow: 'hidden' }}>
                <DrawerHeader />
                <Box>
                    <Outlet />

                </Box>
            </Box>
        </Box>
    );
}
