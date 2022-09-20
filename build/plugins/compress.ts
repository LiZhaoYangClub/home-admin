/**
 * Used to package and output gzip. Note that this does not work properly in Vite, the specific reason is still being investigated
 * https://github.com/anncwb/vite-plugin-compression
 */
import compressPlugin from 'vite-plugin-compression'
const lifecycle = process.env.npm_lifecycle_event

const configCompressPlugin = (compress: 'gzip' | 'brotli' | 'none', deleteOriginFile = false) =>
  lifecycle === 'build'
    ? compress === 'gzip'
      ? compressPlugin({
          ext: '.gz',
          deleteOriginFile
        })
      : compress === 'brotli'
      ? compressPlugin({
          ext: '.br',
          algorithm: 'brotliCompress',
          deleteOriginFile
        })
      : null
    : null

export default configCompressPlugin
