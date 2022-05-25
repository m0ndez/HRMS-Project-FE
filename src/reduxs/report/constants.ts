export const GET_REPORT_EMPLOYEE_REQUEST = "GET_REPORT_EMPLOYEE_REQUEST";
export const GET_REPORT_EMPLOYEE_SUCCESS = "GET_REPORT_EMPLOYEE_SUCCESS";
export const GET_REPORT_EMPLOYEE_FAILURE = "GET_REPORT_EMPLOYEE_FAILURE";
export const GET_REPORT_EMPLOYEE_CANCEL = "GET_REPORT_EMPLOYEE_CANCEL";

export const reportEmployeeState: ReducerState<IResponseEmployeeReport[]> = {
  data: [],
  code: 0,
  error: "",
  isFetching: false,
};
