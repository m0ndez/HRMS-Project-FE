declare interface IRequestCreateLeavesheet {
  leaveStart: string;
  leaveEnd: string;
  leaveRemark: string;
}

declare interface IRequestUpdateLeavesheet {
  leaveId: string;
  leaveStart: string;
  leaveEnd: string;
  leaveRemark: string;
}

declare interface IResponseCreateLeavesheet {
  leaveId: string;
}

declare interface IResponseGetLeavesheet {
  leaveId: string;
  leaveCreated: string;
  leaveStart: string;
  leaveEnd: string;
  leaveRemark: number;
  leaveApproved: boolean;
  leaveCreatedBy?: string;
}

declare interface IResponseGetLeaveApprove {
  leaveId: string;
  leaveCreated: string;
  leaveStart: string;
  leaveEnd: string;
  leaveRemark: string;
  leaveApproved: boolean;
  leaveFullname: string;
}
