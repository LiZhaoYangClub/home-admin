import type { AxiosInstance, AxiosResponse } from 'axios'
import type { RequestOptions, Result, UploadFileParams, CreateAxiosOptions } from '/#/axios'
import axios from 'axios'
import qs from 'qs'
import { AxiosCanceler } from './axios-cancel'
import { isFunction } from '/@/utils/is'
import cloneDeep from 'lodash.clonedeep'
import omit from 'lodash.omit'
import { ContentTypeEnum, RequestEnum } from './enum'

/**
 * @description:  axios module
 */
export class VAxios {
  private axiosInstance: AxiosInstance
  private readonly options: CreateAxiosOptions

  constructor(options: CreateAxiosOptions) {
    this.options = options
    this.axiosInstance = axios.create(options)
    this.setupInterceptors()
  }

  /**
   * @description:  Create axios instance
   */
  private createAxios(config: CreateAxiosOptions): void {
    this.axiosInstance = axios.create(config)
  }

  private getTransform() {
    const { transform } = this.options
    return transform
  }

  getAxios(): AxiosInstance {
    return this.axiosInstance
  }

  /**
   * @description: Reconfigure axios
   */
  configAxios(config: CreateAxiosOptions) {
    if (!this.axiosInstance) {
      return
    }
    this.createAxios(config)
  }

  /**
   * @description: Set general header
   */
  setHeader(headers: any): void {
    if (!this.axiosInstance) {
      return
    }
    Object.assign(this.axiosInstance.defaults.headers, headers)
  }

  /**
   * @description: Interceptor configuration
   */
  private setupInterceptors() {
    const transform = this.getTransform()
    if (!transform) {
      return
    }
    const {
      requestInterceptors,
      requestInterceptorsCatch,
      responseInterceptors,
      responseInterceptorsCatch
    } = transform

    const axiosCanceler = new AxiosCanceler()

    // Request interceptor configuration processing
    this.axiosInstance.interceptors.request.use((config: CreateAxiosOptions) => {
      // If cancel repeat request is turned on, then cancel repeat request is prohibited
      const ignoreCancelToken = config?.headers?.ignoreCancelToken

      const ignoreCancel =
        ignoreCancelToken !== undefined
          ? ignoreCancelToken
          : this.options.requestOptions?.ignoreCancelToken

      !ignoreCancel && axiosCanceler.addPending(config)
      if (requestInterceptors && isFunction(requestInterceptors)) {
        config = requestInterceptors(config, this.options)
      }
      return config
    }, undefined)

    // Request interceptor error capture
    requestInterceptorsCatch &&
      isFunction(requestInterceptorsCatch) &&
      this.axiosInstance.interceptors.request.use(undefined, requestInterceptorsCatch)

    // Response result interceptor processing
    this.axiosInstance.interceptors.response.use((res: AxiosResponse<any>) => {
      res && axiosCanceler.removePending(res.config)
      if (responseInterceptors && isFunction(responseInterceptors)) {
        res = responseInterceptors(res)
      }
      return res
    }, undefined)

    // Response result interceptor error capture
    responseInterceptorsCatch &&
      isFunction(responseInterceptorsCatch) &&
      this.axiosInstance.interceptors.response.use(undefined, responseInterceptorsCatch)
  }

  /**
   * @description:  File Upload
   */
  uploadFile<T = any>(config: CreateAxiosOptions, params: UploadFileParams) {
    const formData = new window.FormData()

    if (params.data) {
      Object.keys(params.data).forEach(key => {
        if (!params.data) return
        const value = params.data[key]
        if (Array.isArray(value)) {
          value.forEach(item => {
            formData.append(`${key}[]`, item)
          })
          return
        }
        formData.append(key, params.data[key])
      })
    }
    formData.append(params.name || 'file', params.file, params.filename)
    const customParams = omit(params, 'file', 'filename', 'file')

    Object.keys(customParams).forEach(key => {
      formData.append(key, customParams[key])
    })

    return this.axiosInstance.request<T>({
      ...config,
      method: 'POST',
      data: formData,
      headers: {
        'Content-type': ContentTypeEnum.FORM_DATA
      }
    })
  }

  /**
   * @description: ????????????
   * @param {*} url
   * @param {*} params
   * @return {*}
   */
  async download(url: string, params: any) {
    try {
      const res: any = await this.get(
        {
          url,
          params,
          responseType: 'arraybuffer' // ?????????????????????????????? responseType: 'arraybuffer'
        },
        {
          isReturnNativeResponse: true,
          formatDate: false
        }
      )
      // ????????????blob?????????????????????
      const blob = new Blob([res.data])
      // ?????????????????????????????????
      const disposition = res.headers['content-disposition']
      const fileName = decodeURI(
        disposition.substring(disposition.indexOf('filename=') + 9, disposition.length)
      )
      // ??????<a>??????????????? Firefox ??? Chrome???????????? ?????? download ??????
      // IE10????????????blob?????????????????????download
      if ('download' in document.createElement('a')) {
        // ??????a??????download????????????
        const link = document.createElement('a') // ??????a??????
        link.download = fileName // a??????????????????
        link.style.display = 'none'
        link.href = URL.createObjectURL(blob)
        document.body.appendChild(link)
        link.click() // ????????????
        URL.revokeObjectURL(link.href) // ??????url
        document.body.removeChild(link) // ????????????
      } else {
        // ???????????????
        ;(navigator as any)['msSaveBlob'](blob, fileName)
      }
    } catch (error: any) {
      throw new Error(error)
    }
  }

  // support form-data
  supportFormData(config: CreateAxiosOptions) {
    const headers = config.headers || this.options.headers
    const contentType = headers?.['Content-Type'] || headers?.['content-type']

    if (
      contentType !== ContentTypeEnum.FORM_URLENCODED ||
      !Reflect.has(config, 'data') ||
      config.method?.toUpperCase() === RequestEnum.GET
    ) {
      return config
    }

    return {
      ...config,
      data: qs.stringify(config.data, { arrayFormat: 'brackets' })
    }
  }

  get<T = any>(config: CreateAxiosOptions, options?: RequestOptions): Promise<T> {
    return this.request({ ...config, method: 'GET' }, options)
  }

  post<T = any>(config: CreateAxiosOptions, options?: RequestOptions): Promise<T> {
    return this.request({ ...config, method: 'POST' }, options)
  }

  put<T = any>(config: CreateAxiosOptions, options?: RequestOptions): Promise<T> {
    return this.request({ ...config, method: 'PUT' }, options)
  }

  delete<T = any>(config: CreateAxiosOptions, options?: RequestOptions): Promise<T> {
    return this.request({ ...config, method: 'DELETE' }, options)
  }

  request<T = any>(config: CreateAxiosOptions, options?: RequestOptions): Promise<T> {
    let conf: CreateAxiosOptions = cloneDeep(config)
    const transform = this.getTransform()

    const { requestOptions } = this.options

    const opt: RequestOptions = Object.assign({}, requestOptions, options)

    const { beforeRequestHook, requestCatchHook, transformRequestHook, handlerAbnormalCode } =
      transform || {}
    if (beforeRequestHook && isFunction(beforeRequestHook)) {
      conf = beforeRequestHook(conf, opt)
    }
    conf.requestOptions = opt
    // formData ??????
    conf = this.supportFormData(conf)

    return new Promise((resolve, reject) => {
      this.axiosInstance
        .request<any, AxiosResponse<Result>>(conf)
        .then((res: AxiosResponse<Result>) => {
          if (transformRequestHook && isFunction(transformRequestHook)) {
            try {
              const ret = transformRequestHook(res, opt, handlerAbnormalCode as Fn)
              resolve(ret)
            } catch (err) {
              reject(err || new Error('request error!'))
            }
            return
          }
          resolve(res as unknown as Promise<T>)
        })
        .catch((e: Error) => {
          if (requestCatchHook && isFunction(requestCatchHook)) {
            reject(requestCatchHook(e, opt))
            return
          }
          reject(e)
        })
    })
  }
}
