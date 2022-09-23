import { defineStore } from 'pinia'
import { store } from '/@/store'
import { router } from '/@/router'
import locale from '/@/utils/storage'
import { getLogin, refreshToken } from '/@/api/user'
import { getToken, setToken, removeToken } from '/@/utils/auth'

type userType = {
  token: string
  name?: string
  verifyCode?: string
  currentPage?: number | string
}

const data = getToken()
let token = ''
let name = ''
if (data) {
  const dataJson = JSON.parse(data)
  if (dataJson) {
    token = dataJson?.accessToken
    name = dataJson?.name ?? 'admin'
  }
}

export const useUserStore = defineStore({
  id: 'system-user',
  state: (): userType => ({
    token,
    name,
    // 前端生成的验证码（按实际需求替换）
    verifyCode: '',
    // 登录显示组件判断 0：登录 1：手机登录 2：二维码登录 3：注册 4：忘记密码，默认0：登录
    currentPage: 0
  }),
  actions: {
    SET_TOKEN(token: string) {
      this.token = token
    },
    SET_NAME(name: string) {
      this.name = name
    },
    SET_VERIFY_CODE(verifyCode: string) {
      this.verifyCode = verifyCode
    },
    SET_CURRENT_PAGE(value: number | string) {
      this.currentPage = value
    },
    /** 登入 */
    async loginByUsername(data: any) {
      return new Promise<void>((resolve, reject) => {
        getLogin(data)
          .then((result: any) => {
            if (result) {
              const { token, name } = result || {}
              this.token = token
              this.name = name
              setToken(token)
              resolve()
            }
          })
          .catch((error: Error) => {
            reject(error)
          })
      })
    },
    /** 登出 清空缓存 */
    logOut() {
      this.token = ''
      this.name = ''
      removeToken()
      // 清除缓存
      locale.clear()
      router.push('/login')
    },
    /** 刷新token */
    async refreshToken(data: Record<string, any>) {
      removeToken()
      return refreshToken(data).then((data: string) => {
        if (data) {
          setToken(data)
          return data
        }
      })
    }
  }
})

export function useUserStoreHook() {
  return useUserStore(store)
}
