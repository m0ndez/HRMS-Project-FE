declare interface IEmployeeManagementPageProps {
  employeeGetDataList: IResponseGetEmployee[];
  employeeGetIsFetching: boolean;
  employeeGetCode: number;
}

declare interface IEmployeeManagementPageActionProps {
  employeeGet: () => void;
  setLoading: (state: boolean) => void;
  openToast: (state: IToastComponentProps) => void;
}

declare interface IEmployeeManagementFormComponentProps {
  employeeCreateCode: number;
  employeeDetailData: IResponseGetEmployeeDetail;
  employeeDetailCode: number;
  employeeDetailIsFetching: boolean;
  employeeUpdateCode: number
}

declare interface IEmployeeManagementFormComponentActionProps {
  cancelEmployeeCreate: () => void;
  employeeCreate: (body: IRequestCreateEmployee) => void;
  employeeDetailGet: (id: string) => void;
  clearEmployeeUpdate: () => void;
  employeeUpdate: (body: IResponseGetEmployeeDetail) => void;
}

declare interface IEmployeeManagementForm {
  id?: string;
  fname: string;
  lname: string;
  address: string;
  tel: string;
  sex: number;
  position: string;
  username: string;
  password: string;
}
