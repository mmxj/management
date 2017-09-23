<template>
  <div id="CollaborateAdd">
      <div>
        <el-row :gutter="20">
          <el-col :span="2"><label for="">客户名称</label></el-col>
          <el-col :span="6"><input type="text" ></el-col>
          <el-col :span="2"><label for="">合作内容</label></el-col>
          <el-col :span="6">
            <select>
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
            <label for="">主营业务</label>
          </el-col>
          <el-col :span="6">
            <input type="text">
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="2">
            <label for="">客户名称</label>
          </el-col>
          <el-col :span="6">
            <input type="text">
          </el-col>
          <el-col :span="2">
            <label for="">商户证件类型</label>
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
          <el-col :span="2">
            <label for="">行业客户编码</label>
          </el-col>
          <el-col :span="6">
            <input type="text">
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="2">
            <label for="">客户法人</label>
          </el-col>
          <el-col :span="6">
            <input type="text">
          </el-col>
          <el-col :span="2">
            <label for="">客户联系人</label>
          </el-col>
          <el-col :span="6">
            <input type="text">
          </el-col>
          <el-col :span="2">
            <label for="">联系电话</label>
          </el-col>
          <el-col :span="6">
            <input type="text">
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="2">
            <label for="">联系邮箱</label>
          </el-col>
          <el-col :span="6">
            <input type="text">
          </el-col>
          <el-col :span="2">
            <label for="">银行账户名</label>
          </el-col>
          <el-col :span="6">
            <input type="text">
          </el-col>
          <el-col :span="2">
            <label for="">银行账号</label>
          </el-col>
          <el-col :span="6">
            <input type="text">
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="2">
            <label for="">客户地址</label>
          </el-col>
          <el-col :span="6">
            <div class="distpicker"><v-distpicker province="省" city="市" area="区"></v-distpicker></div>
          </el-col>
          <el-col :span="16">
            <input type="text">
          </el-col>
        </el-row>
      </div>
    <div class="upload">
      <el-row  :gutter="20">
        <el-col :span="3"><div class="girid-content"><label>营业执照上传</label></div></el-col>
        <el-col :span="8"><div class="girid-content girid-ipt"><input type="text" name=""></div></el-col>
        <el-col :span="3"><div class="upload-btn">浏览选择附件<input type="file" name=""></div></el-col>
        <el-col :span="2"><div class="checkImg">点击查看大图</div></el-col>
      </el-row>
      <el-row  :gutter="20">
        <el-col :span="3"><div class="girid-content"><label>从业资格证上传</label></div></el-col>
        <el-col :span="8"><div class="girid-content girid-ipt"><input type="text" name=""></div></el-col>
        <el-col :span="3"><div class="upload-btn">浏览选择附件<input type="file" name=""></div></el-col>
        <el-col :span="2"><div class="checkImg">点击查看大图</div></el-col>
      </el-row>
      <el-row  :gutter="20">
        <el-col :span="3"><div class="girid-content"><label>银行卡资料上传</label></div></el-col>
        <el-col :span="8"><div class="girid-content girid-ipt"><input type="text" name=""></div></el-col>
        <el-col :span="3"><div class="upload-btn">浏览选择附件<input type="file" name=""></div></el-col>
        <el-col :span="2"><div class="checkImg">点击查看大图</div></el-col>
      </el-row>
      <el-row  :gutter="20">
        <el-col :span="3"><div class="girid-content"><label>法人身份证照片上传</label></div></el-col>
        <el-col :span="8"><div class="girid-content girid-ipt"><input type="text" name=""></div></el-col>
        <el-col :span="3"><div class="upload-btn">浏览选择附件<input type="file" name=""></div></el-col>
        <el-col :span="2"><div class="checkImg">点击查看大图</div></el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="2" :offset="20"><button type="button" class="grid-content upload-btn">添加商户</button></el-col>
      </el-row>
    </div>
  </div>
</template>
<script type="text/javascript">
  export default{

  }
</script>
<style lang="scss" scoped>
  #CollaborateAdd{
    margin:15px;
    padding:40px 60px 20px 20px;
    background:#fff;
  }
  .el-col{
    margin-bottom:20px;
    label{
      display:block;
      width: 100%;
      text-align: right;
      line-height:36px;
    }
    input{
      width: 100%;
      height:30px;
      border-radius:3px;
      border:1px solid #aaa;
    }
    select{
      width: 100%;
      height:36px;
      border-radius:3px;
      border:1px solid #aaa;
    }
  }
  .girid-ipt{
    text-align: left;
  }
  .upload{
    margin-top:75px;
  }
  .girid-btn{
    button{
      background:#32BC6F;
      border-radius:5px;
      width: 120px;
      height:36px;
      vertical-align: middle;
      color:#fff;
      border:5px;
    }
  }
  .table-box{
    margin-top:50px;
  }
  .upload-btn{
    width: 100%;
    overflow:hidden;
    background:#32BC6F;
    height:36px;
    border-radius:4px;
    position:relative;
    line-height:36px;
    color:#fff;
    text-align:center;
    border:0;
    outline:none;
    cursor:pointer;
    input{
      position:absolute;
      width: 100%;
      height:100%;
      top:0;
      left:0;
      opacity:0;
    }
  }
  .checkImg{
    line-height:36px;
  }
</style>
<style type="text/css">
  .distpicker select{ width: 32% !important; height:36px; line-height:36px; padding:0.25rem ; outline:none; border:1px solid #aaa}
</style>
