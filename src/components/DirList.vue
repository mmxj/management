<template>
  <div id="DirList">
    <el-table :data="tableData" border style="width:100%">
      <el-table-column prop="drugName" label="药品"></el-table-column>
      <el-table-column prop="common" label="通用名称"></el-table-column>
      <el-table-column prop="drugId" label="医药编号"></el-table-column>
      <el-table-column prop="expenseType" label="结算费用类型"></el-table-column>
      <el-table-column prop="specification" label="规格"></el-table-column>
      <el-table-column prop="unitPrice" label="单价"></el-table-column>
      <el-table-column prop="unit" label="单位"></el-table-column>
      <el-table-column prop="socialNumber" label="社保项目编号"></el-table-column>
      <el-table-column prop="validity" label="有效期"></el-table-column>
    </el-table>
  </div>
</template>
<script>
  export default{
      data(){
          return {
              tableData:[{
                drugName:"111"
              }]
          }
      }
  }
</script>
<style lang="scss" scoped>
  #DirList{
    margin:15px;
    padding:20px;
    background:#fff;
  }

</style>
<style type="text/css">
  .el-table th{
    text-align: center !important;
  }
  .el-table td{
    text-align: center !important;
  }
</style>
