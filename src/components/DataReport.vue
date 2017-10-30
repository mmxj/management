<template>
  <div id="DataReport">
    <div>
      <el-row :gutter="20">
        <el-col :span="2">
          <label for="">交易日期</label>
        </el-col>
        <el-col :span="22">
          <el-row :gutter="20">
            <el-col :span="12" class="el-timer">
              <el-row>
                <el-col :span="4" v-for="(data,index) in btnData" :key="data.id">
                  <el-button :class="{active:index==isActive}" @click="getTodays(index)">{{data.name}}</el-button>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="12">
              <el-row :gutter="20">
                <el-col :span="6" class="el-timer">
                  <el-date-picker v-model="value1" align="right" type="date" placeholder="选择日期"
                                  :picker-options="pickerOptions1" @change="getStartTime"></el-date-picker>
                </el-col>
                <el-col :span="6" class="el-timer">
                  <el-date-picker v-model="value2" align="right" type="date" placeholder="选择日期"
                                  :picker-options="pickerOptions1" @change="getEndTime"></el-date-picker>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-row>
                <el-col :span="4" v-for="(item,index) in reportdata" :key="item.id">
                  <el-button :class="{'active':index==isActive2}" @click="getReportActive(index)">{{item.name}}
                  </el-button>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="3">
              <el-button class="elButton" @click="getReport">确定</el-button>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <router-view></router-view>
      <el-table v-show="show[0]" :data="tableData" border>
        <el-table-column prop="companyName" label="行业客户"></el-table-column>
        <el-table-column prop="personPayType" label="支付类型"></el-table-column>
        <el-table-column prop="payTotalMoney" label="支付总金额"></el-table-column>
        <el-table-column prop="payTotalCount" label="交易笔数"></el-table-column>
      </el-table>
      <el-table v-show="show[1]" :data="tableData" border>
        <el-table-column prop="companyName" label="商户名称"></el-table-column>
        <el-table-column prop="personPayType" label="支付类型"></el-table-column>
        <el-table-column prop="payTotalMoney" label="支付总金额"></el-table-column>
        <el-table-column prop="payTotalCount" label="交易笔数"></el-table-column>
      </el-table>
      <el-table v-show="show[2]" :data="tableData" border>
        <el-table-column prop="userAddress" label="地区名称"></el-table-column>
        <el-table-column prop="personPayType" label="支付类型"></el-table-column>
        <el-table-column prop="payTotalMoney" label="支付总金额"></el-table-column>
        <el-table-column prop="payTotalCount" label="交易笔数"></el-table-column>
        <el-table-column label="交易行业客户数"></el-table-column>
        <!--这两个暂时没有返回-->
        <el-table-column label="交易商户数"></el-table-column>
      </el-table>
      <el-table v-show="show[3]" :data="tableData" border>
        <el-table-column prop="personalPayType" label="支付类型"></el-table-column>
        <el-table-column prop="payTotalMoney" label="支付总金额"></el-table-column>
        <el-table-column prop="payTotalCount" label="交易笔数"></el-table-column>
        <el-table-column label="交易行业客户数"></el-table-column>
        <el-table-column label="交易商户数"></el-table-column>
      </el-table>
      <el-table v-show="show[4]" :data="tableData" border>
        <el-table-column prop="businessType" label="业务类型"></el-table-column>
        <el-table-column prop="payTotalMoney" label="支付总金额"></el-table-column>
        <el-table-column prop="payTotalCount" label="交易笔数"></el-table-column>
        <el-table-column label="交易行业客户数"></el-table-column>
        <el-table-column label="交易商户数"></el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
  import {DateHelp} from '@/assets/js/dateHelp.js'
  export default{
    data() {
      return {
        session: sessionStorage.getItem('session'),
        btnData: [
          {name: '今天', id: 1},
          {name: '近三天', id: 2},
          {name: '近一周', id: 3},
          {name: '本月', id: 4},
          {name: '本季度', id: 5},
        ],
        reportdata: [
          {name: '行业客户报表', id: 1},
          {name: '商户报表', id: 2},
          {name: '地区报表', id: 3},
          {name: '支付类型报表', id: 4},
          {name: '业务类型报表', id: 5},
        ],
        isActive: 0,
        isActive2: 0,
        show: [
          true, false, false, false, false
        ],
        startTime: null,
        endTime: null,
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
        inputData: {},
        routerUrl: null
      }
    },
    methods: {
      getReport(){
        var index;
        for (var i = 0; i < this.show.length; i++) {
          if (this.show[i]) {
            index = i;
            break
          }
        }
        switch (index) {
          case 0:
            this.routerUrl = "/report/order/merchant/list";
            break;
          case 1:
            this.routerUrl = "/report/order/merchant/list";
            break;
          case 2:
            this.routerUrl = "/report/order/area/list";
            break;
          case 3:
            this.routerUrl = "/report/order/paytype/list";
            break;
          case 4:
            this.routerUrl = "/report/order/businesstype/list";
            break;
        }
        var getReport = new RemoteCall();
        var vm = this;
        getReport.init({
          router: this.routerUrl,
          session: this.session,
          data: {
            beginCreate: vm.startTime,
            endCreate: vm.endTime,
            companyType: 4,
            pageInfo: {
              pageSize: 100,
              pageNum: 1
            }
          },
          callback: function (data) {
            if (data.rows.length == 0) {
              vm.openWindows()
            }
            vm.tableData = data.rows;
            vm.tableData.payTotalMoney = vm.tableData.payTotalMoney / 100;
          }
        })
      },
      getStartTime(data){
        this.startTime = data;
        console.log(data);
      },
      getEndTime(data){
        this.endTime = data;
        console.log(data);
      },
      getTodays(index){ //分别获取 当日 一周 一个月 等时间的数据
        this.isActive = index;
        var myDate = new DateHelp({
          date: new Date(),//从此日期开始计算
          format: 'yyyy-MM-dd'
        });
        switch (index) {
          case 0:
            this.startTime = myDate.getToday();
            this.endTime = myDate.getToday();
            break;
          case 1:
            this.startTime = myDate.getThreeDays();
            this.endTime = myDate.getToday();
            break;
          case 2:
            this.startTime = myDate.getWeek().split('/')[0];
            this.endTime = myDate.getWeek().split('/')[1];
            break;
          case 3:
            this.startTime = myDate.getMonth().split('/')[0];
            this.endTime = myDate.getMonth().split('/')[1];
            break;
          case 4:
            this.startTime = myDate.quarter();
            this.endTime = myDate.getToday();
        }

      },
      getReportActive(index){
        this.isActive2 = index;
        for (var i = 0; i < this.show.length; i++) {
          this.show[i] = false;
        }
        this.show[index] = true;
        this.getReport()
      },
      openWindows(){
        this.$alert('查无数据', '温馨提示', {
          confirmButtonText: '确定'
        });
      }
    },
    mounted: function () {
      var myDate = new DateHelp({
        date: new Date(),//从此日期开始计算
        format: 'yyyy-MM-dd'
      });
      this.startTime = myDate.getToday();
      this.endTime = myDate.getToday();
    }
  }
</script>
<style lang="scss" scoped>
  #DataReport {
    margin: 15px;
    padding: 20px;
    background: #fff;
    min-height: 300px;
  }

  .active {
    background: #32BC6F;
    border: 0;
    color: #fff;
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

  @media screen and (max-width: 1560px) {
    label {
      font-size: 14px;
      min-width: 5em;
    }
    .el-button {
      font-size: 14px;
      min-width: 6em;
    }
  }

  .el-button {
    width: 100%;
  }

  .elButton {
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


