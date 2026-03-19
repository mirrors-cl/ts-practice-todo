import type { MockMethod } from 'vite-plugin-mock'

export default [
    // 模拟获取任务列表
    {
        url: '/api/getTaskList',
        method: 'get',
        response: () => {
            return {
                code: 200,
                message: 'ok',
                result: [
                    { id: '1', content: '学习 TS 泛型与 Mock', isDone: true, deadline: '2024-12-12' },
                    { id: '2', content: '重构简历，准备面试', isDone: false, deadline: '2024-11-11' },
                    { id: '3', content: '高阶组件开发', isDone: false, deadline: '2025-01-01' }
                ]
            }
        }
    },
    // 模拟获取用户列表
    {
        url: '/api/getUserList',
        method: 'get',
        response: () => {
            return {
                code: 200,
                message: 'ok',
                result: [
                    { id: '101', username: '张三 (Mock)', role: '管理员' },
                    { id: '102', username: '李四 (Mock)', role: '普通用户' }
                ]
            }
        }
    }
] as MockMethod[]