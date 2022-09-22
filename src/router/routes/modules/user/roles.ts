import type { RouteRecordRaw } from 'vue-router'
import { LAYOUT } from '/@/router/constant'

const user: RouteRecordRaw = {
  path: '/user',
  name: 'User',
  component: LAYOUT,
  redirect: '/user/role',
  meta: {
    hideChildrenInMenu: true,
    icon: 'simple-icons:about-dot-me',
    title: 'user'
  },
  children: [
    {
      path: 'role',
      name: 'UserRoles',
      component: () => import('/@/views/user/roles/index.vue'),
      meta: {
        title: 'userRole',
        icon: 'simple-icons:about-dot-me',
        hideMenu: true
      }
    }
  ]
}

export default user
