<template>
  <div id="PayData">
    <div>
    <el-row :gutter="20">
      <el-col :span="2">
        <label for="">受理机构</label>
      </el-col>
      <el-col :span="6">
        <input type="text">
      </el-col>
      <el-col :span="2">
        <label for="">转发机构</label>
      </el-col>
      <el-col :span="6">
        <input type="text">
      </el-col>
      <el-col :span="2">
        <label for="">发卡机构</label>
      </el-col>
      <el-col :span="6">
        <input type="text">
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="2">
        <label for="">收单机构</label>
      </el-col>
      <el-col :span="6">
        <input type="text">
      </el-col>
      <el-col :span="2">
        <label for="">商户类型</label>
      </el-col>
      <el-col :span="6">
        <input type="text">
      </el-col>
      <el-col :span="2">
        <label for="">金额交易</label>
      </el-col>
      <el-col :span="2">
        <input type="text">
      </el-col>
      <el-col :span="2">
        <input type="text">
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="2">
        <label for="">清算日期</label>
      </el-col>
      <el-col :span="6" class="el-timer">
        <el-row :gutter="20">
          <el-col :span="12"><el-date-picker v-model="value1" align="right" type="date" placeholder="选择日期" :picker-options="pickerOptions1"></el-date-picker></el-col>
          <el-col :span="12"> <el-date-picker v-model="value2" align="right" type="date" placeholder="选择日期" :picker-options="pickerOptions1"></el-date-picker></el-col>
        </el-row>
      </el-col>
      <el-col :span="2">
        <label for="">商户名称</label>
      </el-col>
      <el-col :span="6">
        <input type="text">
      </el-col>
      <el-col :span="2">
        <label for="">商户编号</label>
      </el-col>
      <el-col :span="6">
        <input type="text">
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="2">
        <label for="">交易日期</label>
      </el-col>
      <el-col :span="6" class="el-timer">
        <el-row :gutter="20">
          <el-col :span="12"><el-date-picker v-model="value1" align="right" type="date" placeholder="选择日期" :picker-options="pickerOptions1"></el-date-picker></el-col>
          <el-col :span="12"> <el-date-picker v-model="value2" align="right" type="date" placeholder="选择日期" :picker-options="pickerOptions1"></el-date-picker></el-col>
        </el-row>
      </el-col>
      <el-col :span="2">
        <label for="">交易状态</label>
      </el-col>
      <el-col :span="6">
        <input type="text">
      </el-col>
      <el-col :span="2">
        <label for="">社保卡标志</label>
      </el-col>
      <el-col :span="6">
        <input type="text">
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="2">
        <label for="">卡号</label>
      </el-col>
      <el-col :span="6">
        <input type="text">
      </el-col>
      <el-col :span="2">
        <label for="">终端号</label>
      </el-col>
      <el-col :span="6">
        <input type="text">
      </el-col>
      <el-col :offset="2" :span="2">
        <el-button>搜索</el-button>
      </el-col>
      <el-col :span="4">
        <a href="javascript:">下载所有数据</a>
      </el-col>
    </el-row>
    </div>
    <div>
      <el-table :data="tableData" border>
        <el-table-column prop="index" label="序号" width="120"></el-table-column>
        <el-table-column label="清算日期" width="180"></el-table-column>
        <el-table-column label="交易代码" width="180"></el-table-column>
        <el-table-column label="跟踪号" width="180"></el-table-column>
        <el-table-column label="交易日期" width="180"></el-table-column>
        <el-table-column label="受理机构" width="180"></el-table-column>
        <el-table-column label="转发机构" width="180"></el-table-column>
        <el-table-column label="发卡机构" width="180"></el-table-column>
        <el-table-column label="收单机构" width="180"></el-table-column>
        <el-table-column label="卡号" width="180"></el-table-column>
        <el-table-column label="交易金额" width="180"></el-table-column>
        <el-table-column label="商户类型" width="180"></el-table-column>
        <el-table-column label="参考号" width="180"></el-table-column>
        <el-table-column label="授权码" width="180"></el-table-column>
        <el-table-column label="终端号" width="180"></el-table-column>
        <el-table-column label="商户编号" width="180"></el-table-column>
        <el-table-column label="商户名称" width="180"></el-table-column>
        <el-table-column label="商户借记手续费" width="180"></el-table-column>
        <el-table-column label="商户贷记手续费" width="180"></el-table-column>
        <el-table-column label="收单借记手续费" width="180"></el-table-column>
        <el-table-column label="收单贷记手续费" width="180"></el-table-column>
        <el-table-column label="交易状态" width="180"></el-table-column>
        <el-table-column label="原始交易跟踪号" width="180"></el-table-column>
        <el-table-column label="原始交易日期" width="180"></el-table-column>
        <el-table-column label="社保卡标志" width="180"></el-table-column>
        <el-table-column label="银联转接清算费" width="180"></el-table-column>
        <el-table-column label="收单服务机构分润" width="180"></el-table-column>
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
        tableData:[
          {
            index:1
          }
        ]
      }
    }
  }
</script>
<style lang="scss" scoped>
  #PayData{
    margin:15px;
    padding:20px;
    background:#fff;
  }
  .el-col{
    margin-bottom:20px;
    label{
      display:block;
      width: 100%;
      text-align: right;
      line-height:30px;
    }
    input{
      width: 100%;
      height:30px;
      border-radius:3px;
      border:1px solid #aaa;
    }
    select{
      width: 100%;
      height:36px;
      border-radius:3px;
      border:1px solid #aaa;
    }
    .el-date-editor.el-input{
      width: 100%;
    }
    .el-timer{
      margin:0;
    }
  }
  @media screen and (max-width: 1760px) {
    label{
      font-size:14px;
      min-width: 5em;
    }
  }
  .el-button{
    width: 100%;
    background:#32BC6F;
    border:0;
    color:#fff;
  }

  a{
    line-height:30px;
  }
</style>
<style type="text/css">
  .el-table th{
    text-align:center !important;
  }
  .el-table td{
    text-align:center !important;
  }
</style>

