<template>
  <div :class="`${prefixCls} w-100 h-100 position-relative overflow-hidden`">
    <img :src="bg" class="wave" />
    <ToolBar />
  </div>
</template>

<script lang="ts" setup name="LoginPage">
import bg from '/@/assets/login/bg.png'

import { sys } from '/@/hooks'
import ToolBar from './toolBar.vue'

const prefixCls = computed(() => `${sys.value.prefixCls}-login-page`)
</script>

<style lang="scss" scoped>
$login-page: '#{$prefixCls}-login-page';

.#{$login-page} {
  .wave {
    position: fixed;
    height: 100%;
    left: 0;
    bottom: 0;
  }
}
</style>
