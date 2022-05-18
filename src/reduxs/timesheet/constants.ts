export const POST_CREATE_TIMESHEET_REQUEST = "POST_CREATE_TIMESHEET_REQUEST";
export const POST_CREATE_TIMESHEET_SUCCESS = "POST_CREATE_TIMESHEET_SUCCESS";
export const POST_CREATE_TIMESHEET_FAILURE = "POST_CREATE_TIMESHEET_FAILURE";
export const POST_CREATE_TIMESHEET_CANCEL = "POST_CREATE_TIMESHEET_CANCEL";

export const GET_ALL_TIMESHEET_REQUEST = "GET_ALL_TIMESHEET_REQUEST";
export const GET_ALL_TIMESHEET_SUCCESS = "GET_ALL_TIMESHEET_SUCCESS";
export const GET_ALL_TIMESHEET_FAILURE = "GET_ALL_TIMESHEET_FAILURE";

export const GET_DETAIL_TIMESHEET_REQUEST = "GET_DETAIL_TIMESHEET_REQUEST";
export const GET_DETAIL_TIMESHEET_SUCCESS = "GET_DETAIL_TIMESHEET_SUCCESS";
export const GET_DETAIL_TIMESHEET_FAILURE = "GET_DETAIL_TIMESHEET_FAILURE";

export const DELETE_TIMESHEET_REQUEST = "DELETE_TIMESHEET_REQUEST";
export const DELETE_TIMESHEET_SUCCESS = "DELETE_TIMESHEET_SUCCESS";
export const DELETE_TIMESHEET_FAILURE = "DELETE_TIMESHEET_FAILURE";
export const DELETE_TIMESHEET_CANCEL = "DELETE_TIMESHEET_CANCEL";

export const UPDATE_TIMESHEET_REQUEST = "UPDATE_TIMESHEET_REQUEST";
export const UPDATE_TIMESHEET_SUCCESS = "UPDATE_TIMESHEET_SUCCESS";
export const UPDATE_TIMESHEET_FAILURE = "UPDATE_TIMESHEET_FAILURE";
export const UPDATE_TIMESHEET_CANCEL = "UPDATE_TIMESHEET_CANCEL";

export const createTimesheetState: ReducerState<IResponseCreateTimesheet> = {
  isFetching: false,
  data: {
    workId: "",
  },
  code: 0,
  error: "",
};

export const timesheetState: ReducerState<IResponseGetTimesheet[]> = {
  isFetching: false,
  data: [],
  code: 0,
  error: "",
};

export const timesheetDeleteStatusState: ReducerState<null> = {
  isFetching: false,
  data: null,
  code: 0,
  error: "",
};

export const timesheetUpdateStatusState: ReducerState<null> = {
  isFetching: false,
  data: null,
  code: 0,
  error: "",
};

export const timesheetDetailState: ReducerState<IResponseGetTimesheet> = {
  isFetching: false,
  data: {
    workCreated: "",
    workCreatedBy: "",
    workDate: "",
    workDetail: "",
    workEdited: "",
    workHours: 0,
    workId: "",
  },
  code: 0,
  error: "",
};
