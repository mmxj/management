<template>
  <div id="PayData">
    <div>
      <el-row :gutter="20">
        <el-col :span="2">
          <label for="">收单机构</label>
        </el-col>
        <el-col :span="6">
          <!--<input type="text" v-model="inputData.acquirerId">-->
          <el-select v-model="companyTypeName" filterable remote reserve-keyword :remote-method="remoteMethod"
                     placeholder="收单机构名称" @change="companyTypeChange">
            <el-option v-for="item in companyType" :key="item.value" :label="item.label"
                       :value="item.value"></el-option>
          </el-select>
        </el-col>
        <el-col :span="2">
          <label for="">商户类型</label>
        </el-col>
        <el-col :span="6">
          <!--<input type="text" v-model="inputData.businessType">-->
          <el-select v-model="companyTypes" @change="companyTypeChanges">
            <el-option v-for="item in companyTypeData" :value="item.value" :label="item.label"
                       :key="item.value"></el-option>
          </el-select>
        </el-col>
        <el-col :span="2">
          <label for="">交易金额</label>
        </el-col>
        <el-col :span="3">
          <input type="text" placeholder="起始金额" v-model="lowAmount">
        </el-col>
        <el-col :span="3">
          <input type="text" placeholder="结束金额" v-model="highAmount">
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="2">
          <label for="">清算日期</label>
        </el-col>
        <el-col :span="6" class="el-timer">
          <el-row :gutter="20">
            <el-col :span="12">
              <el-date-picker v-model="value1" align="right" type="date" placeholder="选择日期"
                              :picker-options="pickerOptions1" @change="clearDateStart"></el-date-picker>
              <!--没有清算日期的接口暂时使用了交易日期的接口-->
            </el-col>
            <el-col :span="12">
              <el-date-picker v-model="value2" align="right" type="date" placeholder="选择日期"
                              :picker-options="pickerOptions1" @change="clearDateEnd"></el-date-picker>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="2">
          <label for="">商户名称</label>
        </el-col>
        <el-col :span="6">
          <input type="text" v-model="inputData.companyName">
        </el-col>
        <el-col :span="2">
          <label for="">商户编号</label>
        </el-col>
        <el-col :span="6">
          <input type="text" v-model="inputData.merchantNo">
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="2">
          <label for="">交易日期</label>
        </el-col>
        <el-col :span="6" class="el-timer">
          <el-row :gutter="20">
            <el-col :span="12">
              <el-date-picker v-model="value3" align="right" type="date" placeholder="选择日期"
                              :picker-options="pickerOptions1" @change="clearDateStart"></el-date-picker>
            </el-col>
            <el-col :span="12">
              <el-date-picker v-model="value4" align="right" type="date" placeholder="选择日期"
                              :picker-options="pickerOptions1" @change="clearDateEnd"></el-date-picker>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="2">
          <label for="">交易状态</label>
        </el-col>
        <el-col :span="6">
          <!--<input type="text" v-model="inputData.status">-->
          <!--<select name="" id="">-->
          <el-select v-model="payData" filterable placeholder="请选择支付状态" @change="payDataChange">
            <el-option v-for="item in payDatas" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
          <!--<option value=null>请选择支付状态</option>-->
          <!--<option value="1">待支付</option>-->
          <!--<option value="2">已支付</option>-->
          <!--<option value="3">撤销</option>-->
          <!--<option value="4">冲正</option>-->
          <!--<option value="5">退货</option>-->
          <!--<option value="6">支付失败</option>-->
          <!--</select>-->
        </el-col>
        <el-col :span="2">
          <label for="">社保支付类型</label>
        </el-col>
        <el-col :span="6">
          <el-select v-model="statusData" filterable placeholder="请选择支付状态" @change="statusChange">
            <el-option v-for="item in statusDatas" :key="item.value" :label="item.label"
                       :value="item.value"></el-option>
          </el-select>
          <!--<select name="" id="">-->
          <!--<option value=null> 请选择统筹报销类型</option>-->
          <!--<option value="1">社保局统筹报销</option>-->
          <!--<option value="2">微信统筹报销</option>-->
          <!--<option value="3">支付宝统筹报销</option>-->
          <!--</select>-->
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="2">
          <label for="">卡号</label>
        </el-col>
        <el-col :span="6">
          <input type="text" v-model="inputData.account">
        </el-col>
        <el-col :span="2">
          <label for="">终端号</label>
        </el-col>
        <el-col :span="6">
          <input type="text" v-model="inputData.terminalNo">
        </el-col>
        <el-col :offset="2" :span="2">
          <el-button @click="getPayData">搜索</el-button>
        </el-col>
        <!--<el-col :span="4">-->
        <!--<a href="javascript:">下载所有数据</a>-->
        <!--</el-col>-->
      </el-row>
    </div>
    <div>
      <el-table :data="tableData" border>
        <el-table-column prop="index" label="序号" width="70"></el-table-column>
        <el-table-column prop="settlmentData" label="清算日期" width="180"></el-table-column>
        <el-table-column prop="orderNo" label="订单号" width="250"></el-table-column>
        <el-table-column prop="dealingJournalNo" label="交易流水号" width="220"></el-table-column>
        <el-table-column prop="payTime" label="交易日期" width="160"></el-table-column>
        <el-table-column prop="sfsCreate" label="提交支付时间" width="160"></el-table-column>
        <el-table-column prop="acquirerId" label="收单机构" width="180"></el-table-column>
        <el-table-column prop="account" label="卡号" width="220"></el-table-column>
        <el-table-column prop="amount" label="交易金额" width="180"></el-table-column>
        <el-table-column prop="companyType" label="商户类型" width="180"></el-table-column>
        <el-table-column prop="payChannelDealNo" label="支付通道协议" width="220"></el-table-column>
        <el-table-column prop="terminalNo" label="终端号" width="180"></el-table-column>
        <el-table-column prop="departmentName" label="门店名称" width="180"></el-table-column>
        <el-table-column prop="merchantNo" label="商户编号" width="180"></el-table-column>
        <el-table-column prop="companyName" label="商户名称" width="180"></el-table-column>
        <el-table-column prop="status" label="交易状态" width="180"></el-table-column>
        <el-table-column prop="cardType" label="支付卡类型" width="180"></el-table-column>
        <el-table-column prop="extraParams" label="备注" width="180"></el-table-column>
      </el-table>
    </div>
    <el-pagination
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-size="20"
      layout="total,prev,pager,next,jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>
<script type="text/javascript">
  export default{
    data() {
      return {
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
        value3: '',
        value4: '',
        tableData: [],
        session: sessionStorage.getItem('session'),
        inputData: {
          beginCreate: null,
          endCreate: null,
          pageInfo: {
            pageSize: 20,
            pageNum: 1
          }
        },
        payData: null,
        payDatas: [{
          value: null,
          label: '请选择支付状态'
        }, {
          value: 1,
          label: '待支付'
        }, {
          value: 2,
          label: '已支付'
        }, {
          value: 3,
          label: '撤销'
        }, {
          value: 4,
          label: '冲正'
        }, {
          value: 5,
          label: '退货'
        }, {
          value: 6,
          label: '支付失败'
        }],
        statusData: null,
        statusDatas: [{
          value: null,
          label: '请选择统筹报销类型'
        }, {
          value: 1,
          label: '社保局统筹报销'
        }, {
          value: 2,
          label: '微信统筹报销'
        }, {
          value: 3,
          label: '支付宝统筹报销'
        }],
        companyTypeName: null,
        companyType: [],
        currentPage: 1,
        total: 0,
        companyTypeData: [
          {
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
          }
        ],
        companyTypes: null,
        highAmount: null,
        lowAmount: null
      }
    },
    methods: {
      getPayData(){
        var vm = this;
//        if (this.inputData.beginCreate == null) {
//          vm.$alert('请选择交易日期开始时间', '提示', {
//            confirmButtonText: '确定',
//          });
//          return false;
//        } else if (vm.inputData.endCreate == null) {
//          vm.$alert('请选择交易日期结算时间', '提示', {
//            confirmButtonText: '确定',
//          });
//          return false;
//        }
        if (this.highAmount) {
          this.inputData.highAmount = this.highAmount * 100
        } else {
          this.inputData.highAmount = null;
        }
        if (this.lowAmount) {
          this.inputData.lowAmount = this.lowAmount * 100
        } else {
          this.inputData.lowAmount = null
        }
        var getPayData = new RemoteCall();
        getPayData.init({
          router: '/payment/paymentdeal/get',
          session: this.session,
          data: this.inputData,
          callback: function (data) {
            if (data.ret.errorCode === 0) {
              vm.tableData = data.rows;
              if (data.rows.length > 0) {
                if (data.pageInfo.total) {
                  vm.total = data.pageInfo.total;
                }
                for (let i = 0; i < vm.tableData.length; i++) {
                  vm.tableData[i].index = (i + 1) + (vm.inputData.pageInfo.pageSize * (vm.inputData.pageInfo.pageNum - 1));
                  vm.tableData[i].amount = vm.tableData[i].amount / 100;
                  console.log(vm.tableData[i].payTime)
                  if (vm.tableData[i].payTime) {
                    vm.tableData[i].payTime = vm.tableData[i].payTime.split(" ")[0];
                  }
                  if (vm.tableData[i].sfsCreate) {
                    vm.tableData[i].sfsCreate = vm.tableData[i].sfsCreate.split(" ")[0];
                  }
                  if (vm.tableData[i].status == 1) {
                    vm.tableData[i].status = '待支付'
                  }
                  if (vm.tableData[i].status == 2) {
                    vm.tableData[i].status = '已支付'
                  }
                  if (vm.tableData[i].status == 3) {
                    vm.tableData[i].status = '撤销'
                  }
                  if (vm.tableData[i].status == 4) {
                    vm.tableData[i].status = '冲正'
                  }
                  if (vm.tableData[i].status == 5) {
                    vm.tableData[i].status = '退货'
                  }
                  if (vm.tableData[i].status == 6) {
                    vm.tableData[i].status = '支付失败'
                  }
                  if (vm.tableData[i].cardType == 1) {
                    vm.tableData[i].cardType = '社保卡'
                  }
                  if (vm.tableData[i].cardType == 2) {
                    vm.tableData[i].cardType = '诊疗卡'
                  }
                  if (vm.tableData[i].cardType == 3) {
                    vm.tableData[i].cardType = '储蓄卡'
                  }
                  if (vm.tableData[i].cardType == 4) {
                    vm.tableData[i].cardType = '信用卡'
                  }
                  switch (vm.tableData[i].companyType) {
                    case 1:
                      vm.tableData[i].companyType = '收单机构'
                      break;
                    case 2:
                      vm.tableData[i].companyType = '支付通道机构'
                      break;
                    case 3:
                      vm.tableData[i].companyType = '社保局'
                      break;
                    case 4:
                      vm.tableData[i].companyType = '医院(卫生站)'
                      break;
                    case 5:
                      vm.tableData[i].companyType = '药店'
                      break;
                    case 6:
                      vm.tableData[i].companyType = '平台'
                      break;
                    case 7:
                      vm.tableData[i].companyType = '卫计局'
                      break;
                  }
                }
              } else {
                vm.total = 0;
              }
            } else {
//                alert(data.ret.errorMessage);
              vm.$alert(data.ret.errorMessage, '提示', {
                confirmButtonText: '确定',
              });
            }
          },
          errorCallback: function (data) {
            if (data) {
              vm.$router.push('/login')
            }
          }
        })
      },
      clearDateStart(data){
        this.inputData.beginCreate = data;
      },
      clearDateEnd(data){
        this.inputData.endCreate = data;
      },
      payDataChange(data){
        this.inputData.status = data;
      },
      statusChange(data){
        this.inputData.planPayType = data;
      },
      companyTypeChange(data){
        this.inputData.acquirerId = data;
      },
      companyTypeChanges(data){//商户类型
        this.inputData.companyType = data
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
            vm.companyType = [];
            for (var i = 0; i < data.rows.length; i++) {
              var options = {};
              options.value = data.rows[i].id;
              options.label = data.rows[i].name;
              vm.$set(vm.companyType, i, options)
            }
          },
          errorCallback: function (data) {
            if (data) {
              vm.$router.push('/login')
            }
          }
        })
      },
      remoteMethod(data){//远程搜索公司名
        if (data == '') {
          this.companyTypeName = null;
        }
        console.log(this.companyTypeName)
        if (data !== '') {
          this.companyInit(data);
        } else {
          this.companyInit(null)
        }
      },
      handleCurrentChange(data){
        this.inputData.pageInfo.pageNum = data;
        this.getPayData();
      }
    },
    mounted: function () {
      this.companyInit(null);
    }
  }
</script>
<style lang="scss" scoped>
  #PayData {
    margin: 15px;
    padding: 20px;
    background: #fff;
  }

  .el-select {
    width: 100%;
  }
  .el-col {
    margin-bottom: 20px;
    label {
      display: block;
      width: 100%;
      text-align: right;
      line-height: 30px;
      min-width: 6em;
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
  .el-table th {
    text-align: center !important;
  }

  .el-table td {
    text-align: center !important;
  }
</style>

