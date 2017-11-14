<template>
  <div id="app">
    <Gheader></Gheader>
    <el-row id="elRow">
      <el-col :span="4" class="left">
        <LeftList></LeftList>
      </el-col>
      <el-col :span="20" id="rightPage" class="right">
        <RightPage></RightPage>
      </el-col>
    </el-row>
    <div class="login">
      <!--<img src="./img/" alt="">-->
    </div>
  </div>
</template>

<script>
  import Gheader from './Gheader.vue'
  import LeftList from './LeftList.vue'
  import RightPage from './RightPage.vue'
  import {mapGetters, mapActions} from 'vuex'
  export default {
    name: 'app',
    data(){
      return {
        loading: true,
        loadingFn: null
      }
    },
    components: {
      Gheader,
      LeftList,
      RightPage
    },
    methods: {
      ...mapActions(['saveSession']),
      getArea(){
        if (sessionStorage.getItem('session')) {
          this.session = sessionStorage.getItem('session');//获取本地存储保存session状态
        } else {
          this.$router.push({path: '/login'})
        }
        var _this = this;
        var getArea = new RemoteCall();
        getArea.init({
          router: "/base/area/idname/get",
          session: _this.session,
          data: {
            parentAreaId: 0
          },
          callback: function (data) {
            console.log(data)
          }
        });
      },
      getArea(){
        var vm = this;
        if (sessionStorage.getItem('session')) {
          this.session = sessionStorage.getItem('session');//获取本地存储保存session状态
        } else {
          this.$router.push({path: '/login'})
        }
        var _this = this;
//      var getArea = new RemoteCall();
//      getArea.init({
//        router: "/base/area/idname/get",
//        session: _this.session,
//        data: {
//          parentAreaId: 0
//        },
//        errorCallback: function (data) {
//          if (data) {
//            vm.$router.push('/login')
//          }
//        }
//      });
      },
      openFullScreen2() {
        var vm = this;
        vm.loadingFn = this.$loading({
          lock: vm.loading,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
      }
    },
    mounted: function () {

      if (sessionStorage.getItem('session')) {
        this.saveSession(sessionStorage.getItem('session'));
      } else {
        this.$router.push('/login')
      }
      this.getArea();
      var timer;
      clearTimeout(timer);
      timer = setTimeout(function () {
//        console.log(document.getElementById('RightPage').clientHeight);
        document.getElementById('LeftList').style.height = document.getElementById('RightPage').clientHeight + 'px';
      }, 500)
    },
    watch: {
      $route(){
        var vm = this;
//      vm.openFullScreen2();
        if (sessionStorage.getItem('session')) {
          this.saveSession(sessionStorage.getItem('session'));
        }
        if (this.$route.path != '/login') {
          document.body.scrollTop = 0;
          this.getArea();
          document.getElementsByTagName('body')[0].style.height = "";
          document.getElementsByTagName('body')[0].style.overflow = "";
        }
        var timer;
        clearTimeout(timer);
        timer = setTimeout(function () {
//        console.log(document.getElementById('RightPage').clientHeight);
          document.getElementById('LeftList').style.height = document.getElementById('RightPage').clientHeight + 'px';
        }, 500)
//      vm.loadingFn.close();
      }

    }
  }
</script>
<style>
  body {
    min-width: 1200px;
    background: #EEEEEE;
  }

  [class^="el-icon-my"], [class*=" el-icon-my"] {
    /* 以下内容参照第三方图标库本身的规则 */
    font-size: inherit;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  #RightPage {
    height: 100%;
  }

  #elRow {
    position: static;
    height: 100%;
    overflow: hidden;
  }

  .left {
    float: left;
    /*height:2000px;*/
    height: 100%;
  }
</style>

