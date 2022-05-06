import { loaderState } from "./constants";
import * as loaderAction from './actionCreators'
import { ActionType, createReducer } from "typesafe-actions";

export type LoaderActionType = ActionType<typeof loaderAction>
export const loader = createReducer<ILoaderStore, LoaderActionType>(loaderState)
    .handleAction(
        loaderAction.loaderAction,
        (state: ILoaderStore, action: LoaderActionType) => {
            const payload: boolean = action.payload
            return {
                ...state,
                setLoading: payload
            }
        }
    )