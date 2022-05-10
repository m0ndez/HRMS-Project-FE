import axios, { AxiosError, AxiosRequestConfig, AxiosRequestTransformer, AxiosResponseTransformer, AxiosResponse } from "axios";
import { get, isEmpty } from "lodash";
import { apiResponse } from "utils";
import transformer from "./transformer";



const transformResponse: AxiosResponseTransformer = (data) => transformer.camelcaseTransform(JSON.parse(data))
const transformRequest: AxiosRequestTransformer = (data) => JSON.stringify(transformer.snakecaseTransform(data))


// Axios InterCeptor new  structure

const requestInterceptor = (config: AxiosRequestConfig): AxiosRequestConfig => {
    const contentTypes = !isEmpty(get(config, '[headers][Content-Type]', '')) ? get(config, '[headers][Content-Type]', '') : 'application/json'
    const configure: AxiosRequestConfig = {
        ...config,
        headers: {
            ...config.headers,
            ['Content-Type']: contentTypes,
        },
        transformResponse,
        transformRequest,
        url: config.url?.replace(/([^:])(\/\/)/g, '$1/')
    }
    return configure
}

const responseInterceptor = (response: AxiosResponse<IResponse>): AxiosResponse<IResponse> => {
    const data = apiResponse.converter(response)
    return { ...response, data }
}

const handleRequestError = (error: any) => {
    console.log('Request Error', error)
    return Promise.reject(error)
}


const handleResponseError = (error: AxiosError<IResponse>): Promise<IResponse> => {
    console.log('Response Error', error)
    const errorResponse = apiResponse.converter(error)
    // Handle error modal here
    return Promise.reject(errorResponse)
}

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_PROJECT_API_URL,
    timeout: 6000,
    responseType: 'json',
})

axiosInstance.interceptors.request.use(requestInterceptor, handleRequestError)
axiosInstance.interceptors.response.use(responseInterceptor, handleResponseError)


export default axiosInstance