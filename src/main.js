import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import store from './store'



Vue.use(ElementUI);

Vue.prototype.judgmentPhone = /^1[3456789]\d{9}$/;		//手机号正则
new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
