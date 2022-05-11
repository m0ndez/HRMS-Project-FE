import "./App.scss";
import {
  Dashboard,
  Login,
  Layout,
  Loader,
  PageNotFound,
  EmployeeReport,
} from "pages";
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
import { useSelector } from "react-redux";

function App() {
  const { permission } = useSelector(
    (state: RootReducers) => state.authentication.login.data
  );

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
          <Route path={"/login"} element={<Login />} />
          <Route path="/" element={<ProtectedRoutes />}>
            <Route element={<Layout />}>
              <Route index element={<Dashboard />} />
              {["admin"].includes(permission) && (
                <>
                  <Route path="/report/employee" element={<EmployeeReport />} />
                </>
              )}
            </Route>
          </Route>
          <Route path={"*"} element={<PageNotFound />} />
        </Routes>
      </ThemeProvider>
      <Toast />
      <Loader />
    </>
  );
}

export default App;
