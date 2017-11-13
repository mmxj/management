<template>
  <div id="UserTownship">
    <el-table :data="tableData" border width="100%" align="center">
      <el-table-column prop="moblie" label="登录账号"></el-table-column>
      <el-table-column prop="moblie" label="注册手机号码"></el-table-column>
      <el-table-column prop="sfsCreate" label="注册时间"></el-table-column>
      <el-table-column prop="" label="注册商户"></el-table-column>
      <el-table-column prop="" label="最近一次消费时间"></el-table-column>
      <el-table-column prop="" label="重置密码">
        <template slot-scope="scope">
          <el-button size="small" class="setPassword" @click="reset(scope)">点击发送密码到注册手机</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  export default{
    data(){
      return {
        tableData: [],
        session: sessionStorage.getItem('session'),
      }
    },
    computed: mapGetters(['userData']),
    methods: {
      getUser(){
        var vm = this;
        if (!this.userData) {
          this.$router.push('/user')
        } else {
          console.log(this.userData);
          this.userData.moblie = this.userData.moblie.split(',')[0];
          this.userData.sfsCreate = this.userData.sfsCreate.split(' ')[0];
          vm.$set(vm.tableData, 0, this.userData)
        }
//            var getUser=new RemoteCall();
//            getUser.init({
//              router:'/user/get',
//              session:vm.session,
//              data:{
//                  pageInfo:{
//                      pageSize:100,
//                      pageNum:1
//                  }
//              },

//            })
      },
      reset(name){
        console.log(name.row.moblie);
        var vm = this;
        if (name.row.moblie == '' || name.row.moblie == null) {
          return;
        }
        var resetPassword = new RemoteCall();
        resetPassword.init({
          router: '/base/validatecode/sms/get',
          session: this.session,
          data: {
            deviceType: 3,
            validateCodeType: 2,
            moblie: name.row.moblie
          },
          callback: function (data) {
            if (data.ret.errorCode === 0) {
              vm.$alert('发送成功', '提示', {
                confirmButtonText: '确定',
              })
            } else {
              vm.$alert('发送失败,' + data.ret.errorMessage, '提示', {
                confirmButtonText: '确定',
              })
            }
          }
        })
      },
    },
    mounted: function () {
      this.getUser()
    }

  }
</script>
<style lang="scss">
  #UserTownship {
    margin-top: 20px;
    .el-table {
      th, td {
        .cell {
          text-align: center;
        }
      }
    }
    .setPassword {
      background: #32BC6F;
      color: #fff;
      border: 0;
    }
  }
</style>
