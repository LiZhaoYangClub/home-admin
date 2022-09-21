import { ElMessage } from 'element-plus'

/**
 * @description: 失败提示
 * @param {string} msg
 * @return {*}
 */
export const errorTip = (msg: string) =>
  ElMessage({
    message: msg,
    type: 'error',
    customClass: 'ioe-custom-error-tip ioe-tip'
  })

/**
 * @description: 消息提示
 * @param {string} msg
 * @return {*}
 */
export const infoTip = (msg: string) =>
  ElMessage({
    message: msg,
    type: 'info',
    customClass: 'ioe-custom-info-tip ioe-tip'
  })

/**
 * @description: 成功提示
 * @param {string} msg
 * @return {*}
 */
export const successTip = (msg: string) =>
  ElMessage({
    message: msg,
    type: 'success',
    customClass: 'ioe-custom-success-tip ioe-tip'
  })

/**
 * @description: 告警提示
 * @param {string} msg
 * @return {*}
 */
export const warnTip = (msg: string) =>
  ElMessage({
    message: msg,
    type: 'warning',
    customClass: 'ioe-custom-warn-tip ioe-tip'
  })
