// redirect page
export const REDIRECT_NAME = 'PageRedirect'

// 404page
export const PAGE_NO_EXIST_NAME = 'PageNoExist'
export const PAGE_NO_EXIST = () => import('/@/views/sys/404/index.vue')
// 403page
export const PAGE_NO_ACCESS_NAME = 'PageNoAccess'
export const PAGE_NO_ACCESS = () => import('/@/views/sys/403/index.vue')
// 500page
export const PAGE_NO_SERVER_NAME = 'PageNoServer'
export const PAGE_NO_SERVER = () => import('/@/views/sys/500/index.vue')

/**
 * @description: default layout
 */
export const LAYOUT = () => import('/@/layout/index.vue')

export const STATIC_ROUTE_NAME_LIST = [
  'PageRedirect',
  'PageNoServer',
  'PageNoExist',
  'PageNoAccess',
  'Root',
  'Login'
]
