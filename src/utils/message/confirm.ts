import { ElMessageBox } from 'element-plus'
import { successTip, infoTip } from './tip'
import { isString, isFunction } from '/@/utils/is'

type Fun = () => void

// Types 类型枚举
enum Types {
  warning = 'warning',
  success = 'success',
  info = 'info',
  error = 'error'
}
interface ConfirmParams {
  render?: string
  title?: string
  label?: string
  desc?: string
  type?: Types
  successCb?: string | Fun
  errorCb?: string | Fun
}

const template = (title: string, subtitle: string): string => `
  <div class="ioe-custom-confirm-ctx">
    <div class="title">
      <span>${title}</span>
    </div>
    <div class="subtitle">${subtitle}</div>
  </div>
`

/**
 * @description: 打开确认弹窗
 * @param {ConfirmParams} params
 * @return {*}
 */
export const openConfirm = (params: ConfirmParams) => {
  const {
    render = 'default',
    title = '提示',
    label = '确定要删除该数据？',
    desc = '删除后该数据和记录将一并删除。',
    type = Types.warning,
    successCb = '删除成功！',
    errorCb = '删除失败！'
  } = params

  const ctx: string = render === 'default' ? template(label, desc) : render

  ElMessageBox.confirm(ctx, title, {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    showCancelButton: false,
    showClose: false,
    dangerouslyUseHTMLString: true,
    type: type,
    customClass: 'ioe-custom-confirm'
  })
    .then(() => {
      isString(successCb) ? successTip(successCb) : isFunction(successCb) ? successCb() : ''
    })
    .catch(() => {
      isString(errorCb) ? infoTip(errorCb) : isFunction(errorCb) ? errorCb() : ''
    })
}
