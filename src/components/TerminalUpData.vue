<template>
  <div id="Terminal">
    <div>
      <el-row :gutter="20">
        <el-col :span="2">
          <label for="">归属地</label>
          <!--暂无接口接入位置-->
        </el-col>
        <el-col :span="6">
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
        </el-col>
        <el-col :span="2">
          <label for="">安装地址</label>
        </el-col>
        <el-col :span="6" class="area">
          <input type="text" v-model="inputData.address">
        </el-col>
        <el-col :span="2">
          <label for="">商户MCC码</label>
        </el-col>
        <el-col :span="6">
          <input type="text" v-model="inputData.mccNo">
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="2">
          <label for="">商户号</label>
        </el-col>
        <el-col :span="6">
          <input type="text" v-model="inputData.merchantNo">
        </el-col>
        <el-col :span="2">
          <label for="">PSIM卡</label>
        </el-col>
        <el-col :span="6">
          <input type="text" v-model="inputData.pSimNo">
        </el-col>
        <el-col :span="2">
          <label for="">收单机构</label>
        </el-col>
        <el-col :span="6">
          <el-select v-model="companyTypeName" filterable remote reserve-keyword :remote-method="remoteMethod"
                     placeholder="收单机构名称" @change="companyTypeChange">
            <el-option v-for="item in companyType" :key="item.value" :label="item.label"
                       :value="item.value"></el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="2">
          <label for="">维护公司</label>
        </el-col>
        <el-col :span="6">
          <input type="text" v-model="inputData.maintainCompany">
        </el-col>
        <el-col :span="2">
          <label for="">接入IP地址</label>
        </el-col>
        <el-col :span="6">
          <input type="text" v-model="inputData.joinIp">
        </el-col>
        <el-col :span="2">
          <label for="">开通日期</label>
        </el-col>
        <el-col :span="6">
          <el-date-picker v-model="value1" align="right" type="date" placeholder="选择日期"
                          :picker-options="pickerOptions1" @change="setDate"></el-date-picker>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="2">
          <label for="">商户名称</label>
        </el-col>
        <el-col :span="6">
          <!--<input type="text" v-model="merchantName" :placeholder="placeholder" @blur="getText(merchantName)">-->
          <!--<ul class="company" ref="searchBox">-->
          <!--<li v-for="name in companyName" v-on:click="getText(name)">{{name}}</li>-->
          <!--</ul>-->
          <el-select v-model="companyName" filterable remote reserve-keyword :remote-method="remoteMethods"
                     placeholder="商户名称" @change="companyChange">
            <el-option v-for="item in companyNames" :key="item.value" :label="item.label"
                       :value="item.value"></el-option>
          </el-select>
        </el-col>
        <el-col :span="2">
          <label for="">商户主营业务</label>
        </el-col>
        <el-col :span="6">
          <input type="text" v-model="inputData.summary">
        </el-col>
        <el-col :span="2">
          <label for="">终端厂家</label>
        </el-col>
        <el-col :span="6">
          <input type="text" v-model="inputData.terminalCompany">
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="2">
          <label for="">终端型号</label>
          <!--暂无接口接入位置-->
        </el-col>
        <el-col :span="6">
          <input type="text" v-model="inputData.model">
        </el-col>
        <el-col :span="2">
          <label for="">终端号</label>
        </el-col>
        <el-col :span="6">
          <input type="text" v-model="inputData.terminalNo">
        </el-col>
        <el-col :offset="2" :span="2">
          <el-button @click="dataUp">确定修改</el-button>
        </el-col>
        <!--<el-col :span="4">-->
        <!--<a href="javascript:">下载所有数据</a>-->
        <!--</el-col>-->
      </el-row>
    </div>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  export default{
    data() {
      return {
        provinceData: [{}],
        cityData: [{}],
        districtData: [{}],
        provinceData2: [{}],
        cityData2: [{}],
        districtData2: [{}],
        companyName: [],
        merchantName: null,
        merchantName2: null,
        pickerOptions0: {
          disabledDate(time) {
            return time.getTime() < Date.now() - 8.64e7;
          }
        },
        pickerOptions1: {
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },
        value1: '',
        value2: '',
        tableData: [],
        inputData: {
          isAppPay: 1,//是否用于移动端支付
          departmentId: 0, //部门id
          terminalType: 2,//1传统类型 2智能类型 3PDA
        },
        session: sessionStorage.getItem('session'),
        onoff: true,
        placeholder: null,
        placeholder2: null,
        companyTypeName: null,
        companyType: [],
        companyName: null,
        companyNames: [],
        pageSize: 20,
        total: 0,
        currentPage: 1
      }
    },
    computed: mapGetters(['saveTerminal']),
    methods: {
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
      },
      setCity(){
        var _this = this;
        var mySelect = document.getElementById('province');
        if (mySelect.selectedIndex) {
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
        }
      },
      setDistrict(){//县区获取
        var myCity = document.getElementById('city');
        var index = myCity.selectedIndex;
        var _this = this;
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
      setAreaId(){//获取areaid 给inputData赋值
//        var myCity = document.getElementById('district');
//        var index = myCity.selectedIndex;
//        var parentId = myCity.getElementsByTagName('option')[index].value;
//        this.inputData.areaId = parentId;
      },
      //地市联动结束
      //开通日期获取
      setDate(data){
        this.inputData.openDate = data;
      },
      //上传终端信息
      dataUp(){
        var vm = this;
        if (vm.inputData.merchantNo == "") {
          vm.inputData.merchantNo = null;
        }
        if (vm.inputData.merchantNo == null) {
          vm.$alert('商户号不能为空', '提示', {
            confirmButtonText: '确定',
          })
          return
        }
        if (vm.inputData.companyId == "") {
          vm.inputData.companyId = null;
        }
        if (vm.inputData.companyId == null) {
          vm.$alert('商户名不能为空', '提示', {
            confirmButtonText: '确定',
          })
          return
        }
        if (vm.inputData.terminalNo == "") {
          vm.inputData.terminalNo = null;
        }
        if (vm.inputData.terminalNo == null) {
          vm.$alert('终端号不能为空', '提示', {
            confirmButtonText: '确定',
          })
          return
        }
        var sendData = {};
        sendData.isAppPay = vm.inputData.isAppPay;
        sendData.summary = vm.inputData.summary;
        sendData.mccNo = vm.inputData.mccNo;
        sendData.terminalNo = vm.inputData.terminalNo;
        sendData.departmentId = vm.inputData.departmentId;
        sendData.joinIp = vm.inputData.joinIp;
        sendData.pSimNo = vm.inputData.pSimNo;
        sendData.mainKey = vm.inputData.mainKey;
        sendData.merchantName = vm.inputData.merchantName;
        sendData.terminalType = vm.inputData.terminalType;
        sendData.terminalCompany = vm.inputData.terminalCompany;
        sendData.companyId = vm.inputData.companyId;
        sendData.id = vm.inputData.id;
        sendData.acquirerId = vm.inputData.acquirerId;
        sendData.openDate = vm.inputData.openDate;
        sendData.enableFlag = vm.inputData.enableFlag;
        sendData.payChannelId = vm.inputData.payChannelId;
        sendData.merchantNo = vm.inputData.merchantNo;
        sendData.model = vm.inputData.model;
        sendData.maintainCompany = vm.inputData.maintainCompany;
        sendData.address = vm.inputData.address;
        var terminal = new RemoteCall();
        terminal.init({
          router: '/base/terminal/update',
          session: this.session,
          data: sendData,
          callback: function (data) {
            if (data.ret.errorCode === 0) {
              vm.$alert('修改成功', '提示', {
                confirmButtonText: '确定',
                callback: function (data) {
                  vm.$router.push('/terminalmanage')
                }
              })
            } else {
              vm.$alert(data.ret.errorMessage, '提示', {
                confirmButtonText: '确定',
              })
            }
          }
        })
      },
      getPicture(name){//通过公司名字获取id
        var pictureMessage = new RemoteCall();
        pictureMessage.init({
          router: "/company/certificate/get",
          session: this.session,
          data: {
            companyName: name,
            pageInfo: {
              pageSize: 15,
              pageNum: 1
            }
          },
          callback: this.dataCallback
        })
      },
      dataCallback(data){//对数据进行检查 将公司名字提取出来
        this.dataList = data.rows;
        this.companyName = [];
        if (data.rows) {
          if (data.rows.length > 0) {
            addArr:
              for (var i = 0; i < data.rows.length; i++) {
                for (var j = 0; j < this.companyName.length; j++) {
                  if (data.rows[i].companyName == this.companyName[j]) {
                    continue addArr
                  }
                }
                this.companyName.push(data.rows[i].companyName);

              }
          }
        }

      },
      getText(name){//点击获取提示框的文字替换到数据中
        this.placeholder = name;
        this.merchantName = null;
        this.inputData.merchantName = this.placeholder;
        this.saveData = [];
        for (var i = 0; i < this.dataList.length; i++) {
          if (name == this.dataList[i].companyName) {
            this.saveData.push(this.dataList[i])//将匹配的信息保存的到数组中
          }
        }
        this.$refs.searchBox.style.display = 'none';
        this.getCompanyIp(this.inputData.merchantName);
      },
      holder(){
        if (!this.valChange) {
          this.placeholder = '请输入合作行业名称或编号搜索对应商户图片信息'
        }
      },
      holder(){
        if (!this.valChange) {
          this.placeholder = '请输入合作行业名称或编号搜索对应商户图片信息'
        }
      },
      getCompanyIp(name){
        var vm = this;
        var getCompanyIp = new RemoteCall();
        getCompanyIp.init({
          router: "/company/get",
          session: this.session,
          data: {
            companyName: name,
            pageInfo: {
              pageSize: 15,
              pageNum: 1
            }
          },
          callback: function (data) {
            console.log(data);
            for (let i = 0; i < data.rows.length; i++) {
              if (data.rows[i].name == vm.inputData.merchantName) {
                vm.inputData.companyId = data.rows[i].id;
                vm.inputData.merchantNo = data.rows[i].no; //商户编码 没有返回merchantNo 暂时用no代替
                return;
              }
            }
            alert('找不到该商户，请新建')
          },
        })
      },

      remoteMethod(data){//远程搜索公司名收单机构
        if (data == '') {
          this.companyTypeName = null
        }
        if (data !== '') {
          this.companyInit(data)
        } else {
          this.companyInit(null)
        }
      },
      remoteMethods(data){//商户名
        if (data == '') {
          this.companyName = null;
        }
        if (data != '') {
          this.companyNameInit(data)
        } else {
          this.companyNameInit(null)
        }
      },
      companyTypeChange(data){
        if (isNaN(data)) {
          this.inputData.acquirerId = null;
        } else {
          this.inputData.acquirerId = data;
        }

      },
      companyChange(data){
        if (isNaN(data)) {
          this.inputData.companyId = data;
        } else {
          this.companyNameInit(name)
        }

      },
      companyInit(name){//初始化公司列表
        var companyName = new RemoteCall();
        var vm = this;
        companyName.init({
          router: '/company/get',
          session: this.session,
          data: {
            name: name,
            companyType: 1,
            pageInfo: {
              pageSize: 100,
              pageNum: 1
            }
          },
          callback: function (data) {
            if (data.ret.errorCode === 0) {
              if (name == data.rows[0].name) {
                vm.inputData.acquirerId = data.rows[0].id
              }
              vm.companyType = [];
              for (var i = 0; i < data.rows.length; i++) {
                var options = {};
                options.value = data.rows[i].id;
                options.label = data.rows[i].name;
                vm.$set(vm.companyType, i, options)
              }
            }

          }
        })
      },
      companyNameInit(name){//初始化公司列表
        var companyName = new RemoteCall();
        var vm = this;
        companyName.init({
          router: '/company/get',
          session: this.session,
          data: {
            name: name,
            pageInfo: {
              pageSize: 100,
              pageNum: 1
            }
          },
          callback: function (data) {
            if (data.ret.errorCode === 0) {
              if (name == data.rows[0].name) {
                vm.inputData.companyId = data.rows[0].id
              }
              vm.companyNames = [];
              for (var i = 0; i < data.rows.length; i++) {
                var options = {};
                options.value = data.rows[i].id;
                options.label = data.rows[i].name;
                vm.$set(vm.companyNames, i, options)
              }
            }
          }
        })
      },
    },
    mounted: function () {
      this.getArea();
//      this.getTerminal();
//      console.log(this.saveTerminal);
      this.companyInit(null);
      this.companyNameInit(null);
      this.inputData = this.saveTerminal;
      this.companyName = this.inputData.companyName;
      this.companyTypeName = this.inputData.acquirerName;
      this.value1 = this.inputData.sfsCreate.split(' ')[0];
      this.inputData.terminalTypeName = null;
    },
    watch: {
      merchantName: function () {
        this.getPicture(this.merchantName);
        if (this.companyName != '[]') {
          if (this.companyName.length > 0) {
            this.$refs.searchBox.style.display = 'block';
            if (this.onoff) {
              this.$refs.searchBox.style.width = this.$refs.searchBox.clientWidth - 20 + 'px';
              this.onoff = !this.onoff
            }
//              console.log(this.$refs.searchBox.clientWidth)
          } else {
            this.$refs.searchBox.style.display = 'none';
          }
        }
      },
      merchantName2: function () {
        this.getPicture(this.merchantName2);
        if (this.companyName != '[]') {
          if (this.companyName.length > 0) {
            this.$refs.searchBox2.style.display = 'block';
            if (this.onoff) {
              this.$refs.searchBox2.style.width = this.$refs.searchBox2.clientWidth - 20 + 'px';
              this.onoff = !this.onoff
            }
//              console.log(this.$refs.searchBox.clientWidth)
          } else {
            this.$refs.searchBox2.style.display = 'none';
          }
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  #Terminal {
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
      line-height: 30px;
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
    .el-date-editor.el-input {
      width: 100%;
    }
    .el-timer, .area .el-col {
      margin: 0;
    }
  }

  .el-button {
    width: 100%;
    background: #32BC6F;
    border: 0;
    color: #fff;
  }

  .deletebtn {
    background: transparent;
    color: red;
  }

  a {
    line-height: 30px;
  }

  .el-select {
    width: 100%;
  }

  @media screen and (max-width: 1760px) {
    label {
      font-size: 14px;
      min-width: 6em;
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
      width: 15.5%;
    }
    .el-col-offset-2 {
      margin-left: 3.33333%;
    }
  }

  @media screen and (max-width: 1450px) {
    .el-col-2 {
      width: 12%;
    }
    .el-col-6 {
      width: 21.333333%;
    }
    .el-col-3 {
      width: 17.5%;
    }
    .el-col-4 {
      width: 15%;
    }

  }

  .el-col-6 {
    position: relative;
  }

  .company {
    background: #fff;
    border: 1px solid #aaa;
    position: absolute;
    width: 100%;
    top: 38px;
    border-top: 0;
    font-size: 14px;
    color: #666;
    border-radius: 0 0 4px 4px;
    margin-top: -4px;
    padding-top: 4px;
    z-index: 9999;
    display: none;
    li {
      cursor: pointer;
      line-height: 35px;
      text-indent: 1em;
    }
    li:hover {
      background: #bbbbbb;
    }
  }
</style>
<style type="text/css">
  .el-table th {
    text-align: center !important;
  }

  .el-table td {
    text-align: center !important;
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
      width: 30% !important;
    }
  }
</style>
