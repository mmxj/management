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
                <el-col :span="4">
                  <el-button>今天</el-button>
                </el-col>
                <el-col :span="4">
                  <el-button>近三天</el-button>
                </el-col>
                <el-col :span="4">
                  <el-button>近一周</el-button>
                </el-col>
                <el-col :span="4">
                  <el-button>本月</el-button>
                </el-col>
                <el-col :span="4">
                  <el-button>本季度</el-button>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="12">
              <el-row :gutter="20">
                <el-col :span="6" class="el-timer">
                  <el-date-picker v-model="value1" align="right" type="date" placeholder="选择日期"
                                  :picker-options="pickerOptions1"></el-date-picker>
                </el-col>
                <el-col :span="6" class="el-timer">
                  <el-date-picker v-model="value2" align="right" type="date" placeholder="选择日期"
                                  :picker-options="pickerOptions1"></el-date-picker>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-row>
                <el-col :span="4">
                  <el-button>行业客户报表</el-button>
                </el-col>
                <el-col :span="4">
                  <el-button>商户报表</el-button>
                </el-col>
                <el-col :span="4">
                  <el-button>地区报表</el-button>
                </el-col>
                <el-col :span="4">
                  <el-button>支付类型报表</el-button>
                </el-col>
                <el-col :span="4">
                  <el-button>业务类型报表</el-button>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="3">
              <el-button class="elButton">确定</el-button>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-table :data="tableData" border>
        <el-table-column porp="index" label="行业客户"></el-table-column>
        <el-table-column label="支付类型"></el-table-column>
        <el-table-column label="支付总金额"></el-table-column>
        <el-table-column label="交易笔数"></el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
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
        tableData: [
          {
            index: 1
          }
        ]
      }
    }
  }
</script>
<style lang="scss" scoped>
  #DataReport {
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


