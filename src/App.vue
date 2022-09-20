<template>
  <SvgIcon name="vue"></SvgIcon>
  <VueSvg /> <HelloWorld msg="Vite + Vue" />
  <el-button type="warning" plain>Warning</el-button>
  <el-button type="danger" plain>Danger</el-button>
</template>

<script lang="ts" setup name="App">
import { ElMessage } from 'element-plus'
import { useThemeStoreHook } from './store/modules/theme'
import VueSvg from '/@/assets/vue.svg?component'

onMounted(() => {
  ElMessage({
    showClose: true,
    message: 'Warning, this is a warning message.',
    type: 'warning'
  })

  setTimeout(() => {
    useThemeStoreHook().setTheme('dark')
  }, 2000)
})
</script>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
