<template>
  <div id="UserRecord">
    <el-table :data="tableData" border width="100%" align="center">
      <el-table-column prop="index" label="序号"></el-table-column>
      <el-table-column prop="no" label="消费订单号" width="250"></el-table-column>
      <el-table-column prop="businessType" label="消费类型"></el-table-column>
      <!--<el-table-column label="使用卡类型"></el-table-column>-->
      <!--&lt;!&ndash;卡类型和卡账号无法返回 一个订单对应了几个流水账号&ndash;&gt;-->
      <!--<el-table-column label="使用卡账号"></el-table-column>-->
      <el-table-column prop="companyId" label="消费商户"></el-table-column>
      <el-table-column prop="amount" label="订单金额"></el-table-column>
      <el-table-column prop="clinicDate" label="支付日期"></el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-size="pageSize"
      layout="total, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  export default{
    data(){
      return {
        currentPage: 1,
        pageSize: 20,
        total: 1,
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
          var setData = {
            pageInfo: {
              pageSize: 20,
            },
            userId: vm.userData.id
          }
          setData.pageInfo.pageNum = this.currentPage;
          getRecord.init({
            router: '/order/prescription/get',
            session: vm.session,
            data: setData,
            callback: function (data) {
              if (data.pageInfo.total) {
                vm.total = data.pageInfo.total;
              }
              if (data.rows) {
                vm.tableData = data.rows;
                console.log(data.rows);
                for (var i = 0; i < vm.tableData.length; i++) {
//                  if (vm.tableData[i].insurancePayType) {
//                    switch (vm.tableData[i].insurancePayType) {
//                      case 1:
//                        vm.tableData[i].insurancePayType = '社保局统筹报销';
//                        break;
//                      case 2:
//                        vm.tableData[i].insurancePayType = '微信统筹报销';
//                        break;
//                      case 3:
//                        vm.tableData[i].insurancePayType = '支付宝统筹报销';
//                        break;
//                      default:
//                        vm.tableData[i].insurancePayType = null;
//                        break;
//                    }
//                  } else {
//                    vm.tableData[i].insurancePayType = null;
//                  }
                  if (vm.tableData[i].businessType) {
                    switch (vm.tableData[i].businessType) {
                      case 1:
                        vm.tableData[i].businessType = '缴费';
                        break;
                      case 2:
                        vm.tableData[i].businessType = '挂号';
                        break;
                      case 3:
                        vm.tableData[i].businessType = '门诊';
                        break;
                      default:
                        vm.tableData[i].businessType = '其他';
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

      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.getUser();
      },
    },
    mounted: function () {
      this.getUser();
    }

  }
</script>
<style lang="scss">
  #UserRecord {
    position: relative;
    min-height: 850px;
    padding-bottom: 40px;
    margin-top: 20px;
    .el-table {
      th, td {
        .cell {
          text-align: center;
        }
      }
    }
    .el-pagination {
      position: absolute;
      bottom: -10px;
      left: 50%;
      transform: translate(-50%, 0);
    }
  }
</style>
