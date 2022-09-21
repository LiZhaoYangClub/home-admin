import path from 'path'

/** 环境变量 */
const loadEnv = () => {
  return import.meta.env
}

const isDevFn = (): boolean => {
  return import.meta.env.MODE === 'development'
}

const isProdFn = (): boolean => {
  return import.meta.env.MODE === 'production'
}

/**
 * Get user root directory
 * @param dir file path
 */
const getRootPath = (...dir: string[]) => {
  return path.resolve(process.cwd(), ...dir)
}

export { loadEnv, isDevFn, isProdFn, getRootPath }
