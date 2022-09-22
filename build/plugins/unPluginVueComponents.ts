/**
 * 自动引入组件
 * 组件无需引入 可直接使用
 * https://github.com/antfu/unplugin-vue-components#readme
 */
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers' // ElementPlusResolver HeadlessUiResolver AntDesignVueResolver VantResolver ElementUiResolver

const loadUnPluginVueComponents = () =>
  Components({
    dirs: ['src/components'],
    dts: 'types/components.d.ts', // enabled by default if `typescript` is installed
    resolvers: [
      ElementPlusResolver({
        importStyle: 'sass' // 默认true css | sass 首先加载css
      })
    ],
    types: [
      {
        from: 'vue-router',
        names: ['RouterLink', 'RouterView']
      }
    ]
  })

export default loadUnPluginVueComponents
