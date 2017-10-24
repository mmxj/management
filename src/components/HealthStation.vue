<template>
  <div id="HealthStation">
    <div>
      <el-row>
        <el-col :span="3">
          <label for="">
            <router-link to="/healthstationupdata">编辑卫生站</router-link>
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
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="name" label="卫生站名称" width="200">
        </el-table-column>
        <el-table-column prop="parentCompanyId" label="归属卫生院" width="200"></el-table-column>
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
  export default{
    data(){
      return {
        session: sessionStorage.getItem('session'),
        currentPage: 1,
        total: 1,
        pageSize: 20,
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
        ]
      }
    },
    methods: {
      //变化的时候出发 将数据放入multipleSelection中
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
        console.log(this.multipleSelection)
      },
      open(){ //弹窗模块
        this.$confirm('由于该村医已开出处方，不允许删除，如该村医信息变更可屏蔽该村医', '提示',
          {
            cancelButtonText: '取消',
            confirmButtonText: '屏蔽',
            type: 'warning',
          }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
        })
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
//        for (var i = 0; i < data.rows.length; i++) {
//          if (data.rows[i].companyType == 4) {
////              console.log(data.rows[i]);
//            if (data.rows[i].parentCompanyId) {
//              var getParents = new RemoteCall();
//              getParents.init({
//                router: "/company/get",
//                session: this.session,
//                data: {
//                  id: data.rows[i].parentCompanyId,
//                  pageInfo: {
//                    pageSize: 20,
//                    pageNum: 1
//                  },
//                },
//                callback: function (src) {
//                  console.log(src)
//                  data.rows[i].parentCompanyId = src.rows[0].name
//                }
//              })
//            }
//            this.tableData.push(data.rows[i]);
//            console.log(data.rows[i].telephone)
//          }
//        }
      }
    },
    mounted: function () {
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
