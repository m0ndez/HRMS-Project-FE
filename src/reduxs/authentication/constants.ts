export const POST_LOGIN_REQUEST = 'POST_LOGIN_REQUEST'
export const POST_LOGIN_SUCCESS = 'POST_LOGIN_SUCCESS'
export const POST_LOGIN_FAILURE = 'POST_LOGIN_FAILURE'

export const SET_TOKEN_ACTION = 'SET_TOKEN_ACTION'

export const SET_LOGOUT_ACTION = 'SET_LOGOUT_ACTION'

export const loginState: ReducerState<IResponseAuthentication> = {
    code: 0,
    data: {
        address: '',
        firstname: '',
        id: '',
        lastname: '',
        tel: '',
        token: '',
        // postion:'',
        // sex: 1,
        // state: false
    },
    error: '',
    isFetching: false,
    // status: 0
}


export const tokenState: IToken = {
    accessToken: '',
    refreshToken: '',
}