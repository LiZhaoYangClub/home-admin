import Cookies from 'js-cookie'

const TokenKey = 'authorized-token'

// 获取token
export function getToken() {
  // 此处与TokenKey相同，此写法解决初始化时Cookies中不存在TokenKey报错
  return Cookies.get('authorized-token')
}

// 设置token以及过期时间（cookies、sessionStorage各一份）
export function setToken(accessToken: string) {
  Cookies.set(TokenKey, accessToken)
  sessionStorage.setItem(TokenKey, accessToken)
}

// 删除token
export function removeToken() {
  Cookies.remove(TokenKey)
  sessionStorage.removeItem(TokenKey)
}
