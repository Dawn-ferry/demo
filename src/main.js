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
// 全局组件
import hmheader from './components/hmheader.vue'
import hmlogo from './components/hmlogo.vue'
import hmbutton from './components/hmbutton.vue'
import hminput from './components/hminput.vue'
import hmnavbar from './components/hmnavbar.vue'
Vue.component("hm-header", hmheader)
Vue.component("hm-logo", hmlogo)
Vue.component("hm-button", hmbutton)
Vue.component("hm-input", hminput)
Vue.component("hm-navbar", hmnavbar)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  render: h => h(App),
  router,

})
