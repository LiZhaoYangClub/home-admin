import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer'
import menuApis from './sys/menu'
import userApis from './sys/user'

/**
 * Used in a production environment. Need to manually import all modules
 */
export function setupProdMockServer() {
  createProdMockServer([...menuApis, ...userApis])
}
