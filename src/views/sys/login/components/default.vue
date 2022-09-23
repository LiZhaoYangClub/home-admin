<template>
  <div :class="`${prefixCls}`">
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="loginRules"
      size="large"
      @keyup.enter="onLogin(ruleFormRef)"
    >
      <Motion :delay="100">
        <el-form-item
          :rules="[
            {
              required: true,
              message: '请输入账号',
              trigger: 'blur'
            }
          ]"
          prop="username"
        >
          <el-input
            v-model="ruleForm.username"
            clearable
            placeholder="账号"
            :prefix-icon="userIcon"
          />
        </el-form-item>
      </Motion>
      <Motion :delay="150">
        <el-form-item prop="password">
          <el-input
            v-model="ruleForm.password"
            clearable
            show-password
            placeholder="密码"
            :prefix-icon="passwordIcon"
          />
        </el-form-item>
      </Motion>
      <Motion :delay="200">
        <el-form-item prop="verifyCode">
          <el-input
            v-model="ruleForm.verifyCode"
            clearable
            placeholder="验证码"
            :prefix-icon="verifyCode"
          >
            <template #append>
              <ImageVerify v-model:code="imgCode" />
            </template>
          </el-input>
        </el-form-item>
      </Motion>
      <Motion :delay="250">
        <el-form-item>
          <div class="w-100 d-flex justify-content-between align-items-center">
            <el-checkbox v-model="checked"> 记住密码 </el-checkbox>
            <el-button link type="primary" @click="useUserStoreHook().SET_CURRENT_PAGE(4)">
              忘记密码?
            </el-button>
          </div>
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
    </el-form>
  </div>
</template>

<script lang="ts" setup name="LoginPageFormDefault">
import type { FormInstance } from 'element-plus'
import { useUserStoreHook } from '/@/store/modules/user'
import { loginRules } from '../rule'
import { successTip } from '/@/utils/message'
import { sys } from '/@/hooks'

import passwordIcon from '/@/icons/password.svg?component'
import userIcon from '/@/icons/user.svg?component'
import verifyCode from '/@/icons/verifyCode.svg?component'

const ruleFormRef = ref<FormInstance>()
const router = useRouter()

const imgCode = ref<string>('')
const checked = ref<boolean>(false)
const loading = ref<boolean>(false)
const ruleForm = reactive({
  username: 'admin',
  password: 'admin123',
  verifyCode: ''
})

const prefixCls = computed<string>(() => `${sys.value.prefixCls}-login-page-form-default`)

const onLogin = async (formEl: FormInstance | undefined) => {
  loading.value = true
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      // 模拟请求，需根据实际开发进行修改
      setTimeout(() => {
        loading.value = false
        successTip('登录成功')
        router.push('/')
      }, 2000)
    } else {
      loading.value = false
      return fields
    }
  })
}

watch(imgCode, value => {
  useUserStoreHook().SET_VERIFY_CODE(value)
})
</script>

<style lang="scss" scoped>
$login-page-form-default: '#{$prefixCls}-login-page-form-default';
.#{$login-page-form-default} {
  color: #999;
  ::v-deep(.el-input-group__append) {
    padding: 0;
  }
}
</style>
