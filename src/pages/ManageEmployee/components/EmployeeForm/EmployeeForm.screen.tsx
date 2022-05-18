import React from "react";
import { DynamicForm } from "components";
import { responseCode } from "constants/response";
import { noop } from "lodash";
import {
  FormProvider,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import dateUtils from "utils/date";
import { initCategory, initForm } from "../../Model/interface";
import { Button, Grid, Paper, Typography } from "@mui/material";

const constants = {
  pageTitle: "บันทึกเวลาการทำงาน",
  submitBtn: "บันทึกข้อมูล",
  backBtn: "ย้อนกลับ",
};

export default (() => {
  const [disableForm, setDisableForm] = React.useState(false);
  const navigate = useNavigate();
  const pageMode = useLocation().state as {
    mode: string;
    id: string | undefined;
  };

  const initFormMethod = useForm<IEmployeeManagementForm>({
    mode: "onSubmit",
    reValidateMode: "onChange",
    shouldUnregister: false,
  });

  const { handleSubmit, setValue } = initFormMethod;

  const onSubmit: SubmitHandler<IEmployeeManagementForm> = (value) => {
    const convertedValue: {
      [key in keyof IEmployeeManagementForm]:
        | string
        | number
        | Date
        | undefined;
    } = {
      ...value,
    };
    initForm.forEach((formItem) => {
      Object.keys(convertedValue).map((keyItem) => {
        if ((formItem.name as keyof IEmployeeManagementForm) === keyItem) {
          convertedValue[keyItem] =
            formItem.type === "date"
              ? dateUtils.formatDateToApi("date", convertedValue[keyItem]!)
              : convertedValue[keyItem];
        }
      });
    });
    console.log(convertedValue);
    pageMode.mode === "create";
    //   ? handleCreateLeavesheet(convertedValue as IRequestCreateLeavesheet)
    //   : handleUpdateLeavesheet(convertedValue as IRequestUpdateLeavesheet);
  };

  const onErrors: SubmitErrorHandler<IEmployeeManagementForm> = (error) => {};

  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <Typography variant="h5" children={constants.pageTitle} />
      </Grid>
      <Grid item xs={12} sm={10} md={10} lg={8} xl={6}>
        <Paper elevation={14} sx={{ p: 3 }}>
          <FormProvider {...initFormMethod}>
            <form onSubmit={handleSubmit(onSubmit, onErrors)}>
              {Object.keys(initCategory)
                // Filter Page Mode
                .filter((f) => {
                  if ([initCategory[f].pageMode].includes(pageMode.mode)) {
                    return f === initCategory[f].name;
                  }
                })
                .map((cateName, cateKey) => {
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
                        <DynamicForm<IEmployeeManagementForm>
                          contextItems={cateItems}
                          setDisabled={disableForm}
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
                              disabled={disableForm}
                            >
                              {constants.submitBtn}
                            </Button>
                          </Grid>
                          <Grid item>
                            <Button
                              disabled={disableForm}
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
}) as React.FunctionComponent;
