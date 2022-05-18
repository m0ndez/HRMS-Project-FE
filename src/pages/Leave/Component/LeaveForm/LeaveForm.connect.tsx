import LeaveForm from "./LeaveForm.component";
import { connect } from "react-redux";
import {
  clearCreateLeavesheet,
  createLeavesheet,
} from "reduxs/leavesheet/actions";
import LeavesheetSelectore from "reduxs/leavesheet/selector";

const mapStateToProps = (state: RootReducers): ILeaveFormComponentProps => {
  const leavesheetCreateSelector = LeavesheetSelectore.create(state);
  return {
    createLeavesheetCode: leavesheetCreateSelector.code,
    createLeavesheetData: leavesheetCreateSelector.data,
    createLeavesheetError: leavesheetCreateSelector.error,
    createLeavesheetIsFetching: leavesheetCreateSelector.isFetching,
  };
};

const mapDispatchToProps: ILeaveFormComponentActionProps = {
  clearCreateLeavesheet,
  createLeavesheet,
};

export default connect(mapStateToProps, mapDispatchToProps)(LeaveForm);
