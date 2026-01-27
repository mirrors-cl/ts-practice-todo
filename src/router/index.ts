import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
    {
        path: "/login",
        name: 'Login',
        component: () => import("../views/Login.vue"),
    },
    {
        path: '/',
        name: 'Dashboard',
        component: () => import('../views/Dashboard.vue'),
        meta: { requiresAuth: true } // 🔥 标记：此路由需要权限
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('token');
    // 判断目标路由是否需要登录权限
    if (to.meta.requiresAuth) {
        if (token) {
            // 有 token，放行
            next();
        } else {
            // 没 token，强制踢回登录页
            console.warn('无权限访问，重定向至登录页')
            next('/login')
        }
    } else {
        next();
    }
})

export default router;