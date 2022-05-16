import * as userAction from "./actionCreators";
import { combineReducers } from "redux";
import { ActionType, createReducer } from "typesafe-actions";
import { editUserState } from "./constants";

export type UserActionType = ActionType<typeof userAction>;

const updateUser = createReducer<ReducerState<null>, UserActionType>(
  editUserState
)
  .handleAction(
    userAction.editUserAction.request,
    (state: ReducerState<null>) => {
      return {
        ...state,
        isFetching: true,
      };
    }
  )
  .handleAction(
    userAction.editUserAction.success,
    (state: ReducerState<null>, action: UserActionType) => {
      const payload: IResponse<null> = action.payload;
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
    userAction.editUserAction.failure,
    (state: ReducerState<null>, action: UserActionType) => {
      const payload: IResponse<null> = action.payload;
      return {
        ...state,
        isFetching: false,
        status: payload.status,
        code: payload.code,
        error: payload.message || "",
        data: payload.data,
      };
    }
  );

export default combineReducers({
  updateUser,
});
