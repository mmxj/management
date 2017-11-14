<template>
  <div id="MerchantAdd">
    <div>
      <el-row :gutter="20">
        <el-col :span="2">
          <div class="girid-content"><label>商户类型</label></div>
        </el-col>
        <el-col :span="6">
          <div class="girid-content girid-ipt">
            <!--<select ref="companyType" @change="setCompanyType">-->
            <!--<option>请选择商户类型</option>-->
            <!--<option>医院(卫生站)</option>-->
            <!--<option>药店</option>-->
            <!--</select>-->
            <el-select v-model="companyType" @change="setCompanyType">
              <el-option v-for="item in companyOption" :key="item.value" :label="item.label"
                         :value="item.value"></el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="2">
          <div class="girid-content"><label>商户名称</label></div>
        </el-col>
        <el-col :span="6">
          <div class="girid-content girid-ipt"><input type="text" name="" v-model="inputData.name"></div>
        </el-col>
        <el-col :span="2">
          <div class="girid-content"><label>商户证件类型</label></div>
        </el-col>
        <el-col :span="6">
          <div class="girid-content girid-ipt">
            <!--商户证书类型-->
            <el-select v-model="certificateType" @change="certificateTypeChange">
              <el-option v-for="item in certificateData" :value="item.value" :label="item.label"
                         :key="item.value"></el-option>
            </el-select>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="2">
          <div class="girid-content"><label>商户证件号</label></div>
        </el-col>
        <el-col :span="6">
          <div class="girid-content girid-ipt"><input type="text" name="" v-model="inputData.certificateNo"></div>
        </el-col>
        <el-col :span="2">
          <div class="girid-content"><label>商户地址</label></div>
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
        <el-col :span="2">
          <div class="girid-content"><label>详细地址</label></div>
        </el-col>
        <el-col :span="6">
          <div class="girid-content girid-ipt"><input type="text" name="" v-model="inputData.address"></div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="2">
          <div class="girid-content"><label>商户法人</label></div>
        </el-col>
        <el-col :span="6">
          <div class="girid-content girid-ipt"><input type="text" name="" v-model="inputData.corporation"></div>
        </el-col>
        <el-col :span="2">
          <div class="girid-content"><label>商户联系人</label></div>
        </el-col>
        <el-col :span="6">
          <div class="girid-content girid-ipt"><input type="text" name="" v-model="inputData.leaderName"></div>
        </el-col>
        <el-col :span="2">
          <div class="girid-content"><label>联系电话</label></div>
        </el-col>
        <el-col :span="6">
          <div class="girid-content girid-ipt"><input type="text" name="" v-model="inputData.telephone"></div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="2">
          <div class="girid-content"><label>商户邮箱</label></div>
        </el-col>
        <el-col :span="6">
          <div class="girid-content girid-ipt"><input type="text" name="" v-model="inputData.email"></div>
        </el-col>
        <el-col :span="2">
          <div class="girid-content"><label>主营业务</label></div>
        </el-col>
        <el-col :span="6">
          <div class="girid-content girid-ipt"><input type="text" name="" v-model="inputData.summary"></div>
        </el-col>
        <el-col :span="2">
          <div class="girid-content"><label>商户编码</label></div>
        </el-col>
        <el-col :span="6">
          <div class="girid-content girid-ipt"><input type="text" name="" v-model="inputData.no"></div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="2">
          <div class="girid-content"><label>银行账户名</label></div>
        </el-col>
        <el-col :span="6">
          <div class="girid-content girid-ipt"><input type="text" name="" v-model="inputData.accountName"></div>
        </el-col>
        <el-col :span="2">
          <div class="girid-content"><label>银行账号</label></div>
        </el-col>
        <el-col :span="6">
          <div class="girid-content girid-ipt"><input type="text" name="" v-model="inputData.account"></div>
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
        <el-col :span="4">
          <div class="girid-content"><label>法人身份证照片上传</label></div>
        </el-col>
        <el-col :span="8">
          <div class="girid-content girid-ipt"><input type="text" name=""
                                                      v-model="inputData.certificateList[3].certificateName"></div>
        </el-col>
        <el-col :span="3">
          <div class="upload-btn" @click="changeIndex(3)">浏览选择附件
            <iframe name="frame4" frameborder="0" height="40"></iframe>
            <form action="http://www.yxunionpay.com:8087/yxsj-openapi-web/openapi/upload/upload.do" method="post"
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
          <button type="button" class="grid-content upload-btn" @click="addMerchant">添加商户</button>
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
  import VDistpicker from 'v-distpicker'
  export default{
    data(){
      return {
        provinceData: [{'name': '省'}],
        cityData: [{'name': '市'}],
        districtData: [{'name': '区'}],
        session: sessionStorage.getItem('session'),
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
        inputData: {//输入框值
          companyTypeId: null,//商户类型
          code: '1',
          name: null,//名称
          certificateType: null,//商户证书类型
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
          corporation: null,
          telephone: null,//商户联系电话
          email: null,
          summary: null,//主营业务
          no: null,//商户编码
          accountName: null,//银行账号名
          account: null,//银行账号
          certificateList: [
            {
              isPersonal: 0,
              certificateType: 1,
              certificateTypeName: "营业执照",
              certificateName: null,
              picSavePath: null,//保存路径
              imgUrls: null
            },
            {
              isPersonal: 0,
              certificateType: 1,
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
            },
            {
              isPersonal: 0,
              certificateType: 1,
              certificateTypeName: "法人身份证",
              certificateName: null,
              picSavePath: null,
              imgUrls: null
            }
          ]
        },
        imgIndex: 0,
        imgUrls: null,
        Url: null,
        fileList: [],
        companyOption: [{
          value: null,
          label: '请选择商户类型'
        }, {
          value: 1,
          label: '收单机构'
        }, {
          value: 2,
          label: '支付通道机构'
        }, {
          value: 3,
          label: '社保局'
        }, {
          value: 4,
          label: '医院(卫生站)'
        }, {
          value: 5,
          label: '药店'
        }, {
          value: 6,
          label: '平台'
        }, {
          value: 7,
          label: '卫计局'
        }],
        companyType: null,
      }
    },
    compontents: {
      VDistpicker
    },
    methods: {
      //获取公司类型id companyTypeId
      setCompanyType(data){
        var vm = this;
        vm.inputData.companyTypeId = data;
      },
      //获取选中的公司证书类型
      certificateTypeChange(data){
        this.inputData.certificateType = data;
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
        this.inputData.addressPathId.proviceId = parentId;
        var getCity = new RemoteCall();
        getCity.init({
          router: "/base/area/idname/get",
          session: this.session,
          data: {
            parentAreaId: parentId
          }
        });
        this.cityData = getCity.res.rows;
        clearTimeout(timer);
        var timer = setTimeout(function () {
          _this.setDistrict();
        }, 10)
      },
      setDistrict(){//县区获取
        var myCity = document.getElementById('city');
        var index = myCity.selectedIndex;
        var _this = this;
        var parentId = myCity.getElementsByTagName('option')[index].value;
        this.inputData.addressPathId.cityId = parentId;
        this.inputData.cityCode = parentId;
        var getDistrict = new RemoteCall();
        getDistrict.init({
          router: "/base/area/idname/get",
          session: this.session,
          data: {
            parentAreaId: parentId
          }
        });
        this.districtData = getDistrict.res.rows;
        clearTimeout(timer);
        var timer = setTimeout(function () {
          _this.setAreaId();
        }, 10)
      },
      setAreaId(){//获取areaid 给inputData赋值
        var myCity = document.getElementById('district');
        var index = myCity.selectedIndex;
        var parentId = myCity.getElementsByTagName('option')[index].value;
        this.inputData.addressPathId.areaId = parentId;
        this.inputData.areaId = parentId;
      },
      //地市联动结束
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
        this.setPicture("#form1", 0);
        this.setPicture("#form2", 1);
        this.setPicture("#form3", 2);
        this.setPicture("#form4", 3, this.addCompany);
//        var addMerchant = new RemoteCall();
//        addMerchant.init({
//          router: "/company/add",
//          session: this.session,
//          data: {
//            parentAreaId: this.inputData
//          }
//        })
      },
      addCompany(){//检测图片是否全部成功的函数
        var vm = this;
        if (this.checkPictureUrl()) {
          for (var i = 0; i < this.inputData.certificateList.length; i++) {
            this.inputData.certificateList[i].imgUrls = null;
            this.inputData.certificateList[i].imgVal = null;
            this.inputData.certificateList[i].certificateName = null;
          }
          var addMerchant = new RemoteCall();
          addMerchant.init({
            router: "/company/add",
            session: this.session,
            data: this.inputData,
            callback: vm.routerGo
          })
        } else {
          this.$alert('添加失败请上传完整的图片信息', '提示', {
            confirmButtonText: '确定',
            callback: function () {
//              window.location.reload()
            }
          });
        }
      },
      routerGo(data){
        if (data.ret.errorMessage == 'success') {
//          window.location.reload()
          this.$alert('添加成功', '提示', {
            confirmButtonText: '确定',
            callback: function () {
              window.location.reload()
            }
          });
        } else {
          if (data.ret.errorMessage == 'Exception: 字段：name为空值，请检查!\r\n') {
            this.$alert('商户名不能为空', '提示', {
              confirmButtonText: '确定'
            })
          }
        }
      },
      checkPictureUrl(){//检测图片接口中的信息是否完整 不完整停止接口调用
        for (var i = 0; i < 4; i++) {
          if (!this.inputData.certificateList[i].picSavePath) {
//            console.log(this.inputData.certificateList[i].picSavePath);

            return false
          }
        }
        return true
      },
      setPicture(id, index, addcompany){//调用图片接口
        var vm = this;
        $(id).ajaxSubmit({//为了获取跨域的iframe的内容 没办法动用了jq插件
          type: "POST",
          url: "http://www.yxunionpay.com:8087/yxsj-openapi-web/openapi/upload/upload.do",
          async: false,
          success: function (data) {
            if (data) {
              if (JSON.parse(data).data.length > 0) {
                vm.callback(data, index, addcompany)
              } else {
                switch (index) {
                  case 0:
                    vm.$alert('营业执照上传失败', '提示', {
                      confirmButtonText: '确定',
                    });
                    break;
                  case 1:
                    vm.$alert('从业资格证上传失败', '提示', {
                      confirmButtonText: '确定',
                    });
                    break;
                  case 2:
                    vm.$alert('银行卡资料上传失败', '提示', {
                      confirmButtonText: '确定',
                    });
                    break;
                  case 3:
                    vm.$alert('法人身份证照片上传失败', '提示', {
                      confirmButtonText: '确定',
                    });
                    break;
                  default:
                    vm.$alert('照片上传失败', '提示', {
                      confirmButtonText: '确定',
                    });
                    break
                }
              }
            }

          }
        });
        if (addcompany) {
          addcompany();//判断所有图片上传成功后回调
        }
      },
      callback(data, index, addcompany){//图片调用成功后的回调函数
        this.inputData.certificateList[index].picSavePath = JSON.parse(data).data[0].saved_file;
//        if (addcompany) {
//          addcompany();//判断所有图片上传成功后回调
//        }

//        console.log(JSON.parse(data).data[0].saved_file)
      }
    },
    mounted: function () {
      this.getArea();
    }
  }
</script>
<style type="text/css" lang="scss" scoped>
  #MerchantAdd {
    margin: 15px;
    padding: 25px;
    background: #fff;
    border-radius: 5px;
    color: #333;
    position: relative;
    height: 100%
  }

  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }

  .girid-content {
    line-height: 30px;
    text-align: right;
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
      cursor: pointer;
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      opacity: 0;
    }
  }

  .el-select {
    width: 100%;
  }
  .checkImg {
    line-height: 36px;
    cursor: pointer;
  }

  /*媒体查询做兼容*/
  @media screen and (max-width: 1760px) {
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
  }

  @media screen and (max-width: 1420px) {
    .el-col-2 {
      width: 12%;
    }
    .el-col-6 {
      width: 21.333333%;
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
    width: 31%;
    height: 36px;
    line-height: 36px;
    padding: 0.25rem;
    outline: none;
    border: 1px solid #aaa;
    border-radius: 3px;
  }

  @media screen and (max-width: 1280px) {
    .distpicker select {
      width: 31% !important;
    }
  }
</style>
