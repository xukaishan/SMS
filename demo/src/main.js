//引入相关组件
import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import router from './router';
// 引入公用样式
import '@/styles/common.less';
// 引入图标样式
import '@/styles/icon.less';

//使用相关组件
Vue.use(ElementUI);
//  阻止生产提示
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
