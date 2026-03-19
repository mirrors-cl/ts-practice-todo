import { defineStore } from "pinia";
import { ref } from "vue";
import { loginApi } from "../api/user";
interface UserState {
    token: string;
    username: string;
    roles: string[];
}

export const useUserStore = defineStore('user', () => {
    // 状态
    const userInfo = ref<UserState | null>(null); // 存储用户信息
    const token = ref<string>(localStorage.getItem('token') || ''); // 初始化时尝试读取本地Token

    // 动作Actions
    // 模拟登录函数
    const login = async (role: 'admin' | 'user') => {
        // 模拟异步登录请求
        // await new Promise(resolve => setTimeout(resolve, 500));
        const res = await loginApi({ account: role, password: '123' });
        const newToken = res.result.token;
        // const newUserInfo = {
        //     token: token.value,
        //     username: role === 'admin' ? '超级管理员' : '普通用户',
        //     roles: [role]
        // }
        // 更新状态
        // userInfo.value = newUserInfo;
        token.value = newToken;
        localStorage.setItem('token', newToken);
        // 注意：这里我们存一个 localStorage 来模拟后端记住角色
        // 实际项目中是靠 token 调 getUserInfo 接口拿回来的
        localStorage.setItem('user_role', role);

    }
    // 模拟登出函数
    const logout = () => {
        token.value = '';
        userInfo.value = null;
        localStorage.removeItem('token');
        localStorage.removeItem('user_role');
        location.reload(); // 重新加载页面以重置状态
    }
    // 检查用户是否具有指定角色的函数
    const hasRole = (role: string) => {
        return userInfo.value?.roles.includes(role); // 检查用户是否具有指定角色
    }

    // 作用：如果发现有 Token 但没用户信息，就模拟去后端拉取一次
    const initUser = async () => {
        if (!token.value) return

        // 模拟调用 getUserInfo 接口
        // 这里我们就偷懒从 localStorage 读取刚才存的 role
        const savedRole = localStorage.getItem('user_role') || 'user';
        userInfo.value = {
            token: token.value,
            username: savedRole === 'admin' ? '超级管理员' : '普通用户',
            roles: [savedRole]
        }
    }
    return {
        token,
        userInfo,
        login,
        logout,
        hasRole,
        initUser
    }
}, {
    // persist: true
});