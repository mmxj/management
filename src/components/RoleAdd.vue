<template>
  <div id="RoleAdd">

    <el-row :gutter="20">
      <el-col :span="2">
        <label for="">归属公司</label>
      </el-col>
      <el-col :span="6">
        <el-select v-model="company" filterable placeholder="请选择公司" @change="companyChange">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-col>
      <el-col :span="2">
        <label for="">角色名称</label>
      </el-col>
      <el-col :span="6">
        <input type="text" v-model="inputData.name">
      </el-col>
      <el-col :span="2">
        <label for="">角色编号</label>
      </el-col>
      <el-col :span="6">
        <input type="text" v-model="inputData.code">
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="2">
        <label for="">角色职责</label>
      </el-col>
      <el-col :span="6">
        <input type="text" v-model="inputData.description">
      </el-col>
    </el-row>
    <el-row>
      <el-col :offset="22" :span="2">
        <el-button @click="addDepartment">点击添加</el-button>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  export default{
    data(){
      return {
        options: [],
        company: null,
        session: sessionStorage.getItem('session'),
        inputData: {}
      }
    },
    methods: {
      getParentId(){//获取父级卫生院数据 插入到节点中
        var vm = this;
        var getParent = new RemoteCall();
        getParent.init({
          router: "/company/get",
          session: this.session,
          data: {
//            aredId:parseInt(this.inputData.areaId)
          },
          callback: function (data) {
            for (var i = 0; i < data.rows.length; i++) {
              var parentData = {};
              parentData.label = data.rows[i].name;
              parentData.value = data.rows[i].id;
              vm.options.push(parentData);
            }
            ;
//            console.log(this.parentId)
          }
        })
      },
      companyChange(data){
        console.log(data);
        this.inputData.companyId = data;
      },
      addDepartment(){
        var vm = this;
        var departmentAdd = new RemoteCall();
        departmentAdd.init({
          router: '/base/role/add',
          session: vm.session,
          data: vm.inputData,
          callback: function (data) {
            if (data.ret.errorCode === 0) {
              vm.$alert('角色添加成功', '提示', {
                confirmButtonText: '确定',
                callback: function () {
                  vm.$router.go(0)
                }
              });
            } else {
              vm.$alert('角色添加失败' + data.ret.errorMessage, '提示', {
                confirmButtonText: '确定',
              })
            }
          }
        })
      }
    },
    mounted: function () {
      this.getParentId();
    }
  }
</script>
<style lang="scss" scoped>
  #RoleAdd {
    margin: 15px;
    padding: 20px;
    background: #fff;
    min-height: 800px;
  }

  .el-col {
    margin-bottom: 20px;
    label {
      display: block;
      width: 100%;
      text-align: right;
      line-height: 30px;
    }
    input {
      width: 100%;
      height: 30px;
      border-radius: 3px;
      border: 1px solid #aaa;
    }
    select {
      width: 100%;
      height: 36px;
      border-radius: 3px;
      border: 1px solid #aaa;
    }
    .el-date-editor.el-input {
      width: 100%;
    }
    .el-timer, .area .el-col {
      margin: 0;
    }
  }

  .el-button {
    width: 100%;
    background: #32BC6F;
    border: 0;
    color: #fff;
  }

  a {
    line-height: 30px;
  }

  @media screen and (max-width: 1760px) {
    label {
      font-size: 14px;
      min-width: 6em;
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
    .el-col-offset-22 {
      margin-left: 90%;
    }
  }

  @media screen and (max-width: 1450px) {
    .el-col-2 {
      width: 12%;
    }
    .el-col-6 {
      width: 21.333333%;
    }
    .el-col-3 {
      width: 17.5%;
    }
    .el-col-offset-22 {
      margin-left: 88%;
    }
  }

  .el-col-6 {
    position: relative;
  }

  .el-input {
    width: 100%;
  }

  .el-select {
    width: 100%;
  }
</style>
