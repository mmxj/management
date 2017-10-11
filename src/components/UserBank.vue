<template>
  <div id="UserBank">
    <el-table :data="tableData" border width="100%" align="center">
      <el-table-column prop="bankNum" label="银行卡号"></el-table-column>
      <el-table-column prop="bankName" label="归属银行"></el-table-column>
      <el-table-column prop="subBank" label="支行信息"></el-table-column>
      <el-table-column prop="phone" label="手机号码"></el-table-column>
      <el-table-column prop="date" label="绑定日期"></el-table-column>
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
                  bankNum:'622687657867983',
                  bankName:'中国建设银行',
                  subBank:'东莞东城支付',
                  phone:'13928888822',
                  date:'2018.08.21'
                },
                {
                  bankNum:'622687657867983',
                  bankName:'中国建设银行',
                  subBank:'东莞东城支付',
                  phone:'13928888822',
                  date:'2018.08.21'
                }
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
<style>

</style>
