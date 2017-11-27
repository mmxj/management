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
        loadingFn: null,
        roleId: sessionStorage.getItem('roleId'),
        roleArr: []
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
      },
      getRole(){
        var vm = this;
        var getRole = new RemoteCall();
        getRole.init({
          router: '/base/roleresource/get',
          session: vm.session,
          data: {
            pageInfo: {
              pageSize: 100,
              pageNum: 1
            },
            id: vm.roleId
          },
          callback: function (data) {
            if (data.ret.errorCode === 0) {
              data.resourceRows.forEach(function (item) {
                vm.roleArr.push(item.sfsResourceName)
              })
              console.log(vm.roleArr)
            }
          }
        })
      },
      checkUrl(name){
        var vm = this;
        for (var i = 0; i < vm.roleArr.length; i++) {
          if (vm.roleArr[i] == name) {
            return true
          }
        }
        return false
      }
    },
    mounted: function () {
      var vm = this;
      if (sessionStorage.getItem('session')) {
        this.saveSession(sessionStorage.getItem('session'));
      } else {
        this.$router.push('/login')
      }
      this.getArea();
      this.$nextTick(function () {
        document.getElementById('LeftList').style.height = document.getElementById('RightPage').clientHeight + 'px';
      })
      if (vm.roleId) {
        vm.getRole();
      }
    },
    watch: {
      $route(){
        var vm = this;
        if (sessionStorage.getItem('session')) {
          this.saveSession(sessionStorage.getItem('session'));
        }
        if (this.$route.path != '/login') {
          document.body.scrollTop = 0;
          this.getArea();
          document.getElementsByTagName('body')[0].style.height = "";
          document.getElementsByTagName('body')[0].style.overflow = "";
        }
        this.$nextTick(function () {
          document.getElementById('LeftList').style.height = document.getElementById('RightPage').clientHeight + 'px';
        })
        if (vm.$route.path == '/rolemanage') { //判断是否具有权限
          if (vm.checkUrl('管理角色')) {
            return
          }
        } else if (vm.$route.path == '/merchant') {
          if (vm.checkUrl('管理商户')) {
            return
          }
        } else if (vm.$route.path == '/merchantadd') {
          if (vm.checkUrl('添加新商户')) {
            return
          }
        } else if (vm.$route.path == '/merchantchannel') {
          if (vm.checkUrl('导入商户信息')) {
            return
          }
        } else if (vm.$route.path == '/collaborate') {
          if (vm.checkUrl('管理合作行业')) {
            return
          }
        } else if (vm.$route.path == '/collaborateadd') {
          if (vm.checkUrl('新增合作行业客户')) {
            return
          }
        } else if (vm.$route.path == '/department') {
          if (vm.checkUrl('添加部门')) {
            return
          }
        } else if (vm.$route.path == '/departmentmanage') {
          if (vm.checkUrl('管理部门')) {
            return
          }
        } else if (vm.$route.path == '/roleadd') {
          if (vm.checkUrl('添加角色')) {
            return
          }
        } else if (vm.$route.path == '/staffadd') {
          if (vm.checkUrl('添加员工')) {
            return
          }
        } else if (vm.$route.path == '/staffmanage') {
          if (vm.checkUrl('管理员工')) {
            return
          }
        } else if (vm.$route.path == '/order') {
          if (vm.checkUrl('订单管理')) {
            return
          }
        } else if (vm.$route.path == '/channel') {
          if (vm.checkUrl('产品通道基础管理')) {
            return
          }
        } else if (vm.$route.path == '/uploaddir') {
          if (vm.checkUrl('三大目录上传')) {
            return
          }
        } else if (vm.$route.path == '/dirlist') {
          if (vm.checkUrl('三大目录列表')) {
            return
          }
        } else if (vm.$route.path == '/dirmanage') {
          if (vm.checkUrl('三大目录管理')) {
            return
          }
        } else if (vm.$route.path == '/healthstationadd') {
          if (vm.checkUrl('添加卫生站')) {
            return
          }
        } else if (vm.$route.path == '/healthstation') {
          if (vm.checkUrl('管理卫生站')) {
            return
          }
        } else if (vm.$route.path == '/doctoradd') {
          if (vm.checkUrl('添加村医')) {
            return
          }
        } else if (vm.$route.path == '/doctormanage') {
          if (vm.checkUrl('管理村医')) {
            return
          }
        } else if (vm.$route.path == '/paydata') {
          if (vm.checkUrl('支付流水数据')) {
            return
          }
        } else if (vm.$route.path == '/dataadministration') {
          if (vm.checkUrl('绑卡数据管理')) {
            return
          }
        } else if (vm.$route.path == '/datareport') {
          if (vm.checkUrl('数据报表')) {
            return
          }
        } else if (vm.$route.path == '/businessissue') {
          if (vm.checkUrl('业务专区发布')) {
            return
          }
        } else if (vm.$route.path == '/informationup') {
          if (vm.checkUrl('信息专区发布')) {
            return
          }
        } else if (vm.$route.path == '/resourceadd') {
          if (vm.checkUrl('系统资源管理')) {
            return
          }
        } else if (vm.$route.path == '/systemmaintenance') {
          if (vm.checkUrl('系统维护')) {
            return
          }
        } else if (vm.$route.path == '/terminal') {
          if (vm.checkUrl('添加终端')) {
            return
          }
        } else if (vm.$route.path == '/terminalmanage') {
          if (vm.checkUrl('终端管理')) {
            return
          }
        } else {
          return
        }
        this.$alert('您没有访问该页面的权限', '提示', {
          confirmButtonText: '确定',
          callback: function () {
            vm.$router.go(-1);
          }
        })
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

