export const POST_EMPLOYEE_CREATE_REQUEST = "POST_EMPLOYEE_CREATE_REQUEST";
export const POST_EMPLOYEE_CREATE_SUCCESS = "POST_EMPLOYEE_CREATE_SUCCESS";
export const POST_EMPLOYEE_CREATE_FAILURE = "POST_EMPLOYEE_CREATE_FAILURE";
export const POST_EMPLOYEE_CREATE_CANCEL = "POST_EMPLOYEE_CREATE_CANCEL";

export const UPDATE_EMPLOYEE_CREATE_REQUEST = "UPDATE_EMPLOYEE_CREATE_REQUEST";
export const UPDATE_EMPLOYEE_CREATE_SUCCESS = "UPDATE_EMPLOYEE_CREATE_SUCCESS";
export const UPDATE_EMPLOYEE_CREATE_FAILURE = "UPDATE_EMPLOYEE_CREATE_FAILURE";
export const UPDATE_EMPLOYEE_CREATE_CANCEL = "UPDATE_EMPLOYEE_CREATE_CANCEL";

export const GET_ALL_EMPLOYEE_REQUEST = "GET_ALL_EMPLOYEE_REQUEST";
export const GET_ALL_EMPLOYEE_SUCCESS = "GET_ALL_EMPLOYEE_SUCCESS";
export const GET_ALL_EMPLOYEE_FAILURE = "GET_ALL_EMPLOYEE_FAILURE";

export const GET_DETAIL_EMPLOYEE_REQUEST = "GET_DETAIL_EMPLOYEE_REQUEST";
export const GET_DETAIL_EMPLOYEE_SUCCESS = "GET_DETAIL_EMPLOYEE_SUCCESS";
export const GET_DETAIL_EMPLOYEE_FAILURE = "GET_DETAIL_EMPLOYEE_FAILURE";

export const UPDATE_EMPLOYEE_REQUEST = "UPDATE_EMPLOYEE_REQUEST";
export const UPDATE_EMPLOYEE_SUCCESS = "UPDATE_EMPLOYEE_SUCCESS";
export const UPDATE_EMPLOYEE_FAILURE = "UPDATE_EMPLOYEE_FAILURE";
export const UPDATE_EMPLOYEE_CANCEL = "UPDATE_EMPLOYEE_CANCEL";

export const employeeCreateStatusState: ReducerState<IResponseCreateEmployee> =
  {
    data: {
      id: "",
    },
    code: 0,
    error: "",
    isFetching: false,
  };

export const employeeUpdateStatusState: ReducerState<null> =
  {
    data: null,
    code: 0,
    error: "",
    isFetching: false,
  };

export const employeeState: ReducerState<IResponseGetEmployee[]> = {
  data: [],
  code: 0,
  error: "",
  isFetching: false,
};

export const employeeDetailState: ReducerState<IResponseGetEmployeeDetail> = {
  data: {
    address: "",
    fname: "",
    id: "",
    lname: "",
    password: "",
    position: "",
    sex: 1,
    state: false,
    tel: "",
    username: "",
  },
  code: 0,
  error: "",
  isFetching: false,
};
