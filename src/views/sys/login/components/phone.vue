<template>
  <div :class="`${prefixCls}`">
    <el-form ref="ruleFormRef" :model="ruleForm" :rules="phoneRules" size="large">
      <Motion>
        <el-form-item prop="phone">
          <el-input
            v-model="ruleForm.phone"
            clearable
            placeholder="手机号"
            :prefix-icon="iphoneIcon"
          />
        </el-form-item>
      </Motion>

      <Motion :delay="100">
        <el-form-item prop="verifyCode">
          <div class="verify-code-row w-100 d-flex justify-content-between">
            <el-input
              v-model="ruleForm.verifyCode"
              clearable
              placeholder="短信验证码"
              :prefix-icon="verifyCode"
            />
            <el-button
              :disabled="isDisabled"
              class="ml-2"
              @click="useVerifyCode().start(ruleFormRef, 'phone')"
            >
              {{ text.length > 0 ? text + '秒后重新获取' : '获取验证码' }}
            </el-button>
          </div>
        </el-form-item>
      </Motion>

      <Motion :delay="150">
        <el-form-item>
          <el-button
            class="w-100"
            size="default"
            type="primary"
            :loading="loading"
            @click="onLogin(ruleFormRef)"
          >
            登录
          </el-button>
        </el-form-item>
      </Motion>

      <Motion :delay="200">
        <el-form-item>
          <el-button class="w-100" size="default" @click="onBack"> 返回 </el-button>
        </el-form-item>
      </Motion>
    </el-form>
  </div>
</template>

<script setup lang="ts" name="LoginPageFormPhone">
import iphoneIcon from '/@/icons/phone.svg?component'
import verifyCode from '/@/icons/verifyCode.svg?component'
import { phoneRules } from '../rule'
import type { FormInstance } from 'element-plus'
import { useVerifyCode } from '../verifyCode'
import { useUserStoreHook } from '/@/store/modules/user'
import { successTip } from '/@/utils/message'
import { sys } from '/@/hooks'

const loading = ref(false)
const ruleForm = reactive({
  phone: '',
  verifyCode: ''
})
const ruleFormRef = ref<FormInstance>()
const { isDisabled, text } = useVerifyCode()

const prefixCls = computed<string>(() => `${sys.value.prefixCls}-login-page-form-phone`)

const onLogin = async (formEl: FormInstance | undefined) => {
  loading.value = true
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      // 模拟登录请求，需根据实际开发进行修改
      setTimeout(() => {
        successTip('登录成功')
        loading.value = false
      }, 2000)
    } else {
      loading.value = false
      return fields
    }
  })
}

function onBack() {
  useVerifyCode().end()
  useUserStoreHook().SET_CURRENT_PAGE(0)
}
</script>

<style lang="scss" scoped>
$login-page-form-phone: '#{$prefixCls}-login-page-form-phone';
.#{$login-page-form-phone} {
  .verify-code-row {
    ::v-deep(button) {
      margin-left: 10px;
    }
  }
}
</style>
