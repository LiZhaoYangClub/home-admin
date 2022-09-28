import type { RouteRecordRaw } from 'vue-router'
import { LAYOUT, STATIC_ROUTE_NAME_LIST } from '../constant'

import { basicRoutes } from '../routes'

const IFrame = () => import('/@/layout/frameView.vue')

export const getRoutePaths = (array: any[]) => array.map(route => route.path)

export const whiteList = getRoutePaths(basicRoutes)

// 本地路由文件
const modulesRoutes = import.meta.glob('/src/views/**/*.{vue,tsx}')

// 格式化路由
export const formatAsyncRoutes = (routes: RouteRecordRaw[]): RouteRecordRaw[] => {
  if (!routes || !routes.length) return []
  const modulesRoutesKeys = Object.keys(modulesRoutes)
  routes.forEach((item: any) => {
    // 将 fromBack 属性加入 meta ，标识此路由为后端返回路由
    // 将 keepalive 属性加入 meta ，标识此路由是否加入tag
    item.meta = {
      keepAlive: true,
      ...item.meta,
      fromBack: true
    }

    // 父级的redirect属性取值：如果子级存在且父级的redirect属性不存在，默认取第一个子级的path；如果子级存在且父级的redirect属性存在，取存在的redirect属性，会覆盖默认值
    if (item?.children && item.children.length && !item.redirect) {
      item.redirect = item.children[0].path
    }

    // 父级的name属性取值：如果子级存在且父级的name属性不存在，默认取第一个子级的name；如果子级存在且父级的name属性存在，取存在的name属性，会覆盖默认值
    if (item?.children && item.children.length && !item.name) {
      item.name = item.children[0].name
    }

    if (item.meta?.frameSrc) {
      item.component = IFrame
    } else {
      if (item.component === 'LAYOUT') {
        // 对后端传component组件路径和不传做兼容（如果后端传component组件路径，那么path可以随便写，如果不传，component组件路径会跟path保持一致）
        item.component = LAYOUT
      } else {
        const index = item?.component
          ? modulesRoutesKeys.findIndex(ev => ev.includes(item.component as any))
          : modulesRoutesKeys.findIndex(ev => ev.includes(item.path))
        item.component = modulesRoutes[modulesRoutesKeys[index]]
      }
    }

    if (item?.children && item.children.length) {
      formatAsyncRoutes(item.children)
    }
  })
  return routes
}

/** 按照路由中meta下的rank等级升序来排序路由 */
export function ascending(arr: any[]) {
  arr.forEach(v => {
    if (v?.meta?.rank === null) v.meta.rank = undefined
    if (v?.meta?.rank === 0) {
      if (v.name !== 'Home' && v.path !== '/') {
        console.warn('rank only the home page can be 0')
      }
    }
  })
  return arr.sort((a: { meta: { rank: number } }, b: { meta: { rank: number } }) => {
    return a?.meta?.rank - b?.meta?.rank
  })
}

// 过滤路由中非静态路由的路由
export const filterNoStaticRoutes = (routes: RouteRecordRaw[]) =>
  routes.filter((item: RouteRecordRaw) => !STATIC_ROUTE_NAME_LIST.includes(item.name as string))
