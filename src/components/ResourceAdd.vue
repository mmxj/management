<template>
  <div id="ResourceAdd">
    <el-button @click="runAdd">新增资源</el-button>
    <router-view></router-view>
  </div>
</template>
<script>
  export default{
    data(){
      return {
        session: sessionStorage.getItem('session'),
      }
    },
    methods: {
      runAdd(){
        this.$router.push('/resourceadd/add')
      },
      getResource(){
        var vm = this;
        var resourceGet = new RemoteCall();
        resourceGet.init({
          router: '/base/resource/get',
          session: vm.session,
          data: {
            pageInfo: 100,
            pagesize: 1
          },
          callback: function (data) {
            console.log(data);
          }
        })
      }
    },
    mounted: function () {
//      this.getResource()
    }
  }
</script>
<style scoped>
  #ResourceAdd {
    margin: 15px;
    padding: 15px;
    background: #fff;
    min-height: 800px;
  }

  .el-button {
    background: #49df8b;
    color: #fff;
    border: 0;
  }

</style>
