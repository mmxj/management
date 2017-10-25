<template>
  <div id="UserRecord">
    <el-table :data="tableData" border width="100%" align="center">
      <el-table-column prop="index" label="序号"></el-table-column>
      <el-table-column prop="no" label="消费订单号" width="250"></el-table-column>
      <el-table-column prop="insurancePayType" label="消费类型"></el-table-column>
      <el-table-column label="使用卡类型"></el-table-column>
      <el-table-column label="使用卡账号"></el-table-column>
      <el-table-column prop="companyId" label="消费商户"></el-table-column>
      <el-table-column prop="amount" label="订单金额"></el-table-column>
      <el-table-column prop="clinicDate" label="支付日期"></el-table-column>
    </el-table>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  export default{
    data(){
      return {
        tableData: [],
        session: sessionStorage.getItem('session'),
      }
    },
    computed: mapGetters(['userData']),
    methods: {
      getUser(){
        var vm = this;
        if (!this.userData) {
          this.$router.push('/user')
        } else {
          var getRecord = new RemoteCall();
          getRecord.init({
            router: '/order/prescription/get',
            session: vm.session,
            data: {
              pageInfo: {
                pageSize: 20,
                pageNum: 1
              },
              userId: vm.userData.id
            },
            callback: function (data) {
              if (data.rows) {
                vm.tableData = data.rows;
                console.log(data.rows);
                for (var i = 0; i < vm.tableData.length; i++) {
                  if (vm.tableData[i].insurancePayType) {
                    switch (vm.tableData[i].insurancePayType) {
                      case 1:
                        vm.tableData[i].insurancePayType = '社保局统筹报销';
                        break;
                      case 2:
                        vm.tableData[i].insurancePayType = '微信统筹报销';
                        break;
                      case 3:
                        vm.tableData[i].insurancePayType = '支付宝统筹报销';
                        break;
                      default:
                        vm.tableData[i].insurancePayType = null;
                        break;
                    }
                  } else {
                    vm.tableData[i].insurancePayType = null;
                  }
                  vm.tableData[i].amount = vm.tableData[i].amount / 100;
                  vm.tableData[i].index = i + 1;
                }
              }

            }
          })
        }

      }
    },
    mounted: function () {
      this.getUser();
    }

  }
</script>
<style lang="scss">
  #UserRecord {
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
