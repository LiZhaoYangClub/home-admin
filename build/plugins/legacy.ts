/**
 * 浏览器兼容性
 * https://github.com/vitejs/vite/tree/main/packages/plugin-legacy
 */

import legacy from '@vitejs/plugin-legacy'

const lifecycle = process.env.npm_lifecycle_event

const loadLegacy = () =>
  lifecycle === 'build'
    ? legacy({
        targets: ['ie >= 11'],
        additionalLegacyPolyfills: ['regenerator-runtime/runtime']
      })
    : null

export default loadLegacy
