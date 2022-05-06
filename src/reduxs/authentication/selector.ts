import { get } from "lodash";
import { loginState } from './constants'

const login = (state: RootReducers): ReducerState<IRequestAuthentication> => get(state, 'authentication.login', loginState)

const exportedObj = {
    login
}

export default exportedObj