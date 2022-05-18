import * as leavesheetAction from "./actionCreators";
import { ActionType, createReducer } from "typesafe-actions";
import { combineReducers } from "redux";
import {
  createLeavesheetState,
  leavesheetDetailState,
  leavesheetUpdateStatusState,
  leavesheetState,
  leavesheetDeleteStatusState,
} from "./constants";

export type LeavesheetActionType = ActionType<typeof leavesheetAction>;

const create = createReducer<
  ReducerState<IResponseCreateLeavesheet>,
  LeavesheetActionType
>(createLeavesheetState)
  .handleAction(
    leavesheetAction.createLeavesheetAction.request,
    (state: ReducerState<IResponseCreateLeavesheet>) => {
      return {
        ...state,
        isFetching: true,
      };
    }
  )
  .handleAction(
    leavesheetAction.createLeavesheetAction.success,
    (
      state: ReducerState<IResponseCreateLeavesheet>,
      action: LeavesheetActionType
    ) => {
      const payload: IResponse<IResponseCreateLeavesheet> = action.payload;
      return {
        ...state,
        isFetching: false,
        data: payload.data,
        code: payload.code,
        error: payload.devMessage,
      };
    }
  )
  .handleAction(
    leavesheetAction.createLeavesheetAction.failure,
    (
      state: ReducerState<IResponseCreateLeavesheet>,
      action: LeavesheetActionType
    ) => {
      const payload: IResponse<null> = action.payload;
      return {
        ...state,
        isFetching: false,
        code: payload.code,
        error: payload.devMessage,
      };
    }
  )
  .handleAction(
    leavesheetAction.createLeavesheetAction.cancel,
    () => createLeavesheetState
  );

const getAll = createReducer<
  ReducerState<IResponseGetLeavesheet[]>,
  LeavesheetActionType
>(leavesheetState)
  .handleAction(
    leavesheetAction.getLeavesheetAction.request,
    (state: ReducerState<IResponseGetLeavesheet[]>) => {
      return {
        ...state,
        isFetching: true,
      };
    }
  )
  .handleAction(
    leavesheetAction.getLeavesheetAction.success,
    (
      state: ReducerState<IResponseGetLeavesheet[]>,
      action: LeavesheetActionType
    ) => {
      const payload: IResponse<IResponseGetLeavesheet[]> = action.payload;
      return {
        ...state,
        isFetching: false,
        data: payload.data,
        code: payload.code,
        error: payload.devMessage,
      };
    }
  )
  .handleAction(
    leavesheetAction.getLeavesheetAction.failure,
    (
      state: ReducerState<IResponseGetLeavesheet[]>,
      action: LeavesheetActionType
    ) => {
      const payload: IResponse<null> = action.payload;
      return {
        ...state,
        isFetching: false,
        code: payload.code,
        error: payload.devMessage,
      };
    }
  );

const deleted = createReducer<ReducerState<null>, LeavesheetActionType>(
  leavesheetDeleteStatusState
)
  .handleAction(
    leavesheetAction.deleteLeavesheetAction.request,
    (state: ReducerState<null>) => {
      return {
        ...state,
        isFetching: true,
      };
    }
  )
  .handleAction(
    leavesheetAction.deleteLeavesheetAction.success,
    (state: ReducerState<null>, action: LeavesheetActionType) => {
      const payload: IResponse<null> = action.payload;
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
    leavesheetAction.deleteLeavesheetAction.failure,
    (state: ReducerState<null>, action: LeavesheetActionType) => {
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
    leavesheetAction.deleteLeavesheetAction.cancel,
    () => leavesheetDeleteStatusState
  );

export default combineReducers({
  create,
  getAll,
  deleted,
  // detail,
  // update,
});
