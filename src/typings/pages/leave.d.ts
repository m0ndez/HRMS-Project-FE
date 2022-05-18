declare interface ILeavePageComponentProps {
  leavesheetDataList: IResponseGetLeavesheet[];
  leavesheetCode: number;
  leavesheetError: string;
  leavesheetIsFetching: boolean;
  deletedLeavesheetCode: number;
  deletedLeavesheetIsFetching: boolean;
}
declare interface ILeavePageComponentActionProps {
  getAllLeavesheet: (params?: boolean) => void;
  deleteLeavesheet: (id: string) => void;
  clearDeleteTimesheet: () => void;
}

declare interface ILeaveFormComponentProps {
  createLeavesheetCode: number;
  createLeavesheetError: string;
  createLeavesheetIsFetching: boolean;
  createLeavesheetData: IResponseCreateLeavesheet;
}

declare interface ILeaveFormComponentActionProps {
  clearCreateLeavesheet: () => void;
  createLeavesheet: (body: IRequestCreateLeavesheet) => void;
}

declare interface ILeaveForm {
  leaveStart: string | Date;
  leaveEnd: string | Date;
  leaveRemark: string;
}
