declare interface ITimesheetStore {
  create: ReducerState<IResponseCreateTimesheet>;
  getAll: ReducerState<IResponseGetTimesheet[]>;
  detail: ReducerState<IResponseGetTimesheet>;
  deleted: ReducerState<null>;
  update: ReducerState<null>;
}
