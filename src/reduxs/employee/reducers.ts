import * as employeeAction from "./actionCreators";
import { combineReducers } from "redux";
import { ActionType, createReducer } from "typesafe-actions";
import {
  employeeCreateStatusState,
  employeeState,
  employeeDetailState,
  employeeUpdateStatusState,
} from "./constants";

export type EmployeeActionType = ActionType<typeof employeeAction>;

const create = createReducer<
  ReducerState<IResponseCreateEmployee>,
  EmployeeActionType
>(employeeCreateStatusState)
  .handleAction(
    employeeAction.employeeCreateAction.request,
    (state: ReducerState<IResponseCreateEmployee>) => {
      return {
        ...state,
        isFetching: true,
      };
    }
  )
  .handleAction(
    employeeAction.employeeCreateAction.success,
    (
      state: ReducerState<IResponseCreateEmployee>,
      action: EmployeeActionType
    ) => {
      const payload: IResponse<IResponseCreateEmployee> = action.payload;
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
    employeeAction.employeeCreateAction.failure,
    (
      state: ReducerState<IResponseCreateEmployee>,
      action: EmployeeActionType
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
    employeeAction.employeeCreateAction.cancel,
    () => employeeCreateStatusState
  );

const getAll = createReducer<
  ReducerState<IResponseGetEmployee[]>,
  EmployeeActionType
>(employeeState)
  .handleAction(
    employeeAction.employeeGetAction.request,
    (state: ReducerState<IResponseGetEmployee[]>) => {
      return {
        ...state,
        isFetching: true,
      };
    }
  )
  .handleAction(
    employeeAction.employeeGetAction.success,
    (
      state: ReducerState<IResponseGetEmployee[]>,
      action: EmployeeActionType
    ) => {
      const payload: IResponse<IResponseGetEmployee[]> = action.payload;
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
    employeeAction.employeeGetAction.failure,
    (
      state: ReducerState<IResponseGetEmployee[]>,
      action: EmployeeActionType
    ) => {
      const payload: IResponse<null> = action.payload;
      return {
        ...state,
        isFetching: false,
        code: payload.code,
        error: payload.message || payload.devMessage,
      };
    }
  );

const detail = createReducer<
  ReducerState<IResponseGetEmployeeDetail>,
  EmployeeActionType
>(employeeDetailState)
  .handleAction(
    employeeAction.employeeGetDetailAction.request,
    (state: ReducerState<IResponseGetEmployeeDetail>) => {
      return {
        ...state,
        isFetching: true,
      };
    }
  )
  .handleAction(
    employeeAction.employeeGetDetailAction.success,
    (
      state: ReducerState<IResponseGetEmployeeDetail>,
      action: EmployeeActionType
    ) => {
      const payload: IResponse<IResponseGetEmployeeDetail> = action.payload;
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
    employeeAction.employeeGetDetailAction.failure,
    (
      state: ReducerState<IResponseGetEmployeeDetail>,
      action: EmployeeActionType
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

const update = createReducer<ReducerState<null>, EmployeeActionType>(
  employeeUpdateStatusState
)
  .handleAction(
    employeeAction.employeeUpdateAction.request,
    (state: ReducerState<null>) => {
      return {
        ...state,
        isFetching: true,
      };
    }
  )
  .handleAction(
    employeeAction.employeeUpdateAction.success,
    (state: ReducerState<null>, action: EmployeeActionType) => {
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
    employeeAction.employeeUpdateAction.failure,
    (state: ReducerState<null>, action: EmployeeActionType) => {
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
    employeeAction.employeeUpdateAction.cancel,
    () => employeeUpdateStatusState
  );

export default combineReducers({
  create,
  getAll,
  detail,
  update,
});
