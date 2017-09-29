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
    <div class="content">
      <el-row :guttter="20">
        <el-col :span="8">
            <span>国家人社部最新社保政策发布</span>
        </el-col>
        <el-col :span="8">
          <span>最新社保金融创新发展</span>
        </el-col>
        <el-col :span="8">
          <span>社保局关于石头村村医非法套现社保卡的处罚公告</span>
        </el-col>
      </el-row>
      <el-row :guttter="20">
        <el-col :span="8">
          <span>国家人社部最新社保政策发布</span>
        </el-col>
        <el-col :span="8">
          <span>最新社保金融创新发展</span>
        </el-col>
        <el-col :span="8">
          <span>社保局关于石头村村医非法套现社保卡的处罚公告</span>
        </el-col>
      </el-row>
      <el-row :guttter="20">
        <el-col :span="8">
          <span>国家人社部最新社保政策发布</span>
        </el-col>
        <el-col :span="8">
          <span>最新社保金融创新发展</span>
        </el-col>
        <el-col :span="8">
          <span>社保局关于石头村村医非法套现社保卡的处罚公告</span>
        </el-col>
      </el-row>
      <el-row :guttter="20">
        <el-col :span="8">
          <span>国家人社部最新社保政策发布</span>
        </el-col>
        <el-col :span="8">
          <span>最新社保金融创新发展</span>
        </el-col>
        <el-col :span="8">
          <span>社保局关于石头村村医非法套现社保卡的处罚公告</span>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script type="text/javascript">
  import {mapGetters,mapActions} from 'vuex'
  export default{
      data(){
          return {
              imgUrl: require("@/assets/img/login_bg.png"),
              myData:'hhhh'
          }
      },
      computed:mapGetters(['show','getData']),
      methods:{
        ...mapActions(['change','saveData']),//设置数据传输
        start(){
            console.log(this.show);//获取store数据
            console.log(this.getData)//获取设置的数据
        }
      },
    mounted:function(){
      this.saveData(this.myData);

      this.change();
      this.start();
    }
  }
</script>
<style lang="scss" scoped>
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
  .content{
    padding:20px;
    .el-col{
      text-align:center;
    }
  }
</style>
