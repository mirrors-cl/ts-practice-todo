import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import './style.css'
import App from './App.vue'
import router from './router'
import { auth } from "./directives/auth";
const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(pinia)
app.use(router)
// 2. 全局注册指令
// 以后你在任何地方写 v-auth，Vue 就知道是用 auth 这个逻辑
app.directive('auth', auth)
app.mount('#app')