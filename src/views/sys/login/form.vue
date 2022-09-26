<template>
  <div :class="`${prefixCls} login-box`">
    <Motion>
      <h2 class="outline-none">{{ title }}</h2>
      <!-- 默认登录 -->
      <DefaultForm v-if="currentPage === 0" />
      <!-- 手机号登录 -->
      <PhoneForm v-if="currentPage === 1" />
      <!-- 二维码登录 -->
      <CustomQrCode v-if="currentPage === 2" />
      <!-- 注册 -->
      <RegisterForm v-if="currentPage === 3" />
      <!-- 忘记密码 -->
      <UpdateForm v-if="currentPage === 4" />
    </Motion>
    <!-- 其他登录方式 -->
    <Motion v-if="currentPage === 0" :delay="300">
      <el-form-item>
        <div class="w-100 d-flex justify-content-between align-items-center">
          <el-button
            v-for="(item, index) in operates"
            :key="index"
            class="w-100"
            size="default"
            @click="onHandle(index + 1)"
          >
            {{ item.title }}
          </el-button>
        </div>
      </el-form-item>
    </Motion>
    <!-- 第三方登录 -->
    <Motion v-if="currentPage === 0" :delay="350">
      <el-form-item>
        <el-divider>
          <p>第三方登录</p>
        </el-divider>
        <div class="third-icon w-100 d-flex justify-content-around">
          <span v-for="(item, index) in thirdParty" :key="index" :title="item.title">
            <SvgIcon :name="item.icon" :size="20" class="cursor-pointer" />
          </span>
        </div>
      </el-form-item>
    </Motion>
  </div>
</template>

<script lang="ts" setup name="LoginPageForm">
import DefaultForm from './components/default.vue'
import PhoneForm from './components/phone.vue'
import CustomQrCode from './components/qrCode.vue'
import RegisterForm from './components/register.vue'
import UpdateForm from './components/update.vue'
import { sys } from '/@/hooks'
import { useUserStoreHook } from '/@/store/modules/user'
import { thirdParty, operates } from './enums'

const title = ref<string>('Admin')

const prefixCls = computed<string>(() => `${sys.value.prefixCls}-login-page-form`)

const currentPage = computed(() => {
  return useUserStoreHook().currentPage
})

function onHandle(value: number) {
  useUserStoreHook().SET_CURRENT_PAGE(value)
}
</script>

<style lang="scss" scoped>
$login-page-form: '#{$prefixCls}-login-page-form';
.#{$login-page-form} {
  width: 360px;
  text-align: center;
  ::v-deep(h2) {
    text-transform: uppercase;
    margin: 15px 0;
    color: var(--el-text-color-primary);
    font: 700 200% Consolas, Monaco, monospace;
  }
  ::v-deep(.el-divider__text) {
    background-color: transparent;
  }
}
</style>
