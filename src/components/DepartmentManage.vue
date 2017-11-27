<template>
  <div id="DepartmentManage">
    <el-row :gutter="20">
      <el-col :span="2">
        <label for="">公司名称</label>
      </el-col>
      <el-col :span="6">
        <el-select v-model="company" filterable remote reserve-keyword :remote-method="remoteMethod"
                   placeholder="请选择公司">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-col>
      <el-col :span="2">
        <el-button @click="clickCompany">查找部门</el-button>
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

        <el-table-column prop="companyName" label="公司名称"></el-table-column>
        <el-table-column prop="name" label="部门名称"></el-table-column>
        <el-table-column prop="code" label="部门编号"></el-table-column>
        <el-table-column prop="summary" label="部门职责"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="danger" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
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
  export default{
    data(){
      return {
        company: null,
        options: [],
        session: sessionStorage.getItem('session'),
        tableData: [],
        radio: null,
        currentPage: 1,
        pageSize: 20,
        total: 0,
        loading: null,
        saveId: null
      }
    },
    methods: {
      getParentId(name){//获取父级卫生院数据 插入到节点中
        var vm = this;
        var dataVal = {};
        if (name) {
          dataVal.name = name;
        }
        var getParent = new RemoteCall();
        getParent.init({
          router: "/company/get",
          session: this.session,
          data: dataVal,
          callback: function (data) {
            vm.options = [];
            if (data.ret.errorCode === 0) {
              for (var i = 0; i < data.rows.length; i++) {
//              this.parentId.push(data.rows[i]);
                var parentData = {};
                parentData.label = data.rows[i].name;
                parentData.value = data.rows[i].id;
                vm.options.push(parentData);
              }
            }
//            console.log(this.parentId)
          },
          errorCallback: function (data) {
            if (data) {
              vm.$router.push('/login')
            }
          }
        })
      },
      companyChange(data){
        var vm = this;
        var pageInfo = {};
        pageInfo.pageSize = vm.pageSize;
        pageInfo.pageNum = vm.currentPage;
        var gethospital = new RemoteCall();//获取部门
        gethospital.init({
          router: "/company/department/get",
          session: this.session,
          data: {
            companyId: data,
            pageInfo: pageInfo
          },
          callback: function (str) {
            if (str.ret.errorCode === 0) {
//                if(str.ret.pageInfo)
              if (str.pageInfo.total) {
                vm.total = str.pageInfo.total;
              }
              if(str.rows){
                if (str.rows.length === 0) {
                  vm.total = 0
                }
                vm.tableData = str.rows;
              }

            } else {
              vm.$alert(str.ret.errorMessage, '提示', {
                confirmButtonText: '确定',
              })
            }
//              vm.department = null;
//              vm.departmentOptions = [];
//              for (var i = 0; i < str.rows.length; i++) {
//                var parentData = {};
//                console.log(str.rows);
//                parentData.label = str.rows[i].name;
//                parentData.value = str.rows[i].id;
//                vm.$set(vm.departmentOptions, i, parentData);
//              }
          },
          errorCallback: function (data) {
            if (data) {
              vm.$router.push('/login')
            }
          }
        })
      },
      remoteMethod(data){
        if (data == '') {
          data = null;
        }
        ;
        this.company = data;
        this.getParentId(data);


      },
      handleSelectionChange(data){//列表内容获取

      },
      getIndex(data){//获取选中的列表信息

      },
      handleCurrentChange(data){//页码获取
        console.log(data)
      },
      clickCompany(){//点击获取公司id
        var vm = this;
        var dataVal = {};
        dataVal.name = vm.company;
        var getParent = new RemoteCall();
        getParent.init({
          router: "/company/get",
          session: this.session,
          data: dataVal,
          callback: function (str) {
            if (str.ret.errorCode === 0) {
//                  console.log(str.rows);
              if (str.rows.length > 0) {
                if (str.rows[0].name == vm.company) {

                  vm.companyChange(str.rows[0].id)
                  vm.saveId = str.rows[0].id;
                } else {
                  vm.$alert('查无该公司', '提示', {
                    confirmButtonText: '确定',
                  })
                }

              } else {
                vm.$alert('查无数据', '提示', {
                  confirmButtonText: '确定',
                })
              }

            } else {
              vm.$alert(str.ret.errorMessage, '提示', {
                confirmButtonText: '确定',
              })
            }
          },
        })
      },
      handleClick(data){
        console.log(data);
        var vm = this;
        this.$confirm('此操作将永久删除该部门, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var del = new RemoteCall();
          del.init({
            router: '/company/department/delete',
            session: vm.session,
            data: {
              id: data.id
            },
            callback: function (data) {
              if (data.ret.errorCode === 0) {
                vm.$alert('删除成功', '提示', {
                  confirmButtonText: '确定',
                  callback: function () {
                    vm.radio = null;
                    vm.companyChange(vm.saveId);
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
      },
    },
    mounted: function () {
      this.getParentId(null)
    }
  }
</script>
<style lang="scss" scoped>
  #DepartmentManage {
    padding: 15px;
    padding-top: 30px;
    margin: 15px;
    background: #fff;
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
    display: block;
    text-align: right;
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

  .el-select {
    width: 100%;
  }

  .tables {
    margin-top: 40px;
  }
</style>
<style>
  .el-table th {
    text-align: center;
  }

  .el-table td {
    text-align: center;
  }
</style>
