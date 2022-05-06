import { createAsyncAction } from 'typesafe-actions';
import { AxiosResponse } from 'axios'
import {
    POST_LOGIN_REQUEST,
    POST_LOGIN_SUCCESS,
    POST_LOGIN_FAILURE,

} from './constants'

const loginAction = createAsyncAction(
    POST_LOGIN_REQUEST,
    POST_LOGIN_SUCCESS,
    POST_LOGIN_FAILURE
)<any, AxiosResponse<IResponse<IResponseAuthentication>>, IResponseConverter>()

export {
    loginAction
}