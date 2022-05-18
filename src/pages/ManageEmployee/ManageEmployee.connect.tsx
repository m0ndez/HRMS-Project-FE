import { connect } from "react-redux";
import ManageEmployee from "./ManageEmployee.screen";

const mapStateToProps = (state: RootReducers): IEmployeeManagementPageProps => {
  return {};
};

const mapDispatchToProps: IEmployeeManagementPageActionProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ManageEmployee);
