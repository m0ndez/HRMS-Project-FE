declare interface ILeavesheetStore {
  create: ReducerState<IResponseCreateLeavesheet>;
  getAll: ReducerState<IResponseGetLeavesheet[]>;
  deleted: ReducerState<null>;
  getAllApproveList: ReducerState<IResponseGetLeaveApprove[]>;
  // detail: ReducerState<IResponseGetLeavesheet[]>;
  // update: ReducerState<null>;
}

declare interface ILeaveApproveStore {
  getAll: ReducerState<IResponseGetLeaveApprove[]>;
}
