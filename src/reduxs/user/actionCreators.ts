import { createAsyncAction } from "typesafe-actions";
import {
  PUT_EDIT_USER_REQUEST,
  PUT_EDIT_USER_SUCCESS,
  PUT_EDIT_USER_FAILURE,
} from "./constants";

const editUserAction = createAsyncAction(
  PUT_EDIT_USER_REQUEST,
  PUT_EDIT_USER_SUCCESS,
  PUT_EDIT_USER_FAILURE
)<any, IResponse<null>, IResponse<null>>();

export { editUserAction };
