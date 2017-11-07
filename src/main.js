// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import '../theme/index.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import store from './store'
import $ from 'jquery'
// import '@/assets/js/jquery.1.11.1.min.js'
import '@/assets/js/jquery.md5.js'
import '@/assets/js/jquery.form.min.js'
// import '@/assets/js/xlsx.full.min.js'


// import '@/assets/js/xlsx.full.min.js'
// import xlsx from 'js-xlsx'
//处理上传表格组件

//地址组件
import Distpicker from 'v-distpicker'

Vue.component('v-distpicker', Distpicker)
Vue.use(ElementUI)

Vue.prototype.$http = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App}
})
