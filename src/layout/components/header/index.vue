<template>
  <div class="">
    <el-button type="primary" @click="handleClick">toBtnPage</el-button>
    <el-button type="primary" @click="handleClickCol">收起、折叠</el-button>
  </div>
</template>

<script lang="ts" setup name="LayoutHeader">
import { useAppStoreHook } from '/@/store/modules/app'

const router = useRouter()

const handleClick = () => {
  router.push('/back/btn')
}
const handleClickCol = () => {
  console.log(1111)
  useAppStoreHook().changeMenuState()
}
</script>

<style lang="scss" scoped></style>
