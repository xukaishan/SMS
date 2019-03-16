<template>
  <div class="tagspage">
    <el-tag
      ref='tagele'
      v-for="(tag, index) in tagArr"
      :key="index"
      closable
      @close="handleClose(tag,index)"
      @click="handleClick(tag,index)"
      :class="{active:isActive(tag)}"
    >{{tag.title}}</el-tag>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tagArr: [] //标签选项卡数组
    };
  },
  watch: {
    $route(newValue, oldValue) {//路由变化函数，路由改变触发
      // console.log(this.$route);
      let path = this.$route.fullPath;
      const tagobj = {
        pathTag: this.$route.fullPath,
        title: this.$route.meta.title
      };
      this.settags(tagobj, path);
      this.isActive(path)

    }
  },
  computed:{
   
  },
  methods: {
    settags(tagobj, path) {
      if (!this.tagArr.length) {
        this.tagArr.push(tagobj);
      } else {
        //判断标签是否已存在
        let isExist = this.tagArr.findIndex(item => item.pathTag === path);
        if (isExist === -1) {
          if (this.tagArr.length > 7) {
            this.tagArr.shift(); //打开过多的（> 7）标签后就删除第一个打开的标签
          } 
          this.tagArr.push(tagobj);
        }
      }
    },
    isActive(tag) {
     console.log(tag)
    },
    handleClose(tag, index) {
      // console.log(tag, index);
       this.tagArr.splice(index,1)
    },
    handleClick(tag, index) {
      this.$router.push(tag.pathTag)
    }
  }
};
</script>

<style lang="less">
.tagspage {
  padding-bottom: 10px;
  .el-tag {
    color: rgb(64, 158, 255);
    margin-right: 10px;
    cursor: pointer;
  }
  .active {
    background-color: rgba(2, 37, 71, 0.9);
  }
}
</style>