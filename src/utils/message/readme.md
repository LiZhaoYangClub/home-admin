# Confirm

## useage

```ts
interface ConfirmParams {
  render?: string
  title?: string
  label?: string
  desc?: string
  type?: Types
  successCb?: string | Fun
  errorCb?: string | Fun
}
```

```js
openConfirm({
  label: `确定${text}此作业？`,
  desc: '',
  successCb: async () => {
    try {
      await realtimeWork.operateStatus(jobId)
      successTip(`作业${text}成功！`)
      refresh()
    } catch (error) {
      console.log(error)
    }
  },
  errorCb: () => {}
})
```

```js
successTip(msg)
errorTip(msg)
infoTip(msg)
warnTip(msg)
```
