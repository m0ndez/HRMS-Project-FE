import { AxiosResponse } from "axios";
import apis from "constants/apis";
import { axios } from "utils";

const fetchTimesheetService = (
  params: boolean = false
): Promise<AxiosResponse<IResponse<IResponseGetTimesheet[]>>> =>
  axios.get(`${apis.timesheet}`, {
    params: {
      isManager: params,
    },
  });

const deleteTimesheetService = (
  id: string
): Promise<AxiosResponse<IResponse<null>>> =>
  axios.delete(`${apis.timesheet}/${id}`);

const updateTimesheetService = (
  body: IRequestUpdateTimesheet
): Promise<AxiosResponse<IResponse<null>>> =>
  axios.put(`${apis.timesheet}/${body.workId}`, body);

const getTimesheetDetailService = (
  id: string
): Promise<AxiosResponse<IResponse<IResponseGetTimesheet>>> =>
  axios.get(`${apis.timesheet}/${id}`);

const createTimesheetService = (
  body: IRequestCreateTimesheet
): Promise<AxiosResponse<IResponse<IResponseCreateTimesheet>>> =>
  axios.post(`${apis.timesheet}`, body);

export {
  createTimesheetService,
  fetchTimesheetService,
  deleteTimesheetService,
  getTimesheetDetailService,
  updateTimesheetService,
};
