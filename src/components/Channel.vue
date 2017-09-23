<template>
  <div id="Channel">
      <el-table :data="tableData3" border style="width:100%">
        <el-table-column prop="channelId" label="通道编号"></el-table-column>
        <el-table-column prop="channelName" label="通道名称"></el-table-column>
        <el-table-column prop="collaborator" label="合作对象"></el-table-column>
        <el-table-column prop="purpose" label="通道用途"></el-table-column>
        <el-table-column prop="expense" label="通道费率"></el-table-column>
        <el-table-column prop="state" label="通道状态"></el-table-column>
        <el-table-column prop="orderType" label="对应订单类型"></el-table-column>
      </el-table>
  </div>
</template>
<script type="text/javascript">
  export default{
      data(){
          return {
              tableData3:[
                {
                    channelId:1
                }
              ]
          }
      }
  }
</script>
<style lang="scss" scoped>
  #Channel{
    margin:15px;
    padding:20px;
    background:#fff;
  }
  .el-table{

  }
</style>
<style type="text/css">
  .el-table td{
    text-align: center !important;
  }
  .el-table th{
    text-align: center !important;
  }
</style>
