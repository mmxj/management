<template>
  <div id="Gheader">
    <header class="clearfix">
      <h1>社保金融服务应用平台</h1>
      <div class="title-center">
        <div class="title">医疗管理后台</div>
        <div>你好,<span>{{userName}}</span></div>
        <div>今天是<span class="today">{{time}}</span></div>
      </div>
      <div class="site">
        <span class="companyName">{{companyName}}</span> <span class="goBack" @click="goBack">退出</span>
      </div>

    </header>
    <router-link to="/homepage" class="page1 left-title">运营管理后台首页</router-link>
  </div>
</template>
<script type="text/javascript">
  import {mapGetters} from 'vuex'
  export default{
    data(){
      return {
        userName: sessionStorage.getItem('userName'),
        companyName: sessionStorage.getItem('companyName'),
//        session: sessionStorage.getItem('session'),
        time: null
      }
    },
    computed: mapGetters(['loginData']),
    methods: {
//        getUser(){
//            this.loginData;
//            var getuser=new RemoteCall();
//            getuser.init({
//              router:'/company/staff/get',
//              session:this.loginData.session,
//              data:{
//                  name:this.loginData.userName
//              },
//              callback:function(data){
//                  console.log(data);
//              }
//            })
//        },
      setTime(){
        var time = new Date();
        this.time = time.getFullYear() + '年' + (time.getMonth() + 1) + '月' + time.getDate() + '日'
      },
      goBack(){
        var vm = this;
        this.$confirm('是否要退出?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          sessionStorage.removeItem('saveList');
          sessionStorage.removeItem('urlArr')
          vm.$router.push('/login');
        }).catch(() => {

        });
      }
    },
    mounted: function () {
      this.setTime();
    },
    watch: {
      loginData(){
        this.userName = this.loginData.staffName;
        this.companyName = this.loginData.companyName;
//        this.getUser()
      }
    }
  }
</script>
<style type="text/css" lang="scss" scoped="">
  #Gheader {
    background: #fff;
    header {
      font-size: 14px;
      line-height: 70px;
      height: 70px;
      background: #32BC6F;
      color: #fff;
      text-align: center;
      position: relative;
      h1 {
        font-size: 18px;
        font-weight: normal;
        float: left;
        width: 290px;
        height: 66px;
      }
      div {
        float: left;
      }
    }
    .left-title {
      height: 60px;
      line-height: 60px;
      text-align: left;
      padding-left: 3.16%;
      color: #32BC6F;
      cursor: pointer;
    }
    .title-center {
      position: absolute;
      right: 336px;
      top: 0;
      div {
        padding: 0 40px;
      }
    }
    .site {
      float: right;
      width: 336px;
      height: 100%;
      /* line-height: 70px; */
    }
  }

  .page1 {
    background: #fff;
    display: block;
    font-size: 18px;
    height: 100%;
    text-decoration: none;
    font-weight: bold;
    width: 250px;
  }

  .goBack {
    margin-left: 30px;
    cursor: pointer;
    padding-bottom: 2px;
    vertical-align: top;
    border-bottom: 1px solid #fff;
  }

  .companyName {
    display: inline-block;
    width: 220px;
    overflow: hidden; /*自动隐藏文字*/
    text-overflow: ellipsis; /*文字隐藏后添加省略号*/
    white-space: nowrap; /*强制不换行*/
  }
</style>
