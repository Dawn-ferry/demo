import Vue from 'vue'
import App from './App.vue'
// 导入样式
import './styles/base.less'
// 导入字体图标
import './styles/iconfont.css'
// 导入rem插件，这个插件会适配屏幕省略媒体查询
import 'lib-flexible'
// 导入路由对象
import router from './router'
// 导入axios
import axios from 'axios'
// 优化axios
// 将axios绑定到vue的原型上
Vue.prototype.$axios = axios
// 给axios配置默认的基础路径
axios.defaults.baseURL = 'http://localhost:3000'
// 全局导入vant的ui框架
import Vant from 'vant'
import 'vant/lib/index.css'
// 使用vant
Vue.use(Vant)
import { Toast } from 'vant';

Vue.use(Toast);
//导入全局组件
import hmheader from './components/hmheader.vue'
import hmlogo from './components/hmlogo.vue'
import hmbutton from './components/hmbutton.vue'
import hminput from './components/hminput.vue'
import hmnavbar from './components/hmnavbar.vue'
import hmpost from './components/hmpost.vue'
import hmpinglun from './components/hmpinglun.vue'
// 注册全局组件
Vue.component("hm-header", hmheader)
Vue.component("hm-logo", hmlogo)
Vue.component("hm-button", hmbutton)
Vue.component("hm-input", hminput)
Vue.component("hm-navbar", hmnavbar)
Vue.component("hm-post", hmpost)
Vue.component("hm-pinglun", hmpinglun)
/* ----------------全局过滤器----------------------- */

import moment from 'moment'
Vue.filter('date', function (input, format = 'YYYY-MM-DD') {
  return moment(input).format(format)
})
Vue.filter('date2', function (input) {
  const d = new Date(input)
  const now = new Date()
  const hour = ((now - d) / 1000 / 60 / 60) | 0
  if (hour < 1) {
    return '1小时内'
  } else if (hour < 24) {
    return hour + '小时前'
  }
  return moment(input).format('YYYY-MM-DD HH:mm:ss')
})
// 配置axios的响应拦截器，，，axios响应都会经过响应拦截器
axios.interceptors.response.use(function (res) {
  // console.log('拦截res', res);
  // 对失效的token/假的token进行处理
  const { statusCode, message } = res.data
  if (statusCode === 401 && message === "用户信息验证失败") {
    // token的验证失败，跳转登录页
    router.push('./login')
    // 删除过期或者不正确的token信息
    localStorage.removeItem('token')
    localStorage.removeItem('user_id')
    // 可以给一个提示消息
    // alert(message)
    Toast.fail(message)
  }
  // 拦截器会拦截所有的请求，并返回拦截的res
  return res
})
// axios的请求拦截器，所有的axios的请求都会先经过axios的请求拦截器
axios.interceptors.request.use(function (req) {
  // console.log('所有的请求杯拦截le ', req)
  // 统一的给请求添加token
  const token = localStorage.getItem('token')
  // 对于首页或者其他不需要token[没有token]的，就要对Authorization进行过滤
  if (token) {
    req.headers.Authorization = token
  }
  return req
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  render: h => h(App),
  router,

})
