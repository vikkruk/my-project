import '@mui/material/styles';

declare module '@mui/material/styles/createMixins' {
  interface Mixins {
    paper: CSSProperties,
    image: CSSProperties,
    redirectButton: CSSProperties,
  }
}
