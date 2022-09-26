import { ElMessage, ElNotification } from 'element-plus'
import { Router } from 'vue-router'
import { sys } from '/@/hooks'
import { warnTip } from '/@/utils/message'

/**
 * Used to close the message instance when the route is switched
 * @param router
 */
export function createMessageGuard(router: Router) {
  const closeMessageOnSwitch = computed<boolean>(() => sys.value.changeRouterClearMessage || false)

  router.beforeEach(async () => {
    try {
      if (closeMessageOnSwitch) {
        ElMessage.closeAll()
        ElNotification.closeAll()
      }
    } catch (error) {
      warnTip('message guard error:' + error)
    }
    return true
  })
}
