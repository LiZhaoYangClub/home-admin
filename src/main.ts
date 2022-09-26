import 'virtual:svg-icons-register'

import '/@/utils/storage'
import App from './App.vue'

import '/@/styles/index.scss'

import { createApp } from 'vue'

import { setupStore } from '/@/store'
import { router, setupRouter } from '/@/router'
import { setupPlugin } from '/@/plugins'
import { setupRouterGuard } from './router/guard'

const bootstrap = async () => {
  const app = createApp(App)

  // 配置 store
  setupStore(app)

  // Initialize internal system configuration
  // 初始化内部系统配置
  // initAppConfigStore()

  // Multilingual configuration
  // 多语言配置
  // Asynchronous case: language files may be obtained from the server side
  // 异步案例：语言文件可能从服务器端获取
  // await setupI18n(app)

  // 注册全局插件
  setupPlugin(app)

  // Configure routing
  // 配置路由
  setupRouter(app)

  // router-guard
  // 路由守卫
  setupRouterGuard(router)

  // Register global directive
  // 注册全局指令
  // setupGlobDirectives(app)

  // Configure global error handling
  // 配置全局错误处理
  // setupErrorHandle(app)

  // https://next.router.vuejs.org/api/#isready
  // await router.isReady();

  app.mount('#app')
}

bootstrap()
