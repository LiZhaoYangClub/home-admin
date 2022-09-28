import { defineStore } from 'pinia'
import { sys } from '/@/hooks'

type AppStore = {
  isCollapse: boolean
}

export const useAppStore = defineStore({
  id: 'system-app',
  state: (): AppStore => ({
    isCollapse: sys.value.isCollapse ?? false
  }),
  actions: {
    changeMenuState() {
      this.isCollapse = !this.isCollapse
    }
  }
})

export function useAppStoreHook() {
  return useAppStore()
}
