import "./App.scss";
import { Dashboard, Login, Layout } from "pages";
import { Route, Routes } from "react-router-dom";
import {
  createTheme,
  CssBaseline,
  useMediaQuery,
  ThemeProvider,
  responsiveFontSizes,
} from "@mui/material";

function App() {
  let theme = createTheme({
    palette: {
      mode: "light",
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
  });

  theme = responsiveFontSizes(theme);

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route element={<Login />} path={"/login"} />
          <Route element={<Layout />}>
            <Route element={<Dashboard />} index />
          </Route>
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
