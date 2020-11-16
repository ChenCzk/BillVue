// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUi from 'element-ui'
import '../node_modules/element-ui/lib/theme-chalk/index.css'
import store from './store/index.js'

import instance from './Conf/axiosConf.js'
Vue.use(ElementUi);
Vue.config.productionTip = false;
Vue.prototype.$axios=instance;
Vue.prototype.$axios.defaults.baseURL = 'http://localhost:8081/' ;   //`baseURL` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL
Vue.prototype.$axios.defaults.headers.post['Content-Type'] = 'application/json';

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store:store,
});

