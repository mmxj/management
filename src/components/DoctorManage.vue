<template>
  <div id="DoctorManage">
    <div>
      <el-row :gutter="20">
        <el-col :span="2"><label for="">编辑村医</label></el-col>
        <el-col :span="2"><label for="">删除村医</label></el-col>
      </el-row>
    </div>
    <div class="tables">
      <el-table :data="tableData" border style="width:100%" max-height="600" @selection-change="handleSelectionChange">
        <el-table-column type="selection" label="选择" width="55"></el-table-column>
        <el-table-column prop="a" label="村医姓名"></el-table-column>
        <el-table-column  label="归属卫生院"></el-table-column>
        <el-table-column label="归属卫生站"></el-table-column>
        <el-table-column label="村医编号"></el-table-column>
        <el-table-column label="身份证号"></el-table-column>
        <el-table-column label="村医邮箱"></el-table-column>
        <el-table-column label="卫生站联系人"></el-table-column>
        <el-table-column label="联系电话"></el-table-column>
        <el-table-column label="银行账户名"></el-table-column>
        <el-table-column label="银行账号"></el-table-column>
        <el-table-column label="添加日期"></el-table-column>
        <el-table-column label="卫生站状态"></el-table-column>
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
<style lang="scss" scoped="">
  #DoctorManage{
    margin:15px;
    padding:15px;
    padding-top:25px;
    background: #fff;
  }
  .tables{
    margin-top:20px;
  }
</style>
