declare interface ITimesheetPageProps {
  deleteTimesheetIsFetching: boolean;
  deleteTimeSheetCode: number;
  timesheetDataList: IResponseGetTimesheet[];
}

declare interface ITimesheetPageActionProps {
  getAllTimesheet: (params?: boolean) => void;
  deleteTimesheet: (id: string) => void;
  clearDeleteTimesheet: () => void
 
}

declare interface ITimesheetCreatePageProps {
  createTimesheetIsFetching: boolean
  createTimesheetError: string
  createTimesheetData: IResponseCreateTimesheet
  createTimesheetCode: number
  detailTimesheetData: IResponseGetTimesheet
  detailTimesheetCode: number
  detailTimesheetError: string
  detailTimesheetIsFetching: boolean
  updateTimesheetIsFetching: boolean
  updateTimesheetError: string
  updateTimesheetCode: number
}

declare interface ITimesheetCreatePageActionProps {
  createTimesheet: (body: IRequestCreateTimesheet) => void;
  getDetailTimesheet: (id: string) => void
  clearCreateTimesheet: () => void
  updateTimesheet: (body: IRequestUpdateTimesheet) => void
  clearUpdateTimesheet: () => void
}

declare interface ITimesheetForm {
  workDate: string | Date;
  workDetail: string;
  workHours: number;
}
