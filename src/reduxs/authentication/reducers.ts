import * as authenticationAction from "./actionCreators";
import { AxiosResponse } from "axios";
import { combineReducers } from "redux";
import { ActionType, createReducer } from "typesafe-actions";
import { loginState, tokenState } from "./constants";
import responseConverter from "utils/responseConverter";

export type AuthenticationActionType = ActionType<typeof authenticationAction>;

const login = createReducer<
  ReducerState<IResponseAuthentication>,
  AuthenticationActionType
>(loginState)
  .handleAction(
    authenticationAction.loginAction.request,
    (state: ReducerState<IResponseAuthentication>) => {
      return {
        ...state,
        isFetching: true,
      };
    }
  )

  .handleAction(
    authenticationAction.loginAction.success,
    (
      state: ReducerState<IResponseAuthentication>,
      action: AuthenticationActionType
    ) => {
      const payload: IResponse<IResponseAuthentication> = action.payload;

      return {
        ...state,
        isFetching: false,
        data: payload.data,
        code: payload.code,
        error: payload.devMessage,
        // status: payload.code,
      };
    }
  )

  .handleAction(
    authenticationAction.loginAction.failure,
    (
      state: ReducerState<IResponseAuthentication>,
      action: AuthenticationActionType
    ) => {
      const payload: IResponse<IResponseAuthentication> = action.payload;
      return {
        ...state,
        isFetching: false,
        status: payload.status,
        code: payload.code,
        error: payload.message || "",
        data: payload.data,
      };
    }
  )
  .handleAction(authenticationAction.loginAction.cancel, () => loginState);

const token = createReducer(tokenState).handleAction(
  authenticationAction.tokenAction,
  (state: IToken, action: AuthenticationActionType) => {
    const payload: IToken = action.payload;
    return {
      ...state,
      token: payload.token,
    };
  }
);

export default combineReducers({
  login,
  token,
});
