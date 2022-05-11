import {
  Container,
  Grid,
  Paper,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import { FunctionComponent, useEffect, useState } from "react";
import {
  FormProvider,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { LoginForm } from "./Component";
import { initForm } from "./Model";
import { initCategory } from "./Model/interface";
import LOGIN_BG from "assets/Images/Login/login-scr.jpg";
import { noop } from "lodash";
import { responseCode } from "constants/response";
import "./login.style.scss";

const constants = {
  title: "ยินดีต้อนรับเข้าสู่ระบบ HRMS",
  signInBtnLabel: "เข้าสู่ระบบ",
  remark: "หากเข้าสู่ระบบไม่ได้กรุณาติดต่อผู้ดูแลระบบ",
};

const Brakepoints = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
  backgroundImage: `url(${LOGIN_BG})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",

  [theme.breakpoints.down("md")]: {},
  [theme.breakpoints.up("md")]: {},
  [theme.breakpoints.up("lg")]: {},
}));

const PageContainer = styled(Container)({
  flexGrow: 1,
  display: "flex",
});

const LoginPage: FunctionComponent<ILoginPageActionProps & ILoginPageProps> = ({
  login,
  authenCode,
  authenIsFetching,
  authenError,
  openToast,
}) => {
  const navigate = useNavigate();

  const initFormMethod = useForm<ILoginForm>({
    mode: "onSubmit",
    reValidateMode: "onChange",
    shouldUnregister: false,
  });

  const { handleSubmit } = initFormMethod;

  useEffect(() => {
    if ([authenCode].includes(responseCode.OK)) {
      openToast({ open: false });
      navigate("/");
    } else if (![0].includes(authenCode)) {
      openToast({
        open: true,
        toastType: "error",
        toastMessage: authenError,
      });
    }
  }, [authenIsFetching]);

  const onSubmit: SubmitHandler<ILoginForm> = (value) => {
    login(value);
  };

  const onErrors: SubmitErrorHandler<ILoginForm> = (error) => {};

  return (
    <Brakepoints>
      <PageContainer maxWidth="xs">
        <Grid container sx={{ alignItems: "center" }}>
          <Grid item xs={12}>
            <Paper elevation={24}>
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
                        </form>
                      </FormProvider>
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

LoginPage.defaultProps = {
  authenCode: 0,
  authenError: "",
  authenIsFetching: false,
  login: () => {
    noop();
  },
  openToast: () => {
    noop();
  },
  setLoading: () => {
    noop();
  },
};

export default LoginPage;
