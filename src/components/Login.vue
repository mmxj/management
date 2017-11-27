<template>
  <div id="Login">
    <div class="bg"></div>
    <div class="loginWindow">
      <el-row class="el-row-parent">
        <el-col :span="12">
          <img class="logo" :src="urlImg" alt="">
        </el-col>
        <el-col class="login-input" :span="12">
          <el-row :gutter="10">
            <el-col :span="6">
              <label for="loginName">登录账号:</label>
            </el-col>
            <el-col :span="18">
              <input type="text" placeholder="请输入登录账号" id="loginName">
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="6">
              <label for="">登录密码:</label>
            </el-col>
            <el-col :span="18">
              <input type="password" placeholder="请输入登录密码" id="password" @keydown.13="login">
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="6">
              <img id="auth" src="" alt="">
            </el-col>
            <el-col :span="10">
              <input type="text" placeholder="请输入验证码" id="validateCode" @keydown.13="login">
            </el-col>
            <el-col :span="8">
              <b class="authCode" @click="resetVal">点击刷新验证码</b>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <button type="button" class="loginBtn" id="loginBtn" @click="login">登录</button>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script type="text/javascript">
  import {mapGetters, mapActions} from 'vuex'
  export default{
    data(){
      return {
        urlImg: require("@/assets/img/login_bg.png"),
        validateCodeId: null
      }
    },
    methods: {
      ...mapActions(['saveSession', 'loginData']),
      //设置body高度等于窗口
      setHeight(){
        document.body.scrollTop = 0;
        document.getElementsByTagName('body')[0].style.height = window.innerHeight + 'px';
        document.getElementsByTagName('body')[0].style.overflow = "hidden";
      },
      resSize(){
        document.getElementsByTagName('body')[0].style.height = '';
        document.getElementsByTagName('body')[0].style.overflow = "";
      },
      //获取二维码
      getPicture(){
        var getCode = new RemoteCall();
        getCode.init({
          router: "/base/validatecode/picture/get",
          data: {
            "deviceType": 3,
            "validateCodeType": 4
          },
          callback: this.getCodeCallback
        })
      },
      getCodeCallback(data){
        console.log(data);
        document.getElementById("auth").src = "data:image/png;base64," + data.validateCode;
        this.validateCodeId = data.validateCodeId;
      },
      login(){//登录按钮点击事件
        var password = $.md5(document.getElementById("password").value).toUpperCase();
        var loginName = document.getElementById("loginName").value;
        var validateCode = document.getElementById("validateCode").value;
//        this.$router.push({path: '/Message'});//点击跳转测试用记得删除这个事件
        if (loginName == '' || loginName == null) {
          this.$alert('登录账号不能为空', '提示', {
            confirmButtonText: '确定'
          });
          return
        }
        if (validateCode == '' || validateCode == null) {
          this.$alert('验证码不能为空', '提示', {
            confirmButtonText: '确定'
          });
          return
        }
        var login = new RemoteCall();
        login.init({
          router: "/company/staff/login",
          data: {
            "deviceType": 3,
            "password": password,
            "loginName": loginName,
            "validateCode": validateCode,
            "validateCodeId": this.validateCodeId
          },
          callback: this.loginCallback,
          errorCallback: this.loginError
        });

      },
      loginCallback(data){
        if (data.ret.errorCode === 0) {
          var loginName = document.getElementById("loginName").value;
          var session = data.session;
          this.saveSession(session);
          this.loginData(data)
          sessionStorage.setItem('session', session);
          sessionStorage.setItem('userName', data.staffName)
          sessionStorage.setItem('companyName', data.companyName);
          sessionStorage.setItem('roleId', data.roleId)
          sessionStorage.setItem('companyId', data.companyId);
          sessionStorage.setItem('loginName', loginName);
          this.resSize()
          this.$router.push({path: '/homepage'});
        } else if (data.ret.errorCode === -1) {
          switch (data.ret.errorMessage) {
            case 'password error':
              this.$alert('密码错误', '提示', {
                confirmButtonText: '确定'
              });
              break;
            case 'user login not exist':
              this.$alert('账号不存在', '提示', {
                confirmButtonText: '确定'
              });
              break;
            case 'Exception: 字段：validateCode为空字符串，请检查!':
              this.$alert('验证码不能为空', '提示', {
                confirmButtonText: '确定'
              });
              break;
            case  'ValidateCode error':
              this.$alert('验证码错误', '提示', {
                confirmButtonText: '确定'
              });
              break;
            case  'departmentStaff not exist':
              this.$alert('账号不存在', '提示', {
                confirmButtonText: '确定'
              });
              break;

          }
        }
      },
      loginError(data){
        console.log('错误' + data)
      },
      resetVal(){
        this.getPicture();
      }
    },
    mounted: function () {
      //调用默认函数
      this.setHeight();
      this.getPicture();
      sessionStorage.removeItem('session');
    }
  }
</script>
<style lang="scss" scoped>
  #Login {
    background: #FBFCEE;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .bg {
    width: 100%;
    background: #32BC6F;
    height: 50%;
    top: 0;
    left: 0;
    position: absolute;
  }

  .loginWindow {
    width: 1128px;
    height: 600px;
    background: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -564px;
    margin-top: -300px;
    .el-row-parent {
      height: 100%;
      .el-row {
        height: 61px;
        margin-bottom: 30px;
        border-bottom: 1px solid #CDCDCD;
        line-height: 61px;
        font-size: 22px;
      }
      .el-row:nth-last-child(1) {
        border: 0;
      }
      label {
        display: block;
        text-align: right;
      }
      input {
        width: 100%;
        /*height:61px;*/
        padding: 0;
        margin: 0;
        line-height: 52px;
        font-size: 21px;
        border: 0;
      }
      .authCode {
        font-size: 18px;
        font-weight: normal;
        cursor: pointer;
      }
    }
    .loginBtn {
      cursor: pointer;
      width: 100%;
      height: 100%;
      border: 0;
      background: #32BC6F;
      border-radius: 5px;
      color: #fff;
      font-size: 22px;
      cursor: pointer;
    }
    .el-col {
      position: relative;
      height: 100%;
    }
    .logo {
      position: absolute;
      width: 406px;
      height: 337px;
      left: 50%;
      top: 50%;
      margin-left: -203px;
      margin-top: -168.5px;
    }
    .login-input {
      padding: 80px 100px 20px 0;
    }
    #auth {
      width: 90%;
      display: block;
      position: relative;
      top: 10px;
    }
  }
</style>
