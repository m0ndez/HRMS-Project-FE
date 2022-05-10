import { toastState } from "./constants";
import * as toastAction from "./actionCreator";
import { ActionType, createReducer } from "typesafe-actions";

export type ToastActionType = ActionType<typeof toastAction>;

export const toast = createReducer<IToastStore, ToastActionType>(
  toastState
).handleAction(
  toastAction.toastAction,
  (state: IToastStore, action: ToastActionType) => {
    const payload: IToastComponentProps = action.payload;
    const { openToast } = state;
    return {
      ...state,
      openToast: { ...openToast, ...payload },
    };
  }
);
