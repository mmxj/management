<template>
  <div id="Login">
    <div class="bg"></div>
    <div class="loginWindow">
      <el-row>
          <el-col :span="12">
            <img :src="urlImg" alt="">
          </el-col>
      </el-row>
    </div>
  </div>
</template>
<script type="text/javascript">
  export default{
      data(){
        return {
            urlImg:require("@/assets/img/login_bg.png")
        }
      },
      methods:{
        setHeight(){
          document.getElementsByTagName('body')[0].style.height=window.innerHeight+'px';
          document.getElementsByTagName('body')[0].style.overflow="hidden";
        }
      },
      mounted: function(){
        this.setHeight();
      }

  }
</script>
<style lang="scss" scoped>
  #Login{
    background:#FBFCEE;
    position:absolute;
    top:0;
    left:0;
    width: 100%;
    height:100%;
  }
  .bg{
    background:#32BC6F;
    width: 100%;
    height:50%;
    top:0;
    left:0;
    position:absolute;
  }
  .loginWindow{
    width: 1128px;
    height:600px;
    background:#fff;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left:-564px;
    margin-top:-300px;
  }
</style>
