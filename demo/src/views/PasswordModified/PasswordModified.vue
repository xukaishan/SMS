<template>
  <div class="PasswordModified">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>密码修改</span>
      </div>
      <div class="text item">
        <el-form
          :model="pwdmodify"
          status-icon
          :rules="rules"
          ref="pwdmodify"
          class="demo-ruleForm"
          size="small"
          label-position="top"
        >
          <!-- 旧密码 -->
          <el-form-item label="旧密码:" prop="oldpass">
            <el-input
              type="password"
              v-model="pwdmodify.oldpass"
              autocomplete="off"
              placeholder="旧密码"
            ></el-input>
          </el-form-item>
          <!-- 新密码 -->
          <el-form-item label="新密码:" prop="pass">
            <el-input type="password" v-model="pwdmodify.pass" autocomplete="off" placeholder="新密码"></el-input>
          </el-form-item>

          <!--确认新密码  -->
          <el-form-item label="确认新密码:" prop="checkPass">
            <el-input
              type="password"
              v-model="pwdmodify.checkPass"
              autocomplete="off"
              placeholder="确认新密码"
            ></el-input>
          </el-form-item>

          <!-- 提交和重置 -->
          <el-form-item>
            <el-button type="primary" @click="submitForm('pwdmodify')">提交</el-button>
            <el-button @click="resetForm('pwdmodify')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
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
        if (this.pwdmodify.checkPass !== "") {
          // 如果确认密码不为空
          this.$refs.pwdmodify.validateField("checkPass"); // 调用确认密码的验证（一致性验证）validateField对部分表单进行验证
        }
        // console.log('我是规则',rule);
        if (rule.field === "oldpass") {
          //判断为旧密码失焦验证还是新密码失焦验证，旧密码验证就调用方法发后台验证
          // this.pwdmodifyfn();
          // console.log("我是", this.code);
          // this.code === 1 ? callback(new Error("密码不存在")) : callback();
          this.pwdmodifyfn().then(v => {
            v === 1 ? callback(new Error("密码不存在")) : callback();
          });
        } else if (this.pwdmodify.oldpass === this.pwdmodify.pass) {
          callback(new Error("新密码不能与旧密码一样"));
        } else {
          //成功的回调
          callback();
        }
      }
    };

    //确认密码
    var validateCheckPass = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请再次输入新密码"));
      } else if (value !== this.pwdmodify.pass) {
        callback(new Error("密码不一致"));
      }
      callback();
    };
    return {
      //表单数据
      pwdmodify: {
        oldpass: "",
        pass: "",
        checkPass: "",
        username: window.localStorage.getItem("username")
      },
      //表单数据的规则
      rules: {
        oldpass: [{ validator: validatePass, trigger: "blur" }],
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validateCheckPass, trigger: "blur" }]
      },
      code: 100//修改密码的错误码
    };
  },

  computed: {},

  // ==========================================================================
  methods: {
    //发送数据给后台
    pwdmodifyfn() {
      let that = this; //axios中this不指向Vue实例
      return new Promise((resolve, reject) => {
        //Promise处理异步
        this.$axios
          .post(
            "http://127.0.0.1:666/account/pwdmodify",
            this.$qs.stringify(this.pwdmodify)
          )
          .then(res => {
            if (res.data) {
              that.code = res.data.error_code;
              resolve(that.code);
            } else {
              reject(false);
            }
          });
      });

      // let that = this;
      // this.$axios
      //   .post(
      //     "http://127.0.0.1:666/account/pwdmodify",
      //     this.$qs.stringify(this.pwdmodify)
      //   )
      //   .then(res => {
      //     that.code = res.data.error_code;
      //   });
    },
    //添加
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        //validate对整个表单进行校验的方法，参数为一个回调函数。该回调函数会在校验结束后被调用,并传入两个参数：是否校验成功和未通过校验的字段。若不传入回调函数，则会返回一个 promise
        if (valid) {
          // 如果所有验证通过 valid就是true
          this.pwdmodifyfn().then(v => {
            // console.log(v)
            if (v === 0) {
              this.$message.success("密码修改成功,2秒后跳转到登录页面");
              window.localStorage.removeItem("accountinfotoken");
              setTimeout(()=>{this.$router.push("/Login");},2000);//2秒后跳转到登录页面
            } else {
              this.$message.error("密码修改失败");
            }
          });
        }
      });
    },
    //重置
    resetForm(formName) {
      // this.$refs.pwdmodify.resetFields() 获取整个表单组件 调用重置方法
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style lang="less">
.el-input {
  width: 300px;
}
</style>