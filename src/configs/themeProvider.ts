import { createTheme, PaletteMode, responsiveFontSizes } from "@mui/material";

export const theme = (themeMode: PaletteMode = "light") =>
  responsiveFontSizes(
    createTheme({
      palette: {
        mode: themeMode,
      },
      typography: {
        fontFamily: ["Kanit", "sans-serif"].join(","),
      },
    })
  );
