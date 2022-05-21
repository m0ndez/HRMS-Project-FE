declare interface ILeaveApprovePageProps {
  leaveApproveDataList: IResponseGetLeaveApprove[];
  leaveApproveCode: number;
}

declare interface ILeaveApprovePageActionProps {
  clearGetLeavesheetApprove: () => void;
  getAllLeaveApprove: () => void;
  openToast: (state: IToastComponentProps) => void
  setLoading: (state: boolean) => void
}
