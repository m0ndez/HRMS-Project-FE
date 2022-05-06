import { AxiosError, AxiosResponse } from 'axios'
import { get, isEmpty } from 'lodash'
import { responseMessage } from '../constants/response'

const constants = {
    defaultError: 'กรุณาลองไหม่อีกครั้ง'
}


// New Structure Convert Message from API Only

const getMessage = (response: AxiosError<IResponse> | AxiosResponse<IResponse>): IResponseConverter => {
    if (isEmpty(get(response, 'response', {}))) {
        // Succes case
        const axiosResponse = response as AxiosResponse<IResponse>
        const messageCode: number = get(axiosResponse, 'data.code', get(response, 'status', 0))
        const status: number = +get(response, 'status', 0)
        const code: number = get(response, 'data.code', 0)
        return {
            code,
            message: get(responseMessage, messageCode, constants.defaultError),
            status,
        }
    } else {
        // Error case
        const axiosResponse = response as AxiosError<IResponse>
        /* const messageCode: number = get(axiosResponse, 'response.data.code', get(response, 'response.status', Number(get(response, 'code', 0)))) */
        const message: string = get(axiosResponse, 'response.data.message', '')
        const status: number = get(response, 'response.status', Number(get(response, 'code', 0)))
        const code: number = get(response, 'response.data.code', Number(get(response, 'code', 0)))
        return {
            code,
            message: message /* get(responseMessage.EN, messageCode, constants.EN.defaultError) */,
            status,
        }

    }
}

const responseConverter = { getMessage }
export default responseConverter
