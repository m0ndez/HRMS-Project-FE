import axios, { AxiosResponse } from "axios";
import apis from "constants/apis";

const fetchLogin = (body: {}): Promise<AxiosResponse<IResponse<any>>> => axios.post(apis.mock, body)

export {
    fetchLogin
}