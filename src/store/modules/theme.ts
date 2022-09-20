import { store } from '/@/store'
import { defineStore } from 'pinia'

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
    },
    /** 用于mix导航模式下hamburger-svg的fill属性 */
    fill() {
      if (this.theme === 'light') {
        return '#409eff'
      } else if (this.theme === 'yellow') {
        return '#d25f00'
      } else {
        return '#fff'
      }
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
    }
  }
})

export function useThemeStoreHook() {
  return useThemeStore(store)
}
