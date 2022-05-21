import { Dispatch } from "redux";
import {
  employeeCreateAction,
  employeeGetAction,
  employeeGetDetailAction,
  employeeUpdateAction,
} from "./actionCreators";
import { loaderAction } from "reduxs/loader/actionCreators";
import { toastAction } from "reduxs/toast/actionCreator";
import cryptoJs from "crypto-js";
import {
  createEmployeeService,
  getEmployeeService,
  getEmployeeDetailService,
  updateEmployeeService,
} from "./services";

const employeeCreate =
  (body: IRequestCreateEmployee) => async (dispatch: Dispatch) => {
    const prepareData: IRequestCreateEmployee = {
      ...body,
      password: cryptoJs.AES.encrypt(
        body.password,
        import.meta.env.VITE_SECRET_KEY
      ).toString(),
    };
    dispatch(loaderAction(true));
    dispatch(employeeCreateAction.request({}));
    await createEmployeeService(prepareData)
      .then((response) => {
        const { data } = response;
        dispatch(employeeCreateAction.success(data));
        dispatch(
          toastAction({
            open: true,
            toastType: "success",
            toastMessage: data.message || data.devMessage,
            toastDuration: 1500,
          })
        );
        dispatch(loaderAction(false));
      })
      .catch((error: IResponse<null>) => {
        dispatch(loaderAction(false));
        dispatch(employeeCreateAction.failure(error));
        dispatch(
          toastAction({
            open: true,
            toastType: "error",
            toastMessage: error.message || error.devMessage,
            toastDuration: 3000,
          })
        );
      })
      .finally(() => dispatch(loaderAction(false)));
  };

const employeeGet = () => async (dispatch: Dispatch) => {
  dispatch(loaderAction(true));
  dispatch(employeeGetAction.request({}));
  await getEmployeeService()
    .then((response) => {
      const { data } = response;
      dispatch(employeeGetAction.success(data));
      dispatch(loaderAction(false));
    })
    .catch((error: IResponse<null>) => {
      dispatch(employeeGetAction.failure(error));
      dispatch(loaderAction(false));
      dispatch(
        toastAction({
          open: true,
          toastType: "error",
          toastMessage: error.message || error.devMessage,
          toastDuration: 3000,
        })
      );
    })
    .finally(() => dispatch(loaderAction(false)));
};

const employeeDetailGet = (id: string) => async (dispatch: Dispatch) => {
  dispatch(loaderAction(true));
  dispatch(employeeGetDetailAction.request({}));
  await getEmployeeDetailService(id)
    .then((response) => {
      const { data } = response;
      dispatch(employeeGetDetailAction.success(data));
      dispatch(loaderAction(false));
    })
    .catch((error: IResponse<null>) => {
      dispatch(
        toastAction({
          open: true,
          toastType: "error",
          toastMessage: error.message || error.devMessage,
          toastDuration: 3000,
        })
      );
      dispatch(employeeGetDetailAction.failure(error));
      dispatch(loaderAction(false));
    })
    .finally(() => dispatch(loaderAction(false)));
};

const employeeUpdate =
  (body: IResponseGetEmployeeDetail) => async (dispatch: Dispatch) => {
    const prepareData: IResponseGetEmployeeDetail = {
      ...body,
      password: cryptoJs.AES.encrypt(
        body.password,
        import.meta.env.VITE_SECRET_KEY
      ).toString(),
    };

    dispatch(employeeUpdateAction.request({}));
    dispatch(loaderAction(true));
    await updateEmployeeService(prepareData)
      .then((response) => {
        const { data } = response;
        dispatch(loaderAction(false));
        dispatch(employeeUpdateAction.success(data));
        dispatch(
          toastAction({
            open: true,
            toastType: "success",
            toastMessage: data.message,
            toastDuration: 1500,
          })
        );
      })
      .catch((error: IResponse<null>) => {
        dispatch(employeeUpdateAction.failure(error));
        dispatch(
          toastAction({
            open: true,
            toastType: "error",
            toastMessage: error.message || error.devMessage,
            toastDuration: 3000,
          })
        );
        dispatch(loaderAction(false));
      })
      .finally(() => {
        dispatch(loaderAction(false));
      });
  };

const clearEmployeeUpdate = () => async (dispatch: Dispatch) =>
  dispatch(employeeUpdateAction.cancel({}));

const cancelEmployeeCreate = () => async (dispatch: Dispatch) =>
  dispatch(employeeCreateAction.cancel({}));

export {
  employeeCreate,
  cancelEmployeeCreate,
  employeeGet,
  employeeDetailGet,
  employeeUpdate,
  clearEmployeeUpdate,
};
