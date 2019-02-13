<template>
  <div class="AccountManagePage">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>账号管理</span>
      </div>
      <div class="text item">
        <!-- 功能条 -->
        <div class="toolsbox">
          <el-button @click="reverseElection(multipleSelection)" size="small" type="primary">反选</el-button>
          <el-button @click="toggleSelection()" size="small" type="primary">取消选择</el-button>
          <el-button @click="addUser" size="small" type="primary">添加账号</el-button>
          <el-button @click="batchDeletion" size="small" type="primary">批量删除</el-button>
          <el-input placeholder="筛选 用户名称/用户组/创建日期" class="serch-inp" size="small" v-model="search_words"></el-input>
          <el-button type="primary" @click="search" size="small" icon="el-icon-search">搜索</el-button>
        </div>
        <!-- 表格内容 -->
        <el-table
          ref="multipleTable"
          :data="computeddata"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="username" label="用户名称" sortable></el-table-column>
          <el-table-column
            prop="usergroup"
            label="用户组"
            :filter-method="filterHandler"
            :filters="[{ text: '普通用户', value: '普通用户' }, { text: '超级管理员', value: '超级管理员' }]"
          ></el-table-column>
          <el-table-column prop="addate" label="创建日期" sortable></el-table-column>
          <el-table-column label="操作">
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
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          background
          :total="tableData.length"
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
      is_search:false,
      dataUrl: "/AccountManageTableData.json",
      currentPage: 1,
      tableData: [
        {
          username: "李寻欢",
          usergroup: "超级管理员",
          addate: "2016-10-12"
        },
        {
          username: "貂蝉",
          usergroup: "超级管理员",
          addate: "2018-07-22"
        },
        {
          username: "萧十一郎",
          usergroup: "普通用户",
          addate: "2015-01-03"
        },
        {
          username: "李莫愁",
          usergroup: "超级管理员",
          addate: "2019-02-12"
        },
        {
          username: "杨过",
          usergroup: "普通用户",
          addate: "2016-12-30"
        },
        {
          username: "杨过",
          usergroup: "普通用户",
          addate: "2016-12-30"
        },
        {
          username: "杨过",
          usergroup: "普通用户",
          addate: "2016-12-30"
        },
        {
          username: "杨过",
          usergroup: "普通用户",
          addate: "2016-12-30"
        },
        {
          username: "杨过",
          usergroup: "普通用户",
          addate: "2016-12-30"
        },
        {
          username: "杨过",
          usergroup: "普通用户",
          addate: "2016-12-30"
        },
        {
          username: "尹志平",
          usergroup: "超级管理员",
          addate: "2018-09-24"
        }
      ],
      //多选数组，包含多选选中的每一项
      multipleSelection: []
    };
  },
  created() {
    this.getData();
  },
  //计算属性，计算过滤处理表格数据，以重新渲染页面，如搜索及分页
  computed: {
    computeddata() {
      if (this.search_words&&this.is_search) {
        return this.tableData.filter(item => {
          if (
            item.username.indexOf(this.search_words) > -1 ||
            (item.usergroup.indexOf(this.search_words) > -1 ||
              item.addate.indexOf(this.search_words) > -1)
          ) {
            return item;
          }
        });
      }else{
        return this.tableData
      } 
    }
  },
  methods: {
    //发送请求获取表格数据
    getData() {
      // this.$axios.post(this.dataUrl, {
      //   //发送给后台的数据
      // }).then(res => {
      //   this.tableData = res.data.list;
      // });
      // console.log(this);
    },
    //功能栏
    //反选
    reverseElection(rows) {
      let arr = [];
      arr = arr.concat(rows);
      //先选中所有

      this.$refs.multipleTable.toggleRowSelection();
      // console.log('多选数组1',this.multipleSelection);
      arr.forEach(row => {
        //遍历多选数组每一项，切换选中状态
        this.$refs.multipleTable.toggleRowSelection(row);
      });
      // console.log('多选数组2',this.multipleSelection);
    },
    //搜索
    search() {
      //改变标杆，用于判断是否过滤表格数据
      this.is_search=true;
    },
    //取消选择
    toggleSelection() {
      this.$refs.multipleTable.clearSelection();
    },
    //多选响应
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(this.multipleSelection);
    },
    //用户组筛选过滤
    filterHandler(value, row, column) {
      const property = column["property"];
      return row[property] === value;
      // console.log(value,"值");//value为选择的筛选条件
      // console.log(column['property']);//为column['property']筛选项，这里为usergroup
      // console.log(row[property]);//筛选项值
    },
    //功能栏添加账号和批量删除
    addUser() {
      //添加账号
      this.$router.push("/AddAccount");
    },
    batchDeletion() {
      //批量删除
      this.multipleSelection = [];
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
.AccountManagePage {
  .el-card {
    .el-card__header {
      font-weight: 800;
    }
    .el-card__body {
      .text {
        .toolsbox {
          //表格上面操作功能区
          .serch-inp {
            width: 300px;
            display: inline-block;
            margin: 0 10px;
          }
        }
        .el-table {
        }
        .el-pagination {
          text-align: right;
          margin-top: 20px;
        }
      }
    }
  }
}
</style>