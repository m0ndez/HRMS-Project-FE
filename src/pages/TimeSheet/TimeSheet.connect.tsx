import { connect } from "react-redux";
import TimeSheet from "./TimeSheet.page";
import {
  getAllTimesheet,
  deleteTimesheet,
  clearDeleteTimesheet,
} from "reduxs/timesheet/actions";
import TimesheetSelector from "reduxs/timesheet/selector";

const mapStateToProps = (state: RootReducers): ITimesheetPageProps => {
  const timesheetSelector = TimesheetSelector.getAll(state);
  const timesheetDeleteSelector = TimesheetSelector.deleted(state);
  return {
    timesheetDataList: timesheetSelector.data,
    deleteTimesheetIsFetching: timesheetDeleteSelector.isFetching,
    deleteTimeSheetCode: timesheetDeleteSelector.code,
  };
};

const mapDispatchToProps: ITimesheetPageActionProps = {
  getAllTimesheet,
  deleteTimesheet,
  clearDeleteTimesheet,
};

export default connect(mapStateToProps, mapDispatchToProps)(TimeSheet);
