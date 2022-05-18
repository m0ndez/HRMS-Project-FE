import { Dispatch } from "redux";
import {
  createTimesheetAction,
  getTimesheetAction,
  deleteTimesheetAction,
  getTimesheetDetailAction,
  updateTimesheetAction,
} from "./actionCreators";
import {
  createTimesheetService,
  fetchTimesheetService,
  deleteTimesheetService,
  getTimesheetDetailService,
  updateTimesheetService,
} from "./services";
import { toastAction } from "reduxs/toast/actionCreator";
import { loaderAction } from "reduxs/loader/actionCreators";

const createTimesheet =
  (body: IRequestCreateTimesheet) => async (dispatch: Dispatch) => {
    dispatch(loaderAction(true));
    dispatch(createTimesheetAction.request({}));
    await createTimesheetService(body)
      .then((response) => {
        const { data } = response;
        dispatch(createTimesheetAction.success(data));
        dispatch(
          toastAction({
            open: true,
            toastType: "success",
            toastMessage: data.message || data.devMessage,
            toastDuration: 3000,
          })
        );
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
        dispatch(loaderAction(false));
        dispatch(createTimesheetAction.failure(error));
      })
      .finally(() => {
        dispatch(loaderAction(false));
      });
  };

const getAllTimesheet = (params?: boolean) => async (dispatch: Dispatch) => {
  dispatch(loaderAction(true));
  dispatch(getTimesheetAction.request({}));
  await fetchTimesheetService(params)
    .then((response) => {
      const { data } = response;
      dispatch(getTimesheetAction.success(data));
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
      dispatch(getTimesheetAction.failure(error));
      dispatch(loaderAction(false));
    })
    .finally(() => dispatch(loaderAction(false)));
};

const getDetailTimesheet = (id: string) => async (dispatch: Dispatch) => {
  dispatch(loaderAction(true));
  dispatch(getTimesheetDetailAction.request({}));
  await getTimesheetDetailService(id)
    .then((response) => {
      const { data } = response;
      dispatch(getTimesheetDetailAction.success(data));
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
      dispatch(getTimesheetDetailAction.failure(error));
      dispatch(loaderAction(false));
    })
    .finally(() => dispatch(loaderAction(false)));
};

const deleteTimesheet = (id: string) => async (dispatch: Dispatch) => {
  dispatch(deleteTimesheetAction.request({}));
  dispatch(loaderAction(true));
  await deleteTimesheetService(id)
    .then((response) => {
      const { data } = response;
      dispatch(loaderAction(false));
      dispatch(deleteTimesheetAction.success(data));
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
      dispatch(deleteTimesheetAction.failure(error));
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

const updateTimesheet =
  (body: IRequestUpdateTimesheet) => async (dispatch: Dispatch) => {
    dispatch(updateTimesheetAction.request({}));
    dispatch(loaderAction(true));
    await updateTimesheetService(body)
      .then((response) => {
        const { data } = response;
        dispatch(loaderAction(false));
        dispatch(updateTimesheetAction.success(data));
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
        dispatch(updateTimesheetAction.failure(error));
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

const clearCreateTimesheet = () => async (dispatch: Dispatch) =>
  dispatch(createTimesheetAction.cancel({}));

const clearDeleteTimesheet = () => (dispatch: Dispatch) =>
  dispatch(deleteTimesheetAction.cancel({}));

const clearUpdateTimesheet = () => (dispatch: Dispatch) =>
  dispatch(updateTimesheetAction.cancel({}));

export {
  createTimesheet,
  getAllTimesheet,
  deleteTimesheet,
  getDetailTimesheet,
  updateTimesheet,
  clearCreateTimesheet,
  clearDeleteTimesheet,
  clearUpdateTimesheet,
};
