<template>
  <div id="Staffadd">
    <el-row :gutter="20">
      <el-col :span="2">
        <label for="">村医姓名</label>
      </el-col>
      <el-col :span="6">
        <input type="text" v-model="inputData.name">
      </el-col>
      <el-col :span="2">
        <label for="">联系手机</label>
      </el-col>
      <el-col :span="6">
        <input type="text" v-model="inputData.mobile">
      </el-col>
      <el-col :span="2">
        <label for="">联系邮箱</label>
      </el-col>
      <el-col :span="6">
        <input type="text" v-model="inputData.email">
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="2">
        <label for="">归属医院</label>
      </el-col>
      <el-col :span="6">
        <el-select v-model="company" filterable placeholder="请选择公司" @change="companyChange">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-col>
      <el-col :span="2">
        <label for="">归属部门</label>
      </el-col>
      <el-col :span="6">
        <el-select v-model="department" filterable placeholder="请选择部门" @change="departmentChange">
          <el-option v-for="item in departmentOptions" :key="item.value" :label="item.label"
                     :value="item.value"></el-option>
        </el-select>
      </el-col>
      <el-col :span="2">
        <label for="">性别</label>
      </el-col>
      <el-col :span="6">
        <el-select v-model="sex" filterable placeholder="请选择性别" @change="sexChange">
          <el-option v-for="item in sexData" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="2">
        <label for="">毕业学校</label>
      </el-col>
      <el-col :span="6">
        <input type="text" v-model="inputData.graduateSchool">
      </el-col>
      <el-col :span="2">
        <label for="">证件类型</label>
      </el-col>
      <el-col :span="6">
        <el-select v-model="card" filterable placeholder="请选择证件类型" @change="cardChange">
          <el-option v-for="item in cardData" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-col>
      <el-col :span="2">
        <label for="">证件号码</label>
      </el-col>
      <el-col :span="6">
        <input type="text" v-model="inputData.idCardNo">
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="2">
        <label for="">正式从业日期</label>
      </el-col>
      <el-col :span="6">
        <el-date-picker
          v-model="value1"
          type="date"
          placeholder="选择日期"
          :picker-options="pickerOptions0" @change="timeChange">
        </el-date-picker>
      </el-col>
      <el-col :span="2">
        <label for="">角色</label>
      </el-col>
      <el-col :span="6">
        <el-select v-model="role" filterable placeholder="请选择角色" @change="roleChange">
          <el-option v-for="item in roleData" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-col>
      <el-col :span="2">
        <label for="">出生日期</label>
      </el-col>
      <el-col :span="6">
        <el-date-picker
          v-model="value2"
          type="date"
          placeholder="选择日期"
          :picker-options="pickerOptions1" @change="timeChange2">
        </el-date-picker>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="2">
        <label for="">是否是医生</label>
      </el-col>
      <el-col :span="6">
        <el-select v-model="doctor" filterable placeholder="是否是医生" @change="doctorChange">
          <el-option v-for="item in doctorData" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-col>
      <el-col :span="2">
        <label for="">登录名称</label>
      </el-col>
      <el-col :span="6">
        <input type="text" v-model="inputData.loginName">
      </el-col>
      <!--<el-col :span="2">-->
      <!--<label for="">登录密码</label>-->
      <!--</el-col>-->
      <!--<el-col :span="6">-->
      <!--<input type="password" v-model="inputData.password">-->
      <!--</el-col>-->
    </el-row>
    <el-row>
      <el-col :offset="22" :span="2">
        <el-button @click="addStaff">确定修改</el-button>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  export default{
    data(){
      return {
        options: [],
        departmentOptions: [],
        roleData: [],
        doctorData: [{
          value: 0,
          label: '否'
        }, {
          value: 1,
          label: '是'
        }],
        sexData: [{
          value: 1,
          label: '男'
        }, {
          value: 2,
          label: '女'
        }],
        cardData: [{
          value: 1,
          label: '身份证'
        }, {
          value: 2,
          label: '军官证'
        }, {
          value: 3,
          label: '驾驶证'
        }],
        role: null,
        card: 1,
        sex: null,
        company: null,
        doctor: null,
        session: sessionStorage.getItem('session'),
        parentId: [],
        department: null,
        inputData: {
          idCardType: 1,
        },
        pickerOptions0: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          }
        },
        value1: '',
        value2: '',
        pickerOptions1: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          }
        },
      }
    },
    computed: mapGetters(['saveHealthData']),
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
//                this.parentId.push(data.rows[i]);
              var parentData = {};
              parentData.label = data.rows[i].name;
              parentData.value = data.rows[i].id;
              vm.options.push(parentData);
            }
            ;
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
//        console.log(data);
        var vm = this;
        var gethospital = new RemoteCall();//获取部门
        gethospital.init({
          router: "/company/department/get",
          session: this.session,
          data: {
            companyId: data,
            pageInfo: {
              pageSize: 100,
              pageNum: 1
            }
          },
          callback: function (str) {
            vm.department = null;
            vm.departmentOptions = [];
            for (var i = 0; i < str.rows.length; i++) {
              var parentData = {};
              parentData.label = str.rows[i].name;
              parentData.value = str.rows[i].id;
              vm.$set(vm.departmentOptions, i, parentData);
            }
            if (vm.inputData.departmentId) {
              vm.department = vm.inputData.departmentId;
            }
          }
        })
        var roleget = new RemoteCall(); //获取角色
        roleget.init({
          router: "/base/role/get",
          session: this.session,
          data: {
            companyId: data,
            pageInfo: {
              pageSize: 100,
              pageNum: 1
            }
          },
          callback: function (str) {
            vm.role = null;
            vm.roleData = [];
            for (var i = 0; i < str.rows.length; i++) {
              var parentData = {};
              parentData.label = str.rows[i].name;
              parentData.value = str.rows[i].id;
              vm.roleData.push(parentData);
            }
            if (vm.inputData.roleTypeId) {
              vm.role = vm.inputData.roleTypeId;
            }
          }
        })
      },
      departmentChange(data){
        this.inputData.departmentId = data;
      },
      sexChange(data){
        this.inputData.sex = data;
      },
      cardChange(data){
        this.inputData.idCardType = data;
      },
      timeChange(data){
        console.log(data);
        this.inputData.beginDoctorDate = data;
      },
      timeChange2(data){
        this.inputData.birthday = data;
      },
      roleChange(data){
        this.inputData.roleId = data;
      },
      doctorChange(data){
        this.inputData.staffType = data;
      },
      addStaff(){
        var vm = this;
        if (vm.inputData.password) {
          vm.inputData.password = $.md5(vm.inputData.password).toUpperCase();
        }
        var addStaffs = new RemoteCall();
        addStaffs.init({
          router: '/company/staff/update',
          session: vm.session,
          data: vm.inputData,
          callback: function (data) {
            if (data.ret.errorCode === 0) {
              vm.$alert('修改成功', '提示', {
                confirmButtonText: '确定',
                callback: function () {
                  vm.$router.push('/doctormanage')
                }
              });
            } else {
              vm.$alert('修改失败', '提示', {
                confirmButtonText: '确定',
              });
            }

          }
        })
      },
      getDocotr(){
        if (this.saveHealthData) {
          this.inputData = this.saveHealthData;
          this.sex = this.inputData.sex;
//          this.role=this.inputData.roleTypeId;
          this.company = this.inputData.companyId;
          this.doctor = this.inputData.staffType;
          this.value1 = this.inputData.beginDoctorDate;
          this.value2 = this.inputData.sfsCreate.split(' ')[0];
          this.role = this.inputData.roleId;
        } else {
          this.$router.push('/doctormanage')
        }
      }
    },
    mounted: function () {
      this.getParentId();
      this.getDocotr();
    }
  }
</script>
<style lang="scss" scoped>
  #Staffadd {
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
