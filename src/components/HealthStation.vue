<template>
  <div id="HealthStation">
    <div>
      <el-row>
        <el-col :span="2">
          <label for="">
            <!--<router-link to="/healthstationupdata">编辑卫生站</router-link>-->
            <a @click="goUpdata" href="javascript:">编辑卫生站</a>
          </label>
        </el-col>
        <el-col :span="2">
          <label for="" @click="open">删除卫生站</label>
        </el-col>
        <el-col :span="2">
          <label for="">
            <router-link to="/doctormanage">管理卫生站村医</router-link>
          </label>
        </el-col>
        <el-col :span="2">
          <label for="">
            <router-link to="/doctoradd">添加村医</router-link>
          </label>
        </el-col>
        <el-col :span="4">
          <input type="text" v-model="health">
        </el-col>
        <el-col :span="2">
          <el-button @click="checkHealth">搜索卫生站</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="el-tables">
      <el-table :data="tableData" border style="width: 100%;" max-height="600"
                @selection-change="handleSelectionChange">
        <el-table-column width="70" label="选择">
          <template slot-scope="scope">
            <el-radio :label="scope.$index" v-model="radio" @change.native="getIndex(scope.$index)">&nbsp;</el-radio>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="卫生站名称" width="200">
        </el-table-column>
        <el-table-column prop="parentCompanyName" label="归属卫生院" width="200">
        </el-table-column>
        <el-table-column prop="certificateType" label="证件类型" width="120">
        </el-table-column>
        <el-table-column prop="certificateNo" label="证件号" width="250">
        </el-table-column>
        <el-table-column prop="no" label="操作员号" width="120">
        </el-table-column>
        <el-table-column prop="corporation" label="卫生站法人" width="120">
        </el-table-column>
        <el-table-column prop="leader" label="卫生站联系人" width="150">
        </el-table-column>
        <el-table-column prop="telephone" label="联系电话" width="200">
        </el-table-column>
        <el-table-column prop="email" label="联系邮箱" width="200">
        </el-table-column>
        <el-table-column prop="address" label="联系地址" width="300">
        </el-table-column>
        <el-table-column prop="accountName" label="银行账户号" width="250">
        </el-table-column>
        <el-table-column prop="account" label="银行账号" width="220">
        </el-table-column>
        <el-table-column prop="sfsCreate" label="添加日期" width="220">
        </el-table-column>
        <!--<el-table-column prop="auditFlag" label="卫生站状态" width="220">-->
        <!--</el-table-column>-->
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
  import {mapActions, mapGetters} from 'vuex'
  export default{
    data(){
      return {
        session: sessionStorage.getItem('session'),
        currentPage: 1,
        total: 0,
        radio: null,
        pageSize: 20,
        dataIndex: null,
        tableData: [
//            {
//          name: null,
//          parentCompanyId:null,
//          certificateType:null,
//          certificateNo:null,
//          no:null,
//          corporation:null,
//          leaderName:null,
//          telephone:null,
//          email:null,
//          address:null,
//          accountName:null,
//          account:null,
//          auditTime:null
//        }

        ],
        saveHealth: null,
        choose: null,
        health: null
      }
    },
    methods: {
      ...mapActions(['saveHealthData']),
      getIndex(index){
        this.dataIndex = index;
        this.choose = this.tableData[index];
      },
      //变化的时候出发 将数据放入multipleSelection中
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
        this.saveHealth = rows;
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
        console.log(this.multipleSelection)
      },
      open(){ //弹窗模块
        if (this.choose) {
          var vm = this;
          var checkhealth = new RemoteCall();//检查下面有没有处方
          checkhealth.init({
            router: '/company/get',
            session: this.session,
            data: {
              pageInfo: {
                pageSize: 20,
                pageNum: 1
              },
              enableFlag: 1,
              parentCompanyId: this.choose.id
            },
            callback: function (data) {
              if (data.rows.length > 0) {
                vm.choose.children = 1;
              } else {
                vm.choose.children = 0;
              }
              vm.deleteHealth();
            }
          })
        } else {
          this.$alert('请选择要删除的卫生站', '提示', {
            confirmButtonText: '确定',
            callback: action => {

            }
          })
        }
      },
      deleteHealth(){
        var vm = this;
        if (this.choose.children == 1) {
          this.$confirm('由于该卫生站已有村医出诊，不允许删除，如该卫生站信息变更可屏蔽该卫生站', '提示',
            {
              cancelButtonText: '取消',
              confirmButtonText: '屏蔽',
              type: 'warning',
            }).then(() => {
            vm.shield();
          })
        } else if (this.choose.children === 0) {
          this.$confirm('选择了删除该卫生站信息，请确定是否继续删除', '提示',
            {
              cancelButtonText: '取消',
              confirmButtonText: '删除',
              type: 'warning',
            }).then(() => {
            vm.deletDoctor()
          })
        }
      },
      shield(){//屏蔽卫生站
        var vm = this;
        var shieldHealth = new RemoteCall();
        shieldHealth.init({
          router: '/company/update',
          session: vm.session,
          data: {
            id: vm.choose.id,
            auditFlag: 0
          },
          callback: function (data) {
            vm.$alert('屏蔽成功', '提示', {
              confirmButtonText: '确定',
              callback: function () {
                window.location.reload();
              }
            })
          }
        })
      },
      deletDoctor(){//删除村医
        var vm = this;
        var shieldHealth = new RemoteCall();
        shieldHealth.init({
          router: '/company/delete',
          session: vm.session,
          data: {
            id: vm.choose.id,
          },
          callback: function (data) {
            vm.$alert('删除成功', '提示', {
              confirmButtonText: '确定',
              callback: function () {
                vm.initData(vm.health);
                vm.radio = null;
              }
            })
          }
        })

      },
      initData(name){
        var companyName;
        if (name) {
          companyName = name;
        } else {
          companyName = null
        }
        var getParent = new RemoteCall();
        getParent.init({
          router: "/company/get",
          session: this.session,
          data: {
//            aredId:parseInt(this.inputData.areaId);
            enableFlag: 1,
            name: companyName,
            companyType: 4,
            pageInfo: {
              pageSize: 20,
              pageNum: this.currentPage
            },
          },
          callback: this.parentCallback
        })
      },
      handleSizeChange(val) { //页面
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.initData(this.health);
      },
      parentCallback(data){
        var vm = this;
        if (data.pageInfo.total) {
          vm.total = data.pageInfo.total;
        }
        this.tableData = data.rows;
        for (var i = 0; i < this.tableData.length; i++) {
          if (this.tableData[i].auditFlag === 0) {
            this.tableData[i].auditFlag = '屏蔽'
          } else if (this.tableData[i].auditFlag == 1) {
            this.tableData[i].auditFlag = '正常'
          }
          if (vm.tableData[i].certificateType == 1) {
            vm.tableData[i].certificateType = '营业执照'
          } else if (vm.tableData[i].certificateType == 2) {
            vm.tableData[i].certificateType = '从业资格证'
          }
          vm.tableData[i].sfsCreate = vm.tableData[i].sfsCreate.split(' ')[0];
          console.log(vm.tableData[i].sfsCreate);
        }
      },
      goUpdata(){
        this.saveHealthData(this.choose);
        this.$router.push('/healthstationupdata')
      },
      checkHealth(){
        this.initData(this.health)
      }
    },
    mounted: function () {
//      this.$router.go(0)
      this.initData();
    }
  }
</script>
<style lang="scss" scoped>
  #HealthStation {
    margin: 15px;
    padding: 20px;
    padding-top: 30px;
    background: #fff;
    font-size: 14px;
  }

  a {
    color: #000;
    text-decoration: none;
  }
  label {
    width: 100%;
    display: block;
    text-align: center;
  }

  .el-tables {
    margin-top: 20px;
  }

  .el-col-2 {
    min-width: 7em;
  }

  .el-row input {
    width: 100%;
    height: 32px;
    border: 1px solid #aaa;
    border-radius: 4px;
    text-indent: 1em;
  }

  .el-row label {
    line-height: 36px;
  }

  .el-button {
    margin-left: 20px;
    border: 0;
    color: #fff;
    background: #32BC6F;
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
