<template>
  <div id="CollaborateAdd">
    <div>
      <el-row :gutter="20">
        <el-col :span="2"><label for="">客户名称<span class="must">*</span></label></el-col>
        <el-col :span="6"><input type="text" v-model="inputData.name"></el-col>
        <el-col :span="2"><label for="">合作内容</label></el-col>
        <el-col :span="6">
          <select ref="collaborate" @change="collaborateType()">
            <option v-for="(item,index) in collaborateTypes" :value="index">{{item}}</option>
          </select>
        </el-col>
        <el-col :span="2">
          <label for="">主营业务</label>
        </el-col>
        <el-col :span="6">
          <input type="text" v-model="inputData.summary">
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="2">
          <label for="">客户证件号</label>
        </el-col>
        <el-col :span="6">
          <input type="text" v-model="inputData.certificateNo">
        </el-col>
        <el-col :span="2">
          <label for="">客户证件类型</label>
        </el-col>
        <el-col :span="6">
          <el-select v-model="certificateType" @change="certificateTypeChange">
            <el-option v-for="item in certificateData" :value="item.value" :label="item.label"
                       :key="item.value"></el-option>
          </el-select>
        </el-col>
        <el-col :span="2">
          <label for="">行业客户编码</label>
        </el-col>
        <el-col :span="6">
          <input type="text" v-model="inputData.no">
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="2">
          <label for="">客户法人</label>
        </el-col>
        <el-col :span="6">
          <input type="text" v-model="inputData.corporation">
        </el-col>
        <el-col :span="2">
          <label for="">客户联系人</label>
        </el-col>
        <el-col :span="6">
          <input type="text" v-model="inputData.leaderName">
        </el-col>
        <el-col :span="2">
          <label for="">联系电话</label>
        </el-col>
        <el-col :span="6">
          <input type="text" v-model="inputData.telephone">
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="2">
          <label for="">联系邮箱</label>
        </el-col>
        <el-col :span="6">
          <input type="text" v-model="inputData.email">
        </el-col>
        <el-col :span="2">
          <label for="">银行账户名</label>
        </el-col>
        <el-col :span="6">
          <input type="text" v-model="inputData.accountName">
        </el-col>
        <el-col :span="2">
          <label for="">银行账号</label>
        </el-col>
        <el-col :span="6">
          <input type="text" v-model="inputData.account">
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="2">
          <label for="">客户地址</label>
        </el-col>
        <el-col :span="6">
          <div class="distpicker">
            <select name="" id="province" @change="setCity()">
              <option v-for="data in provinceData" v-bind:value="data.id">{{data.name}}</option>
            </select>
            <select name="" id="city" @change="setDistrict()">
              <option v-for="data in cityData" v-bind:value="data.id">{{data.name}}</option>
            </select>
            <select name="" id="district" @change="setAreaId()">
              <option v-for="datas in districtData" v-bind:value="datas.id">{{datas.name}}</option>
            </select>
          </div>
        </el-col>
        <el-col :span="16">
          <input type="text" v-model="inputData.address">
        </el-col>
      </el-row>
    </div>
    <div class="upload">
      <el-row :gutter="20">
        <el-col :span="4">
          <div class="girid-content"><label>营业执照上传</label></div>
        </el-col>
        <el-col :span="8">
          <div class="girid-content girid-ipt">

            <input type="text" name="" v-model="certificateList[0].certificateName" disabled="disabled">

          </div>
        </el-col>
        <el-col :span="3">
          <div class="upload-btn" @click="changeIndex(0)">浏览选择附件
            <iframe name="frame1" id="frame1" frameborder="0" height="40"></iframe>
            <form action="http://192.168.0.137:18081/yxsj-openapi-web/openapi/upload/upload.do" method="post"
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

            <input type="text" name="" v-model="certificateList[1].certificateName" disabled="disabled">

          </div>
        </el-col>
        <el-col :span="3">
          <div class="upload-btn" @click="changeIndex(1)">浏览选择附件
            <iframe name="frame2" frameborder="0" height="40"></iframe>
            <form action="http://192.168.0.137:18081/yxsj-openapi-web/openapi/upload/upload.do" method="post"
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
                                                      v-model="certificateList[2].certificateName" disabled="disabled">
          </div>
        </el-col>
        <el-col :span="3">
          <div class="upload-btn" @click="changeIndex(2)">浏览选择附件
            <iframe name="frame3" frameborder="0" height="40"></iframe>
            <form action="http://192.168.0.137:18081/yxsj-openapi-web/openapi/upload/upload.do" method="post"
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
        <el-col :span="4">
          <div class="girid-content"><label>法人身份证照片上传</label></div>
        </el-col>
        <el-col :span="8">
          <div class="girid-content girid-ipt"><input type="text" name=""
                                                      v-model="certificateList[3].certificateName" disabled="disabled">
          </div>
        </el-col>
        <el-col :span="3">
          <div class="upload-btn" @click="changeIndex(3)">浏览选择附件
            <iframe name="frame4" frameborder="0" height="40"></iframe>
            <form action="http://192.168.0.137:18081/yxsj-openapi-web/openapi/upload/upload.do" method="post"
                  enctype="multipart/form-data" name="From4" id="form4" target="frame2">
              <input type="file" name="file" v-on:change="imgUrl"
                     accept="image/gif,image/jpeg,image/jpg,image/png,image/svg">
              <input type="text" name="upload_type" value="4" style="display:none">;
            </form>
          </div>
        </el-col>
        <el-col :span="3">
          <div class="checkImg" @click="showImg(3)">点击查看大图</div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="2" :offset="20">
          <button type="button" class="grid-content upload-btn" @click="addMerchant">添加合作行业</button>
        </el-col>
      </el-row>
    </div>
    <div class="showImg">
      <img :src="imgUrls" alt="">
      <span class="close" @click="closePic()">X</span>
    </div>
  </div>
</template>
<script type="text/javascript">
  import {mapGetters} from 'vuex'
  export default{
    data(){
      return {
        provinceData: [{'name': '省'}],
        cityData: [{'name': '市'}],
        districtData: [{'name': '区'}],
        certificateType: null,
        certificateData: [
          {
            value: null,
            label: '请选择证件类型'
          }, {
            value: 1,
            label: '营业执照'
          }, {
            value: 2,
            label: '从业资格证'
          }
        ],
        session: sessionStorage.getItem('session'),
        collaborateTypes: ['请选择合作内容', '资源对接', '通道对接', '地区合作', '业务代理', '产品对接', '推广渠道', '其他合作', '社保局', '人民银行', '其他政府单位'],
        inputData: {//输入框值
          companyTypeId: 4,//商户类型 平台=合作伙伴
          code: '1',
          name: null,//名称1
          certificateType: null,//商户证件类型
          certificateNo: null,//商户证件号
          addressPathId: {//行政区域id
            proviceId: null,
            areaId: null,
            cityId: null,
            townId: null,
          },
          address: null,//详细地址,
          cooperationType: null, //商户合作内容,
          areaId: null,//最小区域id
          leaderName: null, //商户联系人，负责人
          corporation: null, //法人
          telephone: null,//商户联系电话
          email: null,//商户邮箱
          summary: null,//主营业务
          no: null,//商户编码
          accountName: null,//银行账号名
          account: null,//银行账号
          certificateList: []
        },
        imgIndex: null,
        imgUrls: null,
        Url: null,
        fileList: [],
        certificateList: [{
          certificateName: null
        }, {
          certificateName: null
        }, {
          certificateName: null
        }, {
          certificateName: null
        }]
      }
    },
    methods: {
      //获取选中的公司证书类型
      certificateTypeChange(data){
        this.inputData.certificateType = data;
      },
      collaborateType(){ //合作关系
        var index = this.$refs.collaborate.selectedIndex;
        var vm = this;
        if (index) {
          vm.inputData.cooperationType = index;
        } else {
          vm.inputData.cooperationType = null;
        }
      },
      //地市联动方法 //找个时间封装
      getArea(){
        if (sessionStorage.getItem('session')) {
          this.session = sessionStorage.getItem('session');//获取本地存储保存session状态
        } else {
          this.$router.push({path: '/login'})
        }
        var _this = this;
        var getArea = new RemoteCall();
        getArea.init({
          router: "/base/area/idname/get",
          session: _this.session,
          data: {
            parentAreaId: 0
          },
          callback: this.getAreaCallback
        });
      },
      getAreaCallback(data){
        var _this = this;
        this.provinceData = data.rows
        clearTimeout(timer)
        var timer = setTimeout(function () {
          _this.setCity();
        }, 0)
      },
      setCity(){
        var _this = this;
        var mySelect = document.getElementById('province');
        var index = mySelect.selectedIndex;
        var parentId = mySelect.getElementsByTagName('option')[index].value;
        if (parentId == '') {
          return
        }
        this.inputData.addressPathId.proviceId = parentId;
        var getCity = new RemoteCall();
        getCity.init({
          router: "/base/area/idname/get",
          session: this.session,
          data: {
            parentAreaId: parentId
          },
          callback: function (data) {
            if (data.ret.errorCode === 0) {
              _this.cityData = data.rows;
              _this.$nextTick(function (data) {
                _this.setDistrict();
              })
            }
          }
        });
      },
      setDistrict(){//县区获取
        var myCity = document.getElementById('city');
        var index = myCity.selectedIndex;
        var _this = this;
        var parentId = myCity.getElementsByTagName('option')[index].value;
        if (parentId == '') {
          return
        }
        this.inputData.addressPathId.cityId = parentId;
        this.inputData.cityCode = parentId;
        var getDistrict = new RemoteCall();
        getDistrict.init({
          router: "/base/area/idname/get",
          session: this.session,
          data: {
            parentAreaId: parentId
          },
          callback: function (data) {
            if (data.ret.errorCode === 0) {
              _this.districtData = data.rows;
              _this.$nextTick(function () {
                _this.setAreaId();
              })
            }
          }
        });
      },
      setAreaId(){//获取areaid 给inputData赋值
        var myCity = document.getElementById('district');
        var index = myCity.selectedIndex;
        var parentId = myCity.getElementsByTagName('option')[index].value;
        if (parentId == '') {
          return
        }
        this.inputData.addressPathId.areaId = parentId;
        this.inputData.areaId = parentId;
      },
      //地市联动结束

      //获取上传文件的路径
      imgUrl(e){
        var files = e.target.files || e.dataTransfer.files;
        if (!files.length)return;
        this.getObjectURL(files[0]);
        this.certificateList[this.imgIndex].imgVal = e.target.value
      },
      changeUrl(file){//点击上传后修改路径
        this.certificateList[this.imgIndex].imgUrls = this.Url;
        this.certificateList[this.imgIndex].certificateName = file.name
//        this.$set(this.imgName, this.imgIndex, file.name);
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
      },//关闭预览的图片
      closePic(){
        document.getElementsByClassName('showImg')[0].style.display = 'none';
      },
      showImg(index){ //显示图片
        if (this.certificateList[index].imgUrls) {
          this.imgUrls = this.certificateList[index].imgUrls;
          document.getElementsByClassName('showImg')[0].style.display = 'block';
        }
      },
      addMerchant(){//点击进行添加
//        console.log(this.inputData.certificateList[this.imgIndex].imgVal);
        if (this.inputData.name == "" || this.inputData.name == null) {
          this.$alert('商户名不能为空', '提示', {
            confirmButtonText: '确定',
          });
          return false
        }
        var vm = this;

        vm.setPictures();
      },
      setPictures(){
        var vm = this;
        if (vm.certificateList[0].imgUrls) {
          this.setPicture("#form1", 0);
        }
        if (vm.certificateList[1].imgUrls) {
          this.setPicture("#form2", 1);
        }
        if (vm.certificateList[2].imgUrls) {
          this.setPicture("#form3", 2);
        }
        if (vm.certificateList[3].imgUrls) {
          this.setPicture("#form4", 3);
        }
        this.addCompany()
      },
      addCompany(){//检测图片是否全部成功的函数
        var vm = this;
          var addMerchant = new RemoteCall();
          addMerchant.init({
            router: "/company/add",
            session: this.session,
            data: this.inputData,
            callback: vm.routerGo
          })
      },
      routerGo(data){
        if (data.ret.errorMessage == 'success') {
          this.$alert('添加成功', '提示', {
            confirmButtonText: '确定',
            callback: function () {
              window.location.reload()
            }
          })
        } else {
          this.$alert(data.ret.errorMessage, '提示', {
            confirmButtonText: '确定'
          })
        }
      },
      setPicture(id, index){//调用图片接口
        var vm = this;
        $(id).ajaxSubmit({//为了获取跨域的iframe的内容 没办法动用了jq插件
          type: "POST",
          url: "http://www.yxunionpay.com:8087/yxsj-openapi-web/openapi/upload/upload.do",
          async: false,
          success: function (data) {
            if (data) {
              if (JSON.parse(data).data.length > 0) {
                vm.callback(data, index)
              } else {
                switch (index) {
                  case 0:
//                    alert("营业执照上传失败")
                    vm.$alert("营业执照上传失败", '提示', {
                      confirmButtonText: '确定'
                    })
                    break;
                  case 1:
//                    alert("从业资格证上传")
                    vm.$alert("从业资格证上传", '提示', {
                      confirmButtonText: '确定'
                    })
                    break;
                  case 2:
//                    alert("银行卡资料上传")
                    vm.$alert("银行卡资料上传", '提示', {
                      confirmButtonText: '确定'
                    })
                    break;
                  case 3:
//                    alert("法人身份证照片上传")
                    vm.$alert("法人身份证照片上传", '提示', {
                      confirmButtonText: '确定'
                    })
                    break;
                  default:
//                    alert("照片上传错误请重新上传");
                    vm.$alert("照片上传错误请重新上传", '提示', {
                      confirmButtonText: '确定'
                    })
                    break
                }
              }
            }
          }
        });
      },
      callback(data, index, addcompany){//图片调用成功后的回调函数
        var certificateName = null;
        switch (index) {
          case 0:
            certificateName = '营业执照';
            break;
          case 1:
            certificateName = '从业资格证';
            break;
          case 2:
            certificateName = '银行卡资料';
            break;
          case 3:
            certificateName = '法人身份证';
            break;
        }
        var json = {};
        json.isPersonal = 0;
        json.certificateType = 1;
        json.certificateTypeName = certificateName;
        json.picSavePath = JSON.parse(data).data[0].saved_file;//修改上传图片的结构
        if (this.inputData.certificateList.length > 0) {
          for (var i = 0; i < this.inputData.certificateList.length; i++) {
            if (this.inputData.certificateList[i].certificateTypeName == json.certificateTypeName) {
              this.inputData.certificateList[i] = json;
              return;
            }
          }
          this.inputData.certificateList.push(json)
        } else {
          this.inputData.certificateList.push(json)
        }

//        this.inputData.certificateList[index] = json;
//        this.inputData.certificateList[index].picSavePath = JSON.parse(data).data[0].saved_file;
//        if (addcompany) {
//          addcompany();//判断所有图片上传成功后回调
//        }
      },
    },
    computed: mapGetters(['saveSession']),
    mounted: function () {
      this.getArea();
    }
  }
</script>
<style lang="scss" scoped>
  #CollaborateAdd {
    margin: 15px;
    padding: 40px 60px 20px 20px;
    background: #fff;
    position: relative;
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

  input[type="text"]:disabled {
    background-color: transparent;
  }
  .el-select {
    width: 100%;
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
      cursor: pointer;
    }
  }

  .checkImg {
    line-height: 36px;
    cursor: pointer;
  }

  .must {
    color: red;
    vertical-align: middle;
  }
  /*媒体查询做兼容*/
  @media screen and (max-width: 1800px) {
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

  @media screen and (max-width: 1480px) {
    .el-col-2 {
      width: 13%;
    }
    .el-col-6 {
      width: 20.333333%;
    }
    .el-col-4 {
      width: 17.66667%;
    }
    .el-col-3 {
      width: 17.5%;
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
  @media screen and (max-width: 1450px) {
    .distpicker select {
      width: 31% !important;
    }
  }
</style>
