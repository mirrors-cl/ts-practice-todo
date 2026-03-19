import { MockMethod } from 'vite-plugin-mock'

export default [
    {
        url: '/api/login',
        method: 'post',
        response: ({ body }) => {
            const { account } = body || {};
            if (account === 'admin') {
                return {
                    code: 200,
                    message: '登录成功',
                    result: { token: 'admin-token-12345', username: '超级管理员', role: 'admin' }
                }
            }
            return {
                code: 200,
                message: '登录成功',
                result: { token: 'user-token-67890', username: '普通用户', role: 'user' }
            }
        }
    }
] as MockMethod[]