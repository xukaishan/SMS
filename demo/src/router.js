import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect:"/Login",//重定向到登录页面
    },
    {
      path: '/Login',
      name: 'login',
      component: () => import('./views/Login/Login.vue')
    },
    {
      path: '/Index',
      name: 'index',
      component: () => import('./views/Index/Index'),
      children:[
        {
          path:'',
          component:()=>import('./views/Home/Home.vue')
        },
        {
          path:'/Index/GoodsManage',
          component:()=>import('./views/GoodsManage/GoodsManage.vue')
        }
      ]
    }
  ]
})
