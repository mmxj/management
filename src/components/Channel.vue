<template>
  <div id="Channel">
    <el-table :data="tableData" border style="width:100%" @cell-click="cellActive">
      <el-table-column prop="no" label="通道编号" width="150">
        <template scope="scope">
          <input type="text" @change="inputChange(scope.$index)" v-model="scope.row.no">
        </template>
      </el-table-column>
      <el-table-column prop="name" label="通道名称">
        <template scope="scope">
          <input type="text" @change="inputChange(scope.$index)" v-model="scope.row.name">
        </template>
      </el-table-column>
      <el-table-column prop="callerName" label="调用者名称">
        <template scope="scope">
          <input type="text" @change="inputChange(scope.$index)" v-model="scope.row.callerName">
        </template>
      </el-table-column>
      <el-table-column prop="callerUrl" label="调用者回调地址">
        <template scope="scope">
          <input type="text" @change="inputChange(scope.$index)" v-model="scope.row.callerUrl">
        </template>
      </el-table-column>
      <el-table-column prop="companyName" label="合作对象">
        <template scope="scope">
          <input type="text" @change="inputChange(scope.$index)" v-model="scope.row.companyName">
        </template>
      </el-table-column>
      <el-table-column prop="summary" label="通道用途">
        <template scope="scope">
          <input type="text" @change="inputChange(scope.$index)" v-model="scope.row.summary">
        </template>
      </el-table-column>
      <el-table-column prop="rate" label="通道费率">
        <template scope="scope">
          <input type="text" @change="inputChange(scope.$index)" v-model="scope.row.rate">
        </template>
      </el-table-column>
      <el-table-column prop="enableFlag" label="通道状态">
        <!--有效标志 0为无效 1为有效-->
        <template scope="scope">
          <input type="text" @change="inputChange(scope.$index)" v-model="scope.row.enableFlag">
        </template>
      </el-table-column>
      <el-table-column prop="businessType" label="对应订单类型">
        <template scope="scope">
          <input type="text" @change="inputChange(scope.$index)" v-model="scope.row.businessType">
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template scope="scope">
          <el-button
            size="small"
            @click="handleEdit(scope.$index, scope.row , scope)"><span ref="btn">{{btnArr[scope.$index]}}</span>
          </el-button>
          <el-button
            size="small"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="add" @click="addNewChannel">+</div>
  </div>
</template>
<script type="text/javascript">
  export default{
    data(){
      return {
        session: sessionStorage.getItem('session'),
        tableData: [],
        inputValue: [],
        btnArr: [],
        tdData: null
      }
    },
    methods: {
      addNewChannel(){
        this.tableData.push({channelId: (this.tableData.length + 1), newData: 1});
        this.btnArr.push('编辑')
      },
      inputChange(index){
//          this.tableData[index].btn='保存';
        this.$set(this.btnArr, index, '保存')
        this.$nextTick(function () {
          console.log(this.tableData);
        })
      },
      cellActive(row){
        if (row.channelId > 20) { //20代表请求回来的条数
          this.tdIndex = row.channelId % 20;
        } else {
          this.tdIndex = row.channelId
        }
      },
      addChannelData(str){//添加
        var vm = this;
        var addChannel = new RemoteCall();
        addChannel.init({
          router: '/base/RouteApi/add',
          session: this.session,
          data: str,
          callback: function (data) {
            console.log(data);
            vm.checkChannel();
          }
        })
      },
      changeChannelData(str){//修改
        var vm = this;
        console.log(str);
        var vm = this;
        var tdName = vm.tdName
        var addChannel = new RemoteCall();
        addChannel.init({
          router: '/base/RouteApi/update',
          session: this.session,
          data: str,
          callback: function (data) {
            console.log(data);
            vm.checkChannel();
          }
        })
      },
      deleteChannel(str){
        var vm = this;
        var addChannel = new RemoteCall();
        addChannel.init({
          router: '/base/RouteApi/delete',
          session: this.session,
          data: {
            id: str
          },
          callback: function (data) {
            console.log(data);
            vm.checkChannel();
          }
        })
      },
      checkChannel(){//查询接口内容
        var vm = this;
        var addChannel = new RemoteCall();
        addChannel.init({
          router: '/base/RouteApi/get',
          session: this.session,
          data: {
            pageInfo: {
              pageSize: 20,
              pageNum: 1
            }
          },
          callback: function (data) {
            if (data.rows) {
              vm.tableData = data.rows;
              for (var i = 0; i < vm.tableData.length; i++) {
                vm.btnArr[i] = '编辑'
                if (vm.tableData[i].enableFlag == 1) {
                  vm.tableData[i].enableFlag = '可用'
                } else {
                  vm.tableData[i].enableFlag = '不可用'
                }
                switch (vm.tableData[i].businessType) {
                  case 1:
                    vm.tableData[i].businessType = '缴费';
                    break;
                  case 2:
                    vm.tableData[i].businessType = '挂号';
                    break;
                  case 3:
                    vm.tableData[i].businessType = '门诊';
                    break;
                }
                vm.tableData[i].rate = vm.tableData[i].rate * 100 + '%';
              }
            }
          }
        })
      },
      companyId(str){//公司id获取检查
        var thisId = null;
        var companyId = new RemoteCall();
        companyId.init({
          router: '/company/get',
          session: this.session,
          data: {
            name: str
          },
          callback: function (data) {
            if (data.rows.length > 0) {
              thisId = data.rows[0].id;
            }
          }
        });
        return thisId;
      },
      handleEdit(index, row, data){
        row.companyId = this.companyId(row.companyName);
        if (row.rate) {
          row.rate = parseInt(row.rate) / 100;
        }
        if (row.enableFlag == '可用') {
          row.enableFlag = 1;
        } else if (row.enableFlag == '不可用') {
          row.enableFlag = 0;
        } else {
          alert('通道状态只能填写“可用”或“不可用”')
        }

        switch (row.businessType) {
          case '缴费':
            row.businessType = 1;
            break;
          case '挂号':
            row.businessType = 2;
            break;
          case '门诊':
            row.businessType = 3;
            break;
          default :
            alert('对应订单类型只能填写 “缴费” ，“挂号” ，“门诊”')
        }
        if (row.companyId == null) {
          alert('合作公司不存在，请添加');
          return
        }
        if (row.newData == 1) {//如果数据有newData标志调用添加接口
          //要对数据进行判断和分类
          this.addChannelData(row);//调用添加接口
        }
        else {
          this.changeChannelData(row)//调用修改接口
        }
      },
      handleDelete(index, row) {
//        console.log(row.id);
        this.deleteChannel(row.id);
      }
    },
    mounted: function () {
      this.checkChannel()
    }
  }
</script>
<style lang="scss" scoped>
  #Channel {
    margin: 15px;
    padding: 20px;
    background: #fff;
    .add {
      text-align: center;
      color: #9c9c9c;
      font-size: 40px;
      margin-left: 30px;
      margin-top: 10px;
      line-height: 25px;
      border: 1px solid #9c9c9c;
      width: 30px;
      height: 30px;
      border-radius: 20px;
      cursor: pointer;
    }
    input {
      width: 100%;
      height: 100%;
      border: 0;
      background: transparent;
      cursor: pointer;
    }
  }

  .el-table {
  }

</style>
<style type="text/css">
  .el-table td {
    text-align: center !important;
  }

  .el-table th {
    text-align: center !important;
  }
</style>
