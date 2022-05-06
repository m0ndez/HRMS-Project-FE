import { createAction } from "typesafe-actions";
import {
    LOADER_ACTION
} from './constants'

const loaderAction = createAction(LOADER_ACTION)<boolean>()

export {
    loaderAction
}