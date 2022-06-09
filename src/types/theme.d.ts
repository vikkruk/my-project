import '@mui/material/styles';

// declare module '@mui/material/styles/createPalette' {
//   interface Palette {
//     themeBlueColor: PaletteColor,
//     themeGreyColor: PaletteColor,
//     themeLightColor: PaletteColor,
//     themeDarkColor: PaletteColor,
//   }

//   interface PaletteOptions {
//     themeBlueColor: PaletteColorOptions,
//     themeGreyColor: PaletteColorOptions,
//     themeLightColor: PaletteColorOptions,
//     themeDarkColor: PaletteColorOptions,
//   }
// }

// declare module '@mui/material/Button' {
//   interface ButtonPropsColorOverrides {
//     themeBlueColor: true,
//     themeGreyColor: true,
//     themeLightColor: true,
//     themeDarkColor: true,
//   }
// }

// declare module '@mui/material/CircularProgress' {
//   interface CircularProgressPropsColorOverrides {
//     themeBlueColor: true,
//     themeGreyColor: true,
//     themeLightColor: true,
//     themeDarkColor: true,
//   }
// }

// declare module '@mui/material/SvgIcon' {
//   interface SvgIconPropsColorOverrides {
//     themeBlueColor: true,
//     themeGreyColor: true,
//     themeLightColor: true,
//     themeDarkColor: true,
//   }
// }

declare module '@mui/material/styles/createMixins' {
  interface Mixins {
    paper: CSSProperties,
    image: CSSProperties,
    redirectButton: CSSProperties,
  }
}
