import type { Router, RouteRecordRaw } from 'vue-router'
import { PAGE_NO_EXIST_NAME } from '../constant'
import { whiteList } from './permissionUtils'
import { Recordable } from '/#/index'
import { sys } from '/@/hooks'
import { useUserStoreHook } from '/@/store/modules/user'
import { getToken } from '/@/utils/auth'

const LOGIN_PATH = '/login'

export function createPermissionGuard(router: Router) {
  router.beforeEach(async (to, from, next) => {
    const token = getToken()

    // Whitelist can be directly entered
    if (whiteList.includes(to.path)) {
      if (to.path === LOGIN_PATH && token) {
        // TODO: 记录登录前路由
        next((to.query?.redirect as string) || '/')
        return
      }
      next()
      return
    }

    // token does not exist
    if (!token) {
      // You can access without permission. You need to set the routing meta.ignoreAuth to true
      if (to.meta.ignoreAuth) {
        next()
        return
      }

      // redirect login page
      const redirectData: { path: string; replace: boolean; query?: Recordable<string> } = {
        path: LOGIN_PATH,
        replace: true
      }
      if (to.path) {
        redirectData.query = {
          ...redirectData.query,
          redirect: to.path
        }
      }
      next(redirectData)
      return
    }

    // get userinfo while last fetch time is empty
    if (!useUserStoreHook().userinfo) {
      try {
        await useUserStoreHook().setUserInfo()
      } catch (err) {
        // 如果获取用户信息失败 则终止导航
        next(false)
        return
      }
    }

    // 如果不是异步路由直接跳过
    if (sys.value.isAsyncRoute) {
      next()
      return
    }

    // async load routes
    if (!useUserStoreHook().asyncRoutes) {
      const routes = await useUserStoreHook().getAsyncRoutes()
      routes.forEach((route: RouteRecordRaw) => {
        router.addRoute(route)
      })

      if (to.name === PAGE_NO_EXIST_NAME) {
        // 动态添加路由后，此处应当重定向到fullPath，否则会加载404页面内容
        next({ path: to.fullPath, replace: true, query: to.query })
      } else {
        const redirectPath = (from.query.redirect || to.path) as string
        const redirect = decodeURIComponent(redirectPath)
        const nextData = to.path === redirect ? { ...to, replace: true } : { path: redirect }
        next(nextData)
      }
    }

    // 放行
    next()
  })
}
