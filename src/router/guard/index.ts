import { Router } from 'vue-router'
import { createHttpGuard } from './httpGuard'
import { createMessageGuard } from './messageGuard'
import { createPermissionGuard } from './permission'
import { createProgressGuard } from './progressGuard'

export function setupRouterGuard(router: Router) {
  createHttpGuard(router)
  createMessageGuard(router)
  createProgressGuard(router)
  createPermissionGuard(router)
}
