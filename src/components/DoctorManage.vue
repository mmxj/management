<template>
  <div id="DoctorManage">
    <div>
      <el-row :gutter="20">
        <el-col :span="2"><label for="">
          <!--<router-link to="/doctoradd">编辑村医</router-link>-->
          <a href="javascript:" @click="goUpdata">编辑村医</a>
        </label></el-col>
        <el-col :span="2"><label for="" @click="open">删除村医</label></el-col>
      </el-row>
    </div>
    <div class="tables">
      <el-table :data="tableData" border align="center" style="width:100%" max-height="600"
                @selection-change="handleSelectionChange">
        <el-table-column label="选择" width="70">
          <template scope="scope">
            <el-radio :label="scope.$index" v-model="radio" @change.native="getIndex(scope.$index)">&nbsp;</el-radio>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="村医姓名" width="150"></el-table-column>
        <el-table-column prop="parent2CompanyName" label="归属卫生院" width="180"></el-table-column>
        <el-table-column prop="parentCompanyName" label="归属卫生站" width="200"></el-table-column>
        <el-table-column prop="no" label="村医编号" width="200"></el-table-column>
        <el-table-column prop="certificateNo" label="身份证号" width="200"></el-table-column>
        <el-table-column prop="email" label="村医邮箱" width="200"></el-table-column>
        <el-table-column prop="leader" label="卫生站联系人" width="200"></el-table-column>
        <el-table-column prop="telephone" label="联系电话" width="200"></el-table-column>
        <el-table-column prop="accountName" label="银行账户名" width="200"></el-table-column>
        <el-table-column prop="account" label="银行账号" width="200"></el-table-column>
        <el-table-column prop="auditTime" label="添加日期" width="200"></el-table-column>
        <el-table-column prop="auditFlag" label="医生状态" width="200"></el-table-column><!--屏蔽的效果还没做-->
      </el-table>
    </div>
  </div>
</template>
<script type="text/javascript">
  import {mapActions} from 'vuex'
  export default{
    data(){
      return {
        session: sessionStorage.getItem('session'),
        radio: null,
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
        console.log(row)
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
            router: '/order/prescription/get',
            session: this.session,
            data: {
              doctorId: this.choose.id
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
          this.$alert('请选择要删除的村医', '提示', {
            confirmButtonText: '确定',
            callback: action => {

            }
          })
        }
      },
      deleteHealth(){
        var vm = this;
        if (this.choose.children == 1) {
          this.$confirm('由于该村医已开出处方，不允许删除，如该村医信息变更可屏蔽该村医', '提示',
            {
              cancelButtonText: '取消',
              confirmButtonText: '屏蔽',
              type: 'warning',
            }).then(() => {
            vm.shield();
          })
        } else if (this.choose.children === 0) {
          this.$confirm('选择了删除该村医信息，请确定是否继续删除', '提示',
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
            enableFlag: 0
          },
          callback: function (data) {
            console.log(data);
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
            console.log(data);
          }
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
//              console.log(data.rows[i]);
          if (data.rows[i].companyType == 5) {
//              console.log(data.rows[i]);
            this.tableData.push(data.rows[i]);
//            console.log(this.tableData)
//            for(var i=0;i<this.tableData.length;i++){
//              if(this.tableData[i].auditFlag===0){
//                this.tableData[i].auditFlag='屏蔽'
//              }else if(this.tableData[i].auditFlag==1){
//                this.tableData[i].auditFlag='正常'
//              }
//            }
          }
        }
      },
      goUpdata(){
        console.log(this.choose);
        this.saveHealthData(this.choose);
        this.$router.push('/doctorupdata')
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
