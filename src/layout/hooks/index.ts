import type { RouteRecordRaw } from 'vue-router'
import { useAppStoreHook } from '/@/store/modules/app'
import { useUserStoreHook } from '/@/store/modules/user'

/**
 * @description: 导出系统相关
 * @return {*}
 */
export function systemApp() {
  const routers = computed<RouteRecordRaw[]>(() => useUserStoreHook().wholeMenu || [])
  const isCollapse = computed<boolean>(() => useAppStoreHook().isCollapse)

  return {
    isCollapse,
    routers
  }
}
