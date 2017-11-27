<template>
  <div id="MerchantAdd">
    <div>
      <el-row :gutter="20">
        <el-col :span="2">
          <div class="girid-content"><label>合作内容</label></div>
        </el-col>
        <el-col :span="6">
          <el-select v-model="collabor" @change="collaborChange">
            <el-option v-for="item in collaborData" :value="item.value" :label="item.label"
                       :key="item.value"></el-option>
          </el-select>
          <!--<div class="girid-content girid-ipt"><input type="text" name="" v-model="inputData.name"></div>-->
        </el-col>
        <el-col :span="2">
          <div class="girid-content"><label>客户名称</label></div>
        </el-col>
        <el-col :span="6">
          <div class="girid-content girid-ipt"><input type="text" name="" v-model="inputData.name"></div>
        </el-col>
        <el-col :span="2">
          <div class="girid-content"><label>客户证件类型</label></div>
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
          <div class="girid-content"><label>客户证件号</label></div>
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
          <div class="girid-content"><label>客户法人</label></div>
        </el-col>
        <el-col :span="6">
          <div class="girid-content girid-ipt"><input type="text" name="" v-model="inputData.corporation"></div>
        </el-col>
        <el-col :span="2">
          <div class="girid-content"><label>客户联系人</label></div>
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
          <div class="girid-content"><label>联系邮箱</label></div>
        </el-col>
        <el-col :span="6">
          <div class="girid-content girid-ipt"><input type="text" name="" v-model="inputData.email"></div>
        </el-col>
        <el-col :span="2">
          <div class="girid-content"><label>客户编码</label></div>
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
          <button type="button" class="grid-content upload-btn" @click="addMerchant">修改合作行业</button>
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
  import {mapGetters} from 'vuex'
  export default{
    data(){
      return {
        provinceData: [{'name': '省'}],
        cityData: [{'name': '市'}],
        districtData: [{'name': '区'}],
        collabor: null,
        collaborData: [{
          value: null,
          label: '请选择合作内容'
        }, {//'资源对接', '通道对接', '地区合作', '业务代理', '产品对接', '推广渠道', '其他合作', '社保局', '人民银行', '其他政府单位'
          value: 1,
          label: '资源对接'
        }, {
          value: 2,
          label: '通道对接'
        }, {
          value: 3,
          label: '地区合作'
        }, {
          value: 4,
          label: '业务代理'
        }, {
          value: 5,
          label: '产品对接'
        }, {
          value: 6,
          label: '推广渠道'
        }, {
          value: 7,
          label: '其他合作'
        }, {
          value: 8,
          label: '社保局'
        }, {
          value: 9,
          label: '人民银行'
        }, {
          value: 10,
          label: '其他政府单位'
        }],
        certificateType: null,//商户证书类型
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
//          cooperationType:null,
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
//            {
//              isPersonal: 0,
//              certificateType: 1,
//              certificateTypeName: "营业执照",
//              certificateName: null,
//              picSavePath: null,//保存路径
//              imgUrls: null
//            },
//            {
//              isPersonal: 0,
//              certificateType: 1,
//              certificateTypeName: "从业资格证",
//              certificateName: null,
//              picSavePath: null,
//              imgUrls: null
//            },
//            {
//              isPersonal: 0,
//              certificateType: 1,
//              certificateTypeName: "银行卡资料",
//              certificateName: null,
//              picSavePath: null,
//              imgUrls: null
//            },
//            {
//              isPersonal: 0,
//              certificateType: 1,
//              certificateTypeName: "法人身份证",
//              certificateName: null,
//              picSavePath: null,
//              imgUrls: null
//            }
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
      //获取公司类型id companyTypeId
      setCompanyType(data){
        var vm = this;
        vm.inputData.companyTypeId = data;
      },
      //获取选中的公司证书类型
      certificateTypeChange(data){
        if (isNaN(data)) {
          this.inputData.certificateType = null;
        } else {
          this.inputData.certificateType = data;
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
        if (parentId == "") {
          parentId = null
        }
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
        if (parentId == "") {
          parentId = null
        }
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
        if (parentId == "") {
          parentId = null
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
        var vm = this;
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
//          window.location.reload()
              vm.$alert('修改成功', '提示', {
                confirmButtonText: '确定',
                callback: function () {
//                    window.location.reload()
                  vm.$router.push('/collaborate');
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
//        this.inputData.certificateList[index].picSavePath = JSON.parse(data).data[0].saved_file;
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
      },
      collaborChange(data){
        if (isNaN(data)) {
          this.inputData.cooperationType = null;
        } else {
          this.inputData.cooperationType = data;
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
              console.log(data);
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
      var vm = this;
      this.getArea();
      console.log(this.saveHealthData); //获取编辑页选中的数据
      if (this.saveHealthData == null) {
        this.$router.push('/collaborate');
      } else {
        vm.companyType = this.saveHealthData.companyType;
        vm.inputData.name = this.saveHealthData.name
        vm.inputData.certificateNo = this.saveHealthData.certificateNo;
        vm.inputData.address = this.saveHealthData.address;
        vm.inputData.corporation = this.saveHealthData.corporation;
        vm.inputData.leaderName = this.saveHealthData.leader;
        vm.inputData.telephone = this.saveHealthData.telephone;
        vm.inputData.email = this.saveHealthData.email;
        vm.inputData.summary = this.saveHealthData.summary;
        vm.inputData.no = this.saveHealthData.no;
        vm.inputData.accountName = this.saveHealthData.accountName;
        vm.inputData.account = this.saveHealthData.account;
        vm.inputData.id = this.saveHealthData.id;
        vm.collabor = this.saveHealthData.cooperationTypeName;
        vm.certificateType = this.saveHealthData.certificateType;
        this.getcertifiateName();
      }

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

  input[type="text"]:disabled {
    background-color: transparent;
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
