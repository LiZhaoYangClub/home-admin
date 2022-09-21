// CSS变量+动态setProperty => 对颜色值切换

// #css
// :root {
//   --theme-color: #333;
//   --theme-background: #eee;
// }

export const setCssVar = (prop: string, val: any, dom = document.documentElement) => {
  dom.style.setProperty(prop, val)
}
