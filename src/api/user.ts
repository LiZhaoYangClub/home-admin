import http from '/@/utils/http'
import httpPrefix from './config'

/** 获取验证码 */
export const getVerify = () =>
  http.get({
    url: `${httpPrefix.base}/verify`
  })

/** 登录 */
export const getLogin = (data: Record<string, any>) =>
  http.post({
    url: `${httpPrefix.base}/login`,
    data
  })

/** 刷新token */
export const refreshToken = (data: Record<string, any>) =>
  http.post({
    url: `${httpPrefix.base}/refreshToken`,
    data
  })
