// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import Vuex from 'Vuex'
import $ from 'jquery'
import configapi from './config/config'
import quillEditor from 'vue-quill-editor'
import router from './router'
import App from './App'

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(Vuex)
Vue.use(quillEditor)

Vue.prototype.api = configapi
Vue.prototype.$ = $
Vue.prototype.$axios = axios

/* eslint-disable no-new */
new Vue({
  // el是index.html的div id
  el: '#App',
  router,
  // App模块是App.vue
  components: { App },
  template: '<App/>'
})
