declare interface ReducerState<T> {
  isFetching: boolean;
  data: T;
  error: string;
  code: number;
  // status: number
}

declare interface RootReducers {
  authentication: IAuthenticationStore;
  loader: ILoaderStore;
  toast: IToastStore;
  user: IUserStore;
  timesheet: ITimesheetStore;
  leavesheet: ILeavesheetStore;
  employee: IEmployeeStore;
  report: IReportStore
}
