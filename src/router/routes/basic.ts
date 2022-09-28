import type { RouteRecordRaw } from 'vue-router'
import {
  REDIRECT_NAME,
  PAGE_NO_EXIST,
  PAGE_NO_EXIST_NAME,
  PAGE_NO_ACCESS,
  PAGE_NO_ACCESS_NAME,
  PAGE_NO_SERVER,
  PAGE_NO_SERVER_NAME
} from '/@/router/constant'

// 403 on a page
export const PAGE_NO_ACCESS_ROUTE: RouteRecordRaw = {
  path: '/noAccess',
  name: PAGE_NO_ACCESS_NAME,
  component: PAGE_NO_ACCESS,
  meta: {
    title: '403Page'
  }
}
// 500 on a page
export const PAGE_NO_SERVER_ROUTE: RouteRecordRaw = {
  path: '/noServer',
  name: PAGE_NO_SERVER_NAME,
  component: PAGE_NO_SERVER,
  meta: {
    title: '500Page'
  }
}

export const REDIRECT_ROUTE: RouteRecordRaw = {
  path: '/redirect',
  component: () => import('/@/views/sys/redirect/index.vue'),
  name: REDIRECT_NAME,
  meta: {
    title: 'redirect'
  }
}

// 404 on a page
export const PAGE_NO_EXIST_ROUTE: RouteRecordRaw = {
  path: '/:path(.*)*',
  name: PAGE_NO_EXIST_NAME,
  component: PAGE_NO_EXIST,
  meta: {
    title: '404Page'
  }
}
