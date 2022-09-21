// 当前生效的样式表
// 无 title 无alternate 必 加载渲染
// <Link href="reset.css" rel="stylesheet" type="text/css" />
// 有title 无 alternate 作为默认css 加载渲染
// <Link href="default.css" rel="stylesheet" type="text/css" title="default" />

// 引入但未生效的样式表
// 有title 有 alternate 只加载不渲染
// <Link href="red.css" rel="alternate stylesheet" type="text/css" title="red" />
// <Link href="green.css" rel="alternate stylesheet" type="text/css" title="green" />

// css-vars-ponyfill
export const changeTheme = (name: string) => {
  // 清除原皮肤
  const preLinkDom = document.querySelectorAll(`link[title]`)
  preLinkDom.forEach(link => {
    if (link) {
      ;(link as HTMLLinkElement).disabled = true
    }
  })
  // 渲染 red.css 这个皮肤
  const linkDom = document.querySelector(
    `link[href="/theme/${name}.css"]`
  ) as Nullable<HTMLLinkElement>
  if (!linkDom) return
  linkDom.disabled = false
}
