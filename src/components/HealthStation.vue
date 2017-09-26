<template>
  <div id="HealthStation">
      <div>
        <el-row>
          <el-col :span="3">
            <label for="">编辑卫生站</label>
          </el-col>
          <el-col :span="3">
            <label for="">删除卫生站</label>
          </el-col>
          <el-col :span="3">
            <label for="">管理卫生站村医</label>
          </el-col>
          <el-col :span="3">
            <label for="">添加村医</label>
          </el-col>
        </el-row>
      </div>
      <div class="el-tables">
        <el-table :data="tableData" border style="width: 100%;" max-height="600" @selection-change="handleSelectionChange" >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="ordinal" label="卫生站名称" width="200">
          </el-table-column>
          <el-table-column prop="merchantId" label="归属卫生院" width="200"></el-table-column>
          <el-table-column prop="merchantType" label="证件类型" width="120">
          </el-table-column>
          <el-table-column prop="merchantName" label="证件号" width="250">
          </el-table-column>
          <el-table-column prop="merchantCardType" label="操作员号" width="120">
          </el-table-column>
          <el-table-column prop="merchantArea" label="卫生站法人" width="120">
          </el-table-column>
          <el-table-column prop="legalPerson" label="卫生站联系人" width="150">
          </el-table-column>
          <el-table-column prop="linkman" label="联系电话" width="200">
          </el-table-column>
          <el-table-column prop="linkmanPhone" label="联系邮箱" width="200">
          </el-table-column>
          <el-table-column prop="linkmanEamil" label="联系邮箱" width="180">
          </el-table-column>
          <el-table-column prop="business" label="联系地址" width="300">
          </el-table-column>
          <el-table-column prop="accountName" label="银行账户号" width="250">
          </el-table-column>
          <el-table-column prop="account" label="银行账号" width="220">
          </el-table-column>
          <el-table-column prop="account" label="添加日期" width="220">
          </el-table-column>
          <el-table-column prop="account" label="卫生站状态" width="220">
          </el-table-column>
        </el-table>
      </div>
  </div>
</template>
<script type="text/javascript">
  export default{
    data(){
      return {
        tableData:[{
          ordinal: "111"
        }]
      }
    },
    methods: {
      //变化的时候出发 将数据放入multipleSelection中
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
  #HealthStation{
    margin:15px;
    padding:20px;
    padding-top:30px;
    background:#fff;
    font-size:14px;
  }
  label{
    width:100%;
    display:block;
    text-align:center;
  }
  .el-tables{
    margin-top:20px;
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
