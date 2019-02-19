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
          <el-input
            placeholder="筛选 用户名称/用户组/创建日期"
            class="serch-inp"
            size="small"
            v-model="search_words"
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
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="username" label="用户名称" sortable></el-table-column>
          <el-table-column
            prop="usergroup"
            label="用户组"
            :filter-method="filterHandler"
            :filters="[{ text: '普通用户', value: '普通用户' }, { text: '高级管理员', value: '高级管理员' }]"
          ></el-table-column>
          <el-table-column label="创建日期">
            <template slot-scope="scope">{{ scope.row.ctime | filterCtime }}</template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 弹出编辑表单 -->
        <el-dialog title="账号编辑" :visible.sync="flag" width="400px">
          <el-form
            :model="accounteditForm"
            status-icon
            :rules="rules"
            ref="editForm"
            class="demo-ruleForm"
            size="small"
            label-position="top"
          >
            <el-form-item label="账号:" prop="username" style="width:200px">
              <el-input v-model="accounteditForm.username" placeholder="用户名/邮箱/手机号"></el-input>
            </el-form-item>
            <el-form-item label="选择用户组:" prop="usergroup">
              <el-select v-model="accounteditForm.usergroup" placeholder="请选择用户组">
                <el-option label="普通用户" value="普通用户"></el-option>
                <el-option label="高级管理员" value="高级管理员"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="canceledit" size="small">取 消</el-button>
            <el-button type="primary" @click="saveedit('editForm')" size="small">确 定</el-button>
          </div>
        </el-dialog>
        <!-- 分页 -->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[3, 5, 10, 30, 50]"
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
// 引入moment
import moment from "moment";

export default {
  data() {
    //账号编辑验证
    const checkAccount = (rule, value, callback) => {
      var regname = /^[a-zA-Z_0-9\u4e00-\u9fa5]{5,16}$/;
      var regmail = /^([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+(\.[a-zA-Z]{2,3})+$/;
      var regphone = /^[1][358]\d{9}$/;
      if (!value) {
        return callback(new Error("账号不能为空"));
      } else if (regname.test(value)) {
        callback(); //不传入参数代表成功的回调
      } else if (regmail.test(value)) {
        callback();
      } else if (regphone.test(value)) {
        callback();
      } else {
        callback(
          new Error(
            "请输入正确的用户名（汉字字母数字下划线5-16位、邮箱、手机号）"
          )
        );
      }
    };
    return {
      search_words: "",
      is_search: false,
      dataUrl: "",
      currentPage: 1,
      pageSize: 5,
      total: 0,
      tableData: [],
      //多选数组，包含多选选中的每一项
      multipleSelection: [],
      //编辑
      flag: false,
      //编辑表单数据
      accounteditForm: {
        id: "",
        username: "",
        usergroup: ""
      },

      //编辑表单数据的规则
      rules: {
        username: [{ validator: checkAccount, trigger: "blur" }]
      }
    };
  },

  //生命周期钩子函数========================================================
  created() {
    this.getData();
  },

  //计算属性
  computed: {
    computeddataUrl() {
      if (this.search_words && this.is_search) {
        this.dataUrl = `http://127.0.0.1:666/account/AccountListByPage?pageSize=${
          this.pageSize
        }&currentPage=${this.currentPage}&search=${this.search_words}`;
      } else {
        this.dataUrl = `http://127.0.0.1:666/account/AccountListByPage?pageSize=${
          this.pageSize
        }&currentPage=${this.currentPage}`;
      }
      return this.dataUrl;
    },

    //前端过滤表格数据,之前是做的前端搜索，改为后端搜索
    computeddata() {
      // if (this.search_words && this.is_search) {
      //   return this.tableData.filter(item => {
      //     if (
      //       item.username.indexOf(this.search_words) > -1 ||
      //       (item.usergroup.indexOf(this.search_words) > -1 ||
      //         item.ctime.indexOf(this.search_words) > -1)
      //     ) {
      //       return item;
      //     }
      //   });
      // } else {
      //   return this.tableData;
      // }

      return this.tableData;
    }
  },
  methods: {
    //发送请求获取账号列表数据=========================================
    getData() {
      this.$axios
        .get(this.computeddataUrl)
        .then(res => {
          // console.log(res.data);
          this.tableData = res.data.data;
          this.total = res.data.total;
          //解决删除每页最后一条数据不跳转到前一页的问题
          if (!this.tableData.length && this.currentPage != 1) {
            this.currentPage -= 1;
            this.getData();
          }
        })
        .catch(err => {
          console.log(err);
        });
    },

    //功能栏
    //反选============================================================
    reverseElection(rows) {
      this.$refs.multipleTable.toggleRowSelection(this.multipleSelection);
    },

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

    //取消选择====================================================
    toggleSelection() {
      this.$refs.multipleTable.clearSelection();
    },

    //多选响应=======================================================
    handleSelectionChange(val) {
      this.multipleSelection = val;
      // console.log(this.multipleSelection);
    },

    //用户组筛选过滤==================================================
    filterHandler(value, row, column) {
      //value为选择的筛选条件,column['property']为筛选项，这里为usergroup,row[property]筛选项值
      const property = column["property"];
      return row[property] === value;
    },

    //功能栏添加账号=====================================================
    addUser() {
      //添加账号
      this.$router.push("/AddAccount");
    },

    //批量删除===========================================================
    batchDeletion() {
      //获取要批量删除的id集合
      let delIdArr = this.multipleSelection.map(v => v.id);
      //将数组转为字符串数组以方便post发送数组给后台
      const delIdStr = JSON.stringify(delIdArr);
      // console.log(delIdStr)

      //弹出确定要删除的提示框
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          //发送给后台id集合
          this.$axios
            .post(
              "http://127.0.0.1:666/account/batchdelaccount",
              this.$qs.stringify({ delIdStr })
            )
            .then(res => {
              let { error_code, reason } = res.data;
              if (error_code === 0) {
                this.$message.success(reason);
                //重新获取数据
                this.getData();
              } else {
                this.$message.error(reason);
              }
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 每一行的编辑=================================================
    handleEdit(row) {
      // 数据回填
      this.accounteditForm.id = row.id;
      this.accounteditForm.username = row.username;
      this.accounteditForm.usergroup = row.usergroup;
      //显示模态框
      this.flag = true;
    },
    //取消编辑
    canceledit() {
      //隐藏模态框
      this.flag = false;
    },

    //保存编辑
    saveedit(formname) {
      this.$refs[formname].validate(valid => {
        if (valid) {
          //收集修改后的数据包括id发送给后台
          this.$axios
            .post(
              "http://127.0.0.1:666/account/saveedit",
              this.$qs.stringify(this.accounteditForm)
            )
            .then(res => {
              let { error_code, reason } = res.data;
              if (error_code === 0) {
                //隐藏模态框
                this.flag = false;
                this.$message.success(reason);
                //重新获取数据
                this.getData();
              } else {
                this.$message.error(reason);
              }
            })
            .catch(err => {
              console.log(err);
            });
        }
      });
    },

    // 每一行的删除===============================================================
    handleDelete(row) {
      //获取要删除的行id
      let id = row.id;
      //弹出确定要删除的提示框
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          //发送给后台
          this.$axios
            .get(`http://127.0.0.1:666/account/delaccount?id=${id}`)
            .then(res => {
              let { error_code, reason } = res.data;
              if (error_code === 0) {
                this.$message.success(reason);
                //重新获取数据
                this.getData();
              } else {
                this.$message.error(reason);
              }
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },

    //分页================================================================
    //每页几条
    handleSizeChange(val) {
      this.pageSize = val;
      this.getData();
    },
    //当前页
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getData();
    }
  },
  //过滤器===============================================================
  filters: {
    //创建时间的过滤函数
    filterCtime(val) {
      return moment(val).format("YYYY-MM-DD HH:mm:ss");
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
        .el-dialog__body {
          padding: 0 20px !important;
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