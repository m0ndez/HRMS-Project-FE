import * as reportAction from "./actionCreators";
import { combineReducers } from "redux";
import { ActionType, createReducer } from "typesafe-actions";
import { reportEmployeeState } from "./constants";

export type ReportActionType = ActionType<typeof reportAction>;

const employeeReport = createReducer<
  ReducerState<IResponseEmployeeReport[]>,
  ReportActionType
>(reportEmployeeState)
  .handleAction(
    reportAction.getReportEmployeeAction.request,
    (state: ReducerState<IResponseEmployeeReport[]>) => {
      return {
        ...state,
        isFetching: true,
      };
    }
  )
  .handleAction(
    reportAction.getReportEmployeeAction.success,
    (
      state: ReducerState<IResponseEmployeeReport[]>,
      action: ReportActionType
    ) => {
      const payload: IResponse<IResponseEmployeeReport[]> = action.payload;
      return {
        ...state,
        isFetching: false,
        data: payload.data,
        code: payload.code,
        error: payload.message || payload.devMessage,
      };
    }
  )
  .handleAction(
    reportAction.getReportEmployeeAction.failure,
    (
      state: ReducerState<IResponseEmployeeReport[]>,
      action: ReportActionType
    ) => {
      const payload: IResponse<null> = action.payload;
      return {
        ...state,
        isFetching: false,
        code: payload.code,
        error: payload.message || payload.devMessage,
      };
    }
  )
  .handleAction(
    reportAction.getReportEmployeeAction.cancel,
    () => reportEmployeeState
  );

export default combineReducers({
  employeeReport,
});
