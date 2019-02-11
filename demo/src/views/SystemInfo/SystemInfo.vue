<template>
  <div class="SystemInfoPage">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>系统信息</span>
      </div>
      <div class="text item">
        <!-- 提示信息 -->
        <el-alert title="商品总数: 500, 已销售总金额: 998.00, 库存商品总价: 9800.00" type="info" show-icon></el-alert>
        <!-- 导入数据 -->
        <el-alert title="导入数据" type="success" show-icon></el-alert>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>销售排行</span>
              </div>
              <div class="text item">123</div>
            </el-card>
          </el-col>
          <el-col :span="12">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>缺货商品</span>
              </div>
              <div class="text item">456</div>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less">
.SystemInfoPage {
     height: 100%;
  .el-card {
    height: 100%;
    .el-card__header {
      text-align: left;
      line-height: 20px;
      font-weight: 800;
    }
    .el-card__body{
        
        .text{
            height: 100%;
            .el-alert{
                height: 36px;
                line-height: 36px;
                margin-bottom: 20px;
            }
        }
    }
  }
}
</style>