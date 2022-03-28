import { AxiosError, AxiosResponse } from 'axios'
import { get } from 'lodash'

import { Dispatch } from 'redux'
import { responseConverter } from 'utils'
import { loginAction } from './actionCreators'
import { fetchLogin } from './services'

const login = (body: any) => async (dispatch: Dispatch) => {
    dispatch(loginAction.request({}))
    await fetchLogin(body)
        .then(response => {
            dispatch(loginAction.success(response))
            // Handle Token
            return get(response, 'data.data', {})
        })
        .catch((error: AxiosError<IResponse>) => {
            const convertedResponse = responseConverter.getMessage(error);
            dispatch(loginAction.failure(convertedResponse))
        })
}

export {
    login
}