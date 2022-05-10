import   { AxiosResponse } from "axios";
import apis from "constants/apis";
import { axios } from "utils";

const fetchLogin = (body: IRequestAuthentication): Promise<AxiosResponse<IResponse<IResponseAuthentication>>> => axios.post(apis.authen, body)

export {
    fetchLogin
}