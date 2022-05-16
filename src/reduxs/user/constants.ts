export const PUT_EDIT_USER_REQUEST = "PUT_EDIT_USER_REQUEST";
export const PUT_EDIT_USER_SUCCESS = "PUT_EDIT_USER_SUCCESS";
export const PUT_EDIT_USER_FAILURE = "PUT_EDIT_USER_FAILURE";

export const editUserState: ReducerState<null> = {
  isFetching: false,
  data: null,
  code: 0,
  error: "",
};
