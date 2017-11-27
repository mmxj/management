<template>
  <div id="Merchant">
    <div class="inputVal">
      <el-row :gutter="20">
        <el-col :span="2"><label for="">商户类型</label></el-col>
        <el-col :span="6">

          <el-select v-model="company" filterable placeholder="商户类型" @change="companyChange">
            <el-option v-for="item in companyName" :key="item.value" :label="item.label"
                       :value="item.value"></el-option>
          </el-select>
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
          <el-select v-model="companyTypeName" filterable placeholder="请选择证件类型" @change="companyTypeChange">
            <el-option v-for="item in companyType" :key="item.value" :label="item.label"
                       :value="item.value"></el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="2"><label>商户证件号</label></el-col>
        <el-col :span="6"><input type="text" v-model="certificateNo"></el-col>
        <el-col :span="2">
          <el-button class="search" @click="search">搜索</el-button>
        </el-col>
        <el-col :span="2">
          <el-button class="search addColl">
            <router-link to="/merchantadd">添加新商户</router-link>
          </el-button>
        </el-col>
        <el-col :span="2">
          <el-button @click="deleteMerchant">删除商户</el-button>
        </el-col>
        <el-col :span="2">
          <el-button @click="merchantUpdata">编辑商户</el-button>
        </el-col>
        <el-col :span="2">
          <div class="downText">
            <router-link to="merchantcheck">查阅商户证件</router-link>
          </div>
        </el-col>
        <!--<el-col :span="2">-->
        <!--<div class="downText">下载所有数据</div>-->
        <!--</el-col>-->
      </el-row>
    </div>
    <div class="table-box">
      <el-table :data="tableData" border style="width:100%" max-height="600" @selection-change="handleSelectionChange">
        <el-table-column width="55">
          <template slot-scope="scope">
            <el-radio :label="scope.$index" v-model="radio" @change.native="getIndex(scope.$index)">&nbsp;</el-radio>
          </template>
        </el-table-column>
        <el-table-column prop="index" label="序号" width="120">
        </el-table-column>
        <el-table-column prop="no" label="商户编码" width="120"></el-table-column>
        <el-table-column prop="companyTypeName" label="商户类型" width="120">
        </el-table-column>
        <el-table-column prop="name" label="商户名称" width="180">
        </el-table-column>
        <el-table-column prop="certificateType" label="商户证件类型" width="180">
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
        <el-table-column prop="account" label="商户银行卡号" width="220">
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
  import {mapActions} from 'vuex'
  export default{
    data(){
      return {
        session: sessionStorage.getItem('session'),
        tableData: [{
//          index: "111"
        }],
        currentPage: 1,
        pageSize: 20,
        total: 1,
        name: null,
        radio: null,
        certificateNo: null,
        companyTypeName: null,
        saveMerchantData: null,
        deleteId: null,
        companyType: [{
          value: null,
          label: '请选择证件类型'
        }, {
          value: 1,
          label: '营业执照'
        }, {
          value: 2,
          label: '从业资格证'
        }],
        company: null,
        companyName: [
          {
            value: null,
            label: '请选择商户类型'
          },
          {
            value: 1,
            label: '收单机构'
          }, {
            value: 2,
            label: '支付通道机构'
          }, {
            value: 3,
            label: '社保局'
          }, {
            value: 4,
            label: '医院(卫生站)'
          }, {
            value: 5,
            label: '药店'
          }, {
            value: 6,
            label: '平台'
          }, {
            value: 7,
            label: '卫计局'
          }],
        inputData: {
          companyType: null,
          pageInfo: {
            pageSize: 20,
            pageNum: 1
          }
        }
      }
    },
    methods: {
      //变化的时候出发 将数据放入multipleSelection中,
      ...mapActions(['saveCollaborate', 'saveHealthData']),
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
        vm.inputData.name = vm.name;
        vm.inputData.certificateNo = vm.certificateNo;
//        vm.inputData.pageInfo.pageSize=20;
        vm.inputData.pageInfo.pageNum = vm.currentPage;
        var getCollaborate = new RemoteCall();
        getCollaborate.init({
          router: '/company/get',
          session: vm.session,
          data: vm.inputData,
          callback: function (data) {
            if(data.ret.errorCode===0){
              vm.tableData = data.rows;
              if (data.pageInfo.total) {
                vm.total = data.pageInfo.total;
              }
              for (let i = 0; i < vm.tableData.length; i++) {
                vm.tableData[i].index = (i + 1) + (vm.currentPage - 1) * 20;
                if (vm.tableData[i].certificateType == 1) {
                  vm.tableData[i].certificateType = '营业执照'
                } else if (vm.tableData[i].certificateType == 2) {
                  vm.tableData[i].certificateType = '从业资格证'
                }
              }
            }

          },
          errorCallback: function (data) {
            vm.$router.push('/login')
          }
        })
      },
      search(){
        this.getCollaborate();
      },
      companyTypeChange(data){//证件类型id
        this.inputData.certificateType = data;
//          console.log(data);//没有入参入口
      },
      companyChange(data){
//          console.log(data);
        this.inputData.companyType = data;
      },
      getIndex(index){
        this.saveCollaborate(this.tableData[index].name);
        this.deleteId = this.tableData[index].id;
        this.saveMerchantData = this.tableData[index];
      },
      deleteMerchant(){
        var vm = this;
        if (this.deleteId == '') {
          this.deleteId = null
        }
        if (this.deleteId == null) {
          this.$alert('请选择商户', '提示', {
            confirmButtonText: '确定',
          });
          return
        }
        this.$confirm('此操作将永久删除商户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var del = new RemoteCall();
          del.init({
            router: '/company/delete',
            session: vm.session,
            data: {
              id: vm.deleteId
            },
            callback: function (data) {
              if (data.ret.errorCode === 0) {
                vm.$alert('删除成功', '提示', {
                  confirmButtonText: '确定',
                  callback: function () {
                    vm.getCollaborate();
                    vm.radio = null;
                  }
                });
              } else {
                vm.$alert('删除失败', '提示', {
                  confirmButtonText: '确定',
                });
              }
            }
          })
        }).catch(() => {

        });
      },
      merchantUpdata(){
        var vm = this;
        if (vm.saveMerchantData == null) {
          vm.$alert('请选择商户', '提示', {
            confirmButtonText: '确定',
          });
          return
        }
        this.saveHealthData(vm.saveMerchantData);
        this.$router.push('/merchantupdata')
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

  .inputVal {
    label {
      min-width: 5em;
    }
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

  a {
    text-decoration: none;
    color: #000;
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

  /*.addColl {*/
  /*margin-left: 10px;*/
  /*}*/
  .search {
    /*margin-left: 20px;*/
  }

  /*媒体查询做兼容*/
  @media screen and (max-width: 1760px) {
    label {
      font-size: 15px;
    }
  }

  @media screen and (max-width: 1700px) {
    .el-col-2 {
      width: 12%;
    }
    .el-col-6 {
      width: 21.333333%;
    }
    .el-col-3 {
      width: 15.5%;
    }
    /*.search {*/
    /*margin-left: 12px;*/
    /*}*/
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
    /*.search {*/
    /*margin-left: 0px;*/
    /*}*/
    /*.addColl {*/
    /*margin-left: 30px;*/
    /*}*/
  }
  .el-select {
    width: 100%;
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
