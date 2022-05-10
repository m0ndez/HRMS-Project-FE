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

const transformResponse: AxiosResponseTransformer = (data) => transformer.camelcaseTransform(JSON.parse(data))
const transformRequest: AxiosRequestTransformer = (data) => JSON.stringify(transformer.snakecaseTransform(data))

const apiEnvironmentUrl: string = String(import.meta.env.VITE_PROJECT_API_URL) || 'http://localhost:5000/api'

const requestInterceptor = (config: AxiosRequestConfig): AxiosRequestConfig | Promise<AxiosRequestConfig> => {
    const configure: AxiosRequestConfig = {
        ...config,
        headers: {
            ...config.headers,
            ['Content-Type']: 'application/json'
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
    console.log('Request Success', { ...response, data })
    return { ...response, data }
}


const errorResponseHandler = (_: Store) => (error: AxiosError<IResponse>) => {
    const errorResponse = apiResponse.converter(error)
    console.log('Request Error', errorResponse)
    return Promise.reject(errorResponse)
}


const intercepterConfiguration = (config: any, store: any) => {
    axios.defaults.responseType = 'json'
    axios.defaults.baseURL = apiEnvironmentUrl
    axios.defaults.timeout = 60000
    axios.interceptors.request.use(requestInterceptor, errorRequestHandler)
    axios.interceptors.response.use(responseInterceptor, errorResponseHandler(store))

}

export default intercepterConfiguration