<template>
  <div id="Merchant">
    <div>
      <el-row :gutter="20">
        <el-col :span="2"><label for="">商户类型</label></el-col>
        <el-col :span="6">
          <select name="" id="">
            <option>请选择商户类型</option>
            <option value="">镇卫生院</option>
            <option value="">村卫生站</option>
            <option value="">药店</option>
            <option value="">其他</option>
          </select>
        </el-col>
        <el-col :span="2">
          <label for="">商户名称</label>
        </el-col>
        <el-col :span="6">
          <input type="text" v-model="name">
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
      </el-row>
      <el-row :gutter="20">
        <el-col :span="2"><label>商户证件号</label></el-col>
        <el-col :span="6"><input type="text" v-model="certificateNo"></el-col>
        <el-col :span="2">
          <el-button class="search" @click="search">搜索</el-button>
        </el-col>
        <el-col :span="3">
          <el-button class="search">
            <router-link to="collaborateadd">添加新商户</router-link>
          </el-button>
        </el-col>
        <el-col :span="3">
          <div class="downText">下载所有数据</div>
        </el-col>
        <el-col :span="3">
          <div class="downText">
            <router-link to="collaborateadd">查阅商户证件</router-link>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="table-box">
      <el-table :data="tableData" border style="width:100%" max-height="600" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="index" label="序号" width="120">
        </el-table-column>
        <el-table-column prop="no" label="商户编码" width="120"></el-table-column>
        <el-table-column prop="companyTypeName" label="商户类型" width="120">
        </el-table-column>
        <el-table-column prop="name" label="商户名称" width="180">
        </el-table-column>
        <el-table-column prop="merchantCardType" label="商户证件类型" width="180">
        </el-table-column>
        <el-table-column prop="address" label="商户地址" width="300">
        </el-table-column>
        <el-table-column prop="corporation" label="商户法人" width="180">
        </el-table-column>
        <el-table-column prop="leader" label="商户联系人" width="180">
        </el-table-column>
        <el-table-column prop="telephone" label="联系人手机" width="180">
        </el-table-column>
        <el-table-column prop="email" label="联系邮箱" width="180">
        </el-table-column>
        <el-table-column prop="summary" label="商户主营业务" width="180">
        </el-table-column>
        <el-table-column prop="accountName" label="商户银行账户名" width="180">
          <!--银行账号信息暂无-->
        </el-table-column>
        <el-table-column prop="" label="银行卡手机号" width="220">
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pageSize"
        layout="total, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>
<script type="text/javascript">
  export default{
    data(){
      return {
        session: sessionStorage.getItem('session'),
        tableData: [{
          index: "111"
        }],
        currentPage: 1,
        pageSize: 20,
        total: 1,
        name: null,
        certificateNo: null
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
      },
      handleSizeChange(val) { //页面
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.getCollaborate();
      },
      getCollaborate(){
        var vm = this;
        var getCollaborate = new RemoteCall();
        getCollaborate.init({
          router: '/company/get',
          session: vm.session,
          data: {
            companyType: 4,
            name: vm.name,
            certificateNo: vm.certificateNo,
            pageInfo: {
              pageSize: 20,
              pageNum: vm.currentPage
            }
          },
          callback: function (data) {
            vm.tableData = data.rows;
            if (data.pageInfo.total) {
              vm.total = data.pageInfo.total;
            }
            for (let i = 0; i < vm.tableData.length; i++) {
              vm.tableData[i].index = (i + 1) + (vm.currentPage - 1) * 20;
            }
          }
        })
      },
      search(){
        this.getCollaborate();
      }
    },
    mounted: function () {
      this.getCollaborate()
    }

  }
</script>
<style lang="scss" scoped>
  #Merchant {
    margin: 15px;
    padding: 20px;
    background: #fff;
    font-size: 14px;
  }

  label {
    display: block;
    text-align: right;
    line-height: 36px;

  }

  select {
    width: 100%;
    height: 36px;
    border: 1px solid #aaa;
    border-radius: 4px;
  }

  .el-button {
    min-width: 100%;
    background: #32BC6F;
    border-radius: 5px;
    width: 120px;
    height: 36px;
    vertical-align: middle;
    color: #fff;
    border: 5px;
    a {
      color: #fff;
      text-decoration: none;
    }
  }

  input {
    width: 100%;
    height: 30px;
    border-radius: 4px;
    border: 1px solid #aaa;
  }

  .el-row {
    margin-bottom: 20px;
  }

  .downText {
    line-height: 36px;
    text-align: center;
  }

  .search {
    margin-left: 20px;
  }

  /*媒体查询做兼容*/
  @media screen and (max-width: 1760px) {
    label {
      font-size: 15px;
      min-width: 5em;
    }
  }

  @media screen and (max-width: 1700px) {
    .el-col-2 {
      width: 10%;
    }
    .el-col-6 {
      width: 23.333333%;
    }
    .el-col-3 {
      width: 15.5%;
    }
    .search {
      margin-left: 12px;
    }
  }

  @media screen and (max-width: 1420px) {
    .el-col-2 {
      width: 12%;
    }
    .el-col-6 {
      width: 21.333333%;
    }
    .el-col-3 {
      width: 17.5%;
    }
    .search {
      margin-left: 12px;
    }
  }
</style>
<style type="text/css">
  .el-table th {
    text-align: center !important;
  }

  .el-table td {
    text-align: center !important;
  }
</style>
