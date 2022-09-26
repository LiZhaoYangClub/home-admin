<template>
  <div :class="`${prefixCls} w-100 h-100 position-relative overflow-hidden`">
    <img :src="bg" class="wave" />
    <ToolBar />
    <div class="container position-center d-flex w-100 justify-content-around align-items-center">
      <div class="img`">
        <component :is="currentWeek" />
      </div>
      <LoginForm />
    </div>
  </div>
</template>

<script lang="ts" setup name="LoginPage">
import bg from '/@/assets/login/bg.png'

import { sys } from '/@/hooks'
import ToolBar from './toolBar.vue'
import LoginForm from './form.vue'
import currentWeek from './static'

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
  .container {
    height: 80%;
    .img {
      width: 500px;
    }
  }
}
</style>
