import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//引入全局样式
import './assets/css/style.css'
import 'element-ui/lib/theme-chalk/index.css'
import './plugins/element.js'
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this
  },
}).$mount('#app')
