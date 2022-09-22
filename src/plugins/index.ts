import type { App } from 'vue'

import { MotionPlugin } from '@vueuse/motion'

const plugin = {
  install(app: App) {
    // 增加一个变量
    app.provide('name', 'lzy')

    // 增加一个自定义指令
    app.directive('my-focus', {
      mounted(element: HTMLElement) {
        element.focus()
      }
    })

    // 增加混入
    app.mixin({})

    // 增加全局方法
    app.config.globalProperties.$test = 'hello world'

    // 注册全局组件
    app.component('MyComp', {
      template: `<div></div>`
    })
  }
}

export const setupPlugin = (app: App) => {
  app.use(MotionPlugin)

  // 自定义
  app.use(plugin)
}
