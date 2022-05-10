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
import ProtectedRoutes from "contexts/ProtectedRoutes";
import { Toast } from "components";

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
        <CssBaseline />
        <Routes>
          <Route path={"/login"} element={<Login />} />
          <Route path="/" element={<ProtectedRoutes />}>
            <Route element={<Layout />}>
              <Route index element={<Dashboard />} />
            </Route>
          </Route>
        </Routes>
      </ThemeProvider>
      <Toast />
      <Loader />
    </>
  );
}

export default App;
