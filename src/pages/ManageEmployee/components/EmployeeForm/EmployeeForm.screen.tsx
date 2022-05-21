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
  pageTitle: "สร้างพนักงาน",
  submitBtn: "บันทึกข้อมูล",
  backBtn: "ย้อนกลับ",
};

export default (({
  cancelEmployeeCreate = () => {
    noop();
  },
  employeeCreate = () => {
    noop();
  },
  employeeCreateCode = 0,
  employeeDetailCode = 0,
  employeeDetailData = {
    address: "",
    fname: "",
    id: "",
    lname: "",
    password: "",
    position: "",
    sex: 1,
    state: false,
    tel: "",
    username: "",
  },
  employeeDetailGet = () => {
    noop();
  },
  employeeDetailIsFetching = false,
  employeeUpdateCode = 0,
  clearEmployeeUpdate = () => {
    noop();
  },
  employeeUpdate = () => {
    noop();
  },
}) => {
  const [disableForm, setDisableForm] = React.useState(false);
  const navigate = useNavigate();
  const pageMode = useLocation().state as {
    mode: string;
    id: string | undefined;
  };

  // Detect Route
  React.useEffect(() => {
    handleGetEmployeeDetail();
  }, []);

  // Create Flow
  React.useEffect(() => {
    if ([responseCode.OK].includes(employeeCreateCode)) {
      navigate("/manage/employees");
    }
    return () => {
      cancelEmployeeCreate();
    };
  }, [employeeCreateCode]);

  // Get Detail Flow
  React.useEffect(() => {
    if ([employeeDetailCode].includes(responseCode.OK)) {
      onReceiveDateFromApi();
    }
  }, [employeeDetailIsFetching]);

  // Update Flow
  React.useEffect(() => {
    if ([responseCode.OK].includes(employeeUpdateCode)) {
      navigate(-1);
    }
    return () => {
      clearEmployeeUpdate();
    };
  }, [employeeUpdateCode]);

  const initFormMethod = useForm<IEmployeeManagementForm>({
    mode: "onSubmit",
    reValidateMode: "onChange",
    shouldUnregister: false,
  });

  const { handleSubmit, setValue } = initFormMethod;

  const handleGetEmployeeDetail = () => {
    if (pageMode.id) {
      employeeDetailGet(pageMode.id);
    }
  };

  const handleCreateEmployee = (value: IRequestCreateEmployee) => {
    employeeCreate(value);
  };

  const handleUpdateEmployee = (value: IResponseGetEmployeeDetail) => {
    // updateTimesheet(value);
    employeeUpdate(value);
  };

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
    pageMode.mode === "create"
      ? handleCreateEmployee(convertedValue as IRequestCreateEmployee)
      : handleUpdateEmployee(convertedValue as IResponseGetEmployeeDetail);
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
                employeeDetailData[
                  items.name as keyof IResponseGetEmployeeDetail
                ];
              const formatedValue =
                items.type === "date"
                  ? new Date(rawValue as string | number | Date)
                  : rawValue;

              setValue(
                items.name as keyof IEmployeeManagementForm,
                formatedValue as string | number | undefined
              );
            }
          });
        }
      });
    } else {
    }
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
}) as React.FunctionComponent<
  IEmployeeManagementFormComponentProps &
    IEmployeeManagementFormComponentActionProps
>;
