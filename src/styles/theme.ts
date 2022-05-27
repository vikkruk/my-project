import { createTheme, PaletteColor } from '@mui/material';

const defaultTheme = createTheme();

const createColor = (color: string): PaletteColor => defaultTheme.palette.augmentColor({ color: { main: color } });

const baseTheme = createTheme({
  palette: {
    primary: createColor('#3A3845'),
    secondary: createColor('#F7CCAC'),
    info: createColor('#826F66'),
    common: {
      white: '#fbfbfb',
      black: '#C69B7B',
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
      color: baseTheme.palette.primary,
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
