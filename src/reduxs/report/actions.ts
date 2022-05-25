import { Dispatch } from "redux";
import { loaderAction } from "reduxs/loader/actionCreators";
import { toastAction } from "reduxs/toast/actionCreator";
import { getReportEmployeeAction } from "./actionCreators";
import { getEmployeeReportService } from "./services";

const getEmployeeReport = () => async (dispatch: Dispatch) => {
  dispatch(loaderAction(true));
  dispatch(getReportEmployeeAction.request({}));
  await getEmployeeReportService()
    .then((response) => {
      const { data } = response;
      dispatch(getReportEmployeeAction.success(data));
    })
    .catch((error: IResponse<null>) => {
      dispatch(loaderAction(false));
      dispatch(getReportEmployeeAction.failure(error));
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

const cancelGetEmployeeReport = () => async (dispatch: Dispatch) => {
  dispatch(getReportEmployeeAction.cancel({}));
};

export { getEmployeeReport, cancelGetEmployeeReport };
