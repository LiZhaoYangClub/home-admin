import { resultSuccess, resultError, getRequestToken, requestParams } from '../utils'
import { MockMethod } from 'vite-plugin-mock'

// single
const dashboardRoute = {
  path: '/dashboard',
  name: 'Dashboard',
  component: 'LAYOUT',
  redirect: '/dashboard/analysis',
  meta: {
    title: 'routes.dashboard.dashboard',
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
        title: 'routes.dashboard.analysis',
        currentActiveMenu: '/dashboard',
        icon: 'bx:bx-home'
      }
    },
    {
      path: 'workbench',
      name: 'Workbench',
      component: '/dashboard/workbench/index',
      meta: {
        hideMenu: true,
        hideBreadcrumb: true,
        title: 'routes.dashboard.workbench',
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
    title: 'routes.demo.permission.back'
  },

  children: [
    {
      path: 'page',
      name: 'BackAuthPage',
      component: '/demo/permission/back/index',
      meta: {
        title: 'routes.demo.permission.backPage'
      }
    },
    {
      path: 'btn',
      name: 'BackAuthBtn',
      component: '/demo/permission/back/Btn',
      meta: {
        title: 'routes.demo.permission.backBtn'
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
    title: 'routes.demo.iframe.frame'
  },
  children: [
    {
      path: 'doc',
      name: 'Doc',
      meta: {
        title: 'routes.demo.iframe.doc',
        frameSrc: 'https://vvbin.cn/doc-next/'
      }
    },
    {
      path: 'doc2',
      name: 'DocExternal',
      component: 'LAYOUT',
      meta: {
        title: 'routes.demo.iframe.docExternal',
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
