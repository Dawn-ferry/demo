// 配置路由信息
import Vue from 'vue'
import VueRouter from 'vue-router'
// 导入路由组件
import Login from '../pages/Login.vue'
import Register from '../pages/Register.vue'
import User from '../pages/User.vue'
import Edit from '../pages/Edit.vue'
import Follow from '../pages/Follow.vue'
import Comment from '../pages/comment.vue'
import Home from "../pages/home.vue"
import Star from "../pages/star.vue"
import PostDetail from "../pages/PostDetail.vue"
import MyTab from "../pages/mytab.vue"
import Search from "../pages/search.vue"
import Test from '../pages/test.vue'
import aa from "../pages/aa.vue"

// 使用路由组件
Vue.use(VueRouter)
// 路由管理
const router = new VueRouter({
    routes: [
        { path: '/', redirect: '/home' },
        { path: '/home', component: Home, name: 'home' },
        { path: '/login', component: Login, name: 'login' },
        { path: '/register', component: Register, name: 'register' },
        { path: '/user', component: User, name: 'user' },
        { path: '/edit', component: Edit, name: 'edit' },
        { path: '/follow', component: Follow, name: 'follow' },
        { path: '/comment', component: Comment, name: 'comment' },
        { path: '/star', component: Star, name: 'star' },
        { path: '/post-detail/:id', component: PostDetail, name: 'post-detail' },
        { path: '/mytab', component: MyTab, name: 'mytab' },
        { path: '/search', component: Search, name: 'search' },
        { path: '/aa', component: aa, name: 'aa' },

    ]
})
// 路由拦截
// 优化路径的拦截,将需要拦截的路径集中放在一个数组中
const authURL = ['/user', '/edit', '/follow', '/comment', '/star', 'aa']
router.beforeEach(function (to, from, next) {

    const token = localStorage.getItem('token')
    if (authURL.includes(to.path)) {
        // 判断是否有token
        if (token) {
            next()
        } else {
            // 跳转登录页
            // next('/login')
            router.push('/login')
        }
    } else {
        next()
    }
})

// 导出路由信息
export default router