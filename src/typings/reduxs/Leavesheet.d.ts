declare interface ILeavesheetStore {
  create: ReducerState<IResponseCreateLeavesheet>;
  getAll: ReducerState<IResponseGetLeavesheet[]>;
  deleted: ReducerState<null>;
  // detail: ReducerState<IResponseGetLeavesheet[]>;
  // update: ReducerState<null>;
}
