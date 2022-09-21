// axios配置  可自行根据项目进行更改，只需更改该文件即可，其他文件可以不动
// The axios configuration can be changed according to the project, just change the file, other files can be left unchanged

import type { AxiosResponse } from 'axios'
import { VAxios } from './axios-instance'
import { checkStatus } from './check-status'
import { RequestEnum, ContentTypeEnum } from './enum'
import { isString } from '/@/utils/is'
import { getToken } from '/@/utils/auth'
import { setObjToUrlParams, deepMerge } from '/@/utils'
import { joinTimestamp, formatRequestDate } from './helper'
import { errorTip } from '/@/utils/message'
import type { RequestOptions, Result, CreateAxiosOptions, AxiosTransform } from '/#/axios'

type Response = AxiosResponse<Result>

/**
 * @description: 数据处理，方便区分多种处理方式
 */
const transform: AxiosTransform = {
  /**
   * @description: 处理请求数据。如果数据不是预期格式，可直接抛出错误
   */
  transformRequestHook: (res: Response, options: RequestOptions, handlerAbnormalCode) => {
    const { isTransformResponse, isReturnNativeResponse } = options
    // 是否返回原生响应头 比如：需要获取响应头时使用该属性
    if (isReturnNativeResponse) {
      return res
    }
    // 不进行任何处理，直接返回
    // 用于页面代码可能需要直接获取code，data，message这些信息时开启
    if (!isTransformResponse) {
      return res.data
    }

    const { data } = res
    if (!data) {
      checkStatus('ABNORMAL')
      throw new Error('请求异常！')
    }
    // 不进行任何处理，直接返回
    //  这里 code，result，message为 后台统一的字段，需要在 types.ts内修改为项目自己的接口返回格式
    //  code 具体为错误细分场景
    const { code, msg, data: result } = res.data
    const hasSuccess = data && Reflect.has(data, 'code') && code === '000000'
    if (hasSuccess) {
      msg && errorTip(msg)
      return result
    }
    // 在此处根据自己项目的实际情况对不同的code执行不同的操作
    // 如果不希望中断当前请求，请return数据，否则直接抛出异常即可
    handlerAbnormalCode(code, msg, result)
    throw new Error('请求异常!')
  },

  // 请求之前处理config
  beforeRequestHook: (config, options) => {
    const { apiUrl, joinPrefix, joinParamsToUrl, formatDate, joinTime = true } = options
    const { headers = {} } = config

    // 拼接统一前缀
    if (joinPrefix) {
      const prefix = config?.urlPrefix || ''
      config.url = prefix ? `${prefix}/${config.url}` : config.url
    }
    // 请求地址
    if (apiUrl && isString(apiUrl)) {
      config.url = `${apiUrl}${config.url}`
    }
    // 参数处理
    const params = config.params || {}
    const data = config.data || false
    formatDate && data && !isString(data) && formatRequestDate(data)
    if (config.method?.toUpperCase() === RequestEnum.GET) {
      if (!isString(params)) {
        // 给 get 请求加上时间戳参数，避免从缓存中拿数据。
        config.params = Object.assign(params || {}, joinTimestamp(joinTime, false))
      } else {
        // 兼容restful风格
        config.url = config.url + params + `${joinTimestamp(joinTime, true)}`
        config.params = undefined
      }
    } else {
      if (!isString(params)) {
        formatDate && formatRequestDate(params)
        if (Reflect.has(config, 'data') && config.data && Object.keys(config.data).length > 0) {
          config.data = data
          config.params = params
        } else {
          // 非GET请求如果没有提供data，则将params视为data
          config.data = params
          config.params = undefined
        }
        if (joinParamsToUrl) {
          config.url = setObjToUrlParams(
            config.url as string,
            Object.assign({}, config.params, config.data)
          )
        }
        if (
          Reflect.has(headers, 'Content-Type') &&
          headers['Content-Type'] === ContentTypeEnum.FORM_DATA
        ) {
          const formData = new window.FormData()

          if (config.data) {
            Object.keys(config.data).forEach(key => {
              const value = config.data[key]
              if (Array.isArray(value)) {
                value.forEach(item => {
                  formData.append(`${key}[]`, item)
                })
                return
              }
              formData.append(key, config.data[key])
            })
          }
          config.data = formData
        }
      } else {
        // 兼容restful风格
        config.url = config.url + params
        config.params = undefined
      }
    }
    return config
  },

  /**
   * @description: 请求拦截器处理
   */
  requestInterceptors: (config: any) => {
    // 请求之前处理config
    const token = getToken()
    token && (config.headers.Authorization = 'Bearer ' + token)
    return config
  },

  /**
   * @description: 响应拦截器处理
   */
  responseInterceptors: (res: AxiosResponse<any>) => {
    return res
  },

  /**
   * @description: 响应错误处理
   */
  responseInterceptorsCatch: (error: any) => {
    const { response, code, message } = error || {}
    const msg: string = response?.data?.error?.message ?? ''
    const err: string = error?.toString?.() ?? ''

    try {
      // 网络超时
      if (code === 'ECONNABORTED' && message.indexOf('timeout') !== -1) {
        checkStatus('ECONNABORTED')
        return Promise.reject(error)
      }
      // 网络错误
      if (err?.includes('Network Error')) {
        checkStatus('Network Error')
        return Promise.reject(error)
      }
    } catch (error) {
      throw new Error(error as unknown as string)
    }
    // 常规错误提示
    checkStatus(error?.response?.status, msg)
    return Promise.reject(error)
  },
  handlerAbnormalCode: () => {}
}

const createAxios = (opt?: Partial<CreateAxiosOptions>) => {
  return new VAxios(
    deepMerge(
      {
        // See https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication#authentication_schemes
        // authentication schemes，e.g: Bearer
        // authenticationScheme: 'Bearer',
        authenticationScheme: '',
        timeout: 10 * 1000,
        // 基础接口地址
        // baseURL: window.apiUrl,
        // 接口可能会有通用的地址部分，可以统一抽取出来
        urlPrefix: '',
        headers: {
          'Content-Type': ContentTypeEnum.JSON,
          ignoreCancelToken: true
        },
        // 如果是form-data格式
        // headers: { 'Content-Type': ContentTypeEnum.FORM_URLENCODED },
        // 数据处理方式
        transform,
        // 配置项，下面的选项都可以在独立的接口请求中覆盖
        requestOptions: {
          // 默认将prefix 添加到url
          joinPrefix: true,
          // 是否返回原生响应头 比如：需要获取响应头时使用该属性
          isReturnNativeResponse: false,
          // 需要对返回数据进行处理
          isTransformResponse: true,
          // post请求的时候添加参数到url
          joinParamsToUrl: false,
          // 格式化提交参数时间
          formatDate: true,
          // 接口地址
          apiUrl: '',
          //  是否加入时间戳
          joinTime: true,
          // 忽略重复请求
          ignoreCancelToken: true,
          // 是否携带token
          withToken: true
        }
      },
      opt || {}
    )
  )
}

export default createAxios
