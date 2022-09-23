<template>
  <div :class="`${prefixCls} tool-bar d-flex justify-content-center align-items-center`">
    <!-- 主题 -->
    <el-switch
      v-model="dataTheme"
      inline-prompt
      :active-icon="dayIcon"
      :inactive-icon="darkIcon"
      active-value="default"
      inactive-value="dark"
      @change="handleThemeChange"
    />
    <!-- 国际化 -->
    <el-dropdown trigger="click">
      <globalization class="cursor-pointer outline-none" />
    </el-dropdown>
  </div>
</template>

<script lang="ts" setup name="LoginPageTool">
import dayIcon from '/@/icons/day.svg?component'
import darkIcon from '/@/icons/dark.svg?component'
import globalization from '/@/icons/globalization.svg?component'

import { sys } from '/@/hooks'
import { useThemeStoreHook } from '/@/store/modules/theme'

const dataTheme = ref<string>(sys.value.theme)

onMounted(() => {
  setTimeout(() => {
    useThemeStoreHook().setTheme('dark')
  }, 2000)
})

watch(sys, () => {
  dataTheme.value = sys.value.theme
})

/**
 * @description: 切换主题
 * @param {*} curTheme
 * @return {*}
 */
const handleThemeChange = (curTheme: any): void => {
  useThemeStoreHook().setTheme(curTheme)
}

const prefixCls = computed(() => `${sys.value.prefixCls}-login-tool`)
</script>

<style lang="scss" scoped>
$login-tool: '#{$prefixCls}-login-page-tool';
.#{$login-tool} {
}
.tool-bar {
  position: absolute;
  top: 20px;
  right: 20px;
  & > div {
    margin: 0 5px;
  }
}
</style>
