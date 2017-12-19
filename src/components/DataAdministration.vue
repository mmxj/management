<template>
  <div id="DataAdministration">
    <div>
      <el-row :gutter="20">
        <el-col :span="2">
          <label for="">绑卡类型</label>
        </el-col>
        <el-col :span="6">
          <!--<input type="text" v-model="inputData.cardType">-->
          <el-select v-model="inputData.cardType" multiple>
            <el-option v-for="item in cardData" :value="item.value" :label="item.label" :key="item.value"></el-option>
          </el-select>
        </el-col>
        <el-col :span="2">
          <label for="">卡归属地</label>
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
          <label for="">绑卡商户号</label>
        </el-col>
        <el-col :span="6">
          <input type="text" v-model="inputData.merchantNo">
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="2">
          <label for="">绑卡终端号</label>
        </el-col>
        <el-col :span="6">
          <input type="text" v-model="inputData.terminalNo">
        </el-col>
        <el-col :span="2">
          <label for="">卡有效期</label>
        </el-col>
        <el-col :span="6" class="el-timer">
          <el-row :gutter="20">
            <el-col :span="12">
              <el-date-picker v-model="value1" align="right" type="date" placeholder="选择日期"
                              :picker-options="pickerOptions1" @change="beginTime"></el-date-picker>
            </el-col>
            <el-col :span="12">
              <el-date-picker v-model="value2" align="right" type="date" placeholder="选择日期"
                              :picker-options="pickerOptions1" @change="endTime"></el-date-picker>
            </el-col>
          </el-row>
        </el-col>
        <el-col :offset="2" :span="2">
          <el-button @click="dataUp">搜索</el-button>
        </el-col>
        <el-col :span="3">
          <a href="javascript:">下载所有数据</a>
        </el-col>
      </el-row>
    </div>
    <div>
      <el-table :data="tableData" border>
        <el-table-column prop="index" label="序号" width="120"></el-table-column>
        <el-table-column prop="userName" label="姓名" width="180"></el-table-column>
        <el-table-column prop="account" label="社保卡号" width="220"></el-table-column>
        <el-table-column prop="cardTypeName" label="社保卡类型" width="180"></el-table-column>
        <el-table-column prop="areaName" label="卡归属地" width="180"></el-table-column>
        <el-table-column prop="merchantNo" label="绑卡商户号" width="180"></el-table-column>
        <el-table-column prop="terminalNo" label="绑卡终端号" width="180"></el-table-column>
        <el-table-column prop="idCardNo" label="身份证号" width="220"></el-table-column>
        <el-table-column prop="expiryDate" label="卡有效期" width="180"></el-table-column>
        <el-table-column prop="serialNumber" label="卡序列号" width="180"></el-table-column>
        <el-table-column prop="expiryDate" label="绑卡日期" width="180"></el-table-column>
        <el-table-column prop="issueDate" label="卡发行日期" width="200"></el-table-column>
        <el-table-column prop="address" label="绑卡商户地址" width="180"></el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pageSize"
        layout="total, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>
<script>
  export default{
    data() {
      return {
        provinceData: [{'name': '省'}],
        cityData: [{'name': '市'}],
        districtData: [{'name': '区'}],
        currentPage: 1,
        pageSize: 20,
        total: 0,
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
        session: sessionStorage.getItem('session'),
        inputData: {
          cardType: [],
          pageInfo: {
            pageSize: 20,
          },
        },
        cardData: [
          {
            value: null,
            label: '请选择社保卡类型'
          }, {
            value: 1,
            label: '社保卡'
          }, {
            value: 2,
            label: '诊疗卡'
          }, {
            value: 3,
            label: '储蓄卡'
          }, {
            value: 4,
            label: '信用卡'
          }
        ]
      }
    },
    methods: {
      handleSizeChange(val) { //页面
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.currentPage = val;
      },
      //地区获取
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
////          _this.setCity();
//        }, 0)
        this.$nextTick(function () {
          _this.setCity();
        })
      },
      setCity(){
        var _this = this;
        var mySelect = document.getElementById('province');
        var index = mySelect.selectedIndex;
        var parentId = mySelect.getElementsByTagName('option')[index].value;
        if (parentId != "") {
          var getCity = new RemoteCall();
          getCity.init({
            router: "/base/area/idname/get",
            session: this.session,
            data: {
              parentAreaId: parentId
            },
            callback: function (data) {
              if (data.ret.errorCode === 0) {
                _this.cityData = getCity.res.rows;
                _this.$nextTick(function () {
                  _this.setDistrict();
                })
              }
            }
          });
        }
//        clearTimeout(timer);
//        var timer = setTimeout(function () {
//
//        }, 10)
      },
      setDistrict(){//县区获取
        var myCity = document.getElementById('city');
        var index = myCity.selectedIndex;
        var _this = this;
        var parentId = myCity.getElementsByTagName('option')[index].value;
        if (parentId != "") {
          var getDistrict = new RemoteCall();
          getDistrict.init({
            router: "/base/area/idname/get",
            session: this.session,
            data: {
              parentAreaId: parentId
            },
            callback: function (data) {
              if (data.ret.errorCode === 0) {
                _this.districtData = getDistrict.res.rows;
                _this.$nextTick(function () {
                  _this.setAreaId();
                })
              }
            }
          });
        }
      },
      setAreaId(){//获取areaid 给inputData赋值
        var myCity = document.getElementById('district');
        var index = myCity.selectedIndex;
        var parentId = myCity.getElementsByTagName('option')[index].value;
        if(parentId!="")
        this.inputData.areaId = parentId;
      },
      //地市联动结束
      dataUp(){ //提交查找
        console.log(111)
        if (this.inputData.areaId == "") {
          this.inputData.areaId = null;
        }
        if (this.inputData.cardType.length == 0) {
          this.inputData.cardType = null;
        }
        this.inputData.pageInfo.pageNum = this.currentPage;
        var vm = this;
        var dataUp = new RemoteCall();
        dataUp.init({
          router: '/user/card/bind/get',
          session: this.session,
          data: this.inputData,
          callback: function (data) {
            if (data.ret.errorCode === 0) {
              if (data.pageInfo) {
                vm.total = data.pageInfo.total;
              }
              vm.tableData = data.rows;
              for (var i = 0; i < vm.tableData.length; i++) {
                vm.tableData[i].index = i + 1;
              }
            } else {
              vm.$alert('搜索失败' + data.ret.errorMessage, '提示', {
                confirmButtonText: '确定',
              });
            }

          },
          errorCallback: function (data) {
            vm.$alert('搜索失败' + data.responseText, '提示', {
              confirmButtonText: '确定',
            });
          }
        })
      },
      beginTime(data){
        this.inputData.beginExpiryDate = data;
      },
      endTime(data){
        this.inputData.endExpiryDate = data;
      }
    },
    mounted: function () {
      this.getArea();
    }
  }
</script>
<style lang="scss" scoped>
  #DataAdministration {
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
    .el-timer {
      margin: 0;
    }
  }

  .el-select {
    width: 100%;
  }
  @media screen and (max-width: 1760px) {
    label {
      font-size: 14px;
      min-width: 5em;
    }
  }

  .el-button {
    width: 100%;
    background: #32BC6F;
    border: 0;
    color: #fff;
  }

  a {
    line-height: 30px;
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
  .el-table th {
    text-align: center !important;
  }

  .el-table td {
    text-align: center !important;
  }
</style>

