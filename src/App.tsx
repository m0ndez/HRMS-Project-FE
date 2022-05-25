import "./App.scss";
import {
  Dashboard,
  Login,
  Layout,
  Loader,
  PageNotFound,
  EmployeeReport,
  LeaveReport,
  ManageEmployee,
  EmployeeForm,
  ManageUser,
  ChangePassword,
  TimeSheet,
  TimeSheetForm,
  Leave,
  LeaveForm,
  LeaveApproveList,
} from "pages";
import { Route, Routes } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import ProtectedRoutes from "contexts/ProtectedRoutes";
import { Toast } from "components";
import { useSelector } from "react-redux";
import { theme } from "configs/themeProvider";

function App() {
  const { permission } = useSelector(
    (state: RootReducers) => state.authentication.login.data
  );

  return (
    <>
      <ThemeProvider theme={theme("light")}>
        <CssBaseline />
        <Routes>
          <Route path={"/login"} element={<Login />} />
          <Route path="/" element={<ProtectedRoutes />}>
            <Route element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path="/user" element={<ManageUser />} />
              <Route path="/changepassword" element={<ChangePassword />} />

              <Route path="/timesheet" element={<TimeSheet />} />
              <Route path="/timesheet/create" element={<TimeSheetForm />} />
              <Route path="/timesheet/edit/:id" element={<TimeSheetForm />} />

              <Route path="/leavesheet" element={<Leave />} />
              <Route path="/leavesheet/create" element={<LeaveForm />} />
              <Route path="/leavesheet/edit/:id" element={<LeaveForm />} />

              {["admin"].includes(permission) && (
                <>
                  <Route
                    path="/report/employees"
                    element={<EmployeeReport />}
                  />
                  {/* <Route path="/report/leaves" element={<LeaveReport />} /> */}
                  <Route
                    path="/manage/employees"
                    element={<ManageEmployee />}
                  />
                  <Route
                    path="/manage/employees/create"
                    element={<EmployeeForm />}
                  />
                  <Route
                    path="/manage/employees/edit/:id"
                    element={<EmployeeForm />}
                  />

                  <Route
                    path="/manage/leave-approve"
                    element={<LeaveApproveList />}
                  />
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
