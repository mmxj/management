<template>
  <div id="Order">
    <div>
      <el-row :gutter="20">
        <el-col :span="2">
          <label for="">订单类型：</label>
        </el-col>
        <el-col :span="21">
          <span v-for="(name,index) in businessType" :class="{active:index==isActive1}" @click="getBusiness(index)">{{name}}</span>
        </el-col>
      </el-row>
      <el-row :gutter="21">
        <el-col :span="2"><label for="">订单发起时间：</label></el-col>
        <el-col :span="20">
          <span v-for="(name,index) in timeData" :class="{active:index==isActive2}"
                @click="getTime(index)">{{name}}</span>
          <span>自定义时间</span>
          <el-date-picker v-model="value1" align="right" type="date" placeholder="选择日期"
                          :picker-options="pickerOptions1" @change="startTimes"></el-date-picker>
          <span class="add">至</span>
          <el-date-picker v-model="value2" align="right" type="date" placeholder="选择日期"
                          :picker-options="pickerOptions1" @change="endTimes"></el-date-picker>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="2">
          <label for="">订单金额：</label>
        </el-col>
        <el-col :span="9">
          <span v-for="(item,index) in money" :class="{active:index==isActive3}"
                @click="setMoney(index)">{{item}}</span>
        </el-col>
        <el-col :span="5">
          <span>自定义范围：</span>
          <input class="money" v-model="beginAmount" type="text">
          <span class="add">至</span>
          <input class="money" v-model="endAmount" type="text">
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :offset="20" :span="4">
          <!--<span>下载数据</span>-->
          <el-button class="search" @click="searchget">搜索</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="table-box">
      <el-table :data="tableData" border style="width:100%" max-height="600" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="no" label="订单编号" width="250">
        </el-table-column>
        <el-table-column prop="businessType" label="订单类型" width="100"></el-table-column>
        <el-table-column prop="clinicDate" label="订单发起时间" width="160">
        </el-table-column>
        <el-table-column prop="clinicDate" label="订单交易时间" width="160">
        </el-table-column>
        <el-table-column prop="companyId" label="交易商户" width="150">
          <!--医院名字没有返回-->
        </el-table-column>
        <el-table-column prop="address" label="商户地址" width="200">
          <!--医院地址没有返回-->
        </el-table-column>
        <el-table-column prop="user.idCardName" label="交易用户" width="160">
        </el-table-column>
        <el-table-column prop="amount" label="交易金额" width="100">
        </el-table-column>
        <el-table-column label="交易产品" width="150">
          <!--。。。 这个得做个弹窗-->
        </el-table-column>
        <el-table-column prop="isXybPay" label="乡银保交易" width="150">
          <!--是否是乡银保支付-->
        </el-table-column>
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
<script type="text/javascript">
  import {DateHelp} from '@/assets/js/dateHelp.js'
  export default{
    data() {
      return {
        isActive1: 0,
        isActive2: 0,
        isActive3: 0,
        session: sessionStorage.getItem('session'),
        businessType: ['全选', '缴费', '挂号', '门诊'],
        timeData: ['全选', '本周', '本月', '本季度', '本年度'],
        money: ['全选', '小于100元', '100元-1000元', '1000元-5000元', '5000元-10000元', '大于10000元'],
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
        pickerOptions2: {
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
        beginAmount: null,
        endAmount: null,
        tableData: [{//表格信息
          ordinal: "111"
        }],
        inputData: {
          businessType: null,
          beginAmount: null,
          endAmount: null,
          beginCreate: null,
          endCreate: null,
          pageInfo: {
            pageSize: 20,
          },
        },
        currentPage: 1,
        pageSize: 20,
        total: 0,
      };
    },
    methods: {
      //获取订单类型
      getBusiness(index){
        this.isActive1 = index;
        if (index) {
          this.inputData.businessType = index;
        } else {
          this.inputData.businessType = null;
        }

      },
      //变化的时候出发 将数据放入multipleSelection中,表格信息
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
        console.log(this.multipleSelection)
      },
      searchget(){
        this.currentPage = 1;
        this.search()
      },
      search(){
        var vm = this;
        if (this.beginAmount) {
          this.inputData.beginAmount = this.beginAmount * 100;
        }
        if (this.endAmount) {
          this.inputData.endAmount = this.endAmount * 100;
        }
        var searchOrder = new RemoteCall();
        vm.inputData.pageInfo.pageNum = vm.currentPage;
        searchOrder.init({
          router: '/order/prescription/get',
          session: vm.session,
          data: vm.inputData,
          callback: function (data) {
            vm.tableData = data.rows;
            if (data.pageInfo.total) {
              vm.total = data.pageInfo.total;
            }
            if (data.rows.length <= 0) {
              vm.total = 0
            }
            for (var i = 0; i < vm.tableData.length; i++) {
              switch (vm.tableData[i].businessType) {
                case 1:
                  vm.tableData[i].businessType = '缴费';
                  break;
                case 2:
                  vm.tableData[i].businessType = '挂号';
                  break;
                case 3:
                  vm.tableData[i].businessType = '门诊';
                  break
                default:
                  vm.tableData[i].businessType = null;
                  break;
              }
              vm.tableData[i].amount = vm.tableData[i].amount / 100;
              if (vm.tableData[i].isXybPay) {
                if (vm.tableData[i].isXybPay === 0) {
                  vm.tableData[i].isXybPay = '否'
                } else if (vm.tableData[i].isXybPay == 1) {
                  vm.tableData[i].isXybPay = '是'
                }
              }
            }
          }
        })
      },
      handleSizeChange(val) { //页面
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.search();
      },
      getTime(index){ //分别获取 当日 一周 一个月 等时间的数据
        this.isActive2 = index;
        var myDate = new DateHelp({
          date: new Date(),//从此日期开始计算
          format: 'yyyy-MM-dd'
        });
        switch (index) {
          case 1:
            this.inputData.beginCreate = myDate.getWeek().split('/')[0];
            this.inputData.endCreate = myDate.getWeek().split('/')[1];
            break;
          case 2:
            this.inputData.beginCreate = myDate.getThisMonth().split('/')[0];
            this.inputData.endCreate = myDate.getThisMonth().split('/')[1];
            break;
          case 3:
            this.inputData.beginCreate = myDate.quarter();
            this.inputData.endCreate = myDate.getToday();
            break;
          case 4:
            this.inputData.beginCreate = myDate.getThisYear().split('/')[0];
            this.inputData.endCreate = myDate.getThisYear().split('/')[1];
            break;
          default:
            this.inputData.beginCreate = null;
            this.inputData.endCreate = null;
            break;
        }
        this.value1 = null;
        this.value2 = null;
      },
      setMoney(index){
        this.isActive3 = index;
        switch (index) {
          case 1:
            this.inputData.beginAmount = 0;
            this.inputData.endAmount = 100 * 100;
            break;
          case 2:
            this.inputData.beginAmount = 100 * 100;
            this.inputData.endAmount = 1000 * 100;
            break;
          case 3:
            this.inputData.beginAmount = 1000 * 100;
            this.inputData.endAmount = 5000 * 100;
            break;
          case 4:
            this.inputData.beginAmount = 5000 * 100;
            this.inputData.endAmount = 10000 * 100;
            break;
          case 5:
            this.inputData.beginAmount = 10000 * 100;
            this.inputData.endAmount = null;
            break;
          default:
            this.inputData.beginAmount = null;
            this.inputData.endAmount = null;
            break;
        }
      },
      startTimes(data){
        if (data != null) {
          this.isActive2 = 0;
          this.startTime = data;
          this.inputData.beginCreate = data;
        }

      },
      endTimes(data){
        if (data != null) {
          this.isActive2 = 0;
          this.endTime = data;
          this.inputData.endCreate = data;
        }
      }
    },
    watch: {
      beginAmount(){
        this.isActive3 = 0;
      },
      endAmount(){
        this.isActive3 = 0;
      }
    }
  }
</script>
<style lang="scss" scoped>
  #Order {
    padding: 20px;
    padding-top: 40px;
    margin: 15px;
    background: #fff;
    .active {
      color: #32BC6F;
    }
    label {
      display: block;
      font-size: 14px;
      font-weight: 500;
      text-align: right;
      min-width: 7em;
      line-height: 36px;
    }
    .el-col {
      min-width: 7em;
      margin-bottom: 20px;
    }
    span {
      font-size: 14px;
      line-height: 36px;
      display: inline-block;
      margin-right: 15px;
      cursor: pointer;
    }
    .money {
      border-radius: 4px;
      border: 1px solid #bfcbd9;
      box-sizing: border-box;
      height: 36px;
      line-height: 36px;
      width: 90px;
    }
    .add {
      margin: 0;
    }
    .search {
      background: #32BC6F;
      color: #fff;
      border: 0;
    }
  }

  .el-col-9 {
    width: 37.5%;
  }

  .el-col-5 {
    width: 21.83333%;
  }
  @media screen and (max-width: 1400px) {
    #Order span {
      margin-right: 10px;
    }
    #Order .money {
      width: 60px;
    }
  }

  @media screen and (max-width: 1990px) {
    .el-col-9 {
      width: 41.5%;
    }
    .el-col-5 {
      width: 26.83333%;
    }
  }

  @media screen and (max-width: 1790px) {
    .el-col-9 {
      width: 46.5%;
    }
    .el-col-5 {
      width: 26.83333%;
    }
  }

  @media screen and (max-width: 1600px) {
    .el-col-9 {
      width: 52.5%;
    }
    .el-col-5 {
      width: 29.83333%;
    }
  }

  @media screen and (max-width: 1450px) {
    .el-col-9 {
      width: 55.5%;
    }
    .el-col-5 {
      width: 29.83333%;
    }
  }

  @media screen and (max-width: 1300px) {
    .el-col-9 {
      width: 59.5%;
    }
    .el-col-5 {
      width: 27.83333%;
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
