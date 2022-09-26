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
/** 获取用户信息 */
export const getUserInfo = () =>
  http.get({
    url: `${httpPrefix.base}/userinfo`
  })

/**
 * @description: 获取用户路由菜单
 * @param {Record} data
 * @param {*} any
 * @return {*}
 */
export const getUserRoutes = (data: Record<string, any>) =>
  http.get({
    url: `${httpPrefix.base}/menu`,
    data
  })

/** 刷新token */
export const refreshToken = (data: Record<string, any>) =>
  http.post({
    url: `${httpPrefix.base}/refreshToken`,
    data
  })
