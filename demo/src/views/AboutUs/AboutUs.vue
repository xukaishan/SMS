<template>
    <div class="aboutus">
        <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>关于我们</span>
      </div>
      <div class="text item">
        富文本编辑器
        <ue></ue>
      </div>
    </el-card>
    </div>
</template>

<script>
import ue from '@/components/Ue/Ue.vue'
export default {
    components:{ue}
}
</script>

<style lang="less">

</style>