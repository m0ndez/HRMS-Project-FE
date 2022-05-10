import { Dispatch } from "redux";
import { toastAction } from "./actionCreator";
import { toastState } from "./constants";

const openToast = (state: IToastComponentProps) => (dispatch: Dispatch) => {
  const { openToast } = toastState;
  try {
    dispatch(toastAction(state));
  } catch {
    dispatch(toastAction(openToast));
  }
};

export { openToast };
