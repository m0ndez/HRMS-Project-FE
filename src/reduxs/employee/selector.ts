import { get } from "lodash";
import {
  employeeCreateStatusState,
  employeeState,
  employeeUpdateStatusState,
} from "./constants";

const create = (state: RootReducers): ReducerState<IResponseCreateEmployee> =>
  get(state, "employee.create", employeeCreateStatusState);

const getAll = (state: RootReducers): ReducerState<IResponseGetEmployee[]> =>
  get(state, "employee.getAll", employeeState);

const detail = (
  state: RootReducers
): ReducerState<IResponseGetEmployeeDetail> =>
  get(state, "employee.detail", employeeState);

const update = (state: RootReducers): ReducerState<null> =>
  get(state, "employee.update", employeeUpdateStatusState);

const exportedObj = {
  create,
  getAll,
  detail,
  update,
};

export default exportedObj;
