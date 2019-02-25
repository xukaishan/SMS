//引入相关组件
import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import router from './router';
import http from '@/api/api'

// 引入公用样式
import '@/styles/common.less';
// 引入图标样式
import '@/styles/icon.less';

//使用相关组件
Vue.use(ElementUI);

//挂载封装的axios到vue原型上
Vue.prototype.$http = http;

//  阻止生产提示
Vue.config.productionTip = false

//拦截所有路由（路由守卫）
router.beforeEach((to, from, next) => {
  const role = window.localStorage.getItem('username')//简单模拟用户
  if(window.localStorage.getItem('accountinfotoken')){//判断是否含有token（检查登录状态）
      if(role==='admin'){
        next()
      }else{
        to.path==='/AddAccount'? next({path:'/RightsTest'}):next()
      }
  }else{
      to.path==='/Login'? next():next({path:'/Login'})
  }
})


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
