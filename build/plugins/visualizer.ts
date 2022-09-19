/**
 * 打包分析
 * https://github.com/btd/rollup-plugin-visualizer
 * 使用 npm 提供的process.env.npm_lifecycle_event等环境变量。通过process.env.npm_lifecycle_event，可以在相关 npm scripts 脚本中获得当前运行的脚本名称。
 * 使用 npm 提供的npm_package_能力，获取 package.json 中的相关字段，比如下面代码：
 *
 * 获取 package.json 中的 name 字段值
 * console.log(process.env.npm_package_name)
 * 获取 package.json 中的 version 字段值
 * console.log(process.env.npm_package_version)
 */

import { visualizer } from 'rollup-plugin-visualizer'

const lifecycle = process.env.npm_lifecycle_event

const loadVisualizer = () =>
  lifecycle === 'report'
    ? visualizer({
        open: true,
        gzipSize: true,
        brotliSize: true,
        filename: 'report.html'
      })
    : null

export default loadVisualizer
