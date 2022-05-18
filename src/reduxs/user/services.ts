import { AxiosResponse } from "axios";
import apis from "constants/apis";
import { axios } from "utils";

const putUser = (
  body: IRequestEditUser
): Promise<AxiosResponse<IResponse<IResponseAuthentication>>> =>
  axios.put(`${apis.user}/${body.id}`, body);

const putChangPassowrd = (
  body: IRequestChangePassword
): Promise<AxiosResponse<IResponse<null>>> =>
  axios.put(`${apis.user}/${body.id}/passowrd`, body);

export { putUser, putChangPassowrd };
