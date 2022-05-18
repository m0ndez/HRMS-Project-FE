import React from "react";
import { Grid, Typography, Paper, Button } from "@mui/material";
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

const constants = {
  pageTitle: "บันทึกเวลาการทำงาน",
  submitBtn: "บันทึกข้อมูล",
  backBtn: "ย้อนกลับ",
};

export default (({
  createTimesheet = () => {
    noop();
  },
  createTimesheetCode = 0,
  getDetailTimesheet = () => {
    noop();
  },
  detailTimesheetIsFetching = false,
  detailTimesheetCode = 0,
  clearCreateTimesheet = () => {
    noop();
  },
  detailTimesheetData,
  updateTimesheetCode = 0,
  clearUpdateTimesheet = () => {
    noop();
  },
  updateTimesheet = () => {
    noop();
  },
}) => {
  const navigate = useNavigate();
  const [disableForm, setDisableForm] = React.useState(false);

  // Detect Route
  React.useEffect(() => {
    handleGetTimeSheetDetail();
  }, []);

  // Create Flow
  React.useEffect(() => {
    if ([responseCode.OK].includes(createTimesheetCode)) {
      navigate(-1);
    }
    return () => {
      clearCreateTimesheet();
    };
  }, [createTimesheetCode]);

  // Update Flow
  React.useEffect(() => {
    if ([responseCode.OK].includes(updateTimesheetCode)) {
      navigate(-1);
    }
    return () => {
      clearUpdateTimesheet();
    };
  }, [updateTimesheetCode]);

  // Get Detail Flow
  React.useEffect(() => {
    if ([detailTimesheetCode].includes(responseCode.OK)) {
      onReceiveDateFromApi();
    }
  }, [detailTimesheetIsFetching]);

  const pageMode = useLocation().state as {
    mode: string;
    id: string | undefined;
  };

  const initFormMethod = useForm<ITimesheetForm>({
    mode: "onSubmit",
    reValidateMode: "onChange",
    shouldUnregister: false,
  });

  const { handleSubmit, setValue } = initFormMethod;

  const handleGetTimeSheetDetail = () => {
    if (pageMode.id) {
      getDetailTimesheet(pageMode.id);
    }
  };

  const handleCreateTimesheet = (value: IRequestCreateTimesheet) => {
    createTimesheet(value);
  };

  const handleUpdateTimesheet = (value: IRequestUpdateTimesheet) => {
    updateTimesheet(value);
  };

  const onSubmit: SubmitHandler<ITimesheetForm> = (value) => {
    const convertedValue: {
      [key in keyof ITimesheetForm]: string | number | Date;
    } = {
      ...value,
    };
    initForm.forEach((formItem) => {
      Object.keys(convertedValue).map((keyItem) => {
        if ((formItem.name as keyof ITimesheetForm) === keyItem) {
          convertedValue[keyItem] =
            formItem.type === "date"
              ? dateUtils.formatDateToApi("date", convertedValue[keyItem])
              : convertedValue[keyItem];
        }
      });
    });

    pageMode.mode === "create"
      ? handleCreateTimesheet(convertedValue as IRequestCreateTimesheet)
      : handleUpdateTimesheet(convertedValue as IRequestUpdateTimesheet);
  };

  const onReceiveDateFromApi = () => {
    // Generate Data if Multiple Mode
    if (["edit"].includes(pageMode.mode)) {
      const cateKey = Object.keys(initCategory);
      cateKey.forEach((cateItem) => {
        if ([initCategory[cateItem].pageMode].includes(pageMode.mode)) {
          initForm.forEach((items) => {
            if ([items.formCategory].includes(cateItem)) {
              const rawValue =
                detailTimesheetData[items.name as keyof IResponseGetTimesheet];
              const formatedValue =
                items.type === "date"
                  ? new Date(rawValue as string | number | Date)
                  : rawValue;

              setValue(
                items.name as keyof ITimesheetForm,
                formatedValue as string | number | Date
              );
            }
          });
        }
      });
    } else {
    }
  };

  const onErrors: SubmitErrorHandler<ITimesheetForm> = (error) => {};

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
                        <DynamicForm<ITimesheetForm>
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
  ITimesheetCreatePageProps & ITimesheetCreatePageActionProps
>;
