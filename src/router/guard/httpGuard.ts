import type { Router } from 'vue-router'
import { Nullable } from '/#/index'
import { sys } from '/@/hooks'
import { AxiosCanceler } from '/@/utils/http/src/axios-cancel'

/**
 * @description: 路由变化时，清除当前页面的请求
 * @param {Router} router
 * @return {*}
 */
export function createHttpGuard(router: Router) {
  const removeAllHttpPending = computed<boolean>(() => sys.value.changeRouterClearHttp || false)
  let axiosCanceler: Nullable<AxiosCanceler>
  if (removeAllHttpPending) {
    axiosCanceler = new AxiosCanceler()
  }
  router.beforeEach(async () => {
    // Switching the route will delete the previous request
    axiosCanceler?.removeAllPending()
    return true
  })
}
