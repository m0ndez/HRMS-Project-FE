import { AxiosResponse } from "axios";
import apis from "constants/apis";
import { axios } from "utils";

const createEmployeeService = (
  body: IRequestCreateEmployee
): Promise<AxiosResponse<IResponse<IResponseCreateEmployee>>> =>
  axios.post(`${apis.employee}`, body);

const getEmployeeService = (): Promise<
  AxiosResponse<IResponse<IResponseGetEmployee[]>>
> => axios.get(`${apis.employee}`);

const getEmployeeDetailService = (
  id: string
): Promise<AxiosResponse<IResponse<IResponseGetEmployeeDetail>>> =>
  axios.get(`${apis.employee}/${id}`);

const updateEmployeeService = (
  body: IResponseGetEmployeeDetail
): Promise<AxiosResponse<IResponse<null>>> =>
  axios.put(`${apis.employee}/${body.id}`, body);

export {
  createEmployeeService,
  getEmployeeService,
  getEmployeeDetailService,
  updateEmployeeService,
};
