<template>
  <div class="loginpage">
    <div class="loginbox">
      <h3 class="tit">
        <i class="el-icon-menu"></i>华联超市管理系统-登录
      </h3>
      <el-form
        :model="loginForm"
        status-icon
        :rules="loginRules"
        ref="loginForm"
        class="demo-ruleForm"
      >
        <!-- 账户 -->
        <el-form-item prop="Account">
          <el-input v-model="loginForm.Account" placeholder="用户名/邮箱/手机号">
            <template slot="prepend">
              <i class="el-icon-menu"></i>
            </template>
          </el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="pass">
          <el-input type="password" v-model="loginForm.pass" autocomplete="off" placeholder="密码">
            <template slot="prepend">
              <i class="el-icon-goods"></i>
            </template>
          </el-input>
        </el-form-item>

        <!--确认密码  -->
        <el-form-item prop="checkPass">
          <el-input
            type="password"
            v-model="loginForm.checkPass"
            autocomplete="off"
            placeholder="确认密码"
          >
            <template slot="prepend">
              <i class="el-icon-goods"></i>
            </template>
          </el-input>
        </el-form-item>

        <!-- 提交和重置 -->
        <el-form-item>
          <el-button type="primary" @click="submitForm('loginForm')">提交</el-button>
          <el-button @click="resetForm('loginForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    // 验证账号自定义规则 汉字字母数字下划线(5-16位)/^[a-zA-Z_0-9\u4e00-\u9fa5]{5,16}$/  
    // 邮箱 /^([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+(\.[a-zA-Z]{2,3})+$/
    //电话号码：/^[1][358][0-9]{9}$或^[1][358]\d{9}$/ 
    const checkAccount = (rule, value, callback) => {
      var regname=/^[a-zA-Z_0-9\u4e00-\u9fa5]{5,16}$/;
      var regmail=/^([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+(\.[a-zA-Z]{2,3})+$/;
      var regphone=/^[1][358]\d{9}$/;
      if(!value){
       return callback(new Error("账号不能为空"))
      }else if(regname.test(value)){
        callback()//不传入参数代表成功的回调
      }else if(regmail.test(value)){
        callback()
      }else if(regphone.test(value)){
        callback()
      }else{
        callback(new Error("请输入正确的用户名（汉字字母数字下划线(5-16位)、邮箱、手机号）"))
      }
    };

    //密码最少6位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符
    const validatePass = (rule, value, callback) => {
      var regpwd =/^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/;
      if(!value){
        callback(new Error("密码不能为空"))
      }else if(!regpwd.test(value)){
        callback(new Error("最少6位，包括至少1个大写字母、小写字母、数字、特殊字符"))
      }else{
        if(this.loginForm.checkPass !== ""){
          // 如果确认密码不为空
          this.$refs.loginForm.validateField("checkPass"); // 调用确认密码的验证（一致性验证）validateField对部分表单进行验证
        }
        //成功的回调
        callback()
      }
    };
    //确认密码
    var validateCheckPass = (rule, value, callback) => {
      if(!value){
        callback(new Error("请再次输入密码"))
      }else if(value !== this.loginForm.pass){
        callback(new Error("密码不一致"))
      }
      callback()
    };
    return {
      //表单数据
      loginForm: {
        Account: "",//键值对，为数组
        pass: "",
        checkPass: "",
      },
      //表单数据的规则
      loginRules: {
        Account: [
          { validator: checkAccount, trigger: "blur" },
        ],
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validateCheckPass, trigger: "blur" }]
      }
    };
  },
  methods: {
    //登录
    submitForm(formName) {
      this.$refs[formName].validate(valid => {//validate对整个表单进行校验的方法，参数为一个回调函数。该回调函数会在校验结束后被调用,并传入两个参数：是否校验成功和未通过校验的字段。若不传入回调函数，则会返回一个 promise                                     
        if (valid) {  // 如果所有验证通过 valid就是true                         
          alert("登录成功");
          //收集用户输入的数据，发送给后台
          let loginInfo={
              Account: this.loginForm.Account,
              pass: this.loginForm.pass,
          };
          console.log(loginInfo)
          //登录成功跳转到管理系统主页
          this.$router.push("/Index")

        } else {
          alert("登录失败，请重新登录");
          return false;
        }
      });
    },
    //重置
    resetForm(formName) {
      // this.$refs.loginForm.resetFields() 获取整个表单组件 调用重置方法
      this.$refs[formName].resetFields();
    }
  }
};
</script>


<style lang="less">
.loginpage {
  width: 100%;
  height: 100%;
  background-image: url(../../assets/login_background.jpg);
  background-size: 100%;
  // filter: opacity(20%);
  .loginbox {
    width: 400px;
    height: 300px;
    background: hsla(0, 0%, 100%, 0.3);
    border-radius: 8px;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    padding-bottom: 30px;
    .tit {
      text-indent: 24px;
    }
    .el-form {
      .el-form-item {
        margin-bottom: 26px;
        .el-form-item__content {
          width: 300px;
          margin: 0 auto !important;
          .el-input {
            .el-input-group__prepend {
              border: none;
            }
            .el-input__inner {
              height: 36px;
              line-height: 36px;
            }
            .el-input__suffix {
              .el-input__icon {
                line-height: 36px;
              }
            }
          }
        }
      }
    }
  }
}
</style>
