import axios, {
    AxiosRequestConfig,
    // AxiosTransformer,
    AxiosRequestTransformer,
    AxiosResponseTransformer,
    AxiosResponse,
    AxiosError,
    HeadersDefaults,
} from 'axios'
import { get } from 'lodash'
import { Store } from 'redux'
import { transformer, apiResponse } from '../utils'

interface IAxiosDefaultHeader extends HeadersDefaults {
    'Content-Type': string
}

const transformResponse: AxiosResponseTransformer = (data) => transformer.camelcaseTransform(JSON.parse(data))
const transformRequest: AxiosRequestTransformer = (data) => JSON.stringify(transformer.snakecaseTransform(data))

const apiEnvironmentUrl: string = String(import.meta.env.VITE_PROJECT_API_URL) || 'http://localhost:5000/api'

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
    console.log('Interceptor', response)
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
    axios.defaults.baseURL = apiEnvironmentUrl
    axios.defaults.headers = {
        "Content-Type": 'application/json'
    } as IAxiosDefaultHeader
    // axios.defaults.headers['node'] = 'dipsy'
    // axios.defaults.headers['Content-Type'] = 'application/json'
    axios.interceptors.request.use(requestInterceptor, errorRequestHandler)
    axios.interceptors.response.use(responseInterceptor, errorResponseHandler(store))
    axios.defaults.timeout = 60000

}

export default intercepterConfiguration