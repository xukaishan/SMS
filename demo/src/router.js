import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect:"/Login",//重定向到登录页面
      meta: { title: '系统登录' }
    },
    {
      path: '/Login',
      name: 'login',
      component: () => import('./views/Login/Login.vue'),
      meta: { title: '系统登录' }
    },
    {
      path: '/Index',
      // name: 'index',
      component: () => import('./views/Index/Index'),
      meta: { title: '' },
      children:[
        {
          path:'',
          redirect:"/SystemInfo",//重定向到系统信息页面
          component:()=>import('./views/Home/Home.vue')
        },
        {
          path:'/AboutUs',
          component:()=>import('./views/AboutUs/AboutUs.vue'),
          meta: { title: '关于我们' }
        },
        {
          path:'/AccountManage',
          component:()=>import('./views/AccountManage/AccountManage.vue'),
          meta: { title: '账号管理' }
        },
        {
          path:'/AccountManageVip',
          component:()=>import('./views/AccountManageVip/AccountManageVip.vue'),
          meta: { title: '会员管理' }
        },
        {
          path:'/AddAccount',
          component:()=>import('./views/AddAccount/AddAccount.vue'),
          meta: { title: '添加账号' }
        },
        {
          path:'/AddAccountVip',
          component:()=>import('./views/AddAccountVip/AddAccountVip.vue'),
          meta: { title: '添加会员' }  
        },
        {
          path:'/AddClassification',
          component:()=>import('./views/AddClassification/AddClassification.vue'),
          meta: { title: '添加分类' }
        },
        {
          path:'/AddedManagementGroup',
          component:()=>import('./views/AddedManagementGroup/AddedManagementGroup.vue'),
          meta: { title: '添加管理组' }
        },
        {
          path:'/AddGoods',
          component:()=>import('./views/AddGoods/AddGoods.vue'),
          meta: { title: '添加商品' }
        },
        {
          path:'/AddInventory',
          component:()=>import('./views/AddInventory/AddInventory.vue'),
          meta: { title: '添加库存' }
        },
        {
          path:'/ClassifiedManagement',
          component:()=>import('./views/ClassifiedManagement/ClassifiedManagement.vue'),
          meta: { title: '分类管理' }
        },
        {
          path:'/GoodsManage',
          component:()=>import('./views/GoodsManage/GoodsManage.vue'),
          meta: { title: '商品管理' }
        },
        {
          path:'/GoodsShipment',
          component:()=>import('./views/GoodsShipment/GoodsShipment.vue'),
          meta: { title: '商品出货' }
        },
        {
          path:'/InventoryManagement',
          component:()=>import('./views/InventoryManagement/InventoryManagement.vue'),
          meta: { title: '库存管理' }
        },
        {
          path:'/PasswordModified',
          component:()=>import('./views/PasswordModified/PasswordModified.vue'),
          meta: { title: '密码修改' }
        },
        {
          path:'/ReturnGoods',
          component:()=>import('./views/ReturnGoods/ReturnGoods.vue'),
          meta: { title: '退货商品' }
        },
        {
          path:'/RightsManagement',
          component:()=>import('./views/RightsManagement/RightsManagement.vue'),
          meta: { title: '权限管理' }
        },
        {
          path:'/RightsTest',
          component:()=>import('./views/RightsTest/RightsTest.vue'),
          meta: { title: '权限测试' }
        },
        {
          path:'/SalesList',
          component:()=>import('./views/SalesList/SalesList.vue'),
          meta: { title: '销售列表' }
        },
        {
          path:'/SalesStatistics',
          component:()=>import('./views/SalesStatistics/SalesStatistics.vue'),
          meta: { title: '销售统计' }
        },
        {
          path:'/ShipmentStatistics',
          component:()=>import('./views/ShipmentStatistics/ShipmentStatistics.vue'),
          meta: { title: '进货统计' }
        },
        {
          path:'/SystemInfo',
          component:()=>import('./views/SystemInfo/SystemInfo.vue'),
          meta: { title: '系统信息' }
        }
      ]
    }
  ]
})
