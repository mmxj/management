<template>
  <div id="HealthStation">
    <div>
      <el-row>
        <el-col :span="3">
          <label for="">
            <!--<router-link to="/healthstationupdata">编辑卫生站</router-link>-->
            <a @click="goUpdata" href="javascript:">编辑卫生站</a>
          </label>
        </el-col>
        <el-col :span="3">
          <label for="" @click="open">删除卫生站</label>
        </el-col>
        <el-col :span="3">
          <label for="">
            <router-link to="/doctormanage">管理卫生站村医</router-link>
          </label>
        </el-col>
        <el-col :span="3">
          <label for="">
            <router-link to="/doctoradd">添加村医</router-link>
          </label>
        </el-col>
      </el-row>
    </div>
    <div class="el-tables">
      <el-table :data="tableData" border style="width: 100%;" max-height="600"
                @selection-change="handleSelectionChange">
        <el-table-column width="70" label="选择">
          <template scope="scope">
            <el-radio :label="scope.$index" v-model="radio" @change.native="getIndex(scope.$index)">&nbsp;</el-radio>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="卫生站名称" width="200">
        </el-table-column>
        <el-table-column prop="parentCompanyId" label="归属卫生院" width="200">
        </el-table-column>
        <el-table-column prop="certificateType" label="证件类型" width="120">
        </el-table-column>
        <el-table-column prop="certificateNo" label="证件号" width="250">
        </el-table-column>
        <el-table-column prop="no" label="操作员号" width="120">
        </el-table-column>
        <el-table-column prop="corporation" label="卫生站法人" width="120">
        </el-table-column>
        <el-table-column prop="leaderName" label="卫生站联系人" width="150">
        </el-table-column>
        <el-table-column prop="telephone" label="联系电话" width="200">
        </el-table-column>
        <el-table-column prop="linkmanPhone" label="联系邮箱" width="200">
        </el-table-column>
        <el-table-column prop="address" label="联系地址" width="300">
        </el-table-column>
        <el-table-column prop="accountName" label="银行账户号" width="250">
        </el-table-column>
        <el-table-column prop="account" label="银行账号" width="220">
        </el-table-column>
        <el-table-column prop="auditTime" label="添加日期" width="220">
        </el-table-column>
        <el-table-column prop="type" label="卫生站状态" width="220">
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
  import {mapActions, mapGetters} from 'vuex'
  export default{
    data(){
      return {
        session: sessionStorage.getItem('session'),
        currentPage: 1,
        total: 1,
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
        if (this.choose.children == 1) {
          this.$confirm('由于该卫生站已有村医出诊，不允许删除，如该卫生站信息变更可屏蔽该卫生站', '提示',
            {
              cancelButtonText: '取消',
              confirmButtonText: '屏蔽',
              type: 'warning',
            }).then(() => {
            this.$message({
              type: 'success',
              message: '屏蔽成功!'
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '取消成功'
              });
            });
          })
        } else if (this.choose.children === 0) {
          this.$confirm('选择了删除该卫生站信息，请确定是否继续删除', '提示',
            {
              cancelButtonText: '取消',
              confirmButtonText: '删除',
              type: 'warning',
              beforeClose: (action, instance, done) => {
                console.log(action);
                console.log(instance);
                console.log(done);
              }
            }).then(() => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '取消成功'
              });
            });
          })
        }
      },
      initData(){
        var getParent = new RemoteCall();
        getParent.init({
          router: "/company/get",
          session: this.session,
          data: {
//            aredId:parseInt(this.inputData.areaId);
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
      },
      parentCallback(data){
        console.log(data)
        var vm = this;
        if (data.pageInfo.total) {
          vm.total = data.pageInfo.total;
        }
        this.tableData = data.rows;
      },
      goUpdata(){
        console.log(this.choose);
        this.saveHealthData(this.choose);
        this.$router.push('/healthstationupdata')
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
</style>
<style type="text/css">
  .el-table th {
    text-align: center !important;
  }

  .el-table td {
    text-align: center !important;
  }
</style>
