import createAxios from '/@/utils/http/src'
import { getToken } from '/@/utils/auth'
import { errorTip } from '../message'
import { isProdFn } from '@build/index'

const httpServer = createAxios({
  urlPrefix: isProdFn() ? window.urlPrefix : '',
  transform: {
    // 后台状态码拦截 非'000000'
    handlerAbnormalCode: (code: string, msg: string): void => {
      const list = ['103107', '103104', '103105', '103109', '103102']
      if (!list.includes(code)) {
        msg && errorTip(msg)
        return
      }
    },
    requestInterceptors: (config: any) => {
      // 请求之前处理config
      const token = getToken()
      token && (config.headers.Authorization = 'Bearer ' + token)
      return config
    }
  },
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
    apiUrl: isProdFn() ? window.apiUrl : '',
    //  是否加入时间戳
    joinTime: true,
    // 忽略重复请求
    ignoreCancelToken: true,
    // 是否携带token
    withToken: true
  }
})

export default httpServer
