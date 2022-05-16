import React from "react";
import { Button, Grid, Paper, Typography } from "@mui/material";
import {
  FormProvider,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { DynamicForm } from "components";

import { initCategory, initForm } from "./Model/interface";

const constants = {
  pageTitle: "เปลี่ยนรหัสผ่าน",
  submitBtn: "บันทึกข้อมูล",
  backBtn: "ย้อนกลับ",
};

export default (({ changePassword, authenData }) => {
  const navigate = useNavigate();

  const initFormMethod = useForm<IChangePasswordForm>({
    mode: "all",
    reValidateMode: "onChange",
    shouldUnregister: false,
  });

  const { handleSubmit } = initFormMethod;

  const onSubmit: SubmitHandler<IChangePasswordForm> = (value) => {
    try {
      const { confirmPassword, oldPassword } = value;
      changePassword({
        currentPassword: oldPassword,
        newPassword: confirmPassword,
        id: authenData.id,
      });
    } catch (error) {}
  };

  const onErrors: SubmitErrorHandler<IChangePasswordForm> = (error) => {};

  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <Typography variant="h5" children={constants.pageTitle} />
      </Grid>
      <Grid item xs={12} sm={10} md={10} lg={8} xl={6}>
        <Paper elevation={14} sx={{ p: 3 }}>
          <FormProvider {...initFormMethod}>
            <form onSubmit={handleSubmit(onSubmit, onErrors)}>
              {Object.keys(initCategory).map((cateName, cateKey) => {
                const cateItems = initForm.filter((rowItem) =>
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
                          children={initCategory[cateName].label}
                        />
                      </Grid>
                      <DynamicForm<IChangePasswordForm>
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
              })}
            </form>
          </FormProvider>
        </Paper>
      </Grid>
    </Grid>
  );
}) as React.FunctionComponent<
  IChangePasswordPageProps & IChangePasswordPageActionProps
>;
