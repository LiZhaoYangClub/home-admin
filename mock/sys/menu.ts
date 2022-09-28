import { resultSuccess, resultError, getRequestToken, requestParams } from '../utils'
import { MockMethod } from 'vite-plugin-mock'

// single
const dashboardRoute = {
  path: '/dashboard',
  name: 'Dashboard',
  component: 'LAYOUT',
  redirect: '/dashboard/analysis',
  meta: {
    title: 'dashboard',
    hideChildrenInMenu: true,
    icon: 'bx:bx-home'
  },
  children: [
    {
      path: 'analysis',
      name: 'Analysis',
      component: '/dashboard/analysis/index',
      meta: {
        hideMenu: true,
        hideBreadcrumb: true,
        title: 'analysis',
        currentActiveMenu: '/dashboard',
        icon: 'day'
      }
    },
    {
      path: 'workbench',
      name: 'Workbench',
      component: '/dashboard/workbench/index',
      meta: {
        hideMenu: true,
        hideBreadcrumb: true,
        title: 'workbench',
        currentActiveMenu: '/dashboard',
        icon: 'bx:bx-home'
      }
    }
  ]
}

const backRoute = {
  path: '/back',
  name: 'PermissionBackDemo',
  component: 'LAYOUT',
  meta: {
    title: 'back',
    icon: 'dark'
  },

  children: [
    {
      path: 'page',
      name: 'BackAuthPage',
      component: '/back/backPage/index',
      meta: {
        title: 'backPage',
        icon: 'phone'
      }
    },
    {
      path: 'btn',
      name: 'BackAuthBtn',
      component: '/back/backBtn/index',
      meta: {
        title: 'backBtn',
        hideMenu: true,
        currentActiveMenu: '/back/page'
      }
    }
  ]
}

const linkRoute = {
  path: '/link',
  name: 'Link',
  component: 'LAYOUT',
  meta: {
    icon: 'ion:tv-outline',
    title: 'frame'
  },
  children: [
    {
      path: 'doc',
      name: 'Doc',
      meta: {
        title: 'doc',
        frameSrc: 'https://vvbin.cn/doc-next/'
      }
    },
    {
      path: 'doc2',
      name: 'DocExternal',
      component: 'LAYOUT',
      meta: {
        title: 'docExternal',
        frameSrc: 'https://vvbin.cn/doc-next/'
      }
    }
  ]
}

export default [
  {
    url: '/api/menu',
    timeout: 1000,
    method: 'get',
    response: (request: requestParams) => {
      const token = getRequestToken(request)
      if (!token) {
        return resultError('Invalid token!')
      }
      return resultSuccess([linkRoute, backRoute, dashboardRoute])
    }
  }
] as MockMethod[]
