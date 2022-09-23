import type { FormInstance, FormItemProp } from 'element-plus'
import cloneDeep from 'lodash.clonedeep'

const isDisabled = ref(false)
const timer = ref<IntervalHandle | null>(null)
const text = ref('')

export const useVerifyCode = () => {
  const start = async (formEl: FormInstance | undefined, props: FormItemProp, time = 60) => {
    if (!formEl) return
    const initTime = cloneDeep(time)
    await formEl.validateField(props, isValid => {
      if (isValid) {
        timer.value && clearInterval(timer.value)
        timer.value = setInterval(() => {
          if (time > 0) {
            text.value = `${time}`
            isDisabled.value = true
            time -= 1
          } else {
            text.value = ''
            isDisabled.value = false
            timer.value && clearInterval(timer.value)
            time = initTime
          }
        }, 1000)
      }
    })
  }

  const end = () => {
    text.value = ''
    isDisabled.value = false
    timer.value && clearInterval(timer.value)
  }

  return {
    isDisabled,
    timer,
    text,
    start,
    end
  }
}
