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
Vue.config.productionTip = false

new Vue({
  el: '#app',
  render: h => h(App),
  router,

})
