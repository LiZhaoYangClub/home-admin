import type { AxiosRequestConfig, AxiosResponse } from 'axios'

export type Nullable<T> = T | null
export type Recordable<T = any> = Record<string, T>
export type NonNullable<T> = T extends null | undefined ? never : T

export type Indexable<T = any> = {
  [key: string]: T
}
export type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>
}
export type TimeoutHandle = ReturnType<typeof setTimeout>
export type IntervalHandle = ReturnType<typeof setInterval>

export type errorTipMode = 'none' | 'modal' | 'message' | undefined

export interface RequestOptions {
  // Splicing request parameters to url
  joinParamsToUrl?: boolean
  // Format request parameter time
  formatDate?: boolean
  // Whether to process the request result
  isTransformResponse?: boolean
  // Whether to return native response headers
  // For example: use this attribute when you need to get the response headers
  isReturnNativeResponse?: boolean
  // Whether to join url
  joinPrefix?: boolean
  // Interface address, use the default apiUrl if you leave it blank
  apiUrl?: string
  // 请求拼接路径
  urlPrefix?: string
  // Error message prompt type
  errorTipMode?: errorTipMode
  // Whether to add a timestamp
  joinTime?: boolean
  ignoreCancelToken?: boolean
  // Whether to send token in header
  withToken?: boolean
}

export interface Result<T = any> {
  code: number | string
  msg?: string
  data: T
}

// multipart/form-data: upload file
export interface UploadFileParams {
  // Other parameters
  data?: Recordable
  // File parameter interface field name
  name?: string
  // file name
  file: File | Blob
  // file name
  filename?: string
  [key: string]: any
}

export declare interface Fn<T = any, R = T> {
  (...arg: T[]): R
}

export declare interface PromiseFn<T = any, R = T> {
  (...arg: T[]): Promise<R>
}

export declare type RefType<T> = T | null

export declare type LabelValueOptions = {
  label: string
  value: any
}[]

export declare type EmitType = (event: string, ...args: any[]) => void

export declare type TargetContext = '_self' | '_blank'

export declare interface ComponentElRef<T extends HTMLElement = HTMLDivElement> {
  $el: T
}

export declare type ComponentRef<T extends HTMLElement = HTMLDivElement> = ComponentElRef<T> | null

export declare type ElRef<T extends HTMLElement = HTMLDivElement> = Nullable<T>

export declare type AnyFunction<T> = (...args: any[]) => T

export interface CreateAxiosOptions extends AxiosRequestConfig {
  authenticationScheme?: string
  urlPrefix?: string
  transform?: AxiosTransform
  requestOptions?: RequestOptions
}

export abstract class AxiosTransform {
  /**
   * @description: Process configuration before request
   * @description: Process configuration before request
   */
  beforeRequestHook?: (config: CreateAxiosOptions, options: RequestOptions) => CreateAxiosOptions

  /**
   * @description: Request successfully processed
   */
  transformRequestHook?: (res: AxiosResponse<Result>, options: RequestOptions, fun: Fn) => any

  /**
   * @description: 请求失败处理
   */
  requestCatchHook?: (e: Error, options: RequestOptions) => Promise<any>

  /**
   * @description: 请求之前的拦截器
   */
  requestInterceptors?: (
    config: CreateAxiosOptions,
    options: CreateAxiosOptions
  ) => CreateAxiosOptions

  /**
   * @description: 请求之后的拦截器
   */
  responseInterceptors?: (res: AxiosResponse<any>) => AxiosResponse<any>

  /**
   * @description: 请求之前的拦截器错误处理
   */
  requestInterceptorsCatch?: (error: Error) => void

  /**
   * @description: 请求之后的拦截器错误处理
   */
  responseInterceptorsCatch?: (error: Error) => void

  /**
   * @description: 后台自定义异常状态码拦截（非 '000000'）
   */
  handlerAbnormalCode?: (code: string, msg: string) => void
}
