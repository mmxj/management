<template>
  <div id="app">
    <Gheader></Gheader>
    <el-row id="elRow">
        <el-col :span="4"><LeftList ></LeftList></el-col>
        <el-col :span="20"><RightPage ></RightPage></el-col>
    </el-row>
  </div>
</template>

<script>
import Gheader from './components/Gheader.vue'
import LeftList from './components/LeftList.vue'
import RightPage from './components/RightPage.vue'
import {mapGetters, mapActions} from 'vuex'
export default {
  name: 'app',
  components:{
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
      var getArea = new RemoteCall();
      getArea.init({
        router: "/base/area/idname/get",
        session: _this.session,
        data: {
          parentAreaId: 0
        },
        errorCallback: function (data) {
          if (data) {
            vm.$router.push('/login')
          }
        }
      });
    }
  },
  mounted: function () {
//      console.log(sessionStorage.getItem('session'));
    if (sessionStorage.getItem('session')) {
      this.saveSession(sessionStorage.getItem('session'));
//      console.log(sessionStorage.getItem('session'));
    }
    this.getArea();
  },
  watch: {
    $route(){
      if (sessionStorage.getItem('session')) {
        this.saveSession(sessionStorage.getItem('session'));
//      console.log(sessionStorage.getItem('session'));
      }
      if (this.$route.path != '/login') {
        document.body.scrollTop = 0;
        this.getArea();
        document.getElementsByTagName('body')[0].style.height = "";
        document.getElementsByTagName('body')[0].style.overflow = "";
      }
      ;
    }

  }
}
</script>
<style>
@import './assets/css/reset.css';
body{
  min-width: 1200px;
  background:#EEEEEE;
}
[class^="el-icon-my"], [class*=" el-icon-my"] {
  /* 以下内容参照第三方图标库本身的规则 */
  font-size: inherit;
  font-style:normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
#RightPage{
  height: 100%;
}
  #elRow{
    position: static;
  }
</style>

