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
            <el-button class="search">添加新行业用户</el-button>
          </el-col>
          <el-col :span="3">
            <div class="downText">下载所有数据</div>
          </el-col>
          <el-col :span="3">
            <div class="downText">查阅行业客户证件</div>
          </el-col>
        </el-row>
      </div>
      <div class="table-box">
        <el-table :data="tableData" border style="width:100%" max-height="600" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="ordinal" label="序号" width="120">
          </el-table-column>
          <el-table-column prop="merchantId" label="商户编码" width="120"></el-table-column>
          <el-table-column prop="merchantType" label="商户类型" width="120">
          </el-table-column>
          <el-table-column prop="merchantName" label="商户名称" width="180">
          </el-table-column>
          <el-table-column prop="merchantCardType" label="商户证件类型" width="180">
          </el-table-column>
          <el-table-column prop="merchantArea" label="商户地址" width="300">
          </el-table-column>
          <el-table-column prop="legalPerson" label="商户法人" width="180">
          </el-table-column>
          <el-table-column prop="linkman" label="商户联系人" width="180">
          </el-table-column>
          <el-table-column prop="linkmanPhone" label="联系人手机" width="180">
          </el-table-column>
          <el-table-column prop="linkmanEamil" label="联系邮箱" width="180">
          </el-table-column>
          <el-table-column prop="business" label="商户主营业务" width="180">
          </el-table-column>
          <el-table-column prop="accountName" label="商户银行账户名" width="180">
          </el-table-column>
          <el-table-column prop="account" label="银行卡手机号" width="220">
          </el-table-column>
        </el-table>
      </div>
    </div>
</template>
<script type="text/javascript">
  export default{
    data(){
      return {
        tableData:[{
          ordinal: "111"
        }]
      }
    },
    methods: {
      //变化的时候出发 将数据放入multipleSelection中
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
        console.log(this.multipleSelection)
      }
    }
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
<style type="text/css">
  .el-table th{
    text-align:center !important;
  }
  .el-table td{
    text-align:center !important;
  }
</style>
