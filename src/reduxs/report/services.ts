import { AxiosResponse } from "axios";
import apis from "constants/apis";
import { axios } from "utils";

const getEmployeeReportService = (): Promise<
  AxiosResponse<IResponse<IResponseEmployeeReport[]>>
> => axios.get(`${apis.report}/employee`);

export { getEmployeeReportService };
