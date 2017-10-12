<template>
  <div id="informations">
    <el-row :gutter="20">
      <el-col :span="12">
        <el-row :gutter="10">
          <el-col :span="4">
            <label for="">信息标题：</label>
          </el-col>
          <el-col :span="12">
            <input type="text">
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="4">
            <label for="">上传文件：</label>
          </el-col>
          <el-col :span="12">
            <input type="text">
          </el-col>
          <el-col :span="4">
            <el-button>点击浏览上传</el-button>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="4">
            <label for="">阅读方式：</label>
          </el-col>
          <el-col class="download" :span="6">
            <input type="radio" name="file">
            <label for="">点击下载文件</label>
          </el-col>
          <el-col class="download" :span="6">
            <input type="radio" name="file">
            <label for="">点击网页浏览文件</label>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="4">
            <label for="">可阅读范围</label>
          </el-col>
          <el-col :span="16">
            <ul id="checkBoxWrap">
              <li v-for="(value,key) in checkBoxData">
                <input :id="key" :checked="checkOn" type="checkbox"><label :for="key">{{value}}</label>
              </li>
            </ul>
          </el-col>
        </el-row>
        <el-row>
          <el-col class="up-data" :span="20">
            <el-button>发布信息</el-button>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  export default{
    data(){
      return {
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
  #informations {
    padding: 20px;
    margin: 15px;
    background: #fff;
    .el-row {
      margin-bottom: 30px;
      .el-button {
        color: #fff;
        background: #32BC6F;
        border: 0;
      }
    }
    #checkBoxWrap {
      li {
        display: inline-block;
        margin-right: 25px;
        label {
          display: inline-block;
          min-width: 3em;
          text-align: left;
        }
      }
    }
    .download {
      label {
        display: inline-block;
        line-height: 30px;
        vertical-align: middle;
      }
      input {
        vertical-align: middle;
      }
    }
    label {
      line-height: 30px;
      display: block;
      text-align: right;
    }
    input[type="text"] {
      height: 30px;
      width: 100%;
      padding: 0;
    }
    .up-data {
      text-align: right;
    }
  }
</style>
