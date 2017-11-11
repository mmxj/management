<template>
  <div id="Message">
    <img class="logo" :src="urlImg" alt="">
  </div>
</template>
<script type="text/javascript">
  import {mapGetters, mapActions} from 'vuex'
  export default{
    data(){
      return {
        urlImg: require("@/assets/img/20171107181023.png"),
      }
    }
  }
</script>
<style lang="scss" scoped>
  #Message {
    background: #fff;
    margin: 15px;
    /*padding: 20px;*/
    padding-bottom: 70px;
    position: relative;
    img {
      width: 100%;
      /*border: 1px solid #aaa;*/
    }
  }

</style>
