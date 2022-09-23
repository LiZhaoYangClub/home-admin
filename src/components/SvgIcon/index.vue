<template>
  <svg
    :class="[prefixCls, $attrs.class, spin && 'svg-icon-spin']"
    :style="getStyle"
    aria-hidden="true"
  >
    <use :xlink:href="symbolId" />
  </svg>
</template>

<script lang="ts" setup name="SvgIcon">
import type { CSSProperties } from 'vue'
import { sys } from '/@/hooks'

const props = defineProps({
  prefix: {
    type: String,
    default: 'icon'
  },
  name: {
    type: String,
    required: true
  },
  size: {
    type: [Number, String],
    default: 16
  },
  spin: {
    type: Boolean,
    default: false
  }
})

const prefixCls = computed(() => `${sys.value.prefixCls}-svg-icon svg-icon`)
const symbolId = computed(() => `#${props.prefix}-${props.name}`)

const getStyle = computed((): CSSProperties => {
  const { size } = props
  let s = `${size}`
  s = `${s.replace('px', '')}px`
  return {
    width: s,
    height: s
  }
})
</script>

<style lang="scss" scoped>
$svg: '#{$prefixCls}-svg-icon';
.svg-icon {
  display: inline-block;
  overflow: hidden;
  vertical-align: -0.15em;
  fill: currentColor;
}

.svg-icon-spin {
  animation: loadingCircle 1s infinite linear;
}

.#{$svg} {
  color: var(--el-color-white);
}
</style>
