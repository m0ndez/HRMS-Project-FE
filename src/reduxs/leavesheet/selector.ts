import { get } from "lodash";
import {
  createLeavesheetState,
  leavesheetState,
  leavesheetDeleteStatusState,
  leaveApproveState,
  leavesheetDetailState,
  leavesheetUpdateStatusState,
} from "./constants";

const create = (state: RootReducers): ReducerState<IResponseCreateLeavesheet> =>
  get(state, "leavesheet.create", createLeavesheetState);

const getAll = (state: RootReducers): ReducerState<IResponseGetLeavesheet[]> =>
  get(state, "leavesheet.getAll", leavesheetState);

const deleted = (state: RootReducers): ReducerState<null> =>
  get(state, "leavesheet.deleted", leavesheetDeleteStatusState);

const getAllLeaveApprove = (
  state: RootReducers
): ReducerState<IResponseGetLeaveApprove[]> =>
  get(state, "leavesheet.getAllApproveList", leaveApproveState);

const exportedObj = {
  create,
  getAll,
  deleted,
  getAllLeaveApprove,
};

export default exportedObj;
