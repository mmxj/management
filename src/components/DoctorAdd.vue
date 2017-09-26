<template>
  <div id="HeadlthStationAdd">
    <div>
      <el-row :gutter="20">
        <el-col :span="3"><label for="">村医名称</label></el-col>
        <el-col :span="5"><input type="text"></el-col>
        <el-col :span="3"><label for="">归属卫生院</label></el-col>
        <el-col :span="5">
          <select>
            <option>
              请选择归属卫生院
            </option>
            <option>
              营业执照
            </option>
            <option>
              个人身份证
            </option>
            <option>
              无证件
            </option>
            <option>
              行业准入资格证
            </option>
            <option>
              其他证件
            </option>
          </select>
        </el-col>
        <el-col :span="7">
          <a href="javascript:" class="addHealth">找不到对应的卫生院？请点击添加</a>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="3">
          <label for="">村医身份证号</label>
        </el-col>
        <el-col :span="5">
          <input type="text">
        </el-col>
        <el-col :span="3">
          <label for="">归属卫生站</label>
        </el-col>
        <el-col :span="5">
          <select>
            <option>
              请选择归属卫生院
            </option>
            <option>
              营业执照
            </option>
            <option>
              个人身份证
            </option>
            <option>
              无证件
            </option>
            <option>
              行业准入资格证
            </option>
            <option>
              其他证件
            </option>
          </select>
        </el-col>
        <el-col :span="7">
          <a href="javascript:" class="addHealth">找不到对应的卫生站？请点击添加</a>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="3">
          <label for="">村医邮箱</label>
        </el-col>
        <el-col :span="5">
          <input type="text">
        </el-col>
        <el-col :span="3">
          <label for="">联系电话</label>
        </el-col>
        <el-col :span="5">
          <input type="text">
        </el-col>
        <el-col :span="2">
          <label for="">村医编码</label>
        </el-col>
        <el-col :span="5">
          <input type="text">
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="3">
          <label for="">银行账号名</label>
        </el-col>
        <el-col :span="5"><input type="text"></el-col>
        <el-col :span="3">
          <label for="">银行账号</label>
        </el-col>
        <el-col :span="5">
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
      <el-row :gutter="20">
        <el-col :span="2" :offset="20"><button type="button" class="grid-content upload-btn">添加村医</button></el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
  export default{

  }
</script>
<style lang="scss">
  #HeadlthStationAdd{
    margin: 15px;
    padding: 20px;
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
  .addHealth{
    display:block;
    line-height:36px;
    text-indent:2em;
  }
  .checkImg{
    line-height:36px;
  }
  .el-col-3 {
    width: 11%;
  }
  .el-col-5 {
    width: 22.333%;
  }
  /*媒体查询做兼容*/
  @media screen and (max-width: 1790px) {
    label{
      font-size:15px;
      min-width: 5em;
    }
  }
  @media screen and (max-width: 1700px) {
    .el-col-2{
      width:10%;
    }
    .el-col-6{
      width:23.333333%;
    }
    .el-col-3 {
      width: 14%;
    }
    .el-col-5{
      width:17.8333%;
    }
    .addHealth{
      text-indent:1em;
    }
  }

</style>
<style type="text/css">
  .distpicker select{ width: 32% !important; height:36px; line-height:36px; padding:0.25rem ; outline:none; border:1px solid #aaa}
  @media screen and (max-width: 1700px) {
    .distpicker select{
      width: 31% !important;
    }
  }
</style>
