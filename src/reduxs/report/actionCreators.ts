import { createAsyncAction } from "typesafe-actions";
import {
  GET_REPORT_EMPLOYEE_REQUEST,
  GET_REPORT_EMPLOYEE_SUCCESS,
  GET_REPORT_EMPLOYEE_FAILURE,
  GET_REPORT_EMPLOYEE_CANCEL,
} from "./constants";

const getReportEmployeeAction = createAsyncAction(
  GET_REPORT_EMPLOYEE_REQUEST,
  GET_REPORT_EMPLOYEE_SUCCESS,
  GET_REPORT_EMPLOYEE_FAILURE,
  GET_REPORT_EMPLOYEE_CANCEL
)<any, IResponse<IResponseEmployeeReport[]>, IResponse<null>, any>();

export { getReportEmployeeAction };
