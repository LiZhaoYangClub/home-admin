<template>
  <el-sub-menu
    v-if="hasOwnChildren"
    :index="resolvePath(item.path)"
    :class="`${prefixCls}-nav-sub-menu`"
  >
    <template #title>
      <SvgIcon v-if="icon" :name="icon" class="menu-icon" />
      <span>{{ title }}</span>
    </template>
    <MenuItem
      v-for="menu in item.children"
      :key="menu.name"
      :item="menu"
      :base-path="basePath ? `${basePath}/${item.path}` : item.path"
    />
  </el-sub-menu>
  <template v-else>
    <el-menu-item v-if="!isHide(item)" :index="resolvePath(item.path)">
      <SvgIcon v-if="icon" :name="icon" class="menu-icon" />
      <span>{{ title }}</span>
    </el-menu-item>
  </template>
</template>

<script lang="ts" setup name="LayoutMenuItem">
import type { RouteRecordRaw } from 'vue-router'
import { sys } from '/@/hooks'

const prefixCls = computed(() => `${sys.value.prefixCls}`)

const props = defineProps<{ item: RouteRecordRaw; basePath: string }>()

const hasOwnChildren = computed(() => {
  const children = props.item?.children?.length
  if (!children) {
    return false
  }
  const noHideChild =
    (props.item.children && props.item.children.filter(child => !child?.meta?.hideMenu)) || []
  return !!noHideChild.length
})
const title = computed<any>(() => props.item?.meta?.title ?? 'unknown')
const icon = computed<any>(() => props.item?.meta?.icon)

const isHide = (item: any): boolean => !!item?.meta?.hideMenu

const resolvePath = (routePath: string) => {
  const httpReg = /^http(s?):\/\//
  if (httpReg.test(routePath) || httpReg.test(props.basePath)) {
    return routePath || props.basePath
  } else {
    return props.basePath ? `${props.basePath}/${routePath}` : routePath
  }
}
</script>

<style lang="scss" scoped>
$nav-sub-menu: '#{$prefixCls}-nav-sub-menu';

.#{$nav-sub-menu} {
  .menu-icon {
    color: inherit;
    margin-right: 10px;
  }
}
</style>
