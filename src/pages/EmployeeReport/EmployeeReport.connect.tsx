import { connect } from "react-redux";
import EmployeeReport from "./EmployeeReport.screen";
import EmployeeSelector from "reduxs/employee/selector";
import ReportSelector from "reduxs/report/selector";
import { employeeGet } from "reduxs/employee/actions";
import {
  getEmployeeReport,
  cancelGetEmployeeReport,
} from "reduxs/report/actions";

const mapStateToProps = (state: RootReducers): IEmployeeReportPageProps => {
  const employeeGetSelector = EmployeeSelector.getAll(state);
  const employeeReportSelector = ReportSelector.employeeReport(state);
  return {
    employeeGetCode: employeeGetSelector.code,
    employeeGetDataList: employeeGetSelector.data,
    employeeGetIsFetching: employeeGetSelector.isFetching,
    employeeReportCode: employeeReportSelector.code,
    employeeReportDataList: employeeReportSelector.data,
    employeeReportIsFetching: employeeReportSelector.isFetching,
  };
};

const mapDispatchToProps: IEmployeeReportPageActionProps = {
  employeeGet,
  getEmployeeReport,
  cancelGetEmployeeReport,
};

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeReport);
