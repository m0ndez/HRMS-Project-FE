import { connect } from "react-redux";
import LeaveApprove from "./LeaveApprove.page";
import { setLoading } from "reduxs/loader/action";
import { openToast } from "reduxs/toast/action";

import {
  clearGetLeavesheetApprove,
  getAllLeaveApprove,
} from "reduxs/leavesheet/actions";
import LeaveApproveSelector from "reduxs/leavesheet/selector";

const mapStateToProps = (state: RootReducers): ILeaveApprovePageProps => {
  const leaveApproveSelector = LeaveApproveSelector.getAllLeaveApprove(state);
  return {
    leaveApproveCode: leaveApproveSelector.code,
    leaveApproveDataList: leaveApproveSelector.data,
  };
};

const mapDispatchToProps: ILeaveApprovePageActionProps = {
  clearGetLeavesheetApprove,
  getAllLeaveApprove,
  setLoading,
  openToast,
};

export default connect(mapStateToProps, mapDispatchToProps)(LeaveApprove);
