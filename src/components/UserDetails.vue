<template>
  <div id="UserDetails">
    <div class="btn-nav">
      <router-link to="/userdetails">基础信息</router-link>
      <router-link to="/userdetails/social">社保卡信息</router-link>
      <router-link to="/userdetails/bank">银行卡信息</router-link>
      <router-link to="/userdetails/family">家人关系</router-link>
      <router-link to="/userdetails/userrecord">使用记录</router-link>
      <router-link to="/userdetails/usertownship">用户乡银宝</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<style scoped lang="scss">
  #UserDetails{
    padding:20px;
    margin:15px;
    background:#fff;
    min-height:800px;
  }
  .btn-nav{
    a{
      text-decoration: none;
      display:inline-block;
      background:#32BC6F;
      color:#fff;
      height: 30px;
      line-height: 30px;
      border-radius:5px;
      font-size:14px;
      padding:5px 15px;
      margin-right:10px;
    }
  }

</style>
