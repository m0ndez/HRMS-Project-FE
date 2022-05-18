import { get } from "lodash";
import {
  createLeavesheetState,
  leavesheetState,
  leavesheetDeleteStatusState,
  leavesheetDetailState,
  leavesheetUpdateStatusState,
} from "./constants";

const create = (state: RootReducers): ReducerState<IResponseCreateLeavesheet> =>
  get(state, "leavesheet.create", createLeavesheetState);

const getAll = (state: RootReducers): ReducerState<IResponseGetLeavesheet[]> =>
  get(state, "leavesheet.getAll", leavesheetState);

const deleted = (state: RootReducers): ReducerState<null> =>
  get(state, "leavesheet.deleted", leavesheetDeleteStatusState);

const exportedObj = {
  create,
  getAll,
  deleted,
};

export default exportedObj;
