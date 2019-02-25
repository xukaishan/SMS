<template>
  <div class="top">
    <el-row>
      <!-- 左边 -->
      <el-col :span="18" class="toplf">
        <i class="el-icon-menu"></i>华联超市管理系统
      </el-col>
      <!-- 右边 -->
      <el-col :span="6" class="toprig">
        <el-row>
          <!-- 头像 -->
          <el-col :span="14" class="avater-col">欢迎您!
            <div class="avatar">
              <img width="100%" height="100%" :src="avatarUrl" alt>
            </div>
          </el-col>

          <!-- 用户名 -->
          <el-col :span="10" class="user-col">
            <el-dropdown @command="handleCommand" trigger="click">
              <span class="el-dropdown-link">
                {{username}}
                <i class="el-icon-arrow-down el-icon-caret-bottom"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="PersonalCenter">个人中心</el-dropdown-item>
                <el-dropdown-item command="MessageReminder">消息提醒</el-dropdown-item>
                <el-dropdown-item command="AboutUs">关于我们</el-dropdown-item>
                <el-dropdown-item command="set" disabled>权限设置</el-dropdown-item>
                <el-dropdown-item command="SignOut" divided>退出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      avatarUrl: "/avater.jpg"
    };
  },
  created(){
    this.username=window.localStorage.getItem('username')
  },
  methods: {
    handleCommand(command) {
      if (command === "SignOut") {
        window.localStorage.removeItem("accountinfotoken");
        this.$router.push('/Login')
      }
    }
  }
};
</script>

<style lang="less">
.top {
  background-color: #242f42;
  .el-row {
    height: 100%;
    .toplf {
      height: 100%;
      font-weight: 800;
      font-size: 20px;
      text-align: left;
      color: #fff;
    }
    .toprig {
      height: 100%;
      font-size: 14px;
      .el-row {
        .avater-col {
          text-align: right;
          width: 120px;
          .avatar {
            width: 40px;
            height: 40px;
            float: right;
            margin: 10px 10px 10px 20px;
            img {
              border-radius: 50%;
            }
          }
        }
        .user-col {
          width: 140px;
          height: 60px;
        }
      }
      .el-dropdown-link {
        display: block;
        cursor: pointer;
        color: #fff;
        max-width: 120px;
        overflow: hidden;
        text-overflow: ellipsis;//超出显示省略号
        white-space: nowrap;//文本不换行
      }
    }
  }
}
</style>