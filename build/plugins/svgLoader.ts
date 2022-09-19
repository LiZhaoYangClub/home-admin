/**
 * svg组件化支持
 * https://www.npmjs.com/package/vite-svg-loader
 * import IconComponent from './my-icon.svg?component'
 * import iconUrl from './my-icon.svg?url'
 * import iconRaw from './my-icon.svg?raw'
 */

import svgLoader from 'vite-svg-loader'

// svg组件化支持
const loadSvgLoader = () => svgLoader()

export default loadSvgLoader
