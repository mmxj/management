<template>
  <div id="User">
    <div>
      <el-row :gutter="20">
        <el-col :span="2">
          <div class="girid-content"><label>姓名</label></div>
        </el-col>
        <el-col :span="6">
          <div class="girid-content girid-ipt"><input type="text" name="" v-model="setData.idCardName"></div>
        </el-col>
        <el-col :span="2">
          <div class="girid-content"><label>身份证</label></div>
        </el-col>
        <el-col :span="6">
          <div class="girid-content girid-ipt"><input type="text" name="" v-model="setData.idCardNo"></div>
        </el-col>
        <el-col :span="2">
          <div class="girid-content"><label>社保卡号</label></div>
        </el-col>
        <el-col :span="6">
          <div class="girid-content girid-ipt"><input type="text" v-model="setData.account" name=""></div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :offset="21" :span="3">
          <div class="girid-content girid-btn">
            <button type="button" @click="getUsers">搜索</button>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="table-box">
      <el-table :data="tableData" border style="width:100%" max-height="900">
        <el-table-column label="管理" width="120">
          <template slot-scope='scope'>
            <el-button type="text">
              <a href="javascript:" ref="clickIndex" @click="goUrl(scope.row)">用户详情</a>
              <!--<router-link to="/userdetails">用户详情</router-link>-->
            </el-button>
          </template>
        </el-table-column>
        <el-table-column prop="ordinal" label="序号" width="100">
        </el-table-column>
        <el-table-column prop="idCardName" label="姓名">
        </el-table-column>
        <el-table-column prop="idCardNo" label="身份证号">
        </el-table-column>
        <el-table-column prop="bindSecurityCardFlag" label="是否绑定社保卡">
        </el-table-column>
        <el-table-column prop="bindBankCardFlag" label="是否绑定银行卡">
        </el-table-column>
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
  </div>
</template>
<script type="text/javascript">
  import {mapGetters, mapActions} from 'vuex'
  export default{
    data(){
      return {
        tableData: [],
        session: sessionStorage.getItem('session'),
        setData: {
          name: null,//名称
          idCardNo: null,//证件号码,
          account: null,//社保卡号
          pageInfo: {
            pageSize: 20,
          }
        },
        currentPage: 1,
        pageSize: 20,
        total: 1
      }
    },
    methods: {
      ...mapActions(['userData']),
      getUsers(){
        var vm = this;
        vm.setData.pageInfo.pageNum = vm.currentPage;
        if (vm.setData.account == '') {
          vm.setData.account = null;
        }
        ;
        if (vm.setData.idCardName == '') {
          vm.setData.idCardName = null;
        }
        ;
        if (vm.setData.idCardNo == '') {
          vm.setData.idCardNo = null;
        }
        var dataUp = new RemoteCall();
        dataUp.init({
          router: '/user/multi/get',
          session: this.session,
          data: this.setData,
          callback: function (data) {
            if (data.ret.errorCode === 0) {
              if (data.pageInfo.total) {
                vm.total = data.pageInfo.total;
              }
              vm.tableData = data.rows;
              for (let i = 0; i < vm.tableData.length; i++) {
                vm.tableData[i].ordinal = (i + 1) + vm.pageSize * (vm.currentPage - 1);
                if (vm.tableData[i].bindSecurityCardFlag == 1) {
                  vm.tableData[i].bindSecurityCardFlag = '是'
                } else {
                  vm.tableData[i].bindSecurityCardFlag = '否'
                }
                if (vm.tableData[i].bindBankCardFlag == 1) {
                  vm.tableData[i].bindBankCardFlag = '是'
                } else {
                  vm.tableData[i].bindBankCardFlag = '否'
                }
              }
            } else {
              vm.$alert('搜索失败：' + data.ret.errorMessage, '提示', {
                confirmButtonText: '确定',
              });
            }
          },
          errorCallback: function (data) {
            if (data) {
              vm.$router.push('/login')
            }
          }
        })
      },
//      getBind(i){//获取社保卡信息
//          var vm = this;
//          var getBind=new RemoteCall();
//          getBind.init({
//            router: '/user/card/bind/get',
//            session: this.session,
//            data:{
////              id:vm.tableData[i].id,
//              pageInfo: {
//                pageSize: 100,
//                pageNum:1
//              }
//            },
//            callback:function(req){
//                if(req.rows.length<=0){
//                  vm.tableData[i].bind='否'
//                  vm.tableData[i].bank='否'
//                }else{
//                  vm.tableData[i].bind='是';
//                  vm.tableData[i].account=req.rows[0].account;
//                  vm.tableData[i].securityTypeName=req.rows[0].securityTypeName;
//                  vm.tableData[i].issueDate=req.rows[0].issueDate;
//                  vm.tableData[i].mobile=req.rows[0].mobile;
//                }
//            }
//          })
//      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.getUsers();
      },
      goUrl(data){//跳页面前使用vuex对选中内容进行数据报错
//          console.log(data)
        this.userData(data);
        this.$router.push('/userdetails')
      },
    },
    mounted: function () {
      if (typeof(RemoteCall) == 'undefined') {
        this.$router.go(0)
      }
    }
  }
</script>
<style type="text/css" lang="scss" scoped>
  #User {
    margin: 15px;
    padding: 25px;
    background: #fff;
    border-radius: 5px;
    color: #333;
    .el-pagination {
      margin: 0 auto;
      text-align: center;
      padding-top: 10px;
    }
  }

  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }

  .girid-content {
    line-height: 30px;
    text-align: right;
    input {
      width: 100%;
      height: 30px;
      border-radius: 5px;
      border: 1px solid #aaa;
    }
  }

  .girid-ipt {
    text-align: left;
  }

  .girid-btn {
    button {
      background: #32BC6F;
      border-radius: 5px;
      width: 120px;
      height: 36px;
      vertical-align: middle;
      color: #fff;
      border: 5px;
      cursor: pointer;
    }
  }

  .table-box {
    margin-top: 50px;
  }

  a {
    text-decoration: none;
    color: mediumblue;
  }
  /*媒体查询做兼容*/
  @media screen and (max-width: 1760px) {
    label {
      font-size: 15px;
      min-width: 5em;
    }
  }

  @media screen and (max-width: 1700px) {
    .el-col-2 {
      width: 10%;
    }
    .el-col-6 {
      width: 23.333333%;
    }
    .el-col-3 {
      width: 15.5%;
    }
    .el-col-offset-21 {
      margin-left: 84.5%;
    }
  }

  @media screen and (max-width: 1420px) {
    .el-col-2 {
      width: 10%;
    }
    .el-col-6 {
      width: 23.333333%;
    }
    .el-col-3 {
      width: 17.5%;
    }
    .el-col-offset-21 {
      margin-left: 82.5%;
    }
  }
</style>
<style type="text/css">
  .el-table th {
    text-align: center !important;
  }

  .el-table td {
    text-align: center !important;
  }
</style>

