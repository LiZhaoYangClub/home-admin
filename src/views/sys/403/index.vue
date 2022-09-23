<template>
  <div
    :class="`${prefixCls} w-100 h-100 position-relative d-flex justify-content-center align-items-center`"
  >
    <noAccess />
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
        403
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
        抱歉，你无权访问该页面
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

<script setup lang="ts" name="403Page">
import { sys } from '/@/hooks'
import noAccess from '/@/assets/status/403.svg?component'

const prefixCls = computed(() => `${sys.value.prefixCls}-no-access-page`)
</script>

<style lang="scss" scoped>
$no-access-page: '#{$prefixCls}-no-access-page';

.#{$no-access-page} {
  & > div {
    margin-left: 48px;
    width: 200px;
    .title {
      font-weight: 500;
      font-size: 36px;
      line-height: 62px;
      color: var(--c-primary-text-color);
    }
    .description {
      font-weight: 400;
      font-size: 16px;
      line-height: 32px;
      color: var(--c-secondary-text-color);
    }
    button {
      margin: 8px 0;
    }
  }
}
</style>
