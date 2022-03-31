import { Container, Grid, Paper, styled, Typography } from "@mui/material";
import { useFormik } from "formik";
import { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";
import { LoginForm } from "./Component";
import "./login.style.scss";
import { scheme } from "./Model";

const constants = {
  title: "Welcome To HRMS System",
  rememberMe: "Remember Me",
};

const Brakepoints = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
  justifyContent: "center",
  // padding: theme.spacing(1),
  [theme.breakpoints.down("md")]: {
    // backgroundColor: red[500],
    // fontSize: '2 rem'
  },
  [theme.breakpoints.up("md")]: {
    // backgroundColor: blue[500],
  },
  [theme.breakpoints.up("lg")]: {
    // backgroundColor: green[500],
  },
}));

const PageContainer = styled(Container)({});

const LoginPage: FunctionComponent = () => {
  const navigate = useNavigate();

  const onSubmitFrom = (values: ILoginForm) => {
    navigate("/");
    // alert(JSON.stringify(values, null, 2));
  };

  const RenderForm = () => {
    const formik = useFormik({
      initialValues: {
        username: "",
        password: "",
        remember: false,
      },
      validationSchema: scheme,
      onSubmit: onSubmitFrom,
    });
    return <LoginForm {...formik} rememberWording={constants.rememberMe} />;
  };

  return (
    <Brakepoints>
      <PageContainer maxWidth="xs">
        <Grid container>
          <Grid item xs={12}>
            <Paper elevation={6}>
              <Grid container p={2}>
                <Grid item xs={12}>
                  <Typography align="left" variant="h5" paddingBottom={3}>
                    {constants.title}
                  </Typography>
                  <Grid container>
                    <Grid item xs={12} my={2}>
                      <RenderForm />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </PageContainer>
    </Brakepoints>
  );
};

export default LoginPage;
