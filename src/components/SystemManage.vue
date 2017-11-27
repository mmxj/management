<template>
  <div id="SystemManage">
    <div class="changePassWord">
      <div class="left">
        <div>
          <span>请输入原密码：</span>
          <input @blur="oldPassword" type="password" v-model="passwordOld">
        </div>
        <div>
          <span>请输入新密码：</span>
          <input type="password" @blur="newPassword" v-model="passwordNew">
        </div>
        <div>
          <span>请确认新密码：</span>
          <input type="password" @blur="checkPassword" v-model="passwordCheck">
        </div>
        <p class="errordata" ref="errorData">{{errorData}}</p>
      </div>
      <div class="right">
        <p class="oldPass" ref="oldPass">·请输入你的原密码</p>
        <p class="newPass" ref="newPass">·密码由6~10位字母+数字组成</p>
        <p class="checkPass" ref="checkPass">·{{passwordcheck}}</p>
      </div>
      <div class="btnBox">
        <el-button @click="upDataPassword">确认修改</el-button>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data(){
      return {
        errorData: null,
        successData: '原密码输入错误，请重新输入',
        session: sessionStorage.getItem('session'),
        loginName: sessionStorage.getItem('loginName'),
        passwordOld: null,
        passwordNew: null,
        passwordCheck: null,
        passwordcheck: '请再次输入密码',
        passcheck: '两次密码输入不一致',
        passcheck2: '请输入再次输入密码',
        passcheck3: '密码一致'
      }
    },
    methods: {
      oldPassword(){
        if (this.passwordOld == null || this.passwordOld == "") {
          this.$refs.oldPass.style.color = '#ff7e00';
          return false
        } else {
          this.$refs.oldPass.style.color = '#35ce7a'
          return true
        }
      },
      newPassword(){
        if (/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,10}$/.test(this.passwordNew)) {
          this.$refs.newPass.style.color = '#35ce7a'
          return true
        } else {
          this.$refs.newPass.style.color = '#ff7e00'
          return false
        }
      },
      checkPassword(){
        if (this.passwordCheck == this.passwordNew) {
          this.$refs.checkPass.style.color = '#35ce7a';
          this.passwordcheck = this.passcheck3;
          return true
        } else {
          this.$refs.checkPass.style.color = '#ff7e00';
          this.passwordcheck = this.passcheck;
          return false
        }
      },
      upDataPassword(){
        var vm = this;
        if (this.oldPassword()) {
          if (this.newPassword()) {
            if (this.checkPassword()) {
              var passwordUpdate = new RemoteCall();
              passwordUpdate.init({
                router: '/company/staff/password/update',
                session: vm.session,
                data: {
                  loginName: vm.loginName,
                  oldPassword: $.md5(vm.passwordOld).toUpperCase(),
                  newPassword: $.md5(vm.passwordNew).toUpperCase()
                },
                callback: function (data) {
                  console.log(data);
                  if (data.ret.errorCode == 0) {
                    vm.$alert('修改成功,下次登录请使用新密码登录', '提示', {
                      confirmButtonText: '确定',
                      callback: function () {
                        vm.passwordOld = null;
                        vm.passwordNew = null;
                        vm.passwordCheck = null;
                        vm.$refs.errorData.style.display = 'none';
                      }
                    })
                  } else {
                    if (data.ret.errorMessage == "password error") {
                      vm.$alert('原密码错误', '提示', {
                        confirmButtonText: '确定',
                        callback: function () {
                          vm.$refs.errorData.style.display = 'block';
                          vm.$refs.errorData.style.color = '#ff7e00';
                          vm.errorData = vm.successData;
                        }
                      })
                    }
                  }
                }
              })
            } else {
              vm.$alert('两次输入的密码不一致', '提示', {
                confirmButtonText: '确定',
              })
            }
          } else {
            vm.$alert('密码由6~10位字母+数字组成', '提示', {
              confirmButtonText: '确定',
            })
          }
        } else {
          vm.$alert('请输入原密码', '提示', {
            confirmButtonText: '确定',
          })
        }
      }
    }
  }
</script>
<style scoped>
  #SystemManage {
    padding: 10px;
    margin: 10px;
    background: #fff;
    border-radius: 5px;
    min-height: 700px;
    position: relative;
  }

  .changePassWord {
    position: absolute;
    top: 50px;
    left: 50%;
    margin-left: -370px;
  }

  .left {
    display: inline-block;
    height: 100%;
  }

  .left div {
    margin-bottom: 14px;
  }

  .right {
    display: inline-block;
    height: 100%;
    margin-left: 74px;
    margin-top: 50px;
  }

  .right p {
    color: #999;
    font-size: 14px;
    line-height: 26px;

  }

  input {
    width: 347px;
    height: 50px;
    border-radius: 10px;
    border: 0;
    background: #f3f3f3;
    padding-left: 10px;
    font-size: 16px;
    color: #555;
  }

  span {
    font-size: 16px;
    color: #555;
    line-height: 50px;
    display: inline-block;
  }

  .el-button {
    width: 357px;
    height: 50px;
    background: #35ce7a;
    border-radius: 10px;
    color: #fff;
    font-size: 18px;
    border: 0;
  }

  .el-button:hover {
    background: #32bc6f;
    color: #fff;
  }

  .el-button:active {
    background: #199354;
    color: #fff;
  }

  .btnBox {
    padding-left: 118px;

  }

  .errordata {
    color: #ff7e00;
    padding-left: 100px;
    display: block;
    margin-bottom: 20px;
    text-align: center;
    min-height: 26px;
  }
</style>
