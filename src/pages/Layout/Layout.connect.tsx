import { connect } from "react-redux";
import Layout from "./Layout.page";
import authenSelector from "reduxs/authentication/selector";
import { logout } from "reduxs/authentication/actions";

const mapStateToProps = (state: RootReducers): ILayoutPageProps => {
  const selectorAuthen = authenSelector.login(state);
  return {
    authenData: selectorAuthen.data,
  };
};

const mapDispatchToProps: ILayoutActionProps = {
  logout
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
