import { connect } from "react-redux";
import {
  createTimesheet,
  getDetailTimesheet,
  updateTimesheet,
  clearCreateTimesheet,
  clearUpdateTimesheet,

} from "reduxs/timesheet/actions";
import TimeSheetForm from "./TimeSheetFormCreate.component";
import TimesheetSelector from "reduxs/timesheet/selector";

const mapStateToProps = (state: RootReducers): ITimesheetCreatePageProps => {
  const timesheetCreateSeletor = TimesheetSelector.create(state);
  const timesheetDetailSeletor = TimesheetSelector.detail(state);
  const timesheetUpdateSelector = TimesheetSelector.update(state);
  return {
    createTimesheetCode: timesheetCreateSeletor.code,
    createTimesheetData: timesheetCreateSeletor.data,
    createTimesheetError: timesheetCreateSeletor.error,
    createTimesheetIsFetching: timesheetCreateSeletor.isFetching,
    detailTimesheetCode: timesheetDetailSeletor.code,
    detailTimesheetData: timesheetDetailSeletor.data,
    detailTimesheetError: timesheetDetailSeletor.error,
    detailTimesheetIsFetching: timesheetDetailSeletor.isFetching,
    updateTimesheetCode: timesheetUpdateSelector.code,
    updateTimesheetError: timesheetUpdateSelector.error,
    updateTimesheetIsFetching: timesheetUpdateSelector.isFetching,
  };
};

const mapDispatchToProps: ITimesheetCreatePageActionProps = {
  createTimesheet,
  getDetailTimesheet,
  clearCreateTimesheet,
  updateTimesheet,
  clearUpdateTimesheet,
};

export default connect(mapStateToProps, mapDispatchToProps)(TimeSheetForm);
