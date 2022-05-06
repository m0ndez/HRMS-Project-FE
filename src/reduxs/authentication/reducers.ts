import * as authenticationAction from './actionCreators'
import { AxiosResponse } from 'axios'
import { combineReducers } from 'redux'
import { ActionType, createReducer } from 'typesafe-actions'
import { loginState } from './constants'
import responseConverter from 'utils/responseConverter'

export type AuthenticationActionType = ActionType<typeof authenticationAction>


const login = createReducer
    <ReducerState<any>,
        AuthenticationActionType
    >
    (loginState)
    .handleAction(
        authenticationAction.loginAction.request,
        (state: ReducerState<any>) => {
            return {
                ...state,
                isFetching: true,

            }
        }
    )

    .handleAction(
        authenticationAction.loginAction.success,
        (
            state: ReducerState<any>,
            action: AuthenticationActionType
        ) => {
            const payload: AxiosResponse<IResponse<IResponseAuthentication>> = action.payload
            const convertedResponse = responseConverter.getMessage(payload);

            return {
                ...state,
                isFetching: false,
                status: convertedResponse.status,
                data: payload.data.data,
                code: convertedResponse.code,
                error: "",
            }
        }
    )

    .handleAction(
        authenticationAction.loginAction.failure,
        (
            state: ReducerState<IResponseAuthentication>,
            action: AuthenticationActionType
        ) => {
            const payload: IResponseConverter = action.payload;
            return {
                ...state,
                isFetching: false,
                status: payload.status,
                code: payload.code,
                error: payload.message,
            };
        }
    )
// .handleAction(authenticationAction.loginAction.cancel, () => loginState)

export default combineReducers({
    login
})
