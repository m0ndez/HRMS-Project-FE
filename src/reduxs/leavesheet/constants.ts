export const POST_CREATE_LEAVESHEET_REQUEST = "POST_CREATE_LEAVESHEET_REQUEST";
export const POST_CREATE_LEAVESHEET_SUCCESS = "POST_CREATE_LEAVESHEET_SUCCESS";
export const POST_CREATE_LEAVESHEET_FAILURE = "POST_CREATE_LEAVESHEET_FAILURE";
export const POST_CREATE_LEAVESHEET_CANCEL = "POST_CREATE_LEAVESHEET_CANCEL";

export const GET_ALL_LEAVESHEET_REQUEST = "GET_ALL_LEAVESHEET_REQUEST";
export const GET_ALL_LEAVESHEET_SUCCESS = "GET_ALL_LEAVESHEET_SUCCESS";
export const GET_ALL_LEAVESHEET_FAILURE = "GET_ALL_LEAVESHEET_FAILURE";

export const GET_DETAIL_LEAVESHEET_REQUEST = "GET_DETAIL_LEAVESHEET_REQUEST";
export const GET_DETAIL_LEAVESHEET_SUCCESS = "GET_DETAIL_LEAVESHEET_SUCCESS";
export const GET_DETAIL_LEAVESHEET_FAILURE = "GET_DETAIL_LEAVESHEET_FAILURE";

export const DELETE_LEAVESHEET_REQUEST = "DELETE_LEAVESHEET_REQUEST";
export const DELETE_LEAVESHEET_SUCCESS = "DELETE_LEAVESHEET_SUCCESS";
export const DELETE_LEAVESHEET_FAILURE = "DELETE_LEAVESHEET_FAILURE";
export const DELETE_LEAVESHEET_CANCEL = "DELETE_LEAVESHEET_CANCEL";

export const UPDATE_LEAVESHEET_REQUEST = "UPDATE_LEAVESHEET_REQUEST";
export const UPDATE_LEAVESHEET_SUCCESS = "UPDATE_LEAVESHEET_SUCCESS";
export const UPDATE_LEAVESHEET_FAILURE = "UPDATE_LEAVESHEET_FAILURE";
export const UPDATE_LEAVESHEET_CANCEL = "UPDATE_LEAVESHEET_CANCEL";

export const createLeavesheetState: ReducerState<IResponseCreateLeavesheet> = {
  isFetching: false,
  data: {
    leaveId: "",
  },
  code: 0,
  error: "",
};

export const leavesheetState: ReducerState<IResponseGetLeavesheet[]> = {
  isFetching: false,
  data: [],
  code: 0,
  error: "",
};

export const leavesheetDeleteStatusState: ReducerState<null> = {
  isFetching: false,
  data: null,
  code: 0,
  error: "",
};

export const leavesheetUpdateStatusState: ReducerState<null> = {
  isFetching: false,
  data: null,
  code: 0,
  error: "",
};

export const leavesheetDetailState: ReducerState<any> = {
  isFetching: false,
  data: {
    // workCreated: "",
    // workCreatedBy: "",
    // workDate: "",
    // workDetail: "",
    // workEdited: "",
    // workHours: 0,
    // workId: "",
  },
  code: 0,
  error: "",
};
