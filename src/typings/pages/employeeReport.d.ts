declare interface IEmployeeReportPageProps {
  employeeGetDataList: IResponseGetEmployee[];
  employeeGetIsFetching: boolean;
  employeeGetCode: number;
  employeeReportDataList: IResponseEmployeeReport[]
  employeeReportCode: number
  employeeReportIsFetching: boolean
}

declare interface IEmployeeReportPageActionProps {
  employeeGet: () => void;
  getEmployeeReport: () => void
  cancelGetEmployeeReport: () => void
}
