<template>
  <div class="scan-qr-code">
    <Motion class="d-flex justify-content-center qr-code">
      <CustomQrCode text="模拟测试" />
    </Motion>
    <Motion :delay="100">
      <el-divider>
        <p class="text-gray-500 text-xs">扫码后点击"确认"，即可完成登录</p>
      </el-divider>
    </Motion>
    <Motion :delay="150">
      <el-button class="w-100" @click="useUserStoreHook().SET_CURRENT_PAGE(0)"> 返回 </el-button>
    </Motion>
  </div>
</template>

<script setup lang="ts" name="LoginPageFormQrCode">
import { useUserStoreHook } from '/@/store/modules/user'
</script>

<style lang="scss" scoped>
.scan-qr-code {
  .qr-code {
    margin-bottom: 10px;
  }
  ::v-deep(.el-divider__text) {
    background-color: transparent;
  }
  p {
    font-size: 12px;
    color: var(--c-secondary-text-color);
  }
}
</style>
