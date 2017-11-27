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
            <input type="text" v-model="inputData.productName">
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">
            <label for="">一句话介绍：</label>
          </el-col>
          <el-col :span="18">
            <input type="text" v-model="inputData.summary">
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="6">
            <label for="">页面链接地址：</label>
          </el-col>
          <el-col :span="18">
            <input type="text" v-model="inputData.url">
          </el-col>
          <el-col :span="6">
            <label for="">可阅读范围：</label>
          </el-col>
          <el-col :span="18">
            <el-row :gutter="20">
              <el-col>
                <ul id="checkBoxWrap">
                  <li v-for="(value,index) in checkBoxData">
                    <input :id="index" ref="check" type="checkbox" @click="getAll(index)" :value="value"
                           v-model="checkedNames"><label
                    :for="index">{{value}}</label>
                  </li>
                </ul>
              </el-col>
            </el-row>
            <el-row class="el-btn">
              <el-button @click="dataUp">发布业务</el-button>
            </el-row>
          </el-col>
        </el-row>
      </el-col>
      <el-col class="imglog" :span="12">
        <iframe name="frame" frameborder="0" height="0"></iframe>
        <form action="" class="upPic" target="frame" id="from">
          <input type="file" v-on:change="imgUrl" name="file" ref="iptimg" class="upFile"
                 accept="image/gif,image/jpeg,image/jpg,image/png,image/svg">
          <input type="text" name="upload_type" value="4" style="display:none">
          <img :src="urlImg" alt="">
        </form>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  export default{
    data(){
      return {
        urlImg: require('@/assets/img/u51.png'),
        session: sessionStorage.getItem('session'),
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
        inputData: {
//          enableFlag: null
        },
        checkedNames: []
      }
    },
    methods: {
      dataUp(){//提交
        if (this.checkedNames[0] != '全选') { //对选择地区进行判断
          this.inputData.areaRange = this.checkedNames.join();
        } else {
          this.inputData.areaRange = '所有区域'
        }
        this.setPicture('#from');
      },
      setPicture(id){
        var vm = this;
        if(vm.$refs.iptimg.value==''||vm.$refs.iptimg.value==null){
          vm.$alert('请上传图片', '提示', {
            confirmButtonText: '确定',
          });
          return
        }
        $(id).ajaxSubmit({//上传图片地址 有回调可以使用
          type: "POST",
          url: "http://www.yxunionpay.com:8087/yxsj-openapi-web/openapi/upload/upload.do",
          success: function (data) {
            if (data) {
              if (JSON.parse(data).data.length > 0) {
                vm.inputData.picSavePath = JSON.parse(data).data[0].saved_file; //图片上传接口有问题
              }
              var datas = vm.inputData;
              var dataUp = new RemoteCall();
              dataUp.init({
                router: '/ips/product/add',
                session: vm.session,
                data: datas,
                callback: function (res) {
                  console.log(res);
                  if (res.ret.errorMessage == 'success') {
                    vm.$alert('发布成功', '提示', {
                      confirmButtonText: '确定',
                      callback: function () {
                        vm.$router.go(0)
                      }
                    });
                  }
                },
                errorCallback: function (data) {
                  if (data) {
                    vm.$router.push('/login')
                  }
                }
              })
            }
          },
          error:function(data){
            vm.$alert('上传图片失败', '提示', {
              confirmButtonText: '确定',
            });
          }
        })

      },
      imgUrl(e){ //获取图片路径实现预览
        var vm = this;
        var files = e.target.files || e.dataTransfer.files;
        if (!files.length)return;
        console.log(files[0].size);
        if (files[0].size > 500 * 1024) {
          vm.$alert('你上传的文件过大,请重新上传,图片大小不能大于500kb', '提示', {
            confirmButtonText: '确定',
          });
          return
        }
        var reader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.onload = function () {
          vm.urlImg = this.result;
        }
      },
      getAll(index){
        var vm = this;
        if (index === 0) {
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
      }
    },
    mounted: function () {
    },
    watch: {
      checkedNames(data){
//          console.log(data);
      }
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
      /*padding: 30px;*/
      height: 400px;
      overflow: hidden;
      img {

        width: 330px;
      }
    }
  }

  .upPic {
    position: relative;
    cursor: pointer;
  }

  .upFile {
    position: absolute;
    width: 50%;
    height: 100%;
    cursor: pointer;
    opacity: 0;
  }

  /*媒体查询做兼容*/
  @media screen and (max-width: 1790px) {
    label {
      font-size: 15px;
      min-width: 5em;
    }
  }

  @media screen and (max-width: 1750px) {
    .el-col-2 {
      width: 10%;
    }
    .el-col-6 {
      width: 23.333333%;
    }
    .el-col-3 {
      width: 15.5%;
    }
  }

  @media screen and (max-width: 1450px) {
    .el-col-2 {
      width: 12%;
    }
    .el-col-6 {
      width: 25.333333%;
    }
    .el-col-18 {
      width: 73%;
    }
    .el-col-3 {
      width: 17.5%;
    }
  }

  @media screen and (max-width: 1280px) {

    .el-col-6 {
      width: 26.333333%;
    }
    .el-col-18 {
      width: 73%;
    }
  }
</style>
<style scoped>
  .imglog {
    padding: 30px !important;
  }
</style>

