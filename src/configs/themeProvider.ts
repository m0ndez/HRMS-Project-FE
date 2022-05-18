import { createTheme, PaletteMode, responsiveFontSizes } from "@mui/material";

export const theme = (themeMode: PaletteMode = "light") =>
  responsiveFontSizes(
    createTheme({
      palette: {
        mode: themeMode,
      },
      typography: {
        fontFamily: [
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "Roboto",
          "Kanit",
          '"Helvetica Neue"',
          "Arial",
          "sans-serif",
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
        ].join(","),
      },
    })
  );
