<template>
  <div id="informations">
    <el-row :gutter="20">
      <el-col :span="12">
        <el-row :gutter="10">
          <el-col :span="4">
            <label for="">信息标题：</label>
          </el-col>
          <el-col :span="12">
            <input type="text" v-model="inputData.title">
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="4">
            <label for="">上传文件：</label>
          </el-col>
          <el-col :span="12">
            <input type="text" v-model="fileName" disabled="disabled" placeholder="请上传PDF文件">
          </el-col>
          <el-col :span="4">
            <form enctype="multipart/form-data" name="form" id="form" style="position:relative;">
              <el-button>点击浏览上传</el-button>
              <input type="file" name="file" ref="pdfInput"
                     style="position:absolute;top:0;left:0;width:100%;height:100%;opacity:0;"
                     v-on:change="pdfUrl" accept=".pdf">
              <input type="text" name="upload_type" value="4" style="display:none">
            </form>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="4">
            <label for="">阅读方式：</label>
          </el-col>
          <el-col class="download" :span="6">
            <input type="radio" id="radioDown" name="file" value="1" v-model="inputData.readType">
            <label for="radioDown">点击下载文件</label>
          </el-col>
          <el-col class="download" :span="6">
            <input type="radio" id="radioRead" name="file" value="2" v-model="inputData.readType">
            <label for="radioRead">点击网页浏览文件</label>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="4">
            <label for="">可阅读范围</label>
          </el-col>
          <el-col :span="18">
            <ul id="checkBoxWrap">
              <li v-for="(value,index) in checkBoxData">
                <input :id="index" ref="check" type="checkbox" @click="getAll(index)" :value="value"
                       v-model="checkedNames"><label
                :for="index">{{value}}</label>
              </li>
            </ul>
          </el-col>
        </el-row>
        <el-row>
          <el-col class="up-data" :span="20">
            <el-button @click="upData">发布信息</el-button>
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
        checkBoxData: [
          '全选',
          '广州市',
          '韶关市',
          '深圳市',
          '珠海市',
          '汕头市',
          '佛山市',
          '江门市',
          '湛江市',
          '茂名市',
          '肇庆市',
          '惠州市',
          '梅州市',
          '汕尾市',
          '河源市',
          '阳江市',
          '清远市',
          '东莞市',
          '中山市',
          '潮州市',
          '揭阳市',
          '云浮市'
        ],
        checkOn: false,
        checkedNames: [],
        session: sessionStorage.getItem('session'),
        inputData: {
          filePath: null,
          readType: 1,
          title: null
        },
        fileName: null,
        pdfName: null
      }
    },
    methods: {
      checkAll(){
        var checkAll = document.getElementById('0');
        var _this = this;
        checkAll.onclick = function () {
          _this.checkOn = !_this.checkOn;
        }
      },
      getAll(index){
        var vm = this;
        if (index == 0) {
//            this.checkedNames = this.checkBoxData;
          if (vm.checkedNames[0] == '全选') {
            for (var i = 0; i < this.checkBoxData.length; i++) {
//              this.checkedNames[i]=this.checkBoxData[i]
              this.$set(vm.checkedNames, i, null)
            }
          } else {
            for (var i = 0; i < this.checkBoxData.length; i++) {
//              this.checkedNames[i]=this.checkBoxData[i]
              this.$set(vm.checkedNames, i, this.checkBoxData[i])
            }
          }
//            this.checkedNames = []
        } else {
          function getIndex() {
            for (var i = 0; i < vm.checkedNames.length; i++) {
              if (vm.checkedNames[i] == '全选') {
                return i
              }
            }
            return false;
          }

          if (getIndex() || getIndex() === 0) {
            this.checkedNames.splice(getIndex(), 1)
          }
        }
      },
      upData(){
        var vm = this;
        this.inputData.areaRange = this.checkedNames.join();
        if (this.fileName == '' || this.fileName == null) {
          vm.$alert("请上传PDF文件", '提示', {
            confirmButtonText: '确定',
            callback: function () {
              return;
            }
          })
        } else {
          this.setPdf();
        }
//        var dataUp=new RemoteCall();
//        dataUp.init({
//          router:'/ips/message/add',
//          session:this.session,
//          data:this.inputData,
//          callback:function(data){
//            console.log(data);
//          }
//        })
      },
      pdfUp(){
        var vm = this;
        if (this.inputData.title == '' || this.inputData.title == null) {
          vm.$alert("请填写信息标题", '提示', {
            confirmButtonText: '确定',
            callback: function () {
              return;
            }
          })
        } else {
          var dataUp = new RemoteCall();
          dataUp.init({
            router: '/ips/message/add',
            session: this.session,
            data: this.inputData,
            callback: function (data) {
              if (data.ret.errorCode === 0) {
                vm.$alert("信息发布成功", '提示', {
                  confirmButtonText: '确定',
                  callback: function () {
                    vm.checkOn = false;
                    vm.checkedNames = [];
                    vm.inputData = {
                      filePath: null,
                      readType: 1,
                      title: null
                    };
                    vm.fileName = null;
                    vm.pdfName = null;
                    vm.$refs.pdfInput.value = null;
                  }
                })
              }
            }
          })
        }

      },
      setPdf(){
        var vm = this;
        $('#form').ajaxSubmit({
          type: 'POST',
          url: 'http://www.yxunionpay.com:8087/yxsj-openapi-web/openapi/upload/upload.do',
          success: function (data) {
            var Data = JSON.parse(data).data[0];
            if (Data.saved == true) {
              vm.pdfName = Data.saved_file;
              vm.inputData.filePath = Data.saved_file
              vm.pdfUp();
            }
          }
        })
      },
      pdfUrl(e){
        var files = e.target.files || e.dataTransfer.files;
        if (!files.length)return;
        this.fileName = files[0].name
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
    input[type="text"]:disabled {
      background: #fff;
      border: 0;
    }
    .up-data {
      text-align: right;
    }
  }
  /*媒体查询做兼容*/
  @media screen and (max-width: 1790px) {
    label {
      font-size: 15px;
      min-width: 5em;
    }
  }

  @media screen and (max-width: 1700px) {
    .el-col-2 {
      width: 10%;
    }
    .el-col-6 {
      width: 34%;
    }
    .el-col-3 {
      width: 14%;
    }
    .el-col-5 {
      width: 17.8333%;
    }
    .addHealth {
      text-indent: 1em;
    }
  }
</style>
