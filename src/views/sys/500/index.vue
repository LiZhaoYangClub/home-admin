<template>
  <div
    :class="`${prefixCls} w-100 h-100 position-relative d-flex justify-content-center align-items-center`"
  >
    <noServer />
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
        500
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
        抱歉，服务器出错了
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

<script setup lang="ts" name="500Page">
import noServer from '/@/assets/status/500.svg?component'
import appConfig from '/@/hooks'

const prefixCls = computed(() => `${appConfig.prefixCls}-no-server-page`)
</script>

<style lang="scss" scoped>
$no-server-page: '#{$prefixCls}-no-server-page';

.#{$no-server-page} {
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
