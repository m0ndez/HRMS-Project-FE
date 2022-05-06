import { AxiosError, AxiosResponse } from 'axios'
import { get } from 'lodash'

import { Dispatch } from 'redux'
import { loaderAction } from 'reduxs/loader/actionCreators'
import { responseConverter } from 'utils'
import { loginAction } from './actionCreators'
import { fetchLogin } from './services'

const login = (body: IRequestAuthentication) => async (dispatch: Dispatch) => {
    dispatch(loginAction.request({}))
    dispatch(loaderAction(true))

    await fetchLogin(body)
        .then(response => {
            console.log('Response From Action', response)
            dispatch(loaderAction(false))
            dispatch(loginAction.success(response))
            // Handle Token
            return get(response, 'data.data', {})
        })
        .catch((error: AxiosError<IResponse>) => {
            dispatch(loaderAction(false))
            const convertedResponse = responseConverter.getMessage(error);
            console.log('Response From Action', error, convertedResponse)
            dispatch(loginAction.failure(convertedResponse))
        })
        .finally(() => dispatch(loaderAction(false)))
}

export {
    login
}