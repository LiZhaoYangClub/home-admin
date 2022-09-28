import { defineStore } from 'pinia'
import { store } from '/@/store'
import { router } from '/@/router'
import locale from '/@/utils/storage'
import { getLogin, getUserInfo, getUserRoutes, refreshToken } from '/@/api/user'
import { setToken, removeToken } from '/@/utils/auth'
import { Recordable } from '/#/index'
import type { RouteRecordRaw } from 'vue-router'
import { formatAsyncRoutes, filterNoStaticRoutes } from '/@/router/guard/permissionUtils'

type userType = {
  verifyCode?: string
  currentPage?: number
  userinfo?: Recordable | null
  asyncRoutes?: RouteRecordRaw[] | null
  wholeMenu: RouteRecordRaw[]
}

export const useUserStore = defineStore({
  id: 'system-user',
  state: (): userType => ({
    // 前端生成的验证码（按实际需求替换）
    verifyCode: '',
    // 登录显示组件判断 0：登录 1：手机登录 2：二维码登录 3：注册 4：忘记密码，默认0：登录
    currentPage: 0,
    userinfo: null,
    asyncRoutes: null,
    wholeMenu: []
  }),
  actions: {
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
            const { token } = data || {}
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
      this.shadowClearCacheAndToken()
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

          // 切记将路由push到routes后还需要使用addRoute，这样路由才能正常跳转
          const routerOptionsRoutes = router.options.routes as RouteRecordRaw[]
          routes.forEach(routeItem => routerOptionsRoutes.push(routeItem))
          this.wholeMenu = filterNoStaticRoutes(routerOptionsRoutes) || []
          resolve(routes)
        } catch (error) {
          reject(error)
        }
      })
    },
    /** 清空缓存页面保留token */
    shadowClearCacheNotToken() {
      this.userinfo = null
      this.asyncRoutes = null
    },
    /** 清空缓存页面去重新登录 */
    shadowClearCacheAndToken() {
      this.userinfo = null
      this.asyncRoutes = null
      removeToken()
    },
    /** 彻底清除缓存 */
    deppClearCache() {
      this.userinfo = null
      this.asyncRoutes = null
      removeToken()
      // 清除缓存
      locale.clear()
    }
  }
})

export function useUserStoreHook() {
  return useUserStore(store)
}
