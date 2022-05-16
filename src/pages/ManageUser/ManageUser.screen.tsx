import * as React from "react";
import { Button, Grid, Paper, Typography } from "@mui/material";
import {
  initManageUserForm,
  initManageAdminForm,
  initManageUserFormCategory,
} from "./Model/interface";
import {
  FormProvider,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { DynamicForm } from "components";
import { noop } from "lodash";

const constants = {
  pageTitle: "ข้อมูลผู้ใช้",
  submitBtn: "บันทึกข้อมูล",
  backBtn: "ย้อนกลับ",
  editBtn: "แก้ไขข้อมูล",
};

export default (({
  authenData,
  updateUser = () => {
    noop();
  },
}) => {
  const navigate = useNavigate();

  const initFormMethod = useForm<IManageUserForm>({
    mode: "onSubmit",
    reValidateMode: "onChange",
    shouldUnregister: false,
  });

  const { handleSubmit } = initFormMethod;

  const onSubmit: SubmitHandler<IManageUserForm> = (value) => {
    console.log(value);
    updateUser({
      ...value,
      id: authenData.id,
      permission: authenData.permission,
    });
  };

  const onErrors: SubmitErrorHandler<IManageUserForm> = (error) => {};

  const onReceiveDateFromApi = () => {
    if (["admin"].includes(authenData.permission)) {
      initManageAdminForm.forEach((items) => {
        const objKey = items.name as keyof IResponseAuthentication;
        items.value = authenData[objKey] as string | number | boolean;
      });
      return initManageAdminForm;
    } else {
      initManageUserForm.forEach((items) => {
        const objKey = items.name as keyof IResponseAuthentication;
        items.value = authenData[objKey] as string | number | boolean;
      });
      return initManageUserForm;
    }
  };

  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <Typography variant="h5" children={constants.pageTitle} />
      </Grid>
      <Grid item xs={12} sm={10} md={10} lg={8} xl={6}>
        <Paper elevation={14} sx={{ p: 3 }}>
          <FormProvider {...initFormMethod}>
            <form onSubmit={handleSubmit(onSubmit, onErrors)}>
              {Object.keys(initManageUserFormCategory).map(
                (cateName, cateKey) => {
                  const cateItems = onReceiveDateFromApi().filter((rowItem) =>
                    [rowItem.formCategory].includes(cateName)
                  );
                  return (
                    cateName && (
                      <Grid
                        container
                        key={`category-${cateKey}-${cateName}`}
                        spacing={3}
                        direction={"row"}
                        justifyContent={"flex-end"}
                      >
                        <Grid item xs={12}>
                          <Typography
                            variant="body1"
                            children={
                              initManageUserFormCategory[cateName].label
                            }
                          />
                        </Grid>
                        <DynamicForm<IManageUserForm>
                          contextItems={cateItems}
                        />

                        <Grid
                          container
                          item
                          xs={12}
                          spacing={2}
                          direction={"row"}
                          justifyContent={"flex-end"}
                        >
                          <Grid item>
                            <Button
                              variant="contained"
                              color={"success"}
                              type={"submit"}
                            >
                              {constants.submitBtn}
                            </Button>
                          </Grid>
                          <Grid item>
                            <Button
                              variant="contained"
                              color={"secondary"}
                              onClick={() => navigate(-1)}
                            >
                              {constants.backBtn}
                            </Button>
                          </Grid>
                        </Grid>
                      </Grid>
                    )
                  );
                }
              )}
            </form>
          </FormProvider>
        </Paper>
      </Grid>
    </Grid>
  );
}) as React.FunctionComponent<IManageUserActionProps & IManageUserPageProps>;
