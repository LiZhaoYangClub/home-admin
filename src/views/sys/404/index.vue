<template>
  <div
    :class="`${prefixCls} w-100 h-100 position-relative d-flex justify-content-center align-items-center`"
  >
    <noExist />
    <div>
      <p
        v-motion
        class="title"
        :initial="{
          opacity: 0,
          y: 100
        }"
        :enter="{
          opacity: 1,
          y: 0,
          transition: {
            delay: 100
          }
        }"
      >
        404
      </p>
      <p
        v-motion
        class="description"
        :initial="{
          opacity: 0,
          y: 100
        }"
        :enter="{
          opacity: 1,
          y: 0,
          transition: {
            delay: 300
          }
        }"
      >
        抱歉，你访问的页面不存在
      </p>
      <el-button
        v-motion
        type="primary"
        :initial="{
          opacity: 0,
          y: 100
        }"
        :enter="{
          opacity: 1,
          y: 0,
          transition: {
            delay: 500
          }
        }"
        @click="$router.push('/')"
      >
        返回首页
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts" name="404Page">
import noExist from '/@/assets/status/404.svg?component'
import appConfig from '/@/hooks'

const prefixCls = computed(() => `${appConfig.prefixCls}-no-exist-page`)
</script>

<style lang="scss" scoped>
$no-exist-page: '#{$prefixCls}-no-exist-page';

.#{$no-exist-page} {
  & > div {
    margin-left: 48px;
    width: 200px;
    .title {
      font-weight: 500;
      font-size: 36px;
      line-height: 62px;
      color: var(--primary-text-color);
    }
    .description {
      font-weight: 400;
      font-size: 16px;
      line-height: 32px;
      color: var(--secondary-text-color);
    }
    button {
      margin: 8px 0;
    }
  }
}
</style>
