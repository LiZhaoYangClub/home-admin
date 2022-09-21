/**
 * Used to parse the .env.development proxy configuration
 */
import type { ProxyOptions } from 'vite'

type ProxyTargetList = Record<string, ProxyOptions>

const httpsRE = /^https:\/\//

const proxyList: [string, string][] = [
  ['/api-auth', 'http://10.0.37.74:8000'],
  ['/api-sys', 'http://10.0.37.74:8000']
]

/**
 * Generate proxy
 * @param list
 */
export function createProxy() {
  const ret: ProxyTargetList = {}
  for (const [prefix, target] of proxyList) {
    const isHttps = httpsRE.test(target)
    // https://github.com/http-party/node-http-proxy#options
    ret[prefix] = {
      target: target,
      changeOrigin: true,
      ws: true,
      headers: {
        Connection: 'keep-alive'
      },
      // rewrite: path => path.replace(new RegExp(`^${prefix}`), ''),
      // https is require secure=false
      ...(isHttps ? { secure: false } : {})
    }
  }
  return ret
}
