import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse
} from 'axios'
import { appConfig } from '../../utils/appConfig'

class HttpClient {
  private client: AxiosInstance

  constructor() {
    this.client = axios.create({
      baseURL: appConfig.api.baseUrl
    })
  }

  async get<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.client.get<T>(url, config)
  }

  async post<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.client.post<T>(url, data, config)
  }

  async put<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.client.put<T>(url, data, config)
  }

  async delete<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.client.delete<T>(url, config)
  }

}

export const httpClient = new HttpClient()
