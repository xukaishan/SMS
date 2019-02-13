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
              <div class="text item">
                <el-table :data="salesData" stripe style="width: 100%">
                  <el-table-column prop="goodsname" label="商品名称"></el-table-column>
                  <el-table-column prop="salesnum" label="销量"></el-table-column>
                </el-table>
              </div>
            </el-card>
          </el-col>

          <el-col :span="12">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>缺货商品</span>
              </div>
              <div class="text item">
                <el-table :data="stockData" stripe style="width: 100%">
                  <el-table-column prop="goodsname" label="商品名称"></el-table-column>
                  <el-table-column prop="stock" label="库存"></el-table-column>
                  <el-table-column label="操作">
                    <template slot-scope="scope">
                      <!-- scope是table内部基于tableData生成出来的，包括该表格的数据信息 -->
                      <!-- scope.row可以获取到每一行的对象，包括该行的数据等信息 -->
                      <el-button type="text" size="small" @click="handleOperation(scope.$index,scope.row)">入库</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //缺货商品数据
      salesData: [
        {
          id:"11",
          goodsname: "海带丝",
          salesnum: "200"
        },
        {
          id:"12",
          goodsname: "海飞丝",
          salesnum: "250"
        },
        {
          id:"13",
          goodsname: "海乙丝",
          salesnum: "20"
        },
        {
          id:"14",
          goodsname: "霸王",
          salesnum: "200"
        },
        {
          id:"15",
          goodsname: "霸玉",
          salesnum: "105"
        },
        {
          id:"16",
          goodsname: "佳洁土",
          salesnum: "20"
        },
        {
          id:"17",
          goodsname: "佳洁士",
          salesnum: "300"
        }
      ],
      stockData: [
        {
          id:"21",
          goodsname: "雕牌洗衣粉",
          stock: "32",
        },
        {
          id:"22",
          goodsname: "周住牌洗衣粉",
          stock: "325",
        },
        {
          id:"23",
          goodsname: "营养快线",
          stock: "65",
        },
        {
          id:"24",
          goodsname: "营养快钱",
          stock: "32",
        },
        {
          id:"25",
          goodsname: "雷碧",
          stock: "92",
        },
        
      ]
    };
  },
  methods:{
    handleOperation(index,row) {
        alert(row.id);//后端通过id入库
        console.log(index,row)
    }
  }
};
</script>

<style lang="less">
.SystemInfoPage {
  .el-card {
    .el-card__header {
      text-align: left;
      line-height: 20px;
      font-weight: 800;
      background-color: #f4f4f5;
    }
    .el-card__body {
      .text {
        .el-alert {
          height: 36px;
          line-height: 36px;
          margin-bottom: 20px;
        }
        .el-row {
          //下面2个卡片
          .el-col {
            .el-card {
              .el-card__header {
              }
              .el-card__body {
                .text {
                  //表格容器
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>