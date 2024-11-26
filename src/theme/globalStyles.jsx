import { createTheme } from '@mui/material/styles';

export const colors = {
  PRIMARY_COLOR: "#ffffff",
  SECONDARY_COLOR: "#131213",
  BACKGROUND: "#F2F8F6",
  INPUT: "#D2E8E2",
  PLBUTTON: "#D9D9D9",
  TERCIARY_COLOR: "#485154",
  WHITE: "#FFFFFF",
  BLACK: "#000000",
  PLACEHOLDER: "#616C70",
  CARDHOME: "#2F3C6B",
  TEXTBTNPRIMARY: "#dbdbda"
};

// Tema global basado en Material UI
export const theme = createTheme({
  palette: {
    primary: {
      main: colors.PRIMARY_COLOR,
    },
    secondary: {
      main: colors.SECONDARY_COLOR,
    },
    background: {
      default: colors.BACKGROUND,
    },
    text: {
      primary: colors.BLACK,
      secondary: colors.TEXTBTNPRIMARY,
      disabled: colors.PLACEHOLDER,
    },
    
  },
//   typography: {
//     fontFamily: "'Roboto', 'Arial', sans-serif",
//     h1: {
//       fontFamily: "RobotoBlack",
//     },
//     h2: {
//       fontFamily: "RobotoBold",
//     },
//     body1: {
//       fontFamily: "RobotoMedium",
//     },
//     body2: {
//       fontFamily: "RobotoRegular",
//     },
//     subtitle1: {
//       fontFamily: "RobotoThin",
//     },
//   },
});
