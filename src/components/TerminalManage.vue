<template>
  <div id="TerminalManage">
    <el-row :gutter="20">
      <el-col :span="2">
        <label for="">商户名</label>
      </el-col>
      <el-col :span="6">
        <!--<input type="text">-->
        <el-select v-model="companyName"
                   filterable
                   remote
                   reserve-keyword
                   placeholder="请输入商户名"
                   :remote-method="remoteMethod">
          <el-option v-for="item in companyData" :value="item.value" :label="item.label" :key="item.key"></el-option>
        </el-select>
      </el-col>
      <el-col :span="2">
        <label for="">终端号</label>
      </el-col>
      <el-col :span="6">
        <input type="text" v-model="inputData.terminalNo">
      </el-col>
      <el-col :span="2">
        <label for="">安装地址</label>
      </el-col>
      <el-col :span="6">
        <input type="text" v-model="inputData.address">
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="2" :offset="2">
        <el-button @click="findTerminal">搜索</el-button>
      </el-col>
      <el-col :span="3">
        <el-button @click="goUpData">修改终端</el-button>
      </el-col>
      <el-col :span="3">
        <el-button @click="deleteTerminal">删除终端</el-button>
      </el-col>
    </el-row>
    <div>
      <el-table :data="tableData" border>
        <el-table-column width="55">
          <template slot-scope="scope">
            <el-radio :label="scope.$index" v-model="radio" @change.native="getIndex(scope.$index)"></el-radio>
          </template>
        </el-table-column>
        <!--<el-table-column prop="areaId" label="归属地" width="120"></el-table-column>-->
        <el-table-column prop="address" label="安装地址" width="180"></el-table-column>
        <el-table-column prop="companyName" label="商户名称" width="180"></el-table-column>
        <el-table-column prop="merchantNo" label="商户号" width="180"></el-table-column>
        <el-table-column prop="terminalNo" label="终端号" width="180"></el-table-column>
        <el-table-column prop="mainKey" label="终端明文主密钥" width="180"></el-table-column>
        <el-table-column prop="pSimNo" label="PSAM卡" width="180"></el-table-column>
        <el-table-column prop="acquirerName" label="收单机构" width="150"></el-table-column>
        <el-table-column prop="maintainCompany" label="维护公司" width="180"></el-table-column>
        <el-table-column prop="joinIp" label="接入IP地址" width="180"></el-table-column>
        <el-table-column prop="openDate" label="开通日期" width="150"></el-table-column>
        <el-table-column prop="summary" label="商户主营业务" width="180"></el-table-column>
        <el-table-column prop="terminalCompany" label="终端厂家" width="180"></el-table-column>
        <el-table-column prop="model" label="终端型号" width="180"></el-table-column>
      </el-table>
    </div>
    <el-pagination
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-size="pageSize"
      layout="total, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>
<script>
  import {mapActions} from 'vuex'
  export default{
    data(){
      return {
        tableData: [],
        pageSize: 20,
        total: 0,
        currentPage: 1,
        session: sessionStorage.getItem('session'),
        radio: null,
        saveData: null,
        companyName: null,
        companyData: [],
        inputData: {},
      }
    },
    methods: {
      ...mapActions(['saveTerminal']),
      getTerminal(id){//获取终端信息 终端信息表格
        var vm = this;
        var companyId = null
        if (id) {
          companyId = id;
        }
        var pageInfo = {
          pageSize: 20,
        };
        pageInfo.pageNum = vm.currentPage;
        vm.inputData.companyId = companyId;
        vm.inputData.pageInfo = pageInfo;
        if (vm.inputData.terminalNo == '') {
          vm.inputData.terminalNo = null
        }
        if (vm.inputData.address == '') {
          vm.inputData.address = null
        }
        var getCompanyIp = new RemoteCall();
        getCompanyIp.init({
          router: "/base/terminal/get",
          session: this.session,
          data: vm.inputData,
          callback: function (data) {
            if (data.ret.errorCode === 0) {
              if (data.pageInfo.total) {
                vm.total = data.pageInfo.total
              }
              vm.tableData = data.rows
            } else {
              vm.$alert(data.ret.errorMessage, '提示', {
                confirmButtonText: '确定',
              })
            }

          }
        })
      },
      handleCurrentChange(data){
        this.currentPage = data
        this.getTerminal();
      },
      getIndex(i){
        if (this.tableData[i]) {
          this.saveData = this.tableData[i];
        } else {
          this.saveData = null;
        }

      },
      deleteTerminal(){
        var vm = this;
        if (this.saveData) {
          this.$confirm('此操作将永久删除该终端, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            var del = new RemoteCall();
            del.init({
              router: '/base/terminal/delete',
              session: vm.session,
              data: {
                id: vm.saveData.id
              },
              callback: function (data) {
                if (data.ret.errorCode === 0) {
                  vm.$alert('删除成功', '提示', {
                    confirmButtonText: '确定',
                    callback: function () {
                      vm.getTerminal();
                      vm.radio = null;
                    }
                  });
                } else {
                  vm.$alert('删除失败', '提示', {
                    confirmButtonText: '确定',
                  });
                }
              }
            })
          }).catch(() => {

          });
        } else {
          vm.$alert('请选择终端', '提示', {
            confirmButtonText: '确定',
          });
        }
      },
      goUpData(){
        if (this.saveData) {
          this.saveTerminal(this.saveData)
          this.$router.push('/terminalupdata')
        } else {
          this.$alert('请选择终端', '提示', {
            confirmButtonText: '确定',
          });
        }

      },
      getParentId(name){//获取商户信息
        var companyName = null;
        var vm = this;
        if (name) {
          companyName = name
        }
        var getParent = new RemoteCall();
        getParent.init({
          router: "/company/get",
          session: this.session,
          data: {
            name: companyName,
          },
          callback: function (data) {
            if (data.ret.errorCode === 0) {
              vm.companyData = [];
              for (var i = 0; i < data.rows.length; i++) {
                var option = {};
                option.value = data.rows[i].id;
                option.label = data.rows[i].name;
                vm.companyData.push(option);
              }
            }
          }
        })
      },
      remoteMethod(data){
        if (data == "") {
          data = null
        }
        if (data == null) {
          this.companyName = null;
        }
        this.getParentId(data)
      },
      findTerminal(){
        this.getTerminal(this.companyName)
      }
    },
    mounted: function () {
      this.getTerminal()
      this.getParentId(null)
    }
  }
</script>
<style scoped>
  #TerminalManage {
    margin: 15px;
    padding: 20px;
    background: #fff;
  }

  .el-button {
    width: 100%;
    background: #32BC6F;
    border: 0;
    color: #fff;
  }

  .tableBox {
    margin-top: 10px;
  }

  .el-row {
    margin-bottom: 20px;
  }

  .el-select {
    width: 100%;
  }

  input {
    width: 100%;
    height: 30px;
    border-radius: 3px;
    border: 1px solid #aaa;
  }

  label {
    display: block;
    width: 100%;
    text-align: right;
    line-height: 30px;
  }

  @media screen and (max-width: 1366px) {
    .el-col-2 {
      width: 9.33333%;
    }

    .el-col-6 {
      width: 24%;
    }
  }
</style>
<style>
  .el-radio__label {
    display: none !important;
  }
</style>
