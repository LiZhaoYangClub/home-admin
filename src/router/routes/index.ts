import setting from '../setting'

import type { Component } from 'vue'
import type { RouteRecordRaw } from 'vue-router'
import {
  PAGE_NO_ACCESS_ROUTE,
  PAGE_NO_EXIST_ROUTE,
  PAGE_NO_SERVER_ROUTE,
  REDIRECT_ROUTE
} from './basic'

export const LoginRoute: RouteRecordRaw = {
  path: '/login',
  name: 'Login',
  component: () => import('/@/views/sys/login/index.vue'),
  meta: {
    title: 'Login'
  }
}

// 根路由
export const RootRoute: RouteRecordRaw = {
  path: '/',
  name: 'Root',
  redirect: setting.base,
  meta: {
    title: 'Root'
  }
}

// 不需要权限的路由
export const basicRoutes = [
  RootRoute,
  LoginRoute,
  PAGE_NO_EXIST_ROUTE,
  PAGE_NO_ACCESS_ROUTE,
  PAGE_NO_SERVER_ROUTE,
  REDIRECT_ROUTE
]

// 异步路由
// import.meta.globEager() 直接引入所有的模块 Vite 独有的功能
const modules: Component = import.meta.glob('./modules/**/*.ts', { eager: true })
const routeModuleList: RouteRecordRaw[] = []

// 加入到路由集合中
Object.keys(modules).forEach(key => {
  const mod = modules[key].default || {}
  const modList = Array.isArray(mod) ? [...mod] : [mod]
  routeModuleList.push(...modList)
})
export const asyncRoutes = routeModuleList
