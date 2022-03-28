import axios, {
    AxiosRequestConfig,
    // AxiosTransformer,
    AxiosRequestTransformer,
    AxiosResponseTransformer,
    AxiosResponse,
    AxiosError,
} from 'axios'
import { get } from 'lodash'
import { Store } from 'redux'
import { transformer, apiResponse } from '../utils'

const transformResponse: AxiosResponseTransformer = transformer.camelcaseTransform
const transformRequest: AxiosRequestTransformer = (data) => JSON.stringify(transformer.snakecaseTransform(data))

const requestInterceptor = (config: AxiosRequestConfig): AxiosRequestConfig | Promise<AxiosRequestConfig> => {
    const configure: AxiosRequestConfig = {
        ...config,
        headers: {
            ...config.headers,
        },
        transformResponse,
        transformRequest,
        url: config.url?.replace(/([^:])(\/\/)/g, '$1/'),
    }
    return configure
}

const errorRequestHandler = (error: any) => Promise.reject(error)

const responseInterceptor = (response: AxiosResponse<IResponse>): AxiosResponse<IResponse> => {
    const data = apiResponse.converter(response)
    return { ...response, data }
}


const errorResponseHandler = (_: Store) => (error: AxiosError<IResponse>) => {
    const errorResponse = apiResponse.converter(error)
    const axiosResponse: AxiosResponse<IResponse> = get(error, 'response', {
        data: errorResponse,
        status: errorResponse.code,
        statusText: errorResponse.devMessage,
        headers: get(error, 'response.headers', {}),
        config: get(error, 'response.config', {}),
        request: get(error, 'response.request', {}),
    })
    const errorConverted: AxiosError<IResponse> = {
        ...error,
        response: axiosResponse,
    }
    return Promise.reject(errorConverted)
}

const intercepterConfiguration = (config: any, store: any) => {
    axios.defaults.responseType = 'json'
    axios.defaults.baseURL = import.meta.env.VITE_PORJECT_API_URL
    // axios.defaults.headers['node'] = 'dipsy'
    // axios.defaults.headers['Content-Type'] = 'application/json'
    axios.interceptors.request.use(requestInterceptor, errorRequestHandler)
    axios.interceptors.response.use(responseInterceptor, errorResponseHandler(store))
    axios.defaults.timeout = 60000

}

export default intercepterConfiguration