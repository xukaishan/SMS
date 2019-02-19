<template>
  <!-- 我是商品管理页面 -->
  <div class="goodsmanagepage">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>商品管理</span>
      </div>
      <div class="text item">
        <!-- 功能条 -->
        <div class="toolsbox">
          <el-select v-model="value" placeholder="--请选择分类--" size="small">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <span class="ser_fontsize">关键字：</span>
          <el-input
            placeholder="商品名称/条形码"
            class="serch-inp"
            size="small"
            v-model.trim="search_words"
            @change="searchchange"
          ></el-input>
          <el-button type="primary" @click="search" size="small" icon="el-icon-search">搜索</el-button>
        </div>
        <!-- 表格内容 -->
        <el-table
          ref="multipleTable"
          :data="computeddata"
          tooltip-effect="dark"
          style="width: 100%"
        >
          <el-table-column prop="barcode" label="商品条形码" min-width="120px"></el-table-column>
          <el-table-column prop="goodsname" label="商品名称" min-width="130px"></el-table-column>
          <el-table-column prop="classify" label="所属分类"></el-table-column>
          <el-table-column prop="price" label="售价"></el-table-column>
          <el-table-column prop="promotionalprice" label="促销价"></el-table-column>
          <el-table-column prop="marketvalue" label="市场价"></el-table-column>
          <el-table-column prop="stock" label="库存"></el-table-column>
          <el-table-column prop="stockvalue" label="库存总额"></el-table-column>
          <el-table-column prop="salesvalue" label="销售总额"></el-table-column>
          <el-table-column label="管理" width="200px">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[5, 10, 20, 30, 50]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          background
          :total="total"
        ></el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search_words: "",
      is_search: false,
      dataUrl: "",
      currentPage: 1,
      pageSize: 3,
      total: 10,
      goodsData: [
        {
          barcode: "69865789651",
          goodsname: "优乐美",
          classify: "奶茶",
          price: "4.50",
          promotionalprice: "3.88",
          marketvalue: "4.20",
          stock: "98",
          stockvalue: "231",
          salesvalue: "420"
        },
        {
          barcode: "12365789651",
          goodsname: "肥仔快乐水",
          classify: "饮料",
          price: "3.00",
          promotionalprice: "2.88",
          marketvalue: "3.20",
          stock: "98",
          stockvalue: "231",
          salesvalue: "420"
        },
        {
          barcode: "698644456321",
          goodsname: "大刀肉",
          classify: "垃圾食品",
          price: "0.5",
          promotionalprice: "0.4",
          marketvalue: "0.5",
          stock: "65",
          stockvalue: "146",
          salesvalue: "410"
        },
        {
          barcode: "698658954522",
          goodsname: "巧乐兹",
          classify: "零食",
          price: "5.50",
          promotionalprice: "5.00",
          marketvalue: "6.20",
          stock: "78",
          stockvalue: "495",
          salesvalue: "980"
        },
        {
          barcode: "69869875651",
          goodsname: "小熊饼干",
          classify: "零食",
          price: "3.50",
          promotionalprice: "3.88",
          marketvalue: "4.20",
          stock: "98",
          stockvalue: "231",
          salesvalue: "420"
        },
        {
          barcode: "69230189651",
          goodsname: "香飘飘",
          classify: "奶茶",
          price: "3.50",
          promotionalprice: "3.00",
          marketvalue: "4.20",
          stock: "23",
          stockvalue: "21",
          salesvalue: "40"
        }
      ],
      //分类选择
      options: [
        {
          value: "女装/男装/童装",
          label: "女装/男装/童装"
        },
        {
          value: "食品/零食/生鲜",
          label: "食品/零食/生鲜"
        },
        {
          value: "数码/家电/手机",
          label: "数码/家电/手机"
        },
        {
          value: "百货/家居/厨房",
          label: "百货/家居/厨房"
        },
        {
          value: "美妆/洗护/用品",
          label: "美妆/洗护/用品"
        }
      ],
      value: ""
    };
  },
  //计算属性===========================================================
  computed: {
    computeddata() {
      return this.goodsData.filter(v => {
        return v;
      });
    }
  },
  //生命周期钩子函数========================================================
  created() {},
  //方法===========================================================
  methods: {
    //获取商品数据
    getData() {},
    //搜索========================================================
    search() {
      //改变标杆，用于判断是否过滤表格数据
      this.is_search = true;
      this.getData();
    },
    searchchange() {
      if (!this.search_words) {
        this.getData();
      }
    },

    // 每一行的编辑和删除
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    //分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
    }
  }
};
</script>




<style lang="less">
.goodsmanagepage {
  .el-card {
    .el-card__header {
    }
    .el-card__body {
      .text {
        .toolsbox {
          padding-bottom: 10px;
          .el-select {
            margin-right: 16px;
            .el-input {
              width: 150px;
              .el-input__inner {
              }
            }
          }
          .ser_fontsize {
            display: inline-block;
            font-size: 14px;
            font-weight: 500;
          }
          .serch-inp {
            width: 200px;
            margin-right: 10px;
          }
        }
        .el-table {
        }
        .el-pagination {
          padding-top: 20px;
        }
      }
    }
  }
}
</style>