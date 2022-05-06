import { Dispatch } from 'redux'
import { loaderAction } from './actionCreators'

const setLoading = (state: boolean) => (dispatch: Dispatch) => {
    try {
        dispatch(loaderAction(state))

    }
    catch {
        dispatch(loaderAction(false))

    }
}

export { setLoading }