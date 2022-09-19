/**
 * 自动导入vue3的hooks
 * 配置的库 可以直接使用，无需引入
 * https://github.com/antfu/unplugin-auto-import
 */

import AutoImport from 'unplugin-auto-import/vite'

const loadAutoImport = () =>
  AutoImport({
    imports: ['vue', 'vue-router'],
    // 可以选择auto-import.d.ts生成的位置，使用ts建议设置为'src/auto-import.d.ts'
    dts: 'types/auto-import.d.ts',
    // 解决eslint报错问题
    eslintrc: {
      enabled: true
    }
  })

export default loadAutoImport
