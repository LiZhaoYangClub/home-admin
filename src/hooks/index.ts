import locale from '/@/utils/storage'

// 获取系统配置
const sys = locale.getSystem()
// 自定义样式前缀

export default {
  prefixCls: sys.value.prefixCls
}
