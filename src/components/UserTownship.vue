<template>
  <div id="UserTownship">
    <el-table :data="tableData" border width="100%" align="center">
      <el-table-column prop="withUser" label="登录账号"></el-table-column>
      <el-table-column prop="Name" label="注册手机号码"></el-table-column>
      <el-table-column prop="phone" label="注册时间"></el-table-column>
      <el-table-column prop="userId" label="注册商户"></el-table-column>
      <el-table-column prop="socialNum" label="最近一次消费时间"></el-table-column>
      <el-table-column prop="ruralAccout" label="重置密码"></el-table-column>
    </el-table>
  </div>
</template>
<script>
  export default{
    data(){
      return {
        tableData: [
          {
            withUser: '父亲'
          },
          {
            withUser: '母亲'
          },
          {
            withUser: '妻子'
          },
        ]
      }
    },
    methods: {},
    mounted: function () {

    }

  }
</script>
<style lang="scss">
  #UserTownship {
    margin-top: 20px;
    .el-table {
      th, td {
        .cell {
          text-align: center;
        }
      }
    }
    td:last-child {
      .cell {
        display: none;
      }
    }
  }
</style>
