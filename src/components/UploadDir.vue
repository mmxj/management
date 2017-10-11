<template>
  <div id="UploadDir">
      <el-row :gutter="20">
        <el-col :span="3"><label for="">使用范围：</label></el-col>
        <el-col :span="6">
          <div class="distpicker"><v-distpicker province="省" city="市" area="区"></v-distpicker></div>
        </el-col>
        <el-col :span="6">
          <input type="text" placeholder="请填写所属镇区或街区办">
        </el-col>
      </el-row>
      <el-row :gutter="20">
          <el-col :span="3">
            <label for="">文件标识名称：</label>
          </el-col>
          <el-col :span="6">
            <input type="text">
          </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :offset="3" :span="3">
          <el-button>浏览上传三大目录列表</el-button>
        </el-col>
        <el-col :span="3">
          <el-button>导入目录列表</el-button>
        </el-col>
      </el-row>
  </div>
</template>
<script type="text/javascript">
  export default{
      data(){
          return {

          }
      },
      methods:{


      },
      mounted:function(){

    }
  }
</script>
<style lang="scss" scoped>
  #UploadDir{
    margin:15px;
    padding:20px;
    background:#fff;
  }
  .el-row{
    margin-top:20px;
    input{
      width: 100%;
      height:32px;
      border:1px solid #aaa;
      border-radius:4px;
      text-indent:1em;
    }
    .el-button{
      border:0;
      color:#fff;
      background:#32BC6F;
    }
  }
  label{
    display:block;
    text-align: right;
    height:36px;
    line-height:36px;
  }
  @media screen and (max-width: 1450px) {
    .el-col-3 {
      width: 17.5%;
    }
    .el-col-offset-3{
      margin-left:17.5%;
    }
  }
</style>
<style type="text/css">
  .distpicker select{ width: 32% !important; height:36px; line-height:36px; padding:0.25rem ; outline:none; border:1px solid #aaa}
  @media screen and (max-width: 1450px) {
    .distpicker select{
      width: 31% !important;
    }
  }
</style>

