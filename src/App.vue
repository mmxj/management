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
  },
  mounted: function () {
    if (sessionStorage.getItem('session')) {
      this.saveSession(sessionStorage.getItem('session'))
    }

  }
}
</script>
<style>
@import './assets/css/reset.css';
body{
  min-width: 1280px;
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

