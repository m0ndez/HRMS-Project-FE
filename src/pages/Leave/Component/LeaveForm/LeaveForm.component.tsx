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

export default (({
  clearCreateLeavesheet = () => {
    noop();
  },
  createLeavesheet = () => {
    noop();
  },
  createLeavesheetData = {
    leaveId: "",
  },
  createLeavesheetCode = 0,
  createLeavesheetError = "",
  createLeavesheetIsFetching = false,
}) => {
  const [disableForm, setDisableForm] = React.useState(false);
  const navigate = useNavigate();
  const pageMode = useLocation().state as {
    mode: string;
    id: string | undefined;
  };

  // Create Flow
  React.useEffect(() => {
    if ([responseCode.OK].includes(createLeavesheetCode)) {
      navigate(-1);
    }
    return () => {
      clearCreateLeavesheet();
    };
  }, [createLeavesheetCode]);

  const initFormMethod = useForm<ILeaveForm>({
    mode: "onSubmit",
    reValidateMode: "onChange",
    shouldUnregister: false,
  });

  const { handleSubmit, setValue } = initFormMethod;

  const handleCreateLeavesheet = (value: IRequestCreateLeavesheet) => {
    createLeavesheet(value);
  };

  const handleUpdateLeavesheet = (value: IRequestUpdateLeavesheet) => {
    // updateTimesheet(value);
  };

  const onSubmit: SubmitHandler<ILeaveForm> = (value) => {
    const convertedValue: {
      [key in keyof ILeaveForm]: string | number | Date;
    } = {
      ...value,
    };
    initForm.forEach((formItem) => {
      Object.keys(convertedValue).map((keyItem) => {
        if ((formItem.name as keyof ILeaveForm) === keyItem) {
          convertedValue[keyItem] =
            formItem.type === "date"
              ? dateUtils.formatDateToApi("date", convertedValue[keyItem])
              : convertedValue[keyItem];
        }
      });
    });
    console.log(convertedValue);
    pageMode.mode === "create"
      ? handleCreateLeavesheet(convertedValue as IRequestCreateLeavesheet)
      : handleUpdateLeavesheet(convertedValue as IRequestUpdateLeavesheet);
  };

  const onErrors: SubmitErrorHandler<ILeaveForm> = (error) => {};

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
                        <DynamicForm<ILeaveForm>
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
}) as React.FunctionComponent<
  ILeaveFormComponentProps & ILeaveFormComponentActionProps
>;
