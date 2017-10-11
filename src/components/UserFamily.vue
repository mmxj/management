<template>
  <div id="UserBank">
    <el-table :data="tableData" border width="100%" align="center">
      <el-table-column prop="withUser" label="与本人关系"></el-table-column>
      <el-table-column prop="Name" label="家人姓名"></el-table-column>
      <el-table-column prop="phone" label="联系电话"></el-table-column>
      <el-table-column prop="userId" label="身份证号"></el-table-column>
      <el-table-column prop="socialNum" label="社保卡号"></el-table-column>
      <el-table-column prop="ruralAccout" label="乡银保账户"></el-table-column>
      <el-table-column>
        <template scope="scope">
          X
        </template>
      </el-table-column>
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
      showTd(parent){
        var aTds=parent.getElementsByTagName('td');
        var cell=aTds[aTds.length-1].getElementsByClassName('cell')[0];
        cell.style.display='block';
      },
      hideTd(parent){
        var aTds=parent.getElementsByTagName('td');
        var cell=aTds[aTds.length-1].getElementsByClassName('cell')[0];
        cell.style.display='none';
      }
    },
    mounted:function(){
      var tableRow=document.getElementsByClassName('el-table__row');
      var _this=this;
      for(let i=0; i<tableRow.length;i++){
        tableRow[i].onmouseenter=function(){
          _this.showTd(this)
        };
        tableRow[i].onmouseleave=function(){
          _this.hideTd(this)
        };
      }

    }

  }
</script>
<style lang="scss">
  #UserBank{
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
