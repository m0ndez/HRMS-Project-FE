export const POST_LOGIN_REQUEST = 'POST_LOGIN_REQUEST'
export const POST_LOGIN_SUCCESS = 'POST_LOGIN_SUCCESS'
export const POST_LOGIN_FAILURE = 'POST_LOGIN_FAILURE'

export const loginState: ReducerState<any> = {
    code: 0,
    data: [],
    error: '',
    isFetching: false,
    status: 0
}