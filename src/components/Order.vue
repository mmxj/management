<template>
  <div id="Order">
    <div>
      <el-row :gutter="20">
        <el-col :span="2">
          <label for="">订单类型：</label>
        </el-col>
        <el-col :span="21">
          <span>社保在线支付</span>
          <span>社保刷卡支付</span>
          <span>社保扫码支付</span>
          <span>银行卡在线支付</span>
          <span>银行卡刷卡支付</span>
          <span>社保查询订单</span>
          <span>社保缴费订单</span>
          <span>保险订单</span>
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
          <el-button class="search">搜索</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="table-box">
      <el-table :data="tableData" border style="width:100%" max-height="600" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="orderNum" label="订单编号" width="120">
        </el-table-column>
        <el-table-column prop="orderType" label="订单类型" width="120"></el-table-column>
        <el-table-column prop="orderStartTime" label="订单发起时间" width="180">
        </el-table-column>
        <el-table-column prop="orderTime" label="订单交易时间" width="180">
        </el-table-column>
        <el-table-column prop="orderCollaborate" label="交易行业客户" width="180">
        </el-table-column>
        <el-table-column prop="orderMerchant" label="交易商户" width="300">
        </el-table-column>
        <el-table-column prop="MerchantArea" label="商户地址" width="180">
        </el-table-column>
        <el-table-column prop="orderUser" label="交易用户" width="180">
        </el-table-column>
        <el-table-column prop="orderMoney" label="交易金额" width="180">
        </el-table-column>
        <el-table-column prop="exchange " label="交易产品" width="180">
        </el-table-column>
        <el-table-column prop="exchangeArea" label="交易地点" width="180">
        </el-table-column>
        <el-table-column prop="township" label="乡银保交易" width="180">
        </el-table-column>
      </el-table>
    </div>
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
        tableData: [{//表格信息
          ordinal: "111"
        }]
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
