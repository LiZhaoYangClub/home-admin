import vue from '@vitejs/plugin-vue'
import loadLegacy from './legacy'
import loadSvgLoader from './svgLoader'
import loadVisualizer from './visualizer'
import loadRemoveConsole from './removeConsole'
import loadAutoImport from './unPluginAutoImport'
import loadStyleImport from './pluginStyleImport'
import loadUnPluginVueComponents from './unPluginVueComponents'

// 优雅的使用组件 name
import vueJsx from '@vitejs/plugin-vue-jsx'
import VueSetupExtend from 'vite-plugin-vue-setup-extend'

const loadPlugins = () => [
  vue(),
  vueJsx(),
  loadSvgLoader(),
  VueSetupExtend(),
  loadStyleImport(),
  loadUnPluginVueComponents(),
  loadAutoImport(),
  loadRemoveConsole(),
  loadVisualizer(),
  loadLegacy()
]

export default loadPlugins
