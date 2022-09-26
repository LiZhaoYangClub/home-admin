/**
 * Mock plugin for development and production.
 * https://github.com/anncwb/vite-plugin-mock
 */
import { viteMockServe } from 'vite-plugin-mock'

const lifecycle = process.env.npm_lifecycle_event

export function configMockPlugin() {
  return lifecycle === 'dev'
    ? viteMockServe({
        // ignore: /^\_/,
        mockPath: 'mock',
        localEnabled: lifecycle === 'dev',
        prodEnabled: false,
        injectCode: `
      import { setupProdMockServer } from '../../mock/createServer';
      setupProdMockServer();
      `
      })
    : null
}
