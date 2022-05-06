import axios, { AxiosResponse } from "axios";
import apis from "constants/apis";

const fetchLogin = (body: IRequestAuthentication): Promise<AxiosResponse<IResponse<IResponseAuthentication>>> => axios.post(apis.authen, body)

export {
    fetchLogin
}