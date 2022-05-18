import { AxiosResponse } from "axios";
import apis from "constants/apis";
import { axios } from "utils";

const createLeavesheetService = (
  body: IRequestCreateLeavesheet
): Promise<AxiosResponse<IResponse<IResponseCreateLeavesheet>>> =>
  axios.post(`${apis.leavesheet}`, body);

const updateLeavesheetService = (
  body: IRequestUpdateLeavesheet
): Promise<AxiosResponse<IResponse<null>>> =>
  axios.put(`${apis.leavesheet}/${body.leaveId}`, body);

const fetchLeavesheetService = (params: boolean = false) =>
  axios.get(`${apis.leavesheet}`, {
    params: {
      isManager: params,
    },
  });

const deleteLeavesheetService = (
  id: string
): Promise<AxiosResponse<IResponse<null>>> =>
  axios.delete(`${apis.leavesheet}/${id}`);

export {
  createLeavesheetService,
  updateLeavesheetService,
  fetchLeavesheetService,
  deleteLeavesheetService,
};
