import { connect } from "react-redux";
import ChangePassword from "./ChangePassword.page";
import { changePassword } from "reduxs/user/actions";
import AuthenSelector from "reduxs/authentication/selector";

const mapStateToProps = (state: RootReducers): IChangePasswordPageProps => {
  const authenSelector = AuthenSelector.login(state);
  return {
    authenData: authenSelector.data,
  };
};

const mapDispatchToProps: IChangePasswordPageActionProps = {
  changePassword,
};

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);
