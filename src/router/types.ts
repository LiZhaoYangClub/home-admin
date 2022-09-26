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
}
