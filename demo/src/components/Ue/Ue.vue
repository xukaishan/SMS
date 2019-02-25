<template>
  <div class="editor">
    <quill-editor
      v-model="editerinfo"
      ref="myQuillEditor"
      class="editer"
      @ready="onEditorReady($event)"
    ></quill-editor>
  </div>
</template>

<script>
import { quillEditor } from "vue-quill-editor";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";


export default {
    components: {
        quillEditor
    },
    data(){
        return{
            editerinfo:'',
        }
    },
    methods:{
        onEditorReady(){}
    }
};
</script>

<style lang="less">
.editor{
    height: 500px;
    .quill-editor{
        height: 80%;
    }
}
</style>