<template>
  <div id="DoctorManage">
    <div>
      <el-row :gutter="20">
        <el-col :span="2"><label for="">
          <router-link to="/doctoradd">编辑村医</router-link>
        </label></el-col>
        <el-col :span="2"><label for="" @click="open">删除村医</label></el-col>
      </el-row>
    </div>
    <div class="tables">
      <el-table :data="tableData" border align="center" style="width:100%" max-height="600"
                @selection-change="handleSelectionChange">
        <el-table-column type="selection" label="选择" width="55"></el-table-column>
        <el-table-column prop="name" label="村医姓名" width="150"></el-table-column>
        <el-table-column prop="company" label="归属卫生院" width="180"></el-table-column>
        <el-table-column prop="parentCompanyId" label="归属卫生站" width="200"></el-table-column>
        <el-table-column prop="no" label="村医编号" width="200"></el-table-column>
        <el-table-column prop="certificateNo" label="身份证号" width="200"></el-table-column>
        <el-table-column prop="email" label="村医邮箱" width="200"></el-table-column>
        <el-table-column prop="leaderName" label="卫生站联系人" width="200"></el-table-column>
        <el-table-column prop="telephone" label="联系电话" width="200"></el-table-column>
        <el-table-column prop="accountName" label="银行账户名" width="200"></el-table-column>
        <el-table-column prop="account" label="银行账号" width="200"></el-table-column>
        <el-table-column prop="auditTime" label="添加日期" width="200"></el-table-column>
        <el-table-column label="医生状态" width="200"></el-table-column><!--屏蔽的效果还没做-->
      </el-table>
    </div>
  </div>
</template>
<script type="text/javascript">
  export default{
    data(){
      return {
        session: sessionStorage.getItem('session'),
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
        console.log(row)
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
//            aredId:parseInt(this.inputData.areaId)
          },
          callback: this.parentCallback
        })
      },
      parentCallback(data){
//          console.log(data)//数据不全
        for (var i = 0; i < data.rows.length; i++) {
          if (data.rows[i].companyType == 5) {
//              console.log(data.rows[i]);
            if (data.rows[i].parentCompanyId) {
              var getParents = new RemoteCall();
              getParents.init({
                router: "/company/get",
                session: this.session,
                data: {
                  id: data.rows[i].parentCompanyId
                },
                callback: function (src) {
//                  console.log(src)
                  var getParents = new RemoteCall();
                  getParents.init({
                    router: "/company/get",
                    session: this.session,
                    data: {
                      id: src.rows[0].parentCompanyId
                    },
                    callback: function (res) {
                      data.rows[i].company = res.rows[0].name
                    }
                  });
                  data.rows[i].parentCompanyId = src.rows[0].name
                }
              })
            }
            this.tableData.push(data.rows[i]);
          }
        }
      }
    },
    mounted: function () {
      this.initData();
    }
  }
</script>
<style lang="scss" scoped="">
  #DoctorManage {
    margin: 15px;
    padding: 15px;
    padding-top: 25px;
    background: #fff;
  }

  a {
    text-align: center;
    color: #000;
    text-decoration: none;
  }
  .tables {
    margin-top: 20px;
  }

  @media screen and (max-width: 1700px) {
    .el-col-2 {
      width: 10%;
    }
    .el-col-6 {
      width: 23.333333%;
    }
    .el-col-3 {
      width: 14%;
    }
    .el-col-5 {
      width: 17.8333%;
    }
    .addHealth {
      text-indent: 1em;
    }
  }
</style>
<style>
  .el-table th {
    text-align: center !important;
  }

  .el-table td {
    text-align: center !important;
    word-break: keep-all !important; /* 不换行 */
    white-space: nowrap !important; /* 不换行 */
    overflow: hidden !important; /* 内容超出宽度时隐藏超出部分的内容 */
    text-overflow: ellipsis !important; /* 当对象内文本溢出时显示省略标记(...) ；需与overflow:hidden;一起使用。*/
  }
</style>
