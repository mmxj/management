<template>
    <div id="Collaborate">
      <div>
        <el-row :gutter="20">
          <el-col :span="2"><label for="">合作内容</label></el-col>
          <el-col :span="6">
            <select name="" id="">
              <option>请选择合作内容</option>
              <option>资源对接</option>
              <option>通道对接</option>
              <option>地区合作</option>
              <option>业务代理</option>
              <option>产品对接</option>
              <option>推广渠道</option>
              <option>其他合作</option>
              <option>社保局</option>
              <option>人民银行</option>
              <option>其他政府单位</option>
            </select>
          </el-col>
          <el-col :span="2">
            <label for="">行业客户名称</label>
          </el-col>
          <el-col :span="6">
            <input type="text">
          </el-col>
          <el-col :span="2">
            <label for="">客户证件类型</label>
          </el-col>
          <el-col :span="6">
            <select>
              <option>请选择证件类型</option>
              <option>营业执照</option>
              <option>个人身份证</option>
              <option>无证件</option>
              <option>行业准入资格证</option>
              <option>其他证件</option>
            </select>
          </el-col>
        </el-row>
        <el-row :gutter="20" >
          <el-col :span="2"><label>客户证件号</label></el-col>
          <el-col :span="6"><input type="text"></el-col>
          <el-col :span="2">
            <el-button class="search">搜索</el-button>
          </el-col>
          <el-col :span="3">
            <el-button>添加新行业用户</el-button>
          </el-col>
          <el-col :span="3">
            <div class="downText">下载所有数据</div>
          </el-col>
          <el-col :span="3">
            <div class="downText">查阅行业客户证件</div>
          </el-col>
        </el-row>
      </div>
    </div>
</template>
<script type="text/javascript">
  export default{

  }
</script>
<style lang="scss" scoped>
  #Collaborate{
    margin:15px;
    padding:20px;
    background:#fff;
    font-size:14px;
  }
  label{
    display: block;
    text-align: right;
    line-height:36px;

  }
  select{
    width: 100%;
    height:36px;
    border:1px solid #aaa;
    border-radius:4px;
  }
  .el-button{
    min-width: 100%;
  }
  input{
    width: 100%;
    height:30px;
    border-radius:4px;
    border:1px solid #aaa;
  }
  .el-row{
    margin-bottom:20px;
  }
  .downText{
    line-height:36px;
    text-align:center;
  }
  .search{
    margin-left:20px;
  }
</style>
