import { store } from '/@/store'
import { defineStore } from 'pinia'
import { changeTheme } from '/@/utils/theme'

import locale from '/@/utils/storage'
const sys = locale.getSystem()

export const useThemeStore = defineStore({
  id: 'admin-Theme',
  state: () => ({
    themeColor: sys.value.themeColor ?? '#ccc',
    theme: sys.value.theme ?? 'default'
  }),
  getters: {
    getThemeColor(): string {
      return this.themeColor
    },
    getTheme(): string {
      return this.theme
    }
  },
  actions: {
    setThemeColor(newColor: string): void {
      locale.updateSystem({ themeColor: newColor })
      this.themeColor = newColor
    },
    setTheme(newTheme: string): void {
      locale.updateSystem({ theme: newTheme })
      this.theme = newTheme
      changeTheme(newTheme)
    }
  }
})

export function useThemeStoreHook() {
  return useThemeStore(store)
}
