<template>
  <el-form ref="ruleFormRef" :model="ruleForm" :rules="updateRules" size="large">
    <Motion>
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

    <Motion :delay="100">
      <el-form-item prop="phone">
        <el-input
          v-model="ruleForm.phone"
          clearable
          placeholder="手机号码"
          :prefix-icon="phoneIcon"
        />
      </el-form-item>
    </Motion>

    <Motion :delay="150">
      <el-form-item prop="verifyCode">
        <div class="verify-code w-100 d-flex justify-content-between">
          <el-input
            v-model="ruleForm.verifyCode"
            clearable
            placeholder="短信验证码"
            :prefix-icon="verifyCode"
          />
          <el-button :disabled="isDisabled" @click="useVerifyCode().start(ruleFormRef, 'phone')">
            {{ text.length > 0 ? text + '秒后重新获取' : '获取验证码' }}
          </el-button>
        </div>
      </el-form-item>
    </Motion>

    <Motion :delay="200">
      <el-form-item prop="password">
        <el-input
          v-model="ruleForm.password"
          clearable
          show-password
          placeholder="密码"
          :prefix-icon="lockIcon"
        />
      </el-form-item>
    </Motion>

    <Motion :delay="250">
      <el-form-item :rules="repeatPasswordRule" prop="repeatPassword">
        <el-input
          v-model="ruleForm.repeatPassword"
          clearable
          show-password
          placeholder="确认密码"
          :prefix-icon="lockIcon"
        />
      </el-form-item>
    </Motion>

    <Motion :delay="300">
      <el-form-item>
        <el-checkbox v-model="checked"> 我已仔细阅读并接受 </el-checkbox>
        <el-button link type="primary"> 《隐私政策》 </el-button>
      </el-form-item>
    </Motion>

    <Motion :delay="350">
      <el-form-item>
        <el-button
          class="w-100"
          size="default"
          type="primary"
          :loading="loading"
          @click="onUpdate(ruleFormRef)"
        >
          确定
        </el-button>
      </el-form-item>
    </Motion>

    <Motion :delay="400">
      <el-form-item>
        <el-button class="w-100" size="default" @click="onBack"> 返回 </el-button>
      </el-form-item>
    </Motion>
  </el-form>
</template>

<script setup lang="ts" name="LoginPageFormRegister">
import { updateRules } from '../rule'
import type { FormInstance } from 'element-plus'
import { useVerifyCode } from '../verifyCode'
import { useUserStoreHook } from '/@/store/modules/user'
import userIcon from '/@/icons/user.svg?component'
import phoneIcon from '/@/icons/phone.svg?component'
import verifyCode from '/@/icons/verifyCode.svg?component'
import lockIcon from '/@/icons/lock.svg?component'
import { successTip, warnTip } from '/@/utils/message'

const checked = ref(false)
const loading = ref(false)
const ruleForm = reactive({
  username: '',
  phone: '',
  verifyCode: '',
  password: '',
  repeatPassword: ''
})
const ruleFormRef = ref<FormInstance>()
const { isDisabled, text } = useVerifyCode()
const repeatPasswordRule = [
  {
    validator: (_rule: any, value: string, callback: any) => {
      if (value === '') {
        callback(new Error('请输入确认密码'))
      } else if (ruleForm.password !== value) {
        callback(new Error('两次密码不一致!'))
      } else {
        callback()
      }
    },
    trigger: 'blur'
  }
]

const onUpdate = async (formEl: FormInstance | undefined) => {
  loading.value = true
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      if (checked.value) {
        // 模拟请求，需根据实际开发进行修改
        setTimeout(() => {
          successTip('注册成功')
          loading.value = false
        }, 2000)
      } else {
        loading.value = false
        warnTip('请勾选隐私政策')
      }
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
.verify-code {
  button {
    margin-left: 10px;
  }
}
</style>
