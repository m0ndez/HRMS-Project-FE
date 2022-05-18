import { get } from "lodash";
import {
  createTimesheetState,
  timesheetState,
  timesheetDeleteStatusState,
  timesheetDetailState,
  timesheetUpdateStatusState,
} from "./constants";

const create = (state: RootReducers): ReducerState<IResponseCreateTimesheet> =>
  get(state, "timesheet.create", createTimesheetState);

const getAll = (state: RootReducers): ReducerState<IResponseGetTimesheet[]> =>
  get(state, "timesheet.getAll", timesheetState);

const deleted = (state: RootReducers): ReducerState<null> =>
  get(state, "timesheet.deleted", timesheetDeleteStatusState);

const detail = (state: RootReducers): ReducerState<IResponseGetTimesheet> =>
  get(state, "timesheet.detail", timesheetDetailState);

const update = (state: RootReducers): ReducerState<null> =>
  get(state, "timesheet.update", timesheetUpdateStatusState);

const exportedObj = {
  create,
  getAll,
  deleted,
  detail,
  update,
};

export default exportedObj;
