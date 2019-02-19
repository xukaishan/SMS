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
      // name: 'index',
      component: () => import('./views/Index/Index'),
      children:[
        {
          path:'',
          redirect:"/SystemInfo",//重定向到系统信息页面
          component:()=>import('./views/Home/Home.vue')
        },
        {
          path:'/AccountManage',
          component:()=>import('./views/AccountManage/AccountManage.vue')
        },
        {
          path:'/AccountManageVip',
          component:()=>import('./views/AccountManageVip/AccountManageVip.vue')
        },
        {
          path:'/AddAccount',
          component:()=>import('./views/AddAccount/AddAccount.vue')
        },
        {
          path:'/AddAccountVip',
          component:()=>import('./views/AddAccountVip/AddAccountVip.vue')
        },
        {
          path:'/AddClassification',
          component:()=>import('./views/AddClassification/AddClassification.vue')
        },
        {
          path:'/AddedManagementGroup',
          component:()=>import('./views/AddedManagementGroup/AddedManagementGroup.vue')
        },
        {
          path:'/AddGoods',
          component:()=>import('./views/AddGoods/AddGoods.vue')
        },
        {
          path:'/AddInventory',
          component:()=>import('./views/AddInventory/AddInventory.vue')
        },
        {
          path:'/ClassifiedManagement',
          component:()=>import('./views/ClassifiedManagement/ClassifiedManagement.vue')
        },
        {
          path:'/GoodsManage',
          component:()=>import('./views/GoodsManage/GoodsManage.vue')
        },
        {
          path:'/GoodsShipment',
          component:()=>import('./views/GoodsShipment/GoodsShipment.vue')
        },
        {
          path:'/InventoryManagement',
          component:()=>import('./views/InventoryManagement/InventoryManagement.vue')
        },
        {
          path:'/PasswordModified',
          component:()=>import('./views/PasswordModified/PasswordModified.vue')
        },
        {
          path:'/ReturnGoods',
          component:()=>import('./views/ReturnGoods/ReturnGoods.vue')
        },
        {
          path:'/RightsManagement',
          component:()=>import('./views/RightsManagement/RightsManagement.vue')
        },
        {
          path:'/SalesList',
          component:()=>import('./views/SalesList/SalesList.vue')
        },
        {
          path:'/SalesStatistics',
          component:()=>import('./views/SalesStatistics/SalesStatistics.vue')
        },
        {
          path:'/ShipmentStatistics',
          component:()=>import('./views/ShipmentStatistics/ShipmentStatistics.vue')
        },
        {
          path:'/SystemConfig',
          component:()=>import('./views/SystemConfig/SystemConfig.vue')
        },
        {
          path:'/SystemInfo',
          component:()=>import('./views/SystemInfo/SystemInfo.vue')
        }
      ]
    }
  ]
})
