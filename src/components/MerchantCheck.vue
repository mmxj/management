<template>
  <div id="MerchantCheck">
    <div>
      <el-row :gutter="10">
        <el-col :span="6">
          <div class="el-ipt"><input type="text" placeholder="请输入商家名称或编号搜索对应商户图片信息"></div>
        </el-col>
        <el-col :span="2">
          <div class="el-btn">
            <button type="button" @click="getPicture">搜索</button>
          </div>
        </el-col>
      </el-row>
    </div>
    <div>
      <el-row :gutter="10" class="logoContent">
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
    },
    methods: {
      getPicture(){
        var vm = this;
        $.ajax({
          url: "http://192.168.0.137:18081/yxsj-openapi-web/openapi/download/download_base64.do",
          type: 'post',
          data: {
            'download_type': '4',
            'file_name': '1507898492455-xyb_512x512.png',
            'id': '0'
          },
          success: function (res) {
//              console.log()
            if (res) {
              vm.imgUrl = 'data:image/png;base64,' + JSON.parse(res).data;
            }
          }
        })

//       this.$http.post('http://192.168.0.203:18081/yxsj-openapi-web/openapi/upload/upload.do',{
//           'download_type':'1',
//            'file_name':'xyb_512x512.png"',
//            'id':'0'
//       }).then(function(res){
//          console.log(res)
//       }).catch(function(error){
//
//       })
      }
    }
  }
</script>
<style lang="scss" scoped>
  #MerchantCheck {
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

  .logoContent {
    margin: 40px 0;
  }
</style>
