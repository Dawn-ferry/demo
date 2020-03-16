// 配置路由信息
import Vue from 'vue'
import VueRouter from 'vue-router'
// 导入路由组件
import Login from '../pages/Login.vue'
import Register from '../pages/Register.vue'
import User from '../pages/User.vue'
// 使用路由组件
Vue.use(VueRouter)
// 
const router = new VueRouter({
    routes: [
        { path: '/', redirect: '/login' },
        { path: '/login', component: Login, name: 'login' },
        { path: '/register', component: Register, name: 'register' },
        { path: '/user', component: User, name: 'user' }
    ]
})

// 导出路由信息
export default router