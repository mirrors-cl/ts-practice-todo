import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router";
import { useUserStore } from "../store/user";
// 1. 静态路由：谁都能看
const constantRoutes: RouteRecordRaw[] = [
    {
        path: "/login",
        name: 'Login',
        component: () => import("../views/Login.vue"),
    },
]
// 2. 动态路由：需要权限 (注意：这里我们先定义好，稍后过滤)
// 真实项目中，这里可能也是后端返回的 JSON 配置
export const asyncRoutes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'Dashboard',
        component: () => import('../views/Dashboard.vue'),
        meta: { requiresAuth: true, roles: ['admin', 'user'] } // admin 和 user 都能看
    },
    {
        path: '/admin',
        name: 'Admin',
        component: () => import('../views/Admin.vue'),
        meta: { requiresAuth: true, roles: ['admin'] } // 只有 admin 能看
    }
]
const router = createRouter({
    history: createWebHistory(),
    routes: constantRoutes // ⚠️ 起步时，只有静态路由！
})

router.beforeEach(async (to, from, next) => {
    console.log('全局路由守卫触发:', to.fullPath);
    const userStore = useUserStore();
    const token = localStorage.getItem('token');

    // A. 没有 Token 且要去需要权限的页面 -> 去登录
    if (!token && to.path !== '/login') {
        console.log('A');
        
        next('/login');
        return
    }
    // B. 有 Token，但在登录页 -> 踢去首页
    if (token && to.path === '/login') {
        console.log('B');
        next('/');
        return;
    }
    // C. 有 Token，也有用户信息 -> 放行
    if (userStore.userInfo) {
        console.log('C');
        
        next();
        return;
    }
    // D. 🔥 有 Token，但没用户信息 (比如刚刷新页面) -> 核心动态加载逻辑
    if (token && !userStore.userInfo) {
        console.log('D');
        
        try {
            // 1. 恢复用户信息 (获取角色)
            await userStore.initUser()
            const currentUser = userStore.userInfo as any;

            // 再次检查这个局部变量
            if (!currentUser) {
                throw new Error('用户信息加载失败')
            }
            const roles = currentUser.roles || []

            // 2. 根据角色过滤路由
            const accessibleRoutes = asyncRoutes.filter(route => {
                if (route.meta?.roles) {
                    // 检查当前用户的角色是否在路由允许的角色列表中
                    return (route.meta.roles as string[]).includes(roles[0])
                }
                return true
            })
            // 3. 动态添加到路由表
            accessibleRoutes.forEach(route => {
                router.addRoute(route)
            })
            // 🔥🔥 【核心修复】在这里动态添加兜底路由 🔥🔥
            // 只有当所有正确路由都挂载完了，我们才把这个“黑洞”加进去
            // 这样就避免了还没加路由就被吸进黑洞的死循环
            console.log('kaishi');
            
            router.addRoute({
                path: '/:pathMatch(.*)*',
                name: 'NotFound',
                redirect: '/login' // 或者跳转到专门的 404 页面
            })
            console.log('stop');
            
            next({ ...to, replace: true });

        } catch (error) {
            console.log('动态路由加载失败:', error);
            userStore.logout();
            next('/login')
        }
        return
    }
    if(to.meta.requiresAuth && !token){
        next('/login')
    }else{
        next()
    }
})

export default router;