<template>
  <div class="addgoodspage">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>添加商品</span>
      </div>
      <div class="text item">
        <!-- 表格 -->
        <el-form
          :model="addgoodsForm"
          status-icon
          :rules="rules"
          ref="addgoodsForm"
          class="demo-ruleForm"
          size="small"
          label-position="top"
          hide-required-asterisk
        >
          <el-form-item label="所属分类:" prop="classify" style="width:200px">
            <el-select v-model="addgoodsForm.classify" placeholder="--请选择分类--" size="small">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="商品条形码:" prop="barcode">
            <el-input
              placeholder="商品条形码"
              class="serch-inp"
              size="small"
              v-model.lazy.trim.number="addgoodsForm.barcode"
            ></el-input>
            <el-button type="primary" @click="todobarcode" size="small">生成条形码</el-button>
          </el-form-item>

          <el-form-item label="商品名称:" prop="goodsname">
            <el-input
              placeholder="商品名称"
              class="serch-inp"
              size="small"
              v-model.lazy="addgoodsForm.goodsname"
            ></el-input>
          </el-form-item>

          <el-form-item label="商品售价:" prop="price">
            <el-input
              placeholder="商品售价"
              class="serch-inp"
              size="small"
              v-model.trim="addgoodsForm.price"
            ></el-input>
          </el-form-item>

          <el-form-item label="市场价:" prop="marketvalue">
            <el-input
              placeholder="市场价"
              class="serch-inp"
              size="small"
              v-model.trim="addgoodsForm.marketvalue"
            ></el-input>
          </el-form-item>

          <el-form-item label="促销价:" prop="promotionalprice">
            <el-input
              placeholder="促销价"
              class="serch-inp"
              size="small"
              v-model.trim="addgoodsForm.promotionalprice"
            ></el-input>
          </el-form-item>

          <el-form-item label="商品进价:" prop="enterprice">
            <el-input
              placeholder="商品进价"
              class="serch-inp"
              size="small"
              v-model.trim="addgoodsForm.enterprice"
            ></el-input>
          </el-form-item>

          <el-form-item label="入库数量:" prop="enternumber">
            <el-input
              placeholder="入库数量"
              class="serch-inp"
              size="small"
              v-model.lazy.trim.number="addgoodsForm.enternumber"
            ></el-input>
          </el-form-item>

          <el-form-item label="商品重量:" prop="goodsweight">
            <el-input
              placeholder="商品重量"
              class="serch-inp"
              size="small"
              v-model.trim="addgoodsForm.goodsweight"
            ></el-input>
          </el-form-item>

          <el-form-item label="商品单位:" prop="goodsunit">
            <el-input
              placeholder="商品单位"
              class="serch-inp"
              size="small"
              v-model.trim="addgoodsForm.goodsunit"
            ></el-input>
          </el-form-item>

          <el-form-item label="会员优惠:" prop="isvippreferential">
            <el-radio-group v-model="addgoodsForm.isvippreferential">
              <el-radio label="1">享受</el-radio>
              <el-radio label="0">不享受</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="是否促销:" prop="ispromotional">
            <el-radio-group v-model="addgoodsForm.ispromotional">
              <el-radio label="1">启用</el-radio>
              <el-radio label="0">禁用</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="商品简介:" prop="desc">
            <el-input type="textarea" v-model="addgoodsForm.desc"></el-input>
            <span style="fontSize:12px">不超过200字</span>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitForm('addgoodsForm')">添加</el-button>
            <el-button @click="resetForm('addgoodsForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    var patrn = /(^[0-9]{1,8}$)|(^[0-9]{1,8}[\.]{1}[0-9]{1,2}$)/; //正则 8位整数或小数点最多两位
    const checknum = (rule, value, callback) => {
      if (!value) {
        //非空验证
        return callback(new Error("该项不能为空"));
      } else {
        if (patrn.test(value)) {
          callback();
        } else {
          callback(new Error("格式不正确，只能为8位数字或保留2位小数"));
        }
      }
    };
    return {
      //添加商品表单数据对象
      addgoodsForm: {
        classify: "",
        barcode: "",
        goodsname: "",
        price: "",
        marketvalue: "",
        promotionalprice: "",
        enterprice: "",
        enternumber: "",
        goodsweight: "",
        goodsunit: "",
        isvippreferential: "1",
        ispromotional: "0",
        desc: ""
      },
      //分类选择
      options: [
        {
          value: "女装/男装/童装",
          label: "女装/男装/童装"
        },
        {
          value: "食品/零食/生鲜",
          label: "食品/零食/生鲜"
        },
        {
          value: "数码/家电/手机",
          label: "数码/家电/手机"
        },
        {
          value: "百货/家居/厨房",
          label: "百货/家居/厨房"
        },
        {
          value: "美妆/洗护/用品",
          label: "美妆/洗护/用品"
        }
      ],
      value: "",
      //表单验证规则
      rules: {
        classify: [
          { required: true, message: "该项不能为空", trigger: "change" }
        ],
        barcode: [
          { required: true, message: "该项不能为空", trigger: "blur" }
          
        ],
        goodsname: [
          { required: true, message: "该项不能为空", trigger: "blur" },
          { min: 1, max: 18, message: "长度在 5 到 18 个字符", trigger: "blur" }
        ],
        price: [{ validator: checknum, trigger: "blur" }],
        marketvalue: [{ validator: checknum, trigger: "blur" }],
        promotionalprice: [{ validator: checknum, trigger: "blur" }],
        enterprice: [{ validator: checknum, trigger: "blur" }],
        enternumber: [ { required: true, message: "该项不能为空", trigger: "blur" },],
        goodsweight: [ { required: true, message: "该项不能为空", trigger: "blur" },],
        goodsunit: [ { required: true, message: "该项不能为空", trigger: "blur" },],
        isvippreferential: [ { required: true, message: "该项不能为空", trigger: "blur" },],
        ispromotional: [ { required: true, message: "该项不能为空", trigger: "blur" },],
        desc: [{ min: 0, max: 200, message: "长度在 0 到 200 个字符", trigger: "blur" }]
      }
    };
  },
  //计算属性======================================
  computed: {},
  //生命钩子函数==================================
  created() {},
  //方法============================================
  methods: {
    //生成条形码
    todobarcode() {},
    //添加按钮
    submitForm(formName) {
      // console.log(this.addgoodsForm)

      this.$refs[formName].validate(valid => {
        if (valid) {
          //如果验证通过发送数据给后端
          this.$axios.post('http://127.0.0.1:666/goods/addgoods',this.$qs.stringify(this.addgoodsForm))
          .then(res=>{
            console.log(res.data)
          })
          .catch(err=>{
            console.log(err)
          })
        } else {
          this.$message.error('提交失败！')
          return false;
        }
      });
    },
    //重置按钮
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style lang="less">
.addgoodspage {
  .el-card {
    .el-card__header {
    }
    .el-card__body {
      .text {
        .el-form {
          .el-form-item {
            .el-form-item__label {
              font-weight: 600;
              font-size: 12px;
              padding-bottom: 5px;
            }
            .el-form-item__content {
              .el-input {
                width: 200px;
                margin-right: 8px;
              }
              .el-textarea {
                .el-textarea__inner {
                  min-height: 100px !important;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>