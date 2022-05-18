import { Dispatch } from "redux";
import {
  createLeavesheetAction,
  getLeavesheetAction,
  deleteLeavesheetAction,
} from "./actionCreators";
import {
  createLeavesheetState,
  leavesheetState,
  leavesheetDeleteStatusState,
  leavesheetDetailState,
  leavesheetUpdateStatusState,
} from "./constants";
import {
  createLeavesheetService,
  deleteLeavesheetService,
  fetchLeavesheetService,
  updateLeavesheetService,
} from "./services";
import { toastAction } from "reduxs/toast/actionCreator";
import { loaderAction } from "reduxs/loader/actionCreators";

const createLeavesheet =
  (body: IRequestCreateLeavesheet) => async (dispatch: Dispatch) => {
    dispatch(loaderAction(true));
    dispatch(createLeavesheetAction.request({}));
    await createLeavesheetService(body)
      .then((response) => {
        const { data } = response;
        dispatch(createLeavesheetAction.success(data));
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
        dispatch(createLeavesheetAction.failure(error));
      })
      .finally(() => {
        dispatch(loaderAction(false));
      });
  };

const getAllLeavesheet = (params?: boolean) => async (dispatch: Dispatch) => {
  dispatch(loaderAction(true));
  dispatch(getLeavesheetAction.request({}));
  await fetchLeavesheetService(params)
    .then((response) => {
      const { data } = response;
      dispatch(getLeavesheetAction.success(data));
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
      dispatch(getLeavesheetAction.failure(error));
      dispatch(loaderAction(false));
    })
    .finally(() => dispatch(loaderAction(false)));
};

const deleteLeavesheet = (id: string) => async (dispatch: Dispatch) => {
  dispatch(deleteLeavesheetAction.request({}));
  dispatch(loaderAction(true));
  await deleteLeavesheetService(id)
    .then((response) => {
      const { data } = response;
      dispatch(loaderAction(false));
      dispatch(deleteLeavesheetAction.success(data));
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
      dispatch(deleteLeavesheetAction.failure(error));
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

const clearCreateLeavesheet = () => async (dispatch: Dispatch) =>
  dispatch(createLeavesheetAction.cancel({}));

const clearDeleteTimesheet = () => (dispatch: Dispatch) =>
  dispatch(deleteLeavesheetAction.cancel({}));

export {
  createLeavesheet,
  clearCreateLeavesheet,
  getAllLeavesheet,
  deleteLeavesheet,
  clearDeleteTimesheet,
};
