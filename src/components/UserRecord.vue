<template>
  <div id="UserRecord">
    <el-table :data="tableData" border width="100%" align="center">
      <el-table-column prop="withUser" label="序号"></el-table-column>
      <el-table-column prop="Name" label="消费订单"></el-table-column>
      <el-table-column prop="phone" label="消费类型"></el-table-column>
      <el-table-column prop="userId" label="使用卡类型"></el-table-column>
      <el-table-column prop="socialNum" label="使用卡账号"></el-table-column>
      <el-table-column prop="ruralAccout" label="消费商户"></el-table-column>
      <el-table-column prop="ruralAccout" label="订单金额"></el-table-column>
      <el-table-column prop="ruralAccout" label="支付日期"></el-table-column>
    </el-table>
  </div>
</template>
<script>
  export default{
    data(){
      return {
        tableData:[
          {
            withUser:'父亲'
          },
          {
            withUser:'母亲'
          },
          {
            withUser:'妻子'
          },
        ]
      }
    },
    methods:{

    },
    mounted:function(){


    }

  }
</script>
<style lang="scss">
  #UserRecord{
    margin-top: 20px;
    .el-table{
      th,td{
        .cell{
          text-align:center;
        }
      }
    }
    td:last-child{
      .cell{
        display:none;
      }
    }
  }
</style>
