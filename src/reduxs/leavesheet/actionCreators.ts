import { createAsyncAction } from "typesafe-actions";
import {
  GET_ALL_LEAVESHEET_REQUEST,
  GET_ALL_LEAVESHEET_SUCCESS,
  GET_ALL_LEAVESHEET_FAILURE,
  POST_CREATE_LEAVESHEET_REQUEST,
  POST_CREATE_LEAVESHEET_SUCCESS,
  POST_CREATE_LEAVESHEET_FAILURE,
  POST_CREATE_LEAVESHEET_CANCEL,
  UPDATE_LEAVESHEET_REQUEST,
  UPDATE_LEAVESHEET_SUCCESS,
  UPDATE_LEAVESHEET_FAILURE,
  UPDATE_LEAVESHEET_CANCEL,
  DELETE_LEAVESHEET_REQUEST,
  DELETE_LEAVESHEET_SUCCESS,
  DELETE_LEAVESHEET_FAILURE,
  DELETE_LEAVESHEET_CANCEL,
  GET_DETAIL_LEAVESHEET_REQUEST,
  GET_DETAIL_LEAVESHEET_SUCCESS,
  GET_DETAIL_LEAVESHEET_FAILURE,
} from "./constants";

const createLeavesheetAction = createAsyncAction(
  POST_CREATE_LEAVESHEET_REQUEST,
  POST_CREATE_LEAVESHEET_SUCCESS,
  POST_CREATE_LEAVESHEET_FAILURE,
  POST_CREATE_LEAVESHEET_CANCEL
)<any, IResponse<IResponseCreateLeavesheet>, IResponse<null>, any>();

const getLeavesheetAction = createAsyncAction(
  GET_ALL_LEAVESHEET_REQUEST,
  GET_ALL_LEAVESHEET_SUCCESS,
  GET_ALL_LEAVESHEET_FAILURE
)<any, IResponse<IResponseGetTimesheet[]>, IResponse<null>>();

const deleteLeavesheetAction = createAsyncAction(
  DELETE_LEAVESHEET_REQUEST,
  DELETE_LEAVESHEET_SUCCESS,
  DELETE_LEAVESHEET_FAILURE,
  DELETE_LEAVESHEET_CANCEL
)<any, IResponse<null>, IResponse<null>, any>();

export { createLeavesheetAction, getLeavesheetAction, deleteLeavesheetAction };