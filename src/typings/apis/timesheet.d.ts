declare interface IRequestCreateTimesheet {
  workDate: string;
  workDetail: string;
  workHours: number;
}

declare interface IRequestUpdateTimesheet {
  workId: string
  workDate: string;
  workDetail: string;
  workHours: number;
}

declare interface IResponseCreateTimesheet {
  workId: string;
}

declare interface IResponseGetTimesheet {
  workId: string;
  workCreated: string;
  workDate: string;
  workDetail: string;
  workHours: number;
  workEdited: string;
  workCreatedBy?: string;
}
