import vue from '@vitejs/plugin-vue'
import loadLegacy from './legacy'
import loadSvgLoader from './svgLoader'
import loadVisualizer from './visualizer'
import configImageminPlugin from './imagemin'
import configCompressPlugin from './compress'
import loadRemoveConsole from './removeConsole'
import configSvgIconsPlugin from './loadSvgIcon'
import loadAutoImport from './unPluginAutoImport'
import loadStyleImport from './pluginStyleImport'
import loadUnPluginVueComponents from './unPluginVueComponents'

// 优雅的使用组件 name
import vueJsx from '@vitejs/plugin-vue-jsx'
import VueSetupExtend from 'vite-plugin-vue-setup-extend'
import { configMockPlugin } from './mock'

const loadPlugins = () => [
  vue(),
  // 支持jsx tsx
  vueJsx(),
  // 以组件方式加载svg
  loadSvgLoader(),
  VueSetupExtend(),
  // 自动加载样式
  loadStyleImport(),
  // 自动引入
  loadUnPluginVueComponents(),
  loadAutoImport(),
  // prod 模式移除console
  loadRemoveConsole(),
  // 打包分析
  loadVisualizer(),
  // 浏览器兼容性
  loadLegacy(),
  // 开启gzip
  configCompressPlugin('gzip'),
  // 图片压缩
  configImageminPlugin(),
  // 用于生成 svg 雪碧图.
  configSvgIconsPlugin(),
  // 配置mock
  configMockPlugin()
]

export default loadPlugins
