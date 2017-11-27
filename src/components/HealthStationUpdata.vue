<template>
  <div id="HeadlthStationAdd">
    <div>
      <el-row :gutter="20">
        <el-col :span="3"><label for="">卫生站名称</label></el-col>
        <el-col :span="5"><input type="text" v-model="inputData.name"></el-col>
        <el-col :span="3">
          <label for="">卫生站地址</label>
        </el-col>
        <el-col :span="5">
          <!--<div class="distpicker">-->
          <!--<v-distpicker province="省" city="市" area="区"></v-distpicker>-->
          <div class="distpicker">
            <select name="" id="province" @change="setCity()">
              <option value="">省</option>
              <option v-for="data in provinceData" v-bind:value="data.id">{{data.name}}</option>
            </select>
            <select name="" id="city" @change="setDistrict()">
              <option value="">市</option>
              <option v-for="data in cityData" v-bind:value="data.id">{{data.name}}</option>
            </select>
            <select name="" id="district" @change="setAreaId()">
              <option value="">区</option>
              <option v-for="datas in districtData" v-bind:value="datas.id">{{datas.name}}</option>
            </select>
          </div>
          <!--</div>-->
        </el-col>
        <el-col :span="3">
          <label for="">卫生站操作员号</label>
        </el-col>
        <el-col :span="5">
          <input type="text" v-model="inputData.no">
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="3">
          <label for="">卫生院证件类型</label>
        </el-col>
        <el-col :span="5">
          <!--<select ref="certificate" @change="certificateType">-->
          <!--<option>请选择证件类型</option>-->
          <!--<option>营业执照</option>-->
          <!--<option>从业资格证</option>-->
          <!--</select>-->
          <el-select v-model="certificateTypeName" filterable placeholder="请选择证件类型" @change="companyTypeChange">
            <el-option v-for="item in certificate" :key="item.value" :label="item.label"
                       :value="item.value"></el-option>
          </el-select>
        </el-col>
        <el-col :span="3"><label for="">归属卫生院</label></el-col>
        <el-col :span="5">
          <select ref="mySelect" @change="getparentChange">
            <option>
              请选择归属卫生院
            </option>
            <option v-for="data in parentId" v-bind:value="data.id" ref="options">{{data.name}}</option>
          </select>
        </el-col>
        <el-col :span="7">
          <router-link class="addHealth" to="/merchantadd">找不到对应的卫生院？请点击添加</router-link>
        </el-col>

      </el-row>
      <el-row :gutter="20">
        <el-col :span="3">
          <label for="">卫生站证件号</label>
        </el-col>
        <el-col :span="5">
          <input type="text" v-model="inputData.certificateNo">
        </el-col>

        <el-col :span="3">
          <label for="">卫生站联系人</label>
        </el-col>
        <el-col :span="5">
          <input type="text" v-model="inputData.leader">
        </el-col>
        <el-col :span="3">
          <label for="">卫生站法人</label>
        </el-col>
        <el-col :span="5">
          <input type="text" v-model="inputData.corporation">
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="3">
          <label for="">卫生站邮箱</label>
        </el-col>
        <el-col :span="5"><input type="text" v-model="inputData.email"></el-col>
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

            <input type="text" name="" v-model="certificateList[1].certificateName" disabled="disabled">

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
                                                      v-model="certificateList[2].certificateName" disabled="disabled">
          </div>
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
                                                      v-model="certificateList[3].certificateName" disabled="disabled">
          </div>
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
          <button type="button" class="grid-content upload-btn" @click.prevent="addMerchant">修改卫生站</button>
        </el-col>
      </el-row>
    </div>
    <div class="showImg">`
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
        provinceData: [],
        cityData: [],
        districtData: [],
        certificateTypeName: null,
        session: sessionStorage.getItem('session'),
        parentId: [],
        inputData: {//输入框值
          companyTypeId: 4,//商户类型
          code: '1',
          name: null,//名称
          certificateType: null,//商户证件类型
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

          ]
        },
        imgIndex: 0,
        imgUrls: null,
        Url: null,
        fileList: [],
        companyTypeName: null,
        certificate: [{
          value: null,
          label: '请选择证件类型'
        }, {
          value: 1,
          label: '营业执照',
        }, {
          value: 2,
          label: '从业资格证'
        }],
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
    compontents: {
      VDistpicker
    },
    computed: mapGetters(['saveHealthData']),
    methods: {
      //获取选中的公司证书类型
      certificateType(){
        var index = this.$refs.certificate.selectedIndex;
        var vm = this;
        switch (index) {
          case 1:
            vm.inputData.certificateType = 1;
//            console.log(vm.inputData.certificateType)
            break;
          case 2:
            vm.inputData.certificateType = 2;
//            console.log(vm.inputData.certificateType)
            break;
        }
      },
      //地市联动方法
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
//        clearTimeout(timer)
//        var timer = setTimeout(function () {
//          _this.setCity();
//        }, 0)
      },
      setCity(){
        var _this = this;
        var mySelect = document.getElementById('province');
        var index = mySelect.selectedIndex;
        var parentId = mySelect.getElementsByTagName('option')[index].value;
        if (parentId == '') {
          return
        }
        var getCity = new RemoteCall();
        getCity.init({
          router: "/base/area/idname/get",
          session: this.session,
          data: {
            parentAreaId: parentId
          }
        });
        this.cityData = getCity.res.rows;
//        clearTimeout(timer);
//        var timer = setTimeout(function () {
//          _this.setDistrict();
//        }, 10)
      },
      setDistrict(){//县区获取
        var myCity = document.getElementById('city');
        var index = myCity.selectedIndex;
        var _this = this;
        var parentId = myCity.getElementsByTagName('option')[index].value;
        if (parentId == '') {
          return
        }
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
        if (parentId == '') {
          return
        }
        this.inputData.areaId = parentId;
        this.getParentId();//获取父级地区医院id
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
        console.log(file.name)
        this.certificateList[this.imgIndex].certificateName = file.name;
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
        } else if (this.certificateList[index].imgName) {
          var vm = this;
          $.ajax({
            url: "http://www.yxunionpay.com:8087/yxsj-openapi-web/openapi/download/download_base64.do",
            type: 'post',
            data: {
              'download_type': '4',
              'file_name': this.certificateList[index].imgName,
              'id': '0'
            },
            success: function (res) {
              if (res) {
                vm.imgUrls = 'data:image/png;base64,' + JSON.parse(res).data;
                document.getElementsByClassName('showImg')[0].style.display = 'block';
              }
            }
          })
        }
      },
      companyTypeChange(data){
        this.inputData.certificateType = data;
      },
      addMerchant(){//点击进行添加
        var vm = this;
//        console.log(this.inputData.certificateList[this.imgIndex].imgVal);
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
        vm.inputData.leaderName = vm.inputData.leader;
        var addMerchant = new RemoteCall();
        addMerchant.init({
          router: "/company/update",
          session: this.session,
          data: this.inputData,
          callback: function (data) {
                  if (data.ret.errorCode === 0) {
                    vm.$alert('修改成功', '提示', {
                      confirmButtonText: '确定',
                      callback: function () {
                        //                    window.location.reload()
                        vm.$router.push('/healthstation')
                      }
                    });
                  } else {
                    vm.$alert('修改失败', '提示', {
                      confirmButtonText: '确定',
                      callback: function () {
                        //                    window.location.reload()
                      }
                    });
                  }
          }
        })
      },
      checkPictureUrl(){//检测图片接口中的信息是否完整 不完整停止接口调用
        for (var i = 0; i < 4; i++) {
          if (!this.certificateList[i].picSavePath) {
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
                    alert("营业执照上传失败")
                    break;
                  case 1:
                    alert("从业资格证上传")
                    break;
                  case 2:
                    alert("银行卡资料上传")
                    break;
                  case 3:
                    alert("法人身份证照片上传")
                    break;
                  default:
                    alert("照片上传错误请重新上传")
                    break

                }
              }
            }

          }
        })
        if (addcompany) {
          addcompany();//判断所有图片上传成功后回调
        }
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
        this.inputData.certificateList[index] = json;
//        this.inputData.certificateList[index].picSavePath = JSON.parse(data).data[0].saved_file;
//

//        console.log(JSON.parse(data).data[0].saved_file)
      },
      getParentId(){//获取父级卫生院数据 插入到节点中
        var getParent = new RemoteCall();
        getParent.init({
          router: "/company/get",
          session: this.session,
          data: {
            aredId: parseInt(this.inputData.areaId)
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
        if (index >= 0) {
          console.log(this.$refs.options[index].value)
          this.inputData.parentCompanyId = this.$refs.options[index].value;
        }
      },
      getcertifiateName(){//获取证书名称
        var vm = this;
        var getPic = new RemoteCall();
        getPic.init({
          router: '/company/certificate/get',
          session: this.session,
          data: {
            companyName: this.saveHealthData.name,
            pageInfo: {
              pageSize: 100,
              pageNum: 1
            }
          },
          callback: function (data) {

            if (data.ret.errorCode === 0) {
              data.rows.forEach(function (item, i) {
                item.companyName = null;
                item.companyNo = null;
                item.picSavePath = item.certificatePic;
                switch (item.certificateTypeName) {
                  case '营业执照':
                    vm.inputData.certificateList[0] = item;
                    vm.certificateList[0].certificateName = item.certificatePic.split('-')[1];
                    vm.certificateList[0].imgName = item.certificatePic;
                    break;
                  case '从业资格证':
                    vm.inputData.certificateList[1] = item;
                    vm.certificateList[1].certificateName = item.certificatePic.split('-')[1];
                    vm.certificateList[1].imgName = item.certificatePic;
                    break;
                  case '银行卡资料':
                    vm.inputData.certificateList[2] = item;
                    vm.certificateList[2].certificateName = item.certificatePic.split('-')[1];
                    vm.certificateList[2].imgName = item.certificatePic;
                    break;
                  case '法人身份证':
                    vm.inputData.certificateList[3] = item;
                    vm.certificateList[3].certificateName = item.certificatePic.split('-')[1];
                    vm.certificateList[3].imgName = item.certificatePic;
                    break;
                }
              })
            }
          }
        })
      }
    },
    mounted: function () {
      console.log(this.saveHealthData);
      if (!this.saveHealthData) {
        this.$router.push('/healthstation')
      }
      for (var i in this.saveHealthData) {
        this.inputData[i] = this.saveHealthData[i];
      }
      if (this.inputData.certificateType == '营业执照') {
        this.inputData.certificateType = 1;
        this.certificateTypeName = 1;
      } else if (this.inputData.certificateType == '营业执照') {
        this.inputData.certificateType = 2;
        this.certificateTypeName = 2;
      }
      this.getArea();
      this.getcertifiateName()
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
      cursor: pointer;
    }
  }

  input[type="text"]:disabled {
    background-color: transparent;
  }
  .addHealth {
    display: block;
    line-height: 36px;
    text-indent: 3em;
    color: royalblue;
  }

  .checkImg {
    line-height: 36px;
    cursor: pointer;
  }

  .el-col-3 {
    width: 12%;
  }

  .el-col-5 {
    width: 21.333%;
  }
  /*媒体查询做兼容*/
  @media screen and (max-width: 1790px) {
    label {
      font-size: 15px;
      min-width: 5em;
    }
  }

  @media screen and (max-width: 1700px) {
    .el-col-3 {
      width: 12%;
    }

    .el-col-5 {
      width: 21.333%;
    }
  }

  @media screen and (max-width: 1366px) {
    .el-col-3 {
      width: 14%;
    }

    .el-col-5 {
      width: 19.333%;
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

  .el-select {
    width: 100%;
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

  @media screen and (max-width: 1500px) {
    .distpicker select {
      width: 31% !important;
    }
  }

</style>
