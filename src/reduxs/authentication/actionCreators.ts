import { createAction, createAsyncAction } from 'typesafe-actions';
import {
    POST_LOGIN_REQUEST,
    POST_LOGIN_SUCCESS,
    POST_LOGIN_FAILURE,
    SET_TOKEN_ACTION,
    SET_LOGOUT_ACTION
} from './constants'

const loginAction = createAsyncAction(
    POST_LOGIN_REQUEST,
    POST_LOGIN_SUCCESS,
    POST_LOGIN_FAILURE,
    SET_LOGOUT_ACTION
)<any, IResponse<IResponseAuthentication>, IResponse<IResponseAuthentication>, {}>()


const tokenAction = createAction(SET_TOKEN_ACTION)<IToken>()


export {
    loginAction,
    tokenAction,
}