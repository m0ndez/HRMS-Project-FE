import { AxiosError, AxiosResponse } from 'axios'
import { get, isEmpty } from 'lodash'
import { responseMessage } from 'constants/response'

const constants = {
    defaultError: 'กรุณาลองใหม่อีกครั้ง',
}

const converter = (response: AxiosError<IResponse> | AxiosResponse<IResponse>): IResponse => {

    if (isEmpty(get(response, 'response', {}))) {
        // Succes case
        const axiosResponse = response as AxiosResponse<IResponse>
        const messageCode: number = get(axiosResponse, 'data.code', get(axiosResponse, 'response.status', 0))
        const code: number = get(axiosResponse, 'data.code', 0)
        const data: any = get(axiosResponse, 'data.data', {})
        return {
            code,
            message: get(responseMessage, messageCode, constants.defaultError),
            // devMessage: constants.defaultError,
            data,
        }
    } else {
        // Error case
        const axiosResponse = response as AxiosError<IResponse>
        const messageCode: number = get(
            axiosResponse,
            'response.data.code',
            get(
                axiosResponse,
                'response.status',
                Number(get(axiosResponse, 'code', 0))
            )
        )
        const code: number = get(axiosResponse, 'response.data.code', Number(get(response, 'code', 0)))
        const data: any = get(
            axiosResponse,
            'response.data.data',
            get(
                axiosResponse,
                'response.statusText',
                get(axiosResponse, 'message', 0)
            )
        )
        return {
            code,
            data,
            message: get(responseMessage, messageCode, constants.defaultError),
            // devMessage: constants.defaultError,
        }

    }
}

const message = { converter }
export default message