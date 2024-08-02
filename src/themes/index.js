import { createTheme } from '@mui/material/styles';


const theme = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#fbb917',
      // main:"#FF8E53",
      contrastText: '#ffffff',
      mainGradient: `linear-gradient(70deg,#fbb917 20%, #ffffff 100%)`,
      cardGradient: `linear-gradient(360deg,#fde3a2 5%,#fde3a2 100% )`,
      font: "serif",
      shade1: "#fde3a2",
      shade2: "#fddc8b"
    },
    secondary: {
      main: '#1657fa',
    },
    general_black: {
      main: "#000"
    },
    info:{
      main:"#0008"
    },
    text: {
      primary: '#000000',
      secondary: '#000000',
      white: "#fff"
    },
    headear_background: {
      main: "#FFFFFF"
    }
  },
  typography: {
    "fontFamily": `"Outfit","Dancing Script","cursive","Montserrat","Roboto","Helvetica", "Arial", sans-serif`,
    "fontSize": 14,
    "fontWeightLight": 300,
    "fontWeightRegular": 400,
    "fontWeightMedium": 500
  },
  breakpoints: {
    values: {
      mobile: 0,
      tablet: 640,
      laptop: 1024,
      desktop: 1200,
    },
  },
});

export default theme