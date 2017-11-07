<template>
  <div id="HeadlthStationAdd">
    <div>
      <el-row :gutter="20">
        <el-col :span="3"><label for="">村医名称</label></el-col>
        <el-col :span="5">
          <input type="text" v-model="inputData.name">
        </el-col>
        <el-col :span="3"><label for="">归属卫生院</label></el-col>
        <el-col :span="5">
          <select @change="getparentChange" ref="mySelect">
            <option ref="options">
              请选择归属卫生院
            </option>
            <option v-for="data in parentId" v-bind:value="data.id" ref="options">
              {{data.name}}
            </option>
          </select>
        </el-col>
        <el-col :span="7">
          <a href="javascript:" class="addHealth">找不到对应的卫生院？请点击添加</a>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="3">
          <label for="">村医身份证号</label>
        </el-col>
        <el-col :span="5">
          <input type="text" v-model="inputData.certificateNo">
        </el-col>
        <el-col :span="3">
          <label for="">归属卫生站</label>
        </el-col>
        <el-col :span="5">
          <select ref="mySelect2" @change="hospitalChange">
            <option ref="options2">
              请选择归属卫生站
            </option>
            <option v-for="data in hospital" v-bind:value="data.id" ref="options2">
              {{data.name}}
            </option>
          </select>
        </el-col>
        <el-col :span="7">
          <router-link to="/healthstationadd" class="addHealth">找不到对应的卫生站？请点击添加</router-link>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="3">
          <label for="">村医邮箱</label>
        </el-col>
        <el-col :span="5">
          <input type="text" v-model="inputData.email">
        </el-col>
        <el-col :span="3">
          <label for="">联系电话</label>
        </el-col>
        <el-col :span="5">
          <input type="text" v-model="inputData.telephone">
        </el-col>
        <el-col :span="2">
          <label for="">村医编码</label>
        </el-col>
        <el-col :span="5">
          <input type="text" v-model="inputData.no">
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="3">
          <label for="">银行账号</label>
        </el-col>
        <el-col :span="5">
          <input type="text" v-model="inputData.account">
        </el-col>
        <el-col :span="3">
          <label for="">银行账号名</label>
        </el-col>
        <el-col :span="5">
          <input type="text" v-model="inputData.accountName">
        </el-col>
      </el-row>
    </div>
    <div class="upload">
      <el-row :gutter="20">
        <el-col :span="4">
          <div class="girid-content"><label>村医身份证上传</label></div>
        </el-col>
        <el-col :span="8">
          <div class="girid-content girid-ipt">

            <input type="text" name="" v-model="inputData.certificateList[0].certificateName">

          </div>
        </el-col>
        <el-col :span="3">
          <div class="upload-btn" @click="changeIndex(0)">浏览选择附件
            <iframe name="frame1" id="frame1" frameborder="0" height="40"></iframe>
            <form action="http://www.yxunionpay.com:8087/yxsj-openapi-web/openapi/upload/upload.do" method="post"
                  enctype="multipart/form-data" name="Form1" id="form1" target="frame1">
              <input type="file" name="file" id="img1" v-on:change="imgUrl"
                     accept="image/gif,image/jpeg,image/jpg,image/png,image/svg">
              <input type="text" name="upload_type" value="4" style="display:none">;
            </form>
          </div>
        </el-col>
        <el-col :span="3">
          <div class="checkImg" @click="showImg(0)">点击查看大图</div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="4">
          <div class="girid-content"><label>从业资格证上传</label></div>
        </el-col>
        <el-col :span="8">

          <div class="girid-content girid-ipt">

            <input type="text" name="" v-model="inputData.certificateList[1].certificateName">

          </div>
        </el-col>
        <el-col :span="3">
          <div class="upload-btn" @click="changeIndex(1)">浏览选择附件
            <iframe name="frame2" frameborder="0" height="40"></iframe>
            <form action="http://www.yxunionpay.com:8087/yxsj-openapi-web/openapi/upload/upload.do" method="post"
                  enctype="multipart/form-data" name="From2" id="form2" target="frame2">
              <input type="file" name="file" v-on:change="imgUrl"
                     accept="image/gif,image/jpeg,image/jpg,image/png,image/svg">
              <input type="text" name="upload_type" value="4" style="display:none">;
            </form>
          </div>
        </el-col>
        <el-col :span="3">
          <div class="checkImg" @click="showImg(1)">点击查看大图</div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="4">
          <div class="girid-content"><label>银行卡资料上传</label></div>
        </el-col>
        <el-col :span="8">
          <div class="girid-content girid-ipt"><input type="text" name=""
                                                      v-model="inputData.certificateList[2].certificateName"></div>
        </el-col>
        <el-col :span="3">
          <div class="upload-btn" @click="changeIndex(2)">浏览选择附件
            <iframe name="frame3" frameborder="0" height="40"></iframe>
            <form action="http://www.yxunionpay.com:8087/yxsj-openapi-web/openapi/upload/upload.do" method="post"
                  enctype="multipart/form-data" name="From3" id="form3" target="frame3">
              <input type="file" name="file" v-on:change="imgUrl"
                     accept="image/gif,image/jpeg,image/jpg,image/png,image/svg">
              <input type="text" name="upload_type" value="4" style="display:none">;
            </form>
          </div>
        </el-col>
        <el-col :span="3">
          <div class="checkImg" @click="showImg(2)">点击查看大图</div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="2" :offset="20">
          <button type="button" class="grid-content upload-btn" @click="addMerchant">添加村医</button>
        </el-col>
      </el-row>
    </div>
    <div class="showImg">
      <img :src="imgUrls" alt="">
      <span class="close" @click="closePic()">X</span>
    </div>
  </div>
</template>
<script>
  import VDistpicker from 'v-distpicker'
  import {mapGetters} from 'vuex'
  export default{
    data(){
      return {
        provinceData: [{'name': '省'}],
        cityData: [{'name': '市'}],
        districtData: [{'name': '区'}],
        session: sessionStorage.getItem('session'),
        parentId: [],
        hospital: [],
        inputData: {//输入框值
          companyTypeId: 5,//商户类型
          code: '1',
          name: null,//名称
          certificateType: 1,//商户证件类型还未修改
          certificateNo: null,//商户证件号
          addressPathId: {//行政区域id
            proviceId: null,
            areaId: null,
            cityId: null,
            townId: null,
          },
          address: null,//详细地址,
          areaId: null,
          leaderName: null, //商户联系人，负责人
          corporation: null, //法人
          telephone: null,//商户联系电话
          email: null,
          summary: null,//主营业务
          no: null,//商户编码
          accountName: null,//银行账号名
          account: null,//银行账号,
          parentCompanyId: null,//父级企业id
          certificateList: [
            {
              isPersonal: 0,
              certificateType: 1,
              certificateTypeName: "村医身份证",
              certificateName: null,
              picSavePath: null,//保存路径
              imgUrls: null
            },
            {
              isPersonal: 0,
              certificateType: 2,
              certificateTypeName: "从业资格证",
              certificateName: null,
              picSavePath: null,
              imgUrls: null
            },
            {
              isPersonal: 0,
              certificateType: 1,
              certificateTypeName: "银行卡资料",
              certificateName: null,
              picSavePath: null,
              imgUrls: null
            }
          ]
        },
        imgIndex: 0,
        imgUrls: null,
        Url: null,
        fileList: []
      }
    },
    compontents: {
      VDistpicker
    },
    computed: mapGetters(['saveHealthData']),
    methods: {
//
      //获取上传文件的路径
      imgUrl(e){
        var files = e.target.files || e.dataTransfer.files;
        if (!files.length)return;
        this.getObjectURL(files[0]);
        this.inputData.certificateList[this.imgIndex].imgVal = e.target.value
      },
      changeUrl(file){//点击上传后修改路径
        this.inputData.certificateList[this.imgIndex].imgUrls = this.Url;
        console.log(file.name)
        this.inputData.certificateList[this.imgIndex].certificateName = file.name;
      },
      changeIndex(index){//获取不同点击上传按钮的事件
        this.imgIndex = index;
      },
      getObjectURL(file){//处理图片路径实现预览
        var url = null;
        var _this = this;
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
          _this.Url = this.result;
//            console.log(_this.Url);
          _this.changeUrl(file)
        }//将图片转成base64
//
//        if (window.createObjcectURL != undefined) {
//          url = window.createOjcectURL(file);
//        } else if (window.URL != undefined) {
//          url = window.URL.createObjectURL(file);
//        } else if (window.webkitURL != undefined) {
//          url = window.webkitURL.createObjectURL(file);
//        }
      },//关闭预览的图片
      closePic(){
        document.getElementsByClassName('showImg')[0].style.display = 'none';
      },
      showImg(index){ //显示图片
        if (this.inputData.certificateList[index].imgUrls) {
          this.imgUrls = this.inputData.certificateList[index].imgUrls;
          document.getElementsByClassName('showImg')[0].style.display = 'block';
        }
      },
      addMerchant(){//点击进行添加
        console.log(this.inputData.certificateList[this.imgIndex].imgVal);
        var vm = this;
//        this.setPicture("#form1", 0);
//        this.setPicture("#form2", 1);
//        this.setPicture("#form3", 2);
//        this.setPicture("#form4", 3);
        vm.addCompany()
      },
      addCompany(){//检测图片是否全部成功的函数
        for (var i = 0; i < this.inputData.certificateList.length; i++) {
          this.inputData.certificateList[i].imgUrls = null;
//            this.inputData.certificateList[i].imgVal = null;
//            this.inputData.certificateList[i].certificateName = null;
        }
        var addMerchant = new RemoteCall();
        addMerchant.init({
          router: "/company/update",
          session: this.session,
          data: this.inputData,
          callback: this.routerGo
        })
      },
      routerGo(data){
        if (data.ret.errorMessage == 'success') {
          window.location.reload()
        }
      },
      checkPictureUrl(){//检测图片接口中的信息是否完整 不完整停止接口调用
        for (var i = 0; i < 3; i++) {
          if (!this.inputData.certificateList[i].picSavePath) {
            console.log(this.inputData.certificateList[i].picSavePath);
            return false
          }
        }
        return true
      },
      setPicture(id, index){//调用图片接口
        var vm = this;
        $(id).ajaxSubmit({//为了获取跨域的iframe的内容 没办法动用了jq插件
          type: "POST",
          url: "http://www.yxunionpay.com:8087/yxsj-openapi-web/openapi/upload/upload.do",
          success: function (data) {
            if (data) {
              if (JSON.parse(data).data.length > 0) {
                vm.callback(data, index, addcompany)
              } else {
                switch (index) {
                  case 0:
                    alert("营业执照上传失败")
                    break;
                  case 1:
                    alert("从业资格证上传失败")
                    break;
                  case 2:
                    alert("银行卡资料上传失败")
                    break;
                  default:
                    alert("照片上传错误请重新上传")
                    break

                }
              }
            }

          }
        })
      },
      callback(data, index){//图片调用成功后的回调函数
        this.inputData.certificateList[index].picSavePath = JSON.parse(data).data[0].saved_file;
//        console.log(JSON.parse(data).data[0].saved_file)
      },
      getParentId(){//获取父级卫生院数据 插入到节点中
        var getParent = new RemoteCall();
        getParent.init({
          router: "/company/get",
          session: this.session,
          data: {
//            aredId:parseInt(this.inputData.areaId)
          },
          callback: this.parentCallback
        })

      },
      parentCallback(data){
        for (var i = 0; i < data.rows.length; i++) {
          if (data.rows[i].companyType == 1) {
            this.parentId.push(data.rows[i]);
          }
        }
      },
      getparentChange(){
        var index = this.$refs.mySelect.selectedIndex - 1;
        this.parentCompanyId = this.$refs.options[index].value;
        this.gethospital();
      },
      gethospital(){
        var gethospital = new RemoteCall();
        gethospital.init({
          router: "/company/get",
          session: this.session,
          data: {
            parentCompanyId: this.parentCompanyId
          },
          callback: this.hospitalCallback
        })
      },
      hospitalCallback(data){
        this.hospital = data.rows;
      },
      hospitalChange(){
        var index = this.$refs.mySelect2.selectedIndex - 1;
        console.log(this.$refs.options2[index].value)
        if (this.$refs.options2[index].value) {
          this.inputData.parentCompanyId = this.$refs.options2[index].value;
        }

      }
    },
    mounted: function () {
      this.getParentId()
      if (!this.saveHealthData) {
        this.$router.push('/doctormanage')
      }
      for (var i in this.saveHealthData) {
        this.inputData[i] = this.saveHealthData[i];
      }
    }
  }
</script>
<style lang="scss" scoped="">
  #HeadlthStationAdd {
    margin: 15px;
    padding: 20px;
    background: #fff;
  }

  .el-col {
    margin-bottom: 20px;
    label {
      display: block;
      width: 100%;
      text-align: right;
      line-height: 36px;
    }
    input {
      width: 100%;
      height: 30px;
      border-radius: 3px;
      border: 1px solid #aaa;
    }
    select {
      width: 100%;
      height: 36px;
      border-radius: 3px;
      border: 1px solid #aaa;
    }
  }

  .girid-ipt {
    text-align: left;
  }

  .upload {
    margin-top: 75px;
  }

  .girid-btn {
    button {
      background: #32BC6F;
      border-radius: 5px;
      width: 120px;
      height: 36px;
      vertical-align: middle;
      color: #fff;
      border: 5px;
    }
  }

  .table-box {
    margin-top: 50px;
  }

  .upload-btn {
    width: 100%;
    overflow: hidden;
    background: #32BC6F;
    height: 36px;
    border-radius: 4px;
    position: relative;
    line-height: 36px;
    color: #fff;
    text-align: center;
    border: 0;
    outline: none;
    cursor: pointer;
    input {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      opacity: 0;
    }
  }

  .addHealth {
    display: block;
    line-height: 36px;
    text-indent: 2em;
  }

  .checkImg {
    line-height: 36px;
  }

  .el-col-3 {
    width: 11%;
  }

  .el-col-5 {
    width: 22.333%;
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
      width: 23.333333%;
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

  .showImg {
    display: none;
    width: 100%;
    background: rgba(0, 0, 0, 0.7);
    position: absolute;
    top: 0;
    left: 0;
    height: 1190px;
    img {
      width: 800px;
      display: block;
      margin: 50px auto;
    }
    .close {
      position: absolute;
      width: 50px;
      height: 50px;
      background: rgba(255, 255, 255, 0.9);
      cursor: pointer;
      font-size: 30px;
      text-align: center;
      line-height: 50px;
      border-radius: 25px;
      right: 10px;
      top: 10px;

    }
  }

</style>
<style type="text/css">
  .distpicker select {
    width: 32% !important;
    height: 36px;
    line-height: 36px;
    padding: 0.25rem;
    outline: none;
    border: 1px solid #aaa
  }

  @media screen and (max-width: 1700px) {
    .distpicker select {
      width: 31% !important;
    }
  }
</style>
