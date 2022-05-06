import "./App.scss";
import { Dashboard, Login, Layout, Loader } from "pages";
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
    zIndex: {},
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
        <Loader />
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
