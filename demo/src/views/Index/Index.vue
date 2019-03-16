<template>
    <el-container>
        <!-- 左侧导航 -->
      <el-aside width="200px"><Nav></Nav></el-aside>
      <!-- 右侧容器 -->
      <el-container class="rig_container">
        <!-- 右侧头部 -->
        <el-header><Top></Top></el-header>
        <!-- 右侧中间内容 -->
        <el-main>
        <Tags></Tags>
        <keep-alive><router-view/></keep-alive><!-- 路由出口 -->
        </el-main>
        <!-- 右侧底部 -->
        <el-footer><Bottom></Bottom></el-footer>
      </el-container>
    </el-container>
</template>

<script>
//引入组件导航、头部、底部组件
import Nav from '@/components/Nav/Nav.vue';
import Top from '@/components/Top/Top.vue';
import Bottom from '@/components/Bottom/Bottom.vue';
import Tags from '@/components/Tags/Tags.vue';



export default {
    components:{//注册组件
        Nav,
        Top,
        Bottom,
        Tags
    }
};
</script>

<style lang="less">
.el-container{
    height: 100%;
    
    .el-aside {
        background-color: #2d3a4b;
        color: #333;
        text-align: center;
        line-height: 200px;
        height: 100%;
    }
    .rig_container{
        .el-header {
            background-color: #242F42;
            color: #fff;
            line-height: 60px;
        }
        .el-footer {
            background-color: #f3f3f3;
            color: #333;
            // line-height: 60px;
        }
        .el-main {
            background-color: #E9EEF3;
            color: #333;
            padding-top:10px; 
            .el-card__header{
                font-weight: 800;
                background-color: #f4f4f5
            }
        }
    }
}

  
  
  
  


</style>