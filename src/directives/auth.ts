import type { Directive } from "vue";
import { useUserStore } from "../store/user";

export const auth:Directive = {
    mounted(el, binding) {
        const userStore = useUserStore()
        // 1. 获取指令传过来的值，比如 v-auth="'admin'" 中的 'admin'
        const requiredRole = binding.value;
        // 2. 如果没传值，或者传的是空，就不管
        if(!requiredRole) return;
        // 3. 核心判断：如果没有这个角色
        // (这里利用了 store 里已经写好的 hasRole 方法)
        if(!userStore.hasRole(requiredRole)){
            // 4. 手术刀行动：把自己从父节点中移除
            if(el.parentNode){
                el.parentNode.removeChild(el);
            }
        }
    }
}