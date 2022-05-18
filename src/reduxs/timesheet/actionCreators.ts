import { createAsyncAction } from "typesafe-actions";
import {
  POST_CREATE_TIMESHEET_REQUEST,
  POST_CREATE_TIMESHEET_SUCCESS,
  POST_CREATE_TIMESHEET_FAILURE,
  POST_CREATE_TIMESHEET_CANCEL,
  GET_ALL_TIMESHEET_REQUEST,
  GET_ALL_TIMESHEET_SUCCESS,
  GET_ALL_TIMESHEET_FAILURE,
  DELETE_TIMESHEET_REQUEST,
  DELETE_TIMESHEET_SUCCESS,
  DELETE_TIMESHEET_FAILURE,
  DELETE_TIMESHEET_CANCEL,
  GET_DETAIL_TIMESHEET_REQUEST,
  GET_DETAIL_TIMESHEET_SUCCESS,
  GET_DETAIL_TIMESHEET_FAILURE,
  UPDATE_TIMESHEET_REQUEST,
  UPDATE_TIMESHEET_SUCCESS,
  UPDATE_TIMESHEET_FAILURE,
  UPDATE_TIMESHEET_CANCEL,
} from "./constants";

const createTimesheetAction = createAsyncAction(
  POST_CREATE_TIMESHEET_REQUEST,
  POST_CREATE_TIMESHEET_SUCCESS,
  POST_CREATE_TIMESHEET_FAILURE,
  POST_CREATE_TIMESHEET_CANCEL
)<any, IResponse<IResponseCreateTimesheet>, IResponse<null>, any>();

const getTimesheetAction = createAsyncAction(
  GET_ALL_TIMESHEET_REQUEST,
  GET_ALL_TIMESHEET_SUCCESS,
  GET_ALL_TIMESHEET_FAILURE
)<any, IResponse<IResponseGetTimesheet[]>, IResponse<null>>();

const deleteTimesheetAction = createAsyncAction(
  DELETE_TIMESHEET_REQUEST,
  DELETE_TIMESHEET_SUCCESS,
  DELETE_TIMESHEET_FAILURE,
  DELETE_TIMESHEET_CANCEL
)<any, IResponse<null>, IResponse<null>, any>();

const updateTimesheetAction = createAsyncAction(
  UPDATE_TIMESHEET_REQUEST,
  UPDATE_TIMESHEET_SUCCESS,
  UPDATE_TIMESHEET_FAILURE,
  UPDATE_TIMESHEET_CANCEL
)<any, IResponse<null>, IResponse<null>, any>();

const getTimesheetDetailAction = createAsyncAction(
  GET_DETAIL_TIMESHEET_REQUEST,
  GET_DETAIL_TIMESHEET_SUCCESS,
  GET_DETAIL_TIMESHEET_FAILURE
)<any, IResponse<IResponseGetTimesheet>, IResponse<null>>();

export {
  createTimesheetAction,
  getTimesheetAction,
  deleteTimesheetAction,
  getTimesheetDetailAction,
  updateTimesheetAction,
};
