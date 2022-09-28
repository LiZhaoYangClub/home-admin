export type RouteSetting = {
  base: string
}

import { RouteLocationNormalized } from 'vue-router'

export interface toRouteType extends RouteLocationNormalized {
  meta: {
    keepAlive?: boolean
    dynamicLevel?: string
  }
}

export interface RouteMeta {
  ignoreAuth?: boolean // 当前路由是否需要权限访问
  hideBreadcrumb?: boolean // 是否在面包屑中显示
  hideMenu?: boolean // 是否显示在 menu 中
  currentActiveMenu?: string // 隐藏的路由 激活的路由
  icon?: string // 在menu 中显示的图标
  title?: string // 在menu 中显示的菜单名
  rank?: number // 排序
}
