import { createAction } from "typesafe-actions";

import {
    TOAST_ACTION,
} from './constants'

const toastAction = createAction(TOAST_ACTION)<IToastComponentProps>()

export {
    toastAction
}