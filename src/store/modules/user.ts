import { defineStore } from 'pinia'
import { store } from '/@/store'
import { router } from '/@/router'
import locale from '/@/utils/storage'
import { getLogin, getUserInfo, getUserRoutes, refreshToken } from '/@/api/user'
import { setToken, removeToken } from '/@/utils/auth'
import { Recordable } from '/#/index'
import type { RouteRecordRaw } from 'vue-router'
import { formatAsyncRoutes } from '/@/router/guard/permissionUtils'

type userType = {
  name?: string
  verifyCode?: string
  currentPage?: number
  userinfo?: Recordable | null
  asyncRoutes?: RouteRecordRaw[] | null
}

export const useUserStore = defineStore({
  id: 'system-user',
  state: (): userType => ({
    name: '',
    // 前端生成的验证码（按实际需求替换）
    verifyCode: '',
    // 登录显示组件判断 0：登录 1：手机登录 2：二维码登录 3：注册 4：忘记密码，默认0：登录
    currentPage: 0,
    userinfo: null,
    asyncRoutes: null
  }),
  actions: {
    SET_NAME(name: string) {
      this.name = name
    },
    SET_VERIFY_CODE(verifyCode: string) {
      this.verifyCode = verifyCode
    },
    SET_CURRENT_PAGE(value: number) {
      this.currentPage = value
    },
    /** 登入 */
    async loginByUsername(params: any) {
      return new Promise<void>(async (resolve, reject) => {
        try {
          const data = await getLogin(params)
          if (data) {
            const { token, name } = data || {}
            this.name = name
            setToken(token)
            resolve()
          }
        } catch (error) {
          reject(error)
        }
      })
    },
    /** 登出 清空缓存 */
    logOut() {
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
    },
    /**
     * @description: 获取用户信息
     * @return {*}
     */
    async setUserInfo() {
      return new Promise<void>(async (resolve, reject) => {
        try {
          const data = await getUserInfo()
          if (data) {
            this.userinfo = data
            resolve()
          }
        } catch (error) {
          reject(error)
        }
      })
    },
    /**
     * @description: 获取异步路由
     * @return {*}
     */
    async getAsyncRoutes() {
      return new Promise<RouteRecordRaw[]>(async (resolve, reject) => {
        try {
          const params = {}
          const data = await getUserRoutes(params)
          const routes = formatAsyncRoutes(data)
          this.asyncRoutes = routes || []
          resolve(routes)
        } catch (error) {
          reject(error)
        }
      })
    }
  }
})

export function useUserStoreHook() {
  return useUserStore(store)
}
