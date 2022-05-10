// import axios from 'axios'
import { isEmpty } from 'lodash'
import { MiddlewareAPI, Dispatch } from 'redux'
import { axios } from 'utils'

const axiosMiddleware = ({ getState }: MiddlewareAPI<Dispatch, RootReducers>) => (next: Dispatch) => (action: any) => {
  const { token } = getState().authentication.login.data
  if (!isEmpty(token)) {
    axios.defaults.headers.common.token = token
  }
  return next(action)
}

export default axiosMiddleware