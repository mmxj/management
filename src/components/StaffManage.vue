<template>
  <div id="DocotrManage">
    <el-row :gutter="20">
      <el-col :span=2>
        <span class="btn" @click="changeDoctor">编辑员工</span>
      </el-col>
      <el-col class="btn" :span="2">
        <span @click="DeleteDoctor">删除员工</span>
      </el-col>
      <el-col :span="4">
        <input type="text" v-model="doctor">
      </el-col>
      <el-col :span="2">
        <el-button @click="findDoctor">搜索员工</el-button>
      </el-col>
    </el-row>
    <div class="tables">
      <el-table :data="tableData" border align="center" style="width:100%" max-height="600"
                @selection-change="handleSelectionChange">
        <el-table-column label="选择" width="70">
          <template slot-scope="scope">
            <el-radio :label="scope.$index" v-model="radio" @change.native="getIndex(scope.$index)">&nbsp;</el-radio>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="员工姓名" width="150"></el-table-column>
        <el-table-column prop="companyName" label="归属商户" width="180"></el-table-column>
        <el-table-column prop="departmentName" label="归属部门" width="200"></el-table-column>
        <el-table-column prop="id" label="员工编号" width="200"></el-table-column>
        <el-table-column prop="roleName" label="员工角色" width="200"></el-table-column>
        <el-table-column prop="idCardNo" label="身份证号" width="200"></el-table-column>
        <el-table-column prop="email" label="员工邮箱" width="200"></el-table-column>
        <el-table-column prop="mobile" label="联系电话" width="200"></el-table-column>
        <el-table-column prop="sfsCreate" label="添加日期" width="200"></el-table-column>
        <el-table-column prop="staffType" label="是否是医生" width="200"></el-table-column>
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
<script>
  import {mapActions} from 'vuex'
  export default{
    data(){
      return {
        session: sessionStorage.getItem('session'),
        tableData: [],
        doctor: null,
        radio: null,
        saveDoctorData: null,
        currentPage: 1,
        pageSize: 20,
        total: 0,
        inputData: {
//          staffType: 0,
          pageInfo: {
            pageSize: 20,
            pageNum: 1
          }
        }
      }
    },
    methods: {
      ...mapActions(['saveHealthData']),
      getStaff(name){
        var vm = this;
        if (name) {
          vm.inputData.name = name;
        } else {
          vm.inputData.name = null;
        }
        vm.inputData.pageInfo.pageNum = vm.currentPage;
        var staffGet = new RemoteCall();
        staffGet.init({
          router: '/company/staff/get',
          session: this.session,
          data: vm.inputData,
          callback: function (data) {
            if (data) {
              if (data.ret.errorCode === 0) {
                if (data.pageInfo.total) {
                  vm.total = data.pageInfo.total;
                }
                vm.tableData = data.rows;
                for (var i = 0; i < vm.tableData.length; i++) {
                  vm.tableData[i].sfsCreate = vm.tableData[i].sfsCreate.split(' ')[0];
                  if (vm.tableData[i].staffType == 1) {
                    vm.tableData[i].staffType = '是'
                  } else {
                    vm.tableData[i].staffType = '否'
                  }
                }
              }
            }


          },
          errorCallback: function (data) {
            if (data.responseText == 'session not found') {
              vm.$router.push('/login');
            }
          }
        })
      },
      getIndex(data){
        if (data || data === 0) {
          this.saveDoctorData = this.tableData[data];
          console.log(this.tableData[data]);
          this.saveHealthData(this.tableData[data])
        }
      },
      handleSelectionChange(data){
        console.log(data)
      },
      handleCurrentChange(data){
        console.log(data)
        this.inputData.pageInfo.pageNum = data;
      },
      changeDoctor(){//修改村医 跳转到修改的页面;
        if (this.saveDoctorData) {
          this.$router.push('/staffupData')
        } else {
          this.$alert('请选择要修改的员工', '提示', {
            confirmButtonText: '确定',
          });
        }

      },
      DeleteDoctor(){//删除村医
        var vm = this;
        if (this.saveDoctorData) {
          if (this.checkOrder(this.saveDoctorData.id)) {//执行屏蔽; 村医的状态值没有 有的话通过修改村医的状态值来实现屏蔽
            this.$confirm('由于该村医已开出处方，不允许删除，如该村医信息变更可屏蔽该村医', '提示', {
              cancelButtonText: '取消',
              confirmButtonText: '屏蔽',
              type: 'warning',
              callback: function () {
              }
            });
          } else {//执行删除
            this.$confirm('你选择了删除该员工信息，请确定是否继续删除', '提示', {
              cancelButtonText: '取消',
              confirmButtonText: '删除',
              type: 'warning',
            }).then(() => {
              var deletDoctor = new RemoteCall();
              deletDoctor.init({
                router: '/company/staff/delete',
                session: vm.session,
                data: {
                  id: vm.saveDoctorData.id
                },
                callback: function (data) {
                  if (data.ret.errorCode === 0) {
                    vm.$alert('删除成功', '提示', {
                      confirmButtonText: '确定',
                      callback: function () {
                        vm.getStaff();
                        vm.radio = null;
                      }
                    });
                  } else {
                    vm.$alert('删除失败', '提示', {
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
            });
          }
        } else {
          this.$alert('请选择要删除的员工', '提示', {
            confirmButtonText: '确定',
          });
        }

      },
      checkOrder(doctorId){//检查村医底下是否有处方 返回false执行删除 返回true只能屏蔽
        var doctor = new RemoteCall();
        var check = false;
        doctor.init({
          router: '/order/prescription/get',
          session: this.session,
          data: {
            pageInfo: {
              pageSize: 100,
              pageNum: 1
            },
            doctorId: doctorId
          },
          callback: function (data) {
            if (data.rows.length > 0) {
              check = true;
            }
          }
        });
        return check;
      },
      handleSizeChange(data){
//            console.log(data);
        this.getStaff()
      },
      findDoctor(){//查找村医
        var vm = this;
        if (vm.doctor == "") {
          vm.doctor = null;
        }
        this.getStaff(vm.doctor);
      }
    },
    mounted: function () {
      this.getStaff();
    }
  }
</script>
<style scoped="">
  #DocotrManage {
    margin: 15px;
    padding: 20px;
    background: #fff;
    min-height: 800px;
  }

  .tables {
    margin-top: 10px;
  }

  .btn {
    cursor: pointer;
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
    /*margin-left: 20px;*/
    border: 0;
    color: #fff;
    background: #32BC6F;
  }

  .el-col-2 {
    line-height: 36px;
    min-width: 6em;
  }
</style>
