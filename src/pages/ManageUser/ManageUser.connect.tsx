import { connect } from "react-redux";
import ManageUser from "./ManageUser.screen";
import authenSelector from "reduxs/authentication/selector";
import { updateUser } from "reduxs/user/actions";
import { openToast } from "reduxs/toast/action";
import userSelector from "reduxs/user/selector";

const mapStateToProps = (state: RootReducers): IManageUserPageProps => {
  const selecterAuth = authenSelector.login(state);
  const selectorUser = userSelector.editUser(state);
  return {
    authenData: selecterAuth.data,
    updateUserCode: selectorUser.code,
    updateUserError: selectorUser.error,
    updateUserIsFetching: selectorUser.isFetching
  };
};

const mapDispatchToProps = {
  updateUser,
  openToast,
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageUser);
