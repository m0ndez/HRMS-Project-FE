import { connect } from "react-redux";
import { login } from "reduxs/authentication/actions";
import { setLoading } from "reduxs/loader/action";
import LoginPage from "./Login.page";
import authenSelector from "../../reduxs/authentication/selector";

const mapStateToProps = (state: RootReducers): ILoginPageProps => {
  const { isFetching, error, code } = authenSelector.login(state);

  return {
    authenCode: code,
    authenError: error,
    authenIsFetching: isFetching,
  };
};

const mapDispatchToProps: ILoginPageActionProps = {
  login,
  setLoading,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
