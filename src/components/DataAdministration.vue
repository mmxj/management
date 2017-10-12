<template>
  <div id="DataAdministration">
    <div>
      <el-row :gutter="20">
        <el-col :span="2">
          <label for="">社保卡类型</label>
        </el-col>
        <el-col :span="6">
          <input type="text">
        </el-col>
        <el-col :span="2">
          <label for="">卡归属地</label>
        </el-col>
        <el-col :span="6">
          <input type="text">
        </el-col>
        <el-col :span="2">
          <label for="">绑卡商户号</label>
        </el-col>
        <el-col :span="6">
          <input type="text">
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="2">
          <label for="">绑卡终端号</label>
        </el-col>
        <el-col :span="6">
          <input type="text">
        </el-col>
        <el-col :span="2">
          <label for="">卡有效期</label>
        </el-col>
        <el-col :span="6" class="el-timer">
          <el-row :gutter="20">
            <el-col :span="12">
              <el-date-picker v-model="value1" align="right" type="date" placeholder="选择日期"
                              :picker-options="pickerOptions1"></el-date-picker>
            </el-col>
            <el-col :span="12">
              <el-date-picker v-model="value2" align="right" type="date" placeholder="选择日期"
                              :picker-options="pickerOptions1"></el-date-picker>
            </el-col>
          </el-row>
        </el-col>
        <el-col :offset="2" :span="2">
          <el-button>搜索</el-button>
        </el-col>
        <el-col :span="3">
          <a href="javascript:">下载所有数据</a>
        </el-col>
      </el-row>
    </div>
    <div>
      <el-table :data="tableData" border>
        <el-table-column prop="index" label="序号" width="120"></el-table-column>
        <el-table-column label="社保卡号" width="180"></el-table-column>
        <el-table-column label="社保卡类型" width="180"></el-table-column>
        <el-table-column label="卡归属地" width="180"></el-table-column>
        <el-table-column label="绑卡商户号" width="180"></el-table-column>
        <el-table-column label="绑卡终端号" width="180"></el-table-column>
        <el-table-column label="身份证号" width="180"></el-table-column>
        <el-table-column label="姓名" width="180"></el-table-column>
        <el-table-column label="卡有效期" width="180"></el-table-column>
        <el-table-column label="卡序列号" width="180"></el-table-column>
        <el-table-column label="绑卡日期" width="180"></el-table-column>
        <el-table-column label="绑卡商户地址" width="180"></el-table-column>
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

