<template>
  <div id="MerchantAdd">
    <div>
      <el-row :gutter="20">
        <el-col :span="2">
          <div class="girid-content"><label>商户类型</label></div>
        </el-col>
        <el-col :span="6">
          <div class="girid-content girid-ipt">
            <select>
              <option>请选择商户类型</option>
              <option>镇卫生站</option>
              <option>村卫生站</option>
              <option>药店</option>
              <option>其他</option>
            </select>
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
            <select>
              <option>请选择证件类型</option>
              <option>营业执照</option>
              <option>个人身份证</option>
              <option>无证件</option>
              <option>行业准入资格证</option>
              <option>其他证件</option>
            </select>
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
          <!--<div class="distpicker"><v-distpicker province="省" city="市" area="区"></v-distpicker></div>-->
          <div class="distpicker">
            <select name="" id="province" @change="setCity()">
              <option v-for="data in provinceData" v-bind:value="data.id">{{data.name}}</option>
            </select>
            <select name="" id="city" @change="setDistrict()">
              <option v-for="data in cityData" v-bind:value="data.id">{{data.name}}</option>
            </select>
            <select name="" id="district">
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
          <div class="girid-content girid-ipt"><input type="text" name=""></div>
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
          <div class="girid-content girid-ipt"><input type="text" name=""></div>
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
        <el-col :span="3">
          <div class="girid-content"><label>营业执照上传</label></div>
        </el-col>
        <el-col :span="8">
          <div class="girid-content girid-ipt"><input type="text" name=""
                                                      v-model="inputData.certificateList[0].certificateName"></div>
        </el-col>
        <el-col :span="3">
          <div class="upload-btn" @click="changeIndex(0)">浏览选择附件<input type="file" name="" v-on:change="imgUrl"></div>
        </el-col>
        <el-col :span="2">
          <div class="checkImg" @click="showImg(0)">点击查看大图</div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="3">
          <div class="girid-content"><label>从业资格证上传</label></div>
        </el-col>
        <el-col :span="8">
          <div class="girid-content girid-ipt"><input type="text" name=""
                                                      v-model="inputData.certificateList[1].certificateName"></div>
        </el-col>
        <el-col :span="3">
          <div class="upload-btn" @click="changeIndex(1)">浏览选择附件<input type="file" name="" v-on:change="imgUrl"></div>
        </el-col>
        <el-col :span="2">
          <div class="checkImg" @click="showImg(1)">点击查看大图</div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="3">
          <div class="girid-content"><label>银行卡资料上传</label></div>
        </el-col>
        <el-col :span="8">
          <div class="girid-content girid-ipt"><input type="text" name=""
                                                      v-model="inputData.certificateList[2].certificateName"></div>
        </el-col>
        <el-col :span="3">
          <div class="upload-btn" @click="changeIndex(2)">浏览选择附件<input type="file" name="" v-on:change="imgUrl"></div>
        </el-col>
        <el-col :span="2">
          <div class="checkImg" @click="showImg(2)">点击查看大图</div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="3">
          <div class="girid-content"><label>法人身份证照片上传</label></div>
        </el-col>
        <el-col :span="8">
          <div class="girid-content girid-ipt"><input type="text" name=""
                                                      v-model="inputData.certificateList[3].certificateName"></div>
        </el-col>
        <el-col :span="3">
          <div class="upload-btn" @click="changeIndex(3)">浏览选择附件<input type="file" name="" v-on:change="imgUrl"></div>
        </el-col>
        <el-col :span="2">
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
        session: null,
        inputData: {//输入框值
          companyTypeId: 1,//商户类型
          name: null,//名称
          certificateType: 1,//商户证件类型
          certificateNo: null,//商户证件号
          addressPathId: {//行政区域id
            proviceId: null,
            areaId: null,
            cityId: null,
            townId: null,
          },
          address: null,//详细地址
          leaderName: null, //商户联系人，负责人 ！少了一个法人的信息
          telephone: null,//商户联系电话 ！少了邮箱信息
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
              certificateType: 2,
              certificateTypeName: "从业资格证",
              certificateName: null,
              picSavePath: null,
              imgUrls: null
            },
            {
              isPersonal: 0,
              certificateType: 3,
              certificateTypeName: "银行卡资料",
              certificateName: null,
              picSavePath: null,
              imgUrls: null
            },
            {
              isPersonal: 0,
              certificateType: 4,
              certificateTypeName: "法人身份证",
              certificateName: null,
              picSavePath: null,
              imgUrls: null
            }
          ]
        },
        imgIndex: 0,
        imgUrls: null
      }
    },
    compontents: {
      VDistpicker
    },
    methods: {
      //地市联动方法 //找个时间封装
      getArea(){
        this.session = sessionStorage.getItem('session');//本地存储保存session状态
        var _this = this;
        var getArea = new RemoteCall();
        getArea.init({
          router: "/base/area/idname/get",
          session: this.session,
          data: {
            parentAreaId: 0
          }
        });
        console.log(getArea.res.rows)
        this.provinceData = getArea.res.rows

        clearTimeout(timer)
        var timer = setTimeout(function () {
          _this.setCity();
        }, 10)
      },
      setCity(){
        var _this = this;
        var mySelect = document.getElementById('province');
        var index = mySelect.selectedIndex;
        var parentId = mySelect.getElementsByTagName('option')[index].value;
        var getCity = new RemoteCall();
        getCity.init({
          router: "/base/area/idname/get",
          session: this.session,
          data: {
            parentAreaId: parentId
          }
        });
        this.cityData = getCity.res.rows;
        clearTimeout(timer)
        var timer = setTimeout(function () {
          _this.setDistrict();
        }, 10)
      },
      setDistrict(){
        var myCity = document.getElementById('city');
        var index = myCity.selectedIndex;
        var parentId = myCity.getElementsByTagName('option')[index].value;

        var getDistrict = new RemoteCall();
        getDistrict.init({
          router: "/base/area/idname/get",
          session: this.session,
          data: {
            parentAreaId: parentId
          }
        });
        this.districtData = getDistrict.res.rows;
      },
      //地市联动结束
      //获取上传文件的路径
      imgUrl(e){
        var files = e.target.files || e.dataTransfer.files;
        if (!files.length)return;
        this.inputData.certificateList[this.imgIndex].imgUrls = this.getObjectURL(files[0]);
        console.log(this.getObjectURL(files[0]));
        this.inputData.certificateList[this.imgIndex].certificateName = files[0].name;
        this.inputData.certificateList[this.imgIndex].picSavePath = this.getObjectURL(files[0]);
      },
      changeIndex(index){//获取不同点击上传按钮的事件
        this.imgIndex = index;
        console.log(this.imgIndex);
      },
      //处理图片路径实现预览
      getObjectURL(file){
        var url = null;
        if (window.createObjcectURL != undefined) {
          url = window.createOjcectURL(file);
        } else if (window.URL != undefined) {
          url = window.URL.createObjectURL(file);
        } else if (window.webkitURL != undefined) {
          url = window.webkitURL.createObjectURL(file);
        }
        return url;
      },//关闭预览的图片
      closePic(){
        document.getElementsByClassName('showImg')[0].style.display = 'none';
      },
      showImg(index){
        if (this.inputData.certificateList[index].imgUrls) {
          this.imgUrls = this.inputData.certificateList[index].imgUrls;
          document.getElementsByClassName('showImg')[0].style.display = 'block';
        }

      },
      addMerchant(){

        var addMerchant = new RemoteCall();
        addMerchant.init({
          router: "/company/add",
          session: this.session,
          data: {
            parentAreaId: this.inputData
          }
        })
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
    width: 32% !important;
    height: 36px;
    line-height: 36px;
    padding: 0.25rem;
    outline: none;
    border: 1px solid #aaa;
    border-radius: 3px;
  }

  @media screen and (max-width: 1420px) {
    .distpicker select {
      width: 31% !important;
    }
  }
</style>
