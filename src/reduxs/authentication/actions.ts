import { Dispatch } from 'redux'
import { loaderAction } from 'reduxs/loader/actionCreators'
import { loginAction, tokenAction } from './actionCreators'
import { loginState } from './constants'
import { fetchLogin } from './services'

const login = (body: IRequestAuthentication) => async (dispatch: Dispatch) => {
    dispatch(loginAction.request({}))
    dispatch(loaderAction(true))

    await fetchLogin(body)
        .then(response => {
            const { data } = response
            console.log('Response From Action', response)
            dispatch(loaderAction(false))
            dispatch(loginAction.success(data))
            // Handle Token
            // setToken({ accessToken: response.data.data.token })(dispatch)
            // return get(response, 'data', {})
        })
        .catch((error: IResponse<IResponseAuthentication>) => {

            const errorHandler = {
                ...error,
                data: loginState.data
            }
            dispatch(loaderAction(false))
            console.log('Response From Action', errorHandler)
            dispatch(loginAction.failure(errorHandler))
        })
        .finally(() => dispatch(loaderAction(false)))
}

const logout = () => async (dispatch: Dispatch) => {
    dispatch(loginAction.cancel({}))
}


const setToken = (TokenData: IToken) => (dispatch: Dispatch) => {
    dispatch(tokenAction(TokenData))
}

export {
    login,
    logout
}