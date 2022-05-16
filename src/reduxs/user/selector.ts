import { get } from "lodash";
import { editUserState } from "./constants";

const editUser = (state: RootReducers): ReducerState<null> =>
  get(state, "user.updateUser", editUserState);

const exportedObj = {
  editUser,
};

export default exportedObj;
