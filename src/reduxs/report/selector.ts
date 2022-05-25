import { get } from "lodash";
import { reportEmployeeState } from "./constants";

const employeeReport = (
  state: RootReducers
): ReducerState<IResponseEmployeeReport[]> =>
  get(state, "report.employeeReport", reportEmployeeState);

const exportedObj = {
  employeeReport,
};

export default exportedObj;
