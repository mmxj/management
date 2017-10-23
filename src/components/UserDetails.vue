<template>
  <div id="UserDetails">
    <div class="btn-nav">
      <router-link to="/userdetails">基础信息</router-link>
      <router-link to="/userdetailssocial">社保卡信息</router-link>
      <router-link to="/userdetailsbank">银行卡信息</router-link>
      <router-link to="/userdetailsfamily">家人关系</router-link>
      <router-link to="/userdetailsuserrecord">使用记录</router-link>
      <router-link to="/userdetailsusertownship">用户乡银宝</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
  import {mapGetters, mapActions} from 'vuex'
  export default{
    data(){
      return {}
    },
    computed: mapGetters(['userData']),
    methods: {
      getUserData(){

      }
    },
    mounted: function () {

    }
  }
</script>
<style scoped lang="scss">
  #UserDetails {
    padding: 20px;
    margin: 15px;
    background: #fff;
    min-height: 800px;
  }

  .btn-nav {
    a {
      text-decoration: none;
      display: inline-block;
      background: #32BC6F;
      color: #fff;
      height: 30px;
      line-height: 30px;
      border-radius: 5px;
      font-size: 14px;
      padding: 5px 15px;
      margin-right: 10px;
    }
  }

</style>
