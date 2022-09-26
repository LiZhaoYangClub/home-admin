import { MockMethod } from 'vite-plugin-mock'
import { resultError, resultSuccess, getRequestToken, requestParams } from '../utils'

const checkUser = {
  userId: '2',
  username: 'test',
  password: '123456',
  realName: 'test user',
  avatar: 'https://q1.qlogo.cn/g?b=qq&nk=339449197&s=640',
  desc: 'tester',
  token: 'fakeToken2',
  homePath: '/dashboard/workbench',
  roles: [
    {
      roleName: 'Tester',
      value: 'test'
    }
  ]
}

export default [
  // mock user login
  {
    url: '/api/login',
    timeout: 200,
    method: 'post',
    response: ({ body }) => {
      const { username, password } = body
      console.log('======>user', username, password)
      return resultSuccess({
        token: 'xxxxxxxxx',
        name: 'dddd'
      })
    }
  },
  {
    url: '/api/userinfo',
    method: 'get',
    response: (request: requestParams) => {
      const token = getRequestToken(request)
      if (!token) return resultError('Invalid token')
      const { userId, username: _username, realName, desc, roles } = checkUser
      return resultSuccess({
        roles,
        userId,
        username: _username,
        realName,
        desc
      })
    }
  },
  {
    url: '/api/logout',
    timeout: 200,
    method: 'get',
    response: (request: requestParams) => {
      const token = getRequestToken(request)
      if (!token) return resultError('Invalid token')
      return resultSuccess(undefined, { message: 'Token has been destroyed' })
    }
  }
] as MockMethod[]
