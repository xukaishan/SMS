<template>
  <el-menu
    :default-active="this.$route.path"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
    @select="selectmenu"
    background-color="#2d3a4b"
    text-color="#fff"
    active-text-color="rgb(64, 158, 255)"
    unique-opened
    router
  >
    <el-submenu :index="item.index" v-for="(item,i) in items" :key="i">
      <template slot="title">
        <i :class="item.icon"></i>
        <span>{{item.title}}</span>
      </template>
      <el-menu-item
        v-if="item.subitems && item.subitems.length"
        :index="v.index"
        v-for="(v,k) in item.subitems"
        :key="k"
      >{{v.title}}</el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  data() {
    return {
      items: [
        //后台根据不同用户权限登录返回不同的菜单栏数据
        {
          index: "1",
          icon: "el-icon-menu",
          title: "分类管理",
          subitems: [
            {
              index: "/ClassifiedManagement",
              title: "分类管理"
            },
            {
              index: "/AddClassification",
              title: "添加分类"
            }
          ]
        },
        {
          index: "2",
          icon: "el-icon-goods",
          title: "商品管理",
          subitems: [
            {
              index: "/GoodsManage",
              title: "商品管理"
            },
            {
              index: "/AddGoods",
              title: "添加商品"
            }
          ]
        },
        {
          index: "3",
          icon: "icon-xks-Import",
          title: "进货管理",
          subitems: [
            {
              index: "/InventoryManagement",
              title: "库存管理"
            },
            {
              index: "/AddInventory",
              title: "添加库存"
            }
          ]
        },
        {
          index: "4",
          icon: "icon-xks-export",
          title: "出货管理",
          subitems: [
            {
              index: "/SalesList",
              title: "销售列表"
            },
            {
              index: "/GoodsShipment",
              title: "商品出货"
            },
            {
              index: "/ReturnGoods",
              title: "商品退货"
            }
          ]
        },
        {
          index: "5",
          icon: "icon-xks-tubiaozhexiantu",
          title: "统计管理",
          subitems: [
            {
              index: "/SalesStatistics",
              title: "销售统计"
            },
            {
              index: "/ShipmentStatistics",
              title: "进货统计"
            }
          ]
        },
        {
          index: "6",
          icon: "icon-xks-team",
          title: "账号管理",
          subitems: [
            {
              index: "/AccountManage",
              title: "账号管理"
            },
            {
              index: "/AddAccount",
              title: "添加账号"
            },
            {
              index: "/PasswordModified",
              title: "密码修改"
            }
          ]
        },
        {
          index: "7",
          icon: "el-icon-news",
          title: "会员管理",
          subitems: [
            {
              index: "/AccountManageVip",
              title: "账号管理"
            },
            {
              index: "/AddAccountVip",
              title: "添加账号"
            }
          ]
        },
        {
          index: "8",
          icon: "icon-xks-setting",
          title: "系统管理",
          subitems: [
            {
              index: "/SystemInfo",
              title: "系统信息"
            },
            {
              index: "/RightsManagement",
              title: "权限管理"
            },
            {
              index: "/RightsTest",
              title: "权限测试"
            },
            {
              index: "/AddedManagementGroup",
              title: "添加管理组"
            },
            {
              index: "/AboutUs",
              title: "关于我们"
            }
          ]
        }
      ],
    };
  },
  watch: {
    $route(newValue, oldValue) {
      // console.log(this.$route.fullPath,newValue, oldValue);
    }
  },
  methods: {
    selectmenu(index, indexPath) {
      // console.log(index,indexPath);
    },
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
    }
  }
};
</script>

<style lang="less">
.el-menu {
  border: none;
}
</style>