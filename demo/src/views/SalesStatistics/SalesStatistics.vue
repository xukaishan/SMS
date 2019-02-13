<template>
  <!-- 销售统计页面 -->
  <div class="SalesStatisticsPage">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>销售数据统计</span>
      </div>
      <div class="text item">
        <!-- 功能条 -->
        <!-- 时间筛选 -->
        <div class="topbar">时间：
          <el-date-picker
            v-model="datevalue"
            type="daterange"
            range-separator="--"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            size="mini"
            value-format="yyyy-MM-dd"
            @change="datechangefn"
          ></el-date-picker>
          <!-- 筛选 -->
          <el-select v-model="selectvalue" placeholder="请选择" size="mini" @change="selectchangefn">
            <el-option key="1" label="销售情况统计" value="销售情况统计"></el-option>
            <el-option key="2" label="其他" value="其他"></el-option>
          </el-select>
          <el-button type="primary" size="mini" @click="selectsubmitfn">提交</el-button>
        </div>
        <!-- 图表 -->
        <ve-line :data="chartData"></ve-line>
      </div>
    </el-card>
  </div>
</template>

<script>
import VeLine from "v-charts/lib/line.common";
export default {
  components: {
    VeLine
  },
  data() {
    return {
      //功能区数据
      datevalue: "",
      selectvalue: "销售情况统计",
      chartData: {
        columns: ["日期", "金额"],
        rows: [
          { 日期: "1月1日", 金额: 123 },
          { 日期: "4月1日", 金额: 623 },
          { 日期: "4月12日", 金额: 163 },
          { 日期: "5月1日", 金额: 823 },
          { 日期: "9月1日", 金额: 1023 },
          { 日期: "10月1日", 金额: 653 },
          { 日期: "12月1日", 金额: 423 }
        ]
      }
    };
  },
  methods: {
    //功能区函数
    datechangefn() {
      alert(this.datevalue);
    },
    selectchangefn() {
      alert(this.selectvalue);
    },
    selectsubmitfn() {
      alert("提交");
    }
  },





};
</script>

<style lang="less">
.SalesStatisticsPage{
    .el-card{
        .el-card__header{
        }
        .el-card__body{
            .text{
                // 功能区容器
                .topbar{
                    padding-bottom: 10px;
                    .el-date-editor{

                    }
                    .el-select{
                        margin: 0 10px 0 20px
                    }
                    .el-button{

                    }
                }
                // 图表
                .ve-line{

                }
            }
        }
    }
}
</style>