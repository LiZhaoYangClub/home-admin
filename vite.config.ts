import dayjs from 'dayjs'
import { resolve } from 'path'
import pkg from './package.json'
import { defineConfig } from 'vite'
import loadPlugins from './build/plugins'

/** 当前执行node命令时文件夹的地址（工作目录） */
const root: string = process.cwd()

/** 路径查找 */
const pathResolve = (dir: string): string => {
  return resolve(__dirname, '.', dir)
}

/** 设置别名 */
const alias: Record<string, string> = {
  '/@': pathResolve('src'),
  '@build': pathResolve('build')
}

const { dependencies, devDependencies, name, version } = pkg
const __APP_INFO__ = {
  pkg: { dependencies, devDependencies, name, version },
  lastBuildTime: dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss')
}

export default defineConfig({
  root,
  resolve: {
    alias
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "/@/styles/global/var.scss" as *;`
      }
    }
  },
  // 服务端渲染
  server: {
    // 是否开启 https
    https: false,
    // 端口号
    port: 9527,
    host: '0.0.0.0'
    // 本地跨域代理
  },
  plugins: loadPlugins(),
  optimizeDeps: {
    include: ['pinia', 'lodash-es', '@vueuse/core', 'dayjs'],
    exclude: []
  },
  build: {
    sourcemap: false,
    // 消除打包大小超过500kb警告
    chunkSizeWarningLimit: 4000
  },
  define: {
    __APP_INFO__: JSON.stringify(__APP_INFO__)
  }
})
