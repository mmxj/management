<template>
  <div id="DirList">
    <div class="block">
      <el-row :gutter="20">
        <el-col :span="2">
          <label for="">药品名称</label>
        </el-col>
        <el-col :span="6">
          <input type="text" v-model="chName">
        </el-col>
        <el-col :span="2">
          <el-button @click="findName">点击搜索</el-button>
        </el-col>
      </el-row>
      <el-table :data="tableData" border width="100%" max-height="700" align="center">
        <el-table-column prop="companyId" label="医院编号" width="120"></el-table-column>
        <el-table-column prop="itemCode" label="项目类别" width="150"></el-table-column>
        <el-table-column prop="itemNo" label="项目编码" width="150"></el-table-column>
        <el-table-column prop="itemNameCh" label="项目中文名称" width="200"></el-table-column>
        <el-table-column prop="itemNameEn" label="项目英文名称" width="200"></el-table-column>
        <el-table-column prop="commonNames" label="通用名" width="200"></el-table-column>
        <el-table-column prop="specifications" label="规格" width="200"></el-table-column>
        <el-table-column prop="dosageForms" label="剂型" width="150"></el-table-column>
        <el-table-column prop="materialCategory" label="材料类别" width="150"></el-table-column>
        <el-table-column prop="materialType" label="材料分类" width="150"></el-table-column>
        <el-table-column prop="hospitalTypeCode" label="医院分类代码" width="300"></el-table-column>
        <el-table-column prop="unitPrice" label="单价" width="150"></el-table-column>
        <el-table-column prop="unit" label="单位" width="100"></el-table-column>
        <el-table-column prop="internationalCode" label="国际码" width="150"></el-table-column>
        <el-table-column prop="mnemonicCode" label="助记码" width="100"></el-table-column>
        <el-table-column prop="effectiveDate" label="生效日期" width="216"></el-table-column>
        <el-table-column prop="remark" label="备注" width="100"></el-table-column>
        <el-table-column prop="socialSecurityCode" label="社保项目编码" width="200"></el-table-column>
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
<script>
  import {mapGetters} from "vuex"
  export default{
    data(){
      return {
        tableData: [{
          drugName: "111"
        }],
        currentPage: 1,
        pageSize: 20,
        total: 0,
        chName: null
      }
    },
    computed: mapGetters(['saveSession']),
    methods: {
      getCatalog(name){//获取目录数据
        var vm = this;
        var nameCh;
        if (name) {
          nameCh = name;
        } else {
          nameCh = null
        }
        var getCatalog = new RemoteCall();
        getCatalog.init({
          router: "/base/hospital_charging_item_detail/get",
          session: this.saveSession,
          data: {
            itemNameCh: nameCh,
            pageInfo: {
              pageSize: this.pageSize,
              pageNum: this.currentPage
            }
          },
          callback: this.getCatalogCallback,
          errorCallback: function (data) {
            if (data) {
              vm.$router.push('/login')
            }
          }
        })
      },
      getCatalogCallback(data){
        if (data.ret.errorCode === 0) {
          if (data.rows.length == 0) {
            this.total = 0
          }
          if (data.pageInfo.total) {
            this.total = data.pageInfo.total;
          }
          this.tableData = data.rows;
          for (var i = 0; i < this.tableData.length; i++) {
            this.tableData[i].unitPrice = this.tableData[i].unitPrice / 100;
          }
        } else {
          this.$alert(data.ret.errorMessage, '提示', {
            confirmButtonText: '确定'
          })
        }
      },
      handleSizeChange(val) {

        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        if (this.chName == '') {
          this.chName = null
        }
        this.getCatalog(this.chName);
      },
      findName(){
        if (this.chName == '') {
          this.chName = null
        }
        this.currentPage = 1;
        this.getCatalog(this.chName)
      }
    },
    mounted: function () {
      var timer;
      var _this = this;
      clearTimeout(timer);
      timer = setTimeout(function () {
        _this.getCatalog()
      }, 0)

    }
  }
</script>
<style lang="scss" scoped>
  #DirList {
    margin: 15px;
    padding: 20px;
    background: #fff;
    .el-pagination {
      margin: 0 auto;
      text-align: center;
      padding-top: 10px;
    }
  }

  .el-col {
    margin-bottom: 20px;
    label {
      display: block;
      width: 100%;
      text-align: right;
      line-height: 36px;
    }
    input {
      width: 100%;
      height: 30px;
      border-radius: 3px;
      border: 1px solid #aaa;
    }
    select {
      width: 100%;
      height: 36px;
      border-radius: 3px;
      border: 1px solid #aaa;
    }
    button {
      background: #32BC6F;
      border-radius: 5px;
      width: 120px;
      height: 36px;
      vertical-align: middle;
      color: #fff;
      border: 5px;
    }
  }

  @media screen and (max-width: 1760px) {
    label {
      font-size: 15px;
    }
  }

  @media screen and (max-width: 1700px) {
    .el-col-2 {
      width: 10%;
    }
    .el-col-6 {
      width: 21.333333%;
    }
    .el-col-3 {
      width: 15.5%;
    }
    /*.search {*/
    /*margin-left: 12px;*/
    /*width: 12%;*/
    /*}*/
  }

  @media screen and (max-width: 1420px) {
    .el-col-2 {
      width: 10%;
    }
    .el-col-6 {
      width: 21.333333%;
    }
    .el-col-3 {
      width: 17.5%;
    }
    /*.search {*/
    /*margin-left: 12px;*/
    /*}*/
  }
</style>
<style type="text/css">
  .el-table th {
    text-align: center !important;
  }

  .el-table td {
    text-align: center !important;
    word-break: keep-all !important; /* 不换行 */
    white-space: nowrap !important; /* 不换行 */
    overflow: hidden !important; /* 内容超出宽度时隐藏超出部分的内容 */
    text-overflow: ellipsis !important; /* 当对象内文本溢出时显示省略标记(...) ；需与overflow:hidden;一起使用。*/
  }
</style>
