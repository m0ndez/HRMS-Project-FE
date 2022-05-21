import { createAsyncAction } from "typesafe-actions";
import {
  POST_EMPLOYEE_CREATE_REQUEST,
  POST_EMPLOYEE_CREATE_SUCCESS,
  POST_EMPLOYEE_CREATE_FAILURE,
  POST_EMPLOYEE_CREATE_CANCEL,
  GET_ALL_EMPLOYEE_REQUEST,
  GET_ALL_EMPLOYEE_SUCCESS,
  GET_ALL_EMPLOYEE_FAILURE,
  GET_DETAIL_EMPLOYEE_REQUEST,
  GET_DETAIL_EMPLOYEE_SUCCESS,
  GET_DETAIL_EMPLOYEE_FAILURE,
  UPDATE_EMPLOYEE_CREATE_REQUEST,
  UPDATE_EMPLOYEE_CREATE_SUCCESS,
  UPDATE_EMPLOYEE_CREATE_FAILURE,
  UPDATE_EMPLOYEE_CREATE_CANCEL,
} from "./constants";

const employeeCreateAction = createAsyncAction(
  POST_EMPLOYEE_CREATE_REQUEST,
  POST_EMPLOYEE_CREATE_SUCCESS,
  POST_EMPLOYEE_CREATE_FAILURE,
  POST_EMPLOYEE_CREATE_CANCEL
)<any, IResponse<IResponseCreateEmployee>, IResponse<null>, any>();

const employeeGetAction = createAsyncAction(
  GET_ALL_EMPLOYEE_REQUEST,
  GET_ALL_EMPLOYEE_SUCCESS,
  GET_ALL_EMPLOYEE_FAILURE
)<any, IResponse<IResponseGetEmployee[]>, IResponse<null>, any>();

const employeeGetDetailAction = createAsyncAction(
  GET_DETAIL_EMPLOYEE_REQUEST,
  GET_DETAIL_EMPLOYEE_SUCCESS,
  GET_DETAIL_EMPLOYEE_FAILURE
)<any, IResponse<IResponseGetEmployeeDetail>, IResponse<null>>();

const employeeUpdateAction = createAsyncAction(
  UPDATE_EMPLOYEE_CREATE_REQUEST,
  UPDATE_EMPLOYEE_CREATE_SUCCESS,
  UPDATE_EMPLOYEE_CREATE_FAILURE,
  UPDATE_EMPLOYEE_CREATE_CANCEL
)<any, IResponse<null>, IResponse<null>, any>();

export {
  employeeCreateAction,
  employeeGetAction,
  employeeGetDetailAction,
  employeeUpdateAction,
};
