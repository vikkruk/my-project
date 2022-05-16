import { createTheme } from '@mui/material';

const baseTheme = createTheme({
  palette: {
    themeBlueColor: {
      main: '#3A3845',
    },
    themeGreyColor: {
      main: '#826F66',
    },
    themeLightColor: {
      main: '#F7CCAC',
    },
    themeDarkColor: {
      main: '#C69B7B',
    },
    primary: {
      main: '#3A3845',
      light: '#6ef4f4',
      dark: '#136666',
    },
    common: {
      white: '#fbfbfb',
      black: '#212121',
    },
    background: {
      default: '#F7CCAC',
    },
  },
  typography: {
    fontFamily: 'Montserrat',
  },
});

const theme = createTheme(baseTheme, {
  mixins: {
    paper: {
      display: 'flex',
      flexDirection: 'column',
      fontSize: '25px',
      gap: 1,
      color: baseTheme.palette.themeBlueColor.main,
      position: 'relative',
    },
    image: {
      height: 350,
      objectFit: 'cover',
      objectPosition: '30% 30%',
      borderRadius: 1,
    },
    redirectButton: {
      width: 520,
      height: 275,
      fontSize: 50,
      mb: 1,
      textAlign: 'center',
      [baseTheme.breakpoints.down('sm')]: {
        width: 300,
        fontSize: 20,
      },
    },
  },
});

export default theme;
