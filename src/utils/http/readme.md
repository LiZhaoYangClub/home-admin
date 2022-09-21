# 请求示例

## 创建实例 `http.ts`

```js
import createAxios from './src/index'

//
const http = createAxios({
  authenticationScheme: '',
  urlPrefix: '',
  timeout: 10 * 1000,
  headers: {
    'Content-Type': ContentTypeEnum.JSON,
    ignoreCancelToken: true
  },
  transform: {
    // 处理请求数据。如果数据不是预期格式，可直接抛出错误
    transformRequestHook: () => {}, // 无需修改
    // 请求之前处理config
    beforeRequestHook: () => {}, // 无需修改
    // 请求拦截器处理
    requestInterceptors: () => {}, // 无需修改
    // 响应拦截器处理
    responseInterceptors: () => {}, // 无需修改
    // 响应错误处理
    responseInterceptorsCatch: () => {}, // 无需修改
    // 后台状态码拦截 非'000000'
    handlerAbnormalCode: () => {} // 需自行配置，参照下方示例
  },
  // 配置项，下面的选项都可以在独立的接口请求中覆盖
  requestOptions: {
    // 默认将prefix 添加到url
    joinPrefix: true,
    // 是否返回原生响应头 比如：需要获取响应头时使用该属性
    isReturnNativeResponse: false,
    // 需要对返回数据进行处理
    isTransformResponse: true,
    // post请求的时候添加参数到url
    joinParamsToUrl: false,
    // 格式化提交参数时间
    formatDate: true,
    // 接口地址
    apiUrl: '',
    //  是否加入时间戳
    joinTime: true,
    // 忽略重复请求
    ignoreCancelToken: true,
    // 是否携带token
    withToken: true
  }
})

export default http
```

```js
// http 是创建的实例
import http from 'http'
import type { AxiosRequestConfig }  from 'axios

const requestConfig: AxiosRequestConfig = {}

http.get(
  {
    url: '',
    ...
  },
  {
    // 是否返回原生响应头 比如：需要获取响应头时使用该属性
    isReturnNativeResponse: false,
    // 需要对返回数据进行处理
    isTransformResponse: true,
    ...
  }
)
```

## 异常状态码拦截处理示例

```js
const handlerAbnormalCode = (code: '103107' | '103104' | '103105' | '103109' | '103102'): void => {
  switch (code) {
    case '103107':
      createModal('登录提示', '该用户已在其他地方登录, 确定强制登录吗?', async () => {
        await userStore.reLogin()
        location.reload()
      })
      break
    case '103104':
      createModal('登录提示', '该用户已在其他地方登录, 确定重新登录吗?', async () => {
        removeToken()
        location.reload()
      })
      break
    case '103105':
      createModal('过期提示', '该用户密码已过期, 确定跳转修改密码页吗?', async () => {
        // 不允许浏览器后退
        router.replace('/resetPass')
      })
      break
    case '103109':
      createModal('变更提示', '该用户权限已变更, 确定跳转登录页吗?', async () => {
        removeToken()
        location.reload()
      })
      break
    case '103102':
      errorTip('登录已失效，请重新登录！')
      setTimeout(() => {
        removeToken()
        location.reload()
      }, 1000)
      break
    default:
  }
}
```
