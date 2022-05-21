import { connect } from "react-redux";
import EmployeeForm from "./EmployeeForm.screen";
import {
  cancelEmployeeCreate,
  employeeCreate,
  employeeDetailGet,
  employeeUpdate,
  clearEmployeeUpdate,
} from "reduxs/employee/actions";
import EmployeeSelector from "reduxs/employee/selector";

const mapStateToProps = (
  state: RootReducers
): IEmployeeManagementFormComponentProps => {
  const employeeCreateSelector = EmployeeSelector.create(state);
  const employeeDetailSelector = EmployeeSelector.detail(state);
  const employeeUpdateSelector = EmployeeSelector.update(state);
  return {
    employeeCreateCode: employeeCreateSelector.code,
    employeeDetailData: employeeDetailSelector.data,
    employeeDetailIsFetching: employeeDetailSelector.isFetching,
    employeeDetailCode: employeeDetailSelector.code,
    employeeUpdateCode: employeeUpdateSelector.code,
  };
};
const mapDispatchToProps: IEmployeeManagementFormComponentActionProps = {
  cancelEmployeeCreate,
  employeeCreate,
  employeeDetailGet,
  clearEmployeeUpdate,
  employeeUpdate
};

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeForm);
