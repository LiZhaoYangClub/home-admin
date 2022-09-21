import { isNumber } from './is'

// 数字千位符
export const numFormats = (num: number): string | number => {
  if (isNumber(num)) {
    return String(num).replace(/(\d)(?=(\d{3})+$)/g, '$1,')
  }
  return num
}
