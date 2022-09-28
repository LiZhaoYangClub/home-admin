import { Router } from 'vue-router'
import { createHttpGuard } from './httpGuard'
import { createMessageGuard } from './messageGuard'
import { createPageGuard } from './pageGuard'
import { createPermissionGuard } from './permission'
import { createProgressGuard } from './progressGuard'

export function setupRouterGuard(router: Router) {
  createPageGuard(router)
  createHttpGuard(router)
  createMessageGuard(router)
  createProgressGuard(router)
  createPermissionGuard(router)
}
