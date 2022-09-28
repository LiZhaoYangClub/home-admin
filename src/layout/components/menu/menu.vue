<template>
  <el-menu
    router
    unique-opened
    mode="vertical"
    :class="`${prefixCls}-nav-menu`"
    :collapse="isCollapse"
    :default-active="activeMenu"
    :collapse-transition="false"
    active-text-color="#ffd04b"
    background-color="#545c64"
    text-color="#fff"
    @select="indexPath => menuSelect(indexPath)"
  >
    <MenuItem v-for="item in routers" :key="item.name" :item="item" base-path="" />
  </el-menu>
</template>

<script lang="ts" setup name="LayoutMenu">
import { systemApp } from '../../hooks'
import MenuItem from './menuItem.vue'
import { sys } from '/@/hooks'
import { listenerRouteChange } from '/@/hooks/mitt'

const activeMenu = ref<string>('')
const prefixCls = computed(() => `${sys.value.prefixCls}`)

const route = useRoute()
console.log(3333, route.path)
activeMenu.value = route.path

const { isCollapse, routers } = systemApp()

const menuSelect = (indexPath: string) => {
  activeMenu.value = indexPath
}

// 切换到隐藏的路由时，激活currentActiveMenu 菜单
listenerRouteChange(router => {
  const shouldActiveMenu = router.meta?.currentActiveMenu as string
  if (shouldActiveMenu) {
    activeMenu.value = shouldActiveMenu
  }
})
</script>

<style lang="scss" scoped>
$nav-menu: '#{$prefixCls}-nav-menu';
.#{$nav-menu} {
  border-right: none;
}
</style>
