<template>
  <div id="Order">
    <div>
      <el-row :gutter="20">
        <el-col :span="2">
          <label for="">订单类型：</label>
        </el-col>
        <el-col :span="21">
          <span>缴费</span>
          <span>挂号</span>
          <span>门诊</span>
        </el-col>
      </el-row>
      <el-row :gutter="21">
        <el-col :span="2"><label for="">订单发起时间：</label></el-col>
        <el-col :span="20">
          <span>本周</span>
          <span>本月</span>
          <span>本季度</span>
          <span>本年度</span>
          <span>自定义时间</span>
          <el-date-picker v-model="value1" align="right" type="date" placeholder="选择日期"
                          :picker-options="pickerOptions1"></el-date-picker>
          <span class="add">至</span>
          <el-date-picker v-model="value2" align="right" type="date" placeholder="选择日期"
                          :picker-options="pickerOptions1"></el-date-picker>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="2">
          <label for="">订单金额：</label>
        </el-col>
        <el-col :span="21">
          <span>小于100元</span>
          <span>100元-1000元</span>
          <span>1000元-5000元</span>
          <span>5000元-10000元</span>
          <span>大于10000元</span>
          <span>自定义范围：</span>
          <input class="money" type="text">
          <span class="add">至</span>
          <input class="money" type="text">
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :offset="20" :span="4"><span>下载数据</span>
          <el-button class="search" @click="search">搜索</el-button>
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
        <el-table-column label="商户地址" width="200">
          <!--医院地址没有返回-->
        </el-table-column>
        <el-table-column prop="user.idCardName" label="交易用户" width="160">
        </el-table-column>
        <el-table-column prop="amount" label="交易金额" width="100">
        </el-table-column>
        <el-table-column label="交易产品" width="150">
          <!--。。。 这个得做个弹窗-->
        </el-table-column>
        <el-table-column label="乡银保交易" width="150">
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
  export default{
    data() {
      return {
        session: sessionStorage.getItem('session'),
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

        tableData: [{//表格信息
          ordinal: "111"
        }],
        inputData: {
          pageInfo: {
            pageSize: 20,
          },
        },
        currentPage: 1,
        pageSize: 20,
        total: 1,
      };
    },
    methods: {
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
      search(){
        var vm = this;
        var searchOrder = new RemoteCall();
        vm.inputData.pageInfo.pageNum = vm.currentPage;
        searchOrder.init({
          router: '/order/prescription/get',
          session: vm.session,
          data: vm.inputData,
          callback: function (data) {
            console.log(data);
            vm.tableData = data.rows;
            if (data.pageInfo.total) {
              vm.total = data.pageInfo.total;
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
              }
              vm.tableData[i].amount = vm.tableData[i].amount / 100
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
    }
  }
</script>
<style lang="scss" scoped>
  #Order {
    padding: 20px;
    padding-top: 40px;
    margin: 15px;
    background: #fff;
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

  @media screen and (max-width: 1400px) {
    #Order span {
      margin-right: 10px;
    }
    #Order .money {
      width: 60px;
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
