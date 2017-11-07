<template>
  <div id="UserBank">
    <el-table :data="tableData" border width="100%" align="center">
      <el-table-column prop="userName" label="用户名"></el-table-column>
      <el-table-column prop="relationTypeName" label="用户关系" width="100"></el-table-column>
      <el-table-column prop="account" label="银行卡号"></el-table-column>
      <el-table-column prop="companyName" label="归属银行"></el-table-column>
      <el-table-column prop="branchName" label="支行信息"></el-table-column>
      <el-table-column prop="mobile" label="手机号码"></el-table-column>
      <el-table-column prop="issueDate" label="绑定日期"></el-table-column>
      <el-table-column width="100">
        <template slot-scope="scope">
          X
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  export default{
    data(){
      return {
        session: sessionStorage.getItem('session'),
        tableData: [
          {
            account: '622687657867983',
            companyName: '中国建设银行',
            branchName: '东莞东城支付',
            mobile: '13928888822',
            issueDate: '2018.08.21'
          }
        ]
      }
    },
    computed: mapGetters(['userData']),
    methods: {
      showTd(parent){
        var aTds = parent.getElementsByTagName('td');
        var cell = aTds[aTds.length - 1].getElementsByClassName('cell')[0];
        cell.style.display = 'block';
      },
      hideTd(parent){
        var aTds = parent.getElementsByTagName('td');
        var cell = aTds[aTds.length - 1].getElementsByClassName('cell')[0];
        cell.style.display = 'none';
      },
      getBank(){
        var vm = this;
        var userId = this.userData.id;
        var getBind = new RemoteCall();
        getBind.init({
          router: '/user/card/bind/get',
          session: this.session,
          data: {
            userId: userId,
            pageInfo: {
              pageSize: 100,
              pageNum: 1
            }
          },
          callback: function (req) {
            console.log(req)
//                卡类型1社保卡 2诊疗卡 3储蓄卡  4信用卡
//              for(let i=0;i<req.rows.length;i++){
//              }
            vm.tableData = req.rows;
          }
        })
      }
    },
    mounted: function () {
      var tableRow = document.getElementsByClassName('el-table__row');
      var _this = this;
      for (let i = 0; i < tableRow.length; i++) {
        tableRow[i].onmouseenter = function () {
          _this.showTd(this)
        };
        tableRow[i].onmouseleave = function () {
          _this.hideTd(this)
        };
      }
      if (typeof(RemoteCall) == 'undefined' || !this.userData) {
        this.$router.push('/user')
      }
      this.getBank()
    }

  }
</script>
<style lang="scss">
  #UserBank {
    margin-top: 20px;
    .el-table {
      th, td {
        .cell {
          text-align: center;
        }
      }
    }
  }

</style>
<style>

</style>
