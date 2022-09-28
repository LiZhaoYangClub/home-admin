<template>
  <el-container
    :class="`${prefixCls} w-100 h-100 overflow-hidden position-relative d-flex flex-column`"
  >
    <el-header class="header overflow-hidden">
      <Header />
    </el-header>
    <el-container class="flex-1 overflow-hidden position-relative">
      <el-aside :width="asideWidth" class="aside">
        <el-scrollbar height="100%"> <Menu /> </el-scrollbar>
      </el-aside>
      <el-main class="overflow-hidden main" style="padding: 0">
        <el-scrollbar height="100%">
          <router-view />
        </el-scrollbar>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup name="Layout">
import { sys } from '/@/hooks'
import Menu from './components/menu/menu.vue'
import Header from './components/header/index.vue'
import { systemApp } from './hooks'

const { isCollapse } = systemApp()
const prefixCls = computed(() => `${sys.value.prefixCls}-layout`)

const asideWidth = computed<string>(() => (isCollapse.value ? '64px' : '200px'))
</script>

<style lang="scss" scoped>
$layout: '#{$prefixCls}-layout';

.#{$layout} {
  .aside {
    background-color: var(--c-menu-bg-color);
  }
  @media screen and (max-width: $screen-xs) {
    .header {
      display: none;
      background-color: rgb(22, 14, 14);
    }
    .aside {
      display: none;
    }
  }
  @media screen and (min-width: $screen-xs) {
    .header {
      display: none;
      background-color: rgb(22, 14, 14);
    }
    .aside {
      display: none;
    }
  }
  @media screen and (min-width: $screen-sm) {
    .header {
      display: block;
      background-color: #fff;
    }
    .aside {
      display: none;
    }
  }

  @media screen and (min-width: $screen-md) {
    .header {
      display: block;
      background-color: rgb(203, 46, 46);
    }
    .aside {
      display: none;
    }
  }

  @media screen and (min-width: $screen-lg) {
    .header {
      display: block;
      background-color: rgb(34, 95, 152);
    }
    .aside {
      display: none;
    }
  }

  @media screen and (min-width: $screen-xl) {
    .header {
      display: block;
      background-color: rgb(134, 23, 104);
    }
    .aside {
      display: block;
    }
  }
  @media screen and (min-width: $screen-2xl) {
    .header {
      background-color: rgb(212, 243, 8);
      display: block;
    }
    .aside {
      display: block;
    }
  }
}
</style>
