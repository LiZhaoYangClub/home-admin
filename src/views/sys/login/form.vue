<template>
  <div :class="`${prefixCls} login-box`">
    <Motion>
      <h2 class="outline-none">{{ title }}</h2>
      <DefaultForm />
    </Motion>
  </div>
</template>

<script lang="ts" setup name="LoginPageForm">
import DefaultForm from './components/default.vue'
import { sys } from '/@/hooks'

const title = ref<string>('登录')

const prefixCls = computed<string>(() => `${sys.value.prefixCls}-login-page-form`)
</script>

<style lang="scss" scoped>
$login-page-form: '#{$prefixCls}-login-page-form';
.#{$login-page-form} {
  width: 360px;
  text-align: center;
  h2 {
    text-transform: uppercase;
    margin: 15px 0;
    color: #999;
    font: 700 200% Consolas, Monaco, monospace;
  }
}
</style>
