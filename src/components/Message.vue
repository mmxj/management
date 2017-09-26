<template>
  <div id="Message">
    <div id="banner">
      <el-row :gutter="40">
        <el-col :span="8">
          <img :src="imgUrl" alt="">
        </el-col>
        <el-col :span="8">
          <img :src="imgUrl" alt="">
        </el-col>
        <el-col :span="8">
          <img :src="imgUrl" alt="">
        </el-col>
      </el-row>
      <el-row :gutter="40">
        <el-col :span="8">
          <p>广州健民药业专项大特惠——流感专用药限时8折</p>
        </el-col>
        <el-col :span="8">
          <p>广州健民药业专项大特惠——流感专用药限时8折</p>
        </el-col>
        <el-col :span="8">
          <p>广州健民药业专项大特惠——流感专用药限时8折</p>
        </el-col>
      </el-row>
    </div>

  </div>
</template>
<script type="text/javascript">
  export default{
      data(){
          return {
              imgUrl: require("@/assets/img/login_bg.png")
          }
      }
  }
</script>
<style lang="scss">
  #Message{
    background:#fff;
    margin:15px;
    padding:20px;
    img{
      width: 100%;
      max-height:350px;
      border:1px solid #aaa;
    }
  }

  #banner{
    p{
      text-align:center;
      line-height:30px;
    }
  }
</style>
