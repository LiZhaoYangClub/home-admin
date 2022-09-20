/**
 *  Vite Plugin for fast creating SVG sprites.
 *  https://github.com/vbenjs/vite-plugin-svg-icons/blob/main/README.zh_CN.md
 */

import path from 'path'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

const configSvgIconsPlugin = () => {
  const svgIconsPlugin = createSvgIconsPlugin({
    iconDirs: [path.resolve(process.cwd(), 'src/icons')],
    svgoOptions: true,
    // default
    symbolId: 'icon-[dir]-[name]'
  })
  return svgIconsPlugin
}

export default configSvgIconsPlugin
