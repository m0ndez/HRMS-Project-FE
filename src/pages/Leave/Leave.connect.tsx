import { connect } from "react-redux";
import Leave from "./Leave.page";
import {
  getAllLeavesheet,
  deleteLeavesheet,
  clearDeleteTimesheet,
} from "reduxs/leavesheet/actions";
import LeavesheetSelector from "reduxs/leavesheet/selector";

const mapStateToProps = (state: RootReducers): ILeavePageComponentProps => {
  const leavesheetSelector = LeavesheetSelector.getAll(state);
  const deleteLeavesheetSelector = LeavesheetSelector.deleted(state);
  return {
    leavesheetCode: leavesheetSelector.code,
    leavesheetDataList: leavesheetSelector.data,
    leavesheetError: leavesheetSelector.error,
    leavesheetIsFetching: leavesheetSelector.isFetching,
    deletedLeavesheetCode: deleteLeavesheetSelector.code,
    deletedLeavesheetIsFetching: deleteLeavesheetSelector.isFetching,
  };
};

const mapDispatchToProps: ILeavePageComponentActionProps = {
  getAllLeavesheet,
  deleteLeavesheet,
  clearDeleteTimesheet,
};

export default connect(mapStateToProps, mapDispatchToProps)(Leave);
