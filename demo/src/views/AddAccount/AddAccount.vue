<template>
  <div class="addaccount">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>添加管理员账号</span>
      </div>
      <div class="text item">
        <el-form
          :model="accountAddForm"
          status-icon
          :rules="rules"
          ref="accountAddForm"
          class="demo-ruleForm"
          size="small"
          label-position="top"
        >
          <!-- 账户 -->
          <el-form-item label="账号:" prop="Account">
            <el-input v-model="accountAddForm.Account" placeholder="用户名/邮箱/手机号"></el-input>
          </el-form-item>
          <!-- 密码 -->
          <el-form-item label="密码:" prop="pass">
            <el-input
              type="password"
              v-model="accountAddForm.pass"
              autocomplete="off"
              placeholder="密码"
            ></el-input>
          </el-form-item>

          <!--确认密码  -->
          <el-form-item label="确认密码:" prop="checkPass">
            <el-input
              type="password"
              v-model="accountAddForm.checkPass"
              autocomplete="off"
              placeholder="确认密码"
            ></el-input>
          </el-form-item>
          <!-- 选中用户组 -->
          <el-form-item label="选择用户组:" prop="usergroup">
            <el-select v-model="accountAddForm.usergroup" placeholder="请选择用户组">
              <el-option label="普通用户" value="普通用户"></el-option>
              <el-option label="高级管理员" value="高级管理员"></el-option>
            </el-select>
          </el-form-item>
          <!-- 提交和重置 -->
          <el-form-item>
            <el-button type="primary" @click="submitForm('accountAddForm')">添加</el-button>
            <el-button @click="resetForm('accountAddForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    // 验证账号自定义规则 
    const checkAccount = (rule, value, callback) => {
      var regname = /^[a-zA-Z_0-9\u4e00-\u9fa5]{5,16}$/;//汉字字母数字下划线(5-16位)
      var regmail = /^([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+(\.[a-zA-Z]{2,3})+$/; // 邮箱
      var regphone = /^[1][358]\d{9}$/; //电话号码：
      if (!value) {
        return callback(new Error("账号不能为空"));
      } else {
        if (
          regname.test(value) ||
          regmail.test(value) ||
          regphone.test(value)
        ) {
          this.userIsExist()
            .then(res => {
              if (res.error_code === 1) {
                //账号已经存在
                callback(new Error(res.reason));
              } else {
                callback();
              }
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          callback(
            new Error(
              "请输入正确的用户名（汉字字母数字下划线5-16位、邮箱、手机号）"
            )
          );
        }
      }
    };

    //密码最少6位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符
    const validatePass = (rule, value, callback) => {
      var regpwd = /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/;
      if (!value) {
        callback(new Error("密码不能为空"));
      } else if (!regpwd.test(value)) {
        callback(
          new Error("最少6位，包括至少1个大写字母、小写字母、数字、特殊字符")
        );
      } else {
        if (this.accountAddForm.checkPass !== "") {
          // 如果确认密码不为空
          this.$refs.accountAddForm.validateField("checkPass"); // 调用确认密码的验证（一致性验证）validateField对部分表单进行验证
        }
        //成功的回调
        callback();
      }
    };
    //确认密码
    var validateCheckPass = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.accountAddForm.pass) {
        callback(new Error("密码不一致"));
      }
      callback();
    };
    return {
      //表单数据
      accountAddForm: {
        Account: "", //键值对，为数组
        pass: "",
        checkPass: "",
        usergroup: "",
        ctime: ""
      },
      //表单数据的规则
      rules: {
        Account: [{ validator: checkAccount, trigger: "blur" }],
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validateCheckPass, trigger: "blur" }]
      }
    };
  },
  methods: {
    //验证用户名是否已存在
    userIsExist() {
      return this.$http.post("/account/addaccount", {
        username: this.accountAddForm.Account
      });
    },
    //添加
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        //validate对整个表单进行校验的方法，参数为一个回调函数。该回调函数会在校验结束后被调用,并传入两个参数：是否校验成功和未通过校验的字段。若不传入回调函数，则会返回一个 promise
        if (valid) {
          // 如果所有验证通过 valid就是true

          //收集用户输入的数据
          let accountaddInfo = {
            username: this.accountAddForm.Account,
            password: this.accountAddForm.pass,
            usergroup: this.accountAddForm.usergroup
          };
          //发送给后台
          this.$http
            .post("/account/addaccount", accountaddInfo)
            .then(res => {
              let { error_code, reason } = res;
              if (error_code === 0) {
                this.$message.success(reason);
                this.$router.push("/AccountManage");
                
              } else {
                this.$message.error(reason);
              }
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          this.$message.error("添加账号失败！请重新添加");
          return false;
        }
      });
    },
    //重置
    resetForm(formName) {
      // this.$refs.accountAddForm.resetFields() 获取整个表单组件 调用重置方法
      this.$refs[formName].resetFields();
       console.log('路径',this.$route)
      
    }
  }
};
</script>

<style lang="less">
.el-input {
  width: 300px;
}
</style>