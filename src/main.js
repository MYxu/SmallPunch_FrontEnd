// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/style/reset.css'
import './assets/style/border.css'
import './assets/style/common.css'
import FastClick from 'fastclick'
import Axios from 'axios'
import store from './store'

Vue.use(ElementUI)

FastClick.attach(document.body)

Vue.config.productionTip = false
Vue.prototype.$axios = Axios
// 设置axios带上cookie
Vue.prototype.$axios.defaults.withCredentials = true

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
