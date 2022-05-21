import { connect } from "react-redux";
import ManageEmployee from "./ManageEmployee.screen";
import { employeeGet } from "reduxs/employee/actions";
import EmployeeSelector from "reduxs/employee/selector";
import { setLoading } from "reduxs/loader/action";
import { openToast } from "reduxs/toast/action";

const mapStateToProps = (state: RootReducers): IEmployeeManagementPageProps => {
  const employeeGetSelector = EmployeeSelector.getAll(state);
  return {
    employeeGetCode: employeeGetSelector.code,
    employeeGetDataList: employeeGetSelector.data,
    employeeGetIsFetching: employeeGetSelector.isFetching,
  };
};

const mapDispatchToProps: IEmployeeManagementPageActionProps = {
  employeeGet,
  setLoading,
  openToast,
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageEmployee);
