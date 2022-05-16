import { AxiosResponse } from "axios";
import apis from "constants/apis";
import { axios } from "utils";

const fetchLogin = (
  body: IRequestAuthentication
): Promise<AxiosResponse<IResponse<IResponseAuthentication & IToken>>> =>
  axios.post(apis.authen, body);

export { fetchLogin };
