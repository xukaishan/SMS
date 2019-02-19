<template>
  <div class='InventoryManagementpage'>
    <el-tabs type="border-card" value="second" @tab-click="handleClick">
      <el-tab-pane disabled label="库存管理" class="tabs-tit" name='first'></el-tab-pane>
      <el-tab-pane label="库存情况" name='second'>库存情况</el-tab-pane>
      <el-tab-pane label="添加库存" name='third'>添加库存</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
    methods: {
      handleClick(tab) {
        console.log(tab);
      }
    }
};
</script>

<style lang="less">
.InventoryManagementpage{
    .el-tabs{
        .el-tabs__header{
            background-color: #f4f4f5;
            .el-tabs__nav-wrap{
                .el-tabs__nav-scroll{
                    .el-tabs__nav{
                       
                        float: right;
                         width: 100%;
                        #tab-first{
                             width: 80%;
                             font-weight: 800;
                             font-size: 16px;
                             color: #303133;
                        }
                    }

                }
            }
        }
        .el-tabs__content{

        }
    }
}
</style>