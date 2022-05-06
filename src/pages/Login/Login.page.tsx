import {
  Container,
  Grid,
  Paper,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import { FunctionComponent, useEffect } from "react";
import {
  FormProvider,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { LoginForm } from "./Component";
import "./login.style.scss";
import { initForm } from "./Model";
import { initCategory } from "./Model/interface";
import LOGIN_BG from "assets/Images/Login/login-scr.jpg";
import { login } from "reduxs/authentication/actions";
import { noop } from "lodash";
import { responseCode } from "constants/response";

const constants = {
  title: "ยินดีต้อนรับเข้าสู่ระบบ HRMS",
  rememberMe: "Remember Me",
  signInBtnLabel: "เข้าสู่ระบบ",
  remark: "หากเข้าสู่ระบบไม่ได้กรุณาติดต่อผู้ดูแลระบบ",
};

const Brakepoints = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
  justifyContent: "center",
  backgroundImage: `url(${LOGIN_BG})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",

  [theme.breakpoints.down("md")]: {},
  [theme.breakpoints.up("md")]: {},
  [theme.breakpoints.up("lg")]: {},
}));

const PageContainer = styled(Container)({});

const LoginPage: FunctionComponent<ILoginPageActionProps & ILoginPageProps> = ({
  login,
  authenCode,
  authenError,
  authenIsFetching,
}) => {
  const navigate = useNavigate();

  const initFormMethod = useForm<ILoginForm>({
    mode: "onSubmit",
    reValidateMode: "onChange",
    shouldUnregister: false,
  });

  const { handleSubmit } = initFormMethod;

  useEffect(() => {
    if (authenIsFetching) {
      if (authenCode === responseCode.OK) {
        navigate("/");
      } else {
        console.log("HasError", authenError);
      }
    }
  }, [authenIsFetching]);

  const onSubmit: SubmitHandler<ILoginForm> = (value) => {
    console.log("value", value);
    login(value);
  };

  const onErrors: SubmitErrorHandler<ILoginForm> = (error) => {};

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
                      <FormProvider {...initFormMethod}>
                        <form onSubmit={handleSubmit(onSubmit, onErrors)}>
                          {Object.keys(initCategory).map(
                            (cateName, cateKey) => {
                              const cateItems = initForm.filter((rowItem) =>
                                [rowItem.formCategory].includes(cateName)
                              );
                              return (
                                cateItems && (
                                  <Stack
                                    spacing={3}
                                    key={`category-${cateKey}-${cateName}`}
                                  >
                                    <LoginForm
                                      btnLabel={constants.signInBtnLabel}
                                      remark={constants.remark}
                                      contextItems={cateItems}
                                    />
                                  </Stack>
                                )
                              );
                            }
                          )}
                          {/* <LoginForm rememberWording={constants.rememberMe} /> */}
                        </form>
                      </FormProvider>
                      {/* <RenderForm /> */}
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
