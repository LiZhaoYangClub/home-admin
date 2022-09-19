/**
 * 自动引入库中的全局样式文件
 * https://github.com/vbenjs/vite-plugin-style-import/tree/main#readme
 */

// 缺少包 consola  需手动安装
// pnpm add consola -D

import { createStyleImportPlugin, ElementPlusResolve } from 'vite-plugin-style-import' // AndDesignVueResolve AntdResolve NutuiResolve ElementPlusResolve VantResolve

const loadStyleImport = () =>
  createStyleImportPlugin({
    resolves: [ElementPlusResolve()]
    // 自定义规则
    // libs: [
    //   {
    //     libraryName: 'ant-design-vue',
    //     esModule: true,
    //     resolveStyle: (name: string) => {
    //       return `ant-design-vue/es/${name}/style/index`
    //     }
    //   }
    // ]
  })

export default loadStyleImport
