# Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)

## Type Support For `.vue` Imports in TS

Since TypeScript cannot handle type information for `.vue` imports, they are shimmed to be a generic Vue component type by default. In most cases this is fine if you don't really care about component prop types outside of templates. However, if you wish to get actual prop types in `.vue` imports (for example to get props validation when using manual `h(...)` calls), you can enable Volar's Take Over mode by following these steps:

1. Run `Extensions: Show Built-in Extensions` from VS Code's command palette, look for `TypeScript and JavaScript Language Features`, then right click and select `Disable (Workspace)`. By default, Take Over mode will enable itself if the default TypeScript extension is disabled.
2. Reload the VS Code window by running `Developer: Reload Window` from the command palette.

You can learn more about Take Over mode [here](https://github.com/johnsoncodehk/volar/discussions/471).

## Theme

- 注入拦截前缀 在 `/@/styles/global/var.scss` 文件中, 会自动注入到全局 在 `sass` 文件中直接使用变量即可

```scss
$prefixCls: 'lzy';
```

- 修改 `/@/utils/storage/settings.json` 文件中的 `prefixCls` 需同上面保持一致 此作用在 `js` 中获取前缀

```json
{
  "prefixCls": "lzy"
}
```

- `/public/theme/**.css` 为全局主题文件，需在 `index.html` 中引用

```css
/* /public/theme/default.css */
:root {
  --el-color-white: #0e2031 !important;
}
```

- 主题切换定义在 `/@/utils/theme/index.ts` 中 `changeTheme` 方法 可直接调用封装的 `/@/store/modules/theme.ts` 中 `setTheme` 方法

- 组件中使用：

```vue
<template>
  <svg :class="className">
    <use :xlink:href="symbolId" />
  </svg>
</template>

<script lang="ts" setup name="SvgIcon">
import locale from '/@/utils/storage'

// 获取系统配置
const sys = locale.getSystem()

const className = computed(() => `${sys.prefixCls}-svg-icon svg-icon`)
</script>

<style lang="scss" scoped>
// 定义类名
$svg: '#{$prefixCls}-svg-icon';
// 使用
.#{$svg} {
  color: var(--el-color-white);
}
</style>
```
