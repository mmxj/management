<template>
  <div id="BusinessIssue">
    <el-row :gutter="20">
      <el-col :span="12">
        <el-row :gutter="20">
          <el-col :span="6">
            <label for="">业务专区：</label>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">
            <label for="">产品名称：</label>
          </el-col>
          <el-col :span="18">
            <input type="text">
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">
            <label for="">一句话介绍：</label>
          </el-col>
          <el-col :span="18">
            <input type="text">
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">
            <label for="">页面链接地址：</label>
          </el-col>
          <el-col :span="18">
            <input type="text">
          </el-col>
          <el-col :span="6">
            <label for="">可阅读范围：</label>
          </el-col>
          <el-col :span="18">
            <el-row :gutter="20">
              <el-col>
                <ul id="checkBoxWrap">
                  <li v-for="(value,key) in checkBoxData">
                    <input :id="key" :checked="checkOn" type="checkbox"><label :for="key">{{value}}</label>
                  </li>
                </ul>
              </el-col>
            </el-row>
            <el-row class="el-btn">
              <el-button>发布业务</el-button>
            </el-row>
          </el-col>
        </el-row>
      </el-col>
      <el-col class="imglog" :span="12">
        <img :src="urlImg" alt="">
      </el-col>
    </el-row>
  </div>
</template>
<script>
  export default{
    data(){
      return {
        urlImg: require('@/assets/img/u51.png'),
        checkBoxData: {
          0: '全选',
          1: '广州市',
          2: '韶关市',
          3: '深圳市',
          4: '珠海市',
          5: '汕头市',
          6: '佛山市',
          7: '江门市',
          8: '湛江市',
          9: '茂名市',
          10: '肇庆市',
          11: '惠州市',
          12: '梅州市',
          13: '汕尾市',
          14: '河源市',
          15: '阳江市',
          16: '清远市',
          17: '东莞市',
          18: '中山市',
          19: '潮州市',
          20: '揭阳市',
          21: '云浮市'
        },
        checkOn: false
      }
    },
    methods: {
      checkAll(){
        var checkAll = document.getElementById('0');
        var _this = this;
        checkAll.onclick = function () {
          _this.checkOn = !_this.checkOn;
        }
      }
    },
    mounted: function () {
      this.checkAll()
    }

  }
</script>
<style lang="scss" scoped>
  #BusinessIssue {
    margin: 15px;
    padding: 20px;
    background: #fff;
    .el-col {
      margin-bottom: 15px;
      input[type="text"] {
        width: 100%;
        height: 30px;
      }
    }
    label {
      display: block;
      line-height: 30px;
      text-align: right;
    }
    #checkBoxWrap {
      li {
        display: inline-block;
        margin-right: 20px;
      }
      label {
        min-width: 3em;
        text-align: left;
        display: inline-block;
      }
    }
    .el-btn {
      text-align: right;
      .el-button {
        color: #fff;
        background: #32BC6F;
        border: 0;
      }
    }
    .imglog {
      padding: 30px;
    }
  }
</style>
<style scoped>
  .imglog {
    padding: 30px !important;
  }
</style>

