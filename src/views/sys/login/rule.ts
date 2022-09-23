import type { FormRules } from 'element-plus'
import { useUserStoreHook } from '/@/store/modules/user'

export const isPhone = (str: string): boolean => {
  const reg = /^1(3\d|4[5-9]|5[0-35-9]|6[567]|7[0-8]|8\d|9[0-35-9])\d{8}$/
  return reg.test(str)
}

/** 6位数字验证码正则 */
export const REGEXP_SIX = /^\d{6}$/

/** 密码正则（密码格式应为8-18位数字、字母、符号的任意两种组合） */
export const REGEXP_PWD =
  /^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)]|[()])+$)(?!^.*[\u4E00-\u9FA5].*$)([^(0-9a-zA-Z)]|[()]|[a-z]|[A-Z]|[0-9]){8,18}$/

/** 登录校验 */
const loginRules = reactive(<FormRules>{
  password: [
    {
      validator: (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'))
        } else if (!REGEXP_PWD.test(value)) {
          callback(new Error('密码格式应为8-18位数字、字母、符号的任意两种组合'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ],
  verifyCode: [
    {
      validator: (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入验证码'))
        } else if (useUserStoreHook().verifyCode !== value) {
          callback(new Error('请输入正确的验证码'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ]
})

/** 手机登录校验 */
const phoneRules = reactive(<FormRules>{
  phone: [
    {
      validator: (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入手机号码'))
        } else if (!isPhone(value)) {
          callback(new Error('请输入正确的手机号码格式'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ],
  verifyCode: [
    {
      validator: (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入验证码'))
        } else if (!REGEXP_SIX.test(value)) {
          callback(new Error('请输入6位数字验证码'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ]
})

/** 忘记密码校验 */
const updateRules = reactive(<FormRules>{
  phone: [
    {
      validator: (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入手机号码'))
        } else if (!isPhone(value)) {
          callback(new Error('请输入正确的手机号码格式'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ],
  verifyCode: [
    {
      validator: (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入验证码'))
        } else if (!REGEXP_SIX.test(value)) {
          callback(new Error('请输入6位数字验证码'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ],
  password: [
    {
      validator: (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'))
        } else if (!REGEXP_PWD.test(value)) {
          callback(new Error('密码格式应为8-18位数字、字母、符号的任意两种组合'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ]
})

export { loginRules, phoneRules, updateRules }
