<template>
  <SvgIcon name="vue"></SvgIcon>
  <VueSvg />
  <el-button type="primary" @click="handleClick">Primary</el-button>
  <el-button type="warning" plain>Warning</el-button>
  <el-button type="danger" plain>Danger</el-button>
</template>

<script lang="ts" setup name="App">
import { ElMessage } from 'element-plus'
import VueSvg from '/@/assets/vue.svg?component'
import { useThemeStoreHook } from '/@/store/modules/theme'

const handleClick = () => {
  useThemeStoreHook().setTheme('dark')
}
onMounted(() => {
  ElMessage({
    showClose: true,
    message: 'Warning, this is a warning message.',
    type: 'warning'
  })
})
</script>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
</style>
