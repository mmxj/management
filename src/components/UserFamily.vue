<template>
  <div id="UserBank">
    <el-table :data="tableData" border width="100%" align="center">
      <el-table-column prop="relationType" label="与本人关系"></el-table-column>
      <el-table-column prop="idCardName" label="家人姓名"></el-table-column>
      <el-table-column prop="telephone" label="联系电话"></el-table-column>
      <el-table-column prop="idCardNo" label="身份证号"></el-table-column>
      <el-table-column prop="socialNum" label="社保卡号"></el-table-column>
      <el-table-column prop="ruralAccout" label="乡银保账户"></el-table-column>
      <el-table-column>
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
      getSocial(){
        var vm = this;
//        console.log(this.userData);
        var getSocial = new RemoteCall();
        getSocial.init({
          router: '/user/family/get',
          session: this.session,
          data: {
            userId: this.userData.id,
            pageInfo: {
              pageSize: 10,
              pageNum: 1
            },
          },
          callback: function (data) {
            console.log(data);
            if (data.rows.length) {
              vm.tableData = data.rows
              for (let i = 0; i < vm.tableData.length; i++) {
                switch (vm.tableData[i].relationType) {
                  case 1:
                    vm.tableData[i].relationType = '父亲'
                    break;
                  case 2:
                    vm.tableData[i].relationType = '母亲'
                    break;
                  case 3:
                    vm.tableData[i].relationType = '丈夫'
                    break;
                  case 4:
                    vm.tableData[i].relationType = '妻子'
                    break;
                  case 5:
                    vm.tableData[i].relationType = '儿子'
                    break;
                  case 6:
                    vm.tableData[i].relationType = '女儿'
                    break;
                  case 7:
                    vm.tableData[i].relationType = '爷爷'
                    break;
                  case 8:
                    vm.tableData[i].relationType = '奶奶'
                    break;
                  case 9:
                    vm.tableData[i].relationType = '本人'
                    break;
                  default:

                }

              }
            }
          },
          errorCallback: function (data) {
            this.$router.push('/login')
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
      if (typeof(RemoteCall) == 'undefined') {
        this.$router.push('/user')
      }
      this.getSocial()
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
