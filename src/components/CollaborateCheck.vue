<template>
  <div id="CollaborateCheck">
    <div>
      <el-row :gutter="10">
        <el-col :span="6">
          <div class="el-ipt"><input type="text" placeholder="请输入行业客户的名称或编号搜索对应行业客户图片信息"></div>
        </el-col>
        <el-col :span="2">
          <div class="el-btn">
            <button type="button">搜索</button>
          </div>
        </el-col>
      </el-row>
    </div>
    <div>
      <el-row :gutter="10">
        <el-col :span="16" :offset="4">
          <img class="MerchantImg" :src="imgUrl"/>
        </el-col>
      </el-row>
      <el-row class="el-page-btns">
        <el-col :offset="9" :span="2">
          <el-button>上一页</el-button>
        </el-col>
        <el-col :span="2">
          <div class="el-page-title">营业执照照片</div>
        </el-col>
        <el-col :span="2">
          <el-button>下一页</el-button>
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
<style lang="scss" scoped>
  #CollaborateCheck {
    margin: 15px;
    padding: 20px;
    background: #fff;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px;
  }

  .el-ipt {
    input {
      width: 100%;
      height: 32px;
      border: 1px solid #aaa;
      border-radius: 4px;
    }
  }

  .el-btn {
    button {
      width: 100%;
      height: 36px;
      background: #32BC6F;
      color: #fff;
      border: 0;
      border-radius: 4px;
    }
  }

  .MerchantImg {
    width: 100%;

  }

  .el-page-btns {
    text-align: center;
  }

  .el-page-title {
    line-height: 36px;
  }
</style>
