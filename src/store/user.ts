import { defineStore } from "pinia";
import { ref } from "vue";

interface UserState {
    token: string;
    username: string;
    roles: string[];
} 

export const useUserStore = defineStore('user', ()=>{
    // 状态
    const userInfo = ref<UserState | null>(null); // 存储用户信息
    const token = ref<string>('');
    // 动作Actions
    // 模拟登录函数
    const login = async(role: 'admin' | 'user') =>{
        await new Promise(resolve => setTimeout(resolve, 500)); // 模拟异步登录请求
        token.value = 'fake-token-' + Date.now();

        userInfo.value = {
            token: token.value,
            username: role === 'admin' ? '超级管理员' : '普通用户',
            roles: [role]
        }
        localStorage.setItem('token', token.value);

    }
    // 模拟登出函数
    const logout = () => {
        token.value = '';
        userInfo.value = null;
        localStorage.removeItem('token');
    }
    // 检查用户是否具有指定角色的函数
    const hasRole = (role:string) => {
        return userInfo.value?.roles.includes(role); // 检查用户是否具有指定角色
    }

    return {
        token,
        userInfo,
        login,
        logout,
        hasRole
    }
},{
    persist: true
} );