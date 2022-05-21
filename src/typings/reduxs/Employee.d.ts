declare interface IEmployeeStore {
  create: ReducerState<IResponseEmployeeCreate>;
  getAll: ReducerState<IResponseGetEmployee[]>;
  detail: ReducerState<IResponseGetEmployeeDetail>;
  update: ReducerState<null>
}
