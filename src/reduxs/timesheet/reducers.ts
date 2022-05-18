import * as timesheetAction from "./actionCreators";
import { combineReducers } from "redux";
import { ActionType, createReducer } from "typesafe-actions";
import {
  createTimesheetState,
  timesheetState,
  timesheetDeleteStatusState,
  timesheetDetailState,
  timesheetUpdateStatusState,
} from "./constants";

export type TimesheetActionType = ActionType<typeof timesheetAction>;

const create = createReducer<
  ReducerState<IResponseCreateTimesheet>,
  TimesheetActionType
>(createTimesheetState)
  .handleAction(
    timesheetAction.createTimesheetAction.request,
    (state: ReducerState<IResponseCreateTimesheet>) => {
      return {
        ...state,
        isFetching: true,
      };
    }
  )
  .handleAction(
    timesheetAction.createTimesheetAction.success,
    (
      state: ReducerState<IResponseCreateTimesheet>,
      action: TimesheetActionType
    ) => {
      const payload: IResponse<IResponseCreateTimesheet> = action.payload;
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
    timesheetAction.createTimesheetAction.failure,
    (
      state: ReducerState<IResponseCreateTimesheet>,
      action: TimesheetActionType
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
    timesheetAction.createTimesheetAction.cancel,
    () => createTimesheetState
  );

const getAll = createReducer<
  ReducerState<IResponseGetTimesheet[]>,
  TimesheetActionType
>(timesheetState)
  .handleAction(
    timesheetAction.getTimesheetAction.request,
    (state: ReducerState<IResponseGetTimesheet[]>) => {
      return {
        ...state,
        isFetching: true,
      };
    }
  )
  .handleAction(
    timesheetAction.getTimesheetAction.success,
    (
      state: ReducerState<IResponseGetTimesheet[]>,
      action: TimesheetActionType
    ) => {
      const payload: IResponse<IResponseGetTimesheet[]> = action.payload;
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
    timesheetAction.getTimesheetAction.failure,
    (
      state: ReducerState<IResponseGetTimesheet[]>,
      action: TimesheetActionType
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

const detail = createReducer<
  ReducerState<IResponseGetTimesheet>,
  TimesheetActionType
>(timesheetDetailState)
  .handleAction(
    timesheetAction.getTimesheetDetailAction.request,
    (state: ReducerState<IResponseGetTimesheet>) => {
      return {
        ...state,
        isFetching: true,
      };
    }
  )
  .handleAction(
    timesheetAction.getTimesheetDetailAction.success,
    (
      state: ReducerState<IResponseGetTimesheet>,
      action: TimesheetActionType
    ) => {
      const payload: IResponse<IResponseGetTimesheet> = action.payload;
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
    timesheetAction.getTimesheetDetailAction.failure,
    (
      state: ReducerState<IResponseGetTimesheet>,
      action: TimesheetActionType
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

const deleted = createReducer<ReducerState<null>, TimesheetActionType>(
  timesheetDeleteStatusState
)
  .handleAction(
    timesheetAction.deleteTimesheetAction.request,
    (state: ReducerState<null>) => {
      return {
        ...state,
        isFetching: true,
      };
    }
  )
  .handleAction(
    timesheetAction.deleteTimesheetAction.success,
    (state: ReducerState<null>, action: TimesheetActionType) => {
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
    timesheetAction.deleteTimesheetAction.failure,
    (state: ReducerState<null>, action: TimesheetActionType) => {
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
    timesheetAction.deleteTimesheetAction.cancel,
    () => timesheetDeleteStatusState
  );

const update = createReducer<ReducerState<null>, TimesheetActionType>(
  timesheetUpdateStatusState
)
  .handleAction(
    timesheetAction.updateTimesheetAction.request,
    (state: ReducerState<null>) => {
      return {
        ...state,
        isFetching: true,
      };
    }
  )
  .handleAction(
    timesheetAction.updateTimesheetAction.success,
    (state: ReducerState<null>, action: TimesheetActionType) => {
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
    timesheetAction.updateTimesheetAction.failure,
    (state: ReducerState<null>, action: TimesheetActionType) => {
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
    timesheetAction.updateTimesheetAction.cancel,
    () => timesheetDeleteStatusState
  );

export default combineReducers({
  create,
  getAll,
  deleted,
  detail,
  update,
});
