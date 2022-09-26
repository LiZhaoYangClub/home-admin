import nProgress from 'nprogress'
import { Router } from 'vue-router'
import { sys } from '/@/hooks'

export function createProgressGuard(router: Router) {
  const getOpenNProgress = computed<boolean>(() => sys.value.changeRouterProgress || false)
  router.beforeEach(async to => {
    if (to.meta.loaded) {
      return true
    }
    unref(getOpenNProgress) && nProgress.start()
    return true
  })

  router.afterEach(async () => {
    unref(getOpenNProgress) && nProgress.done()
    return true
  })
}
