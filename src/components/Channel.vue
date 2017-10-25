<template>
  <div id="Channel">
    <el-table :data="tableData" border style="width:100%" @cell-click="cellActive">
      <el-table-column prop="no" label="通道编号" width="150">
        <template scope="scope">
          <input type="text" @focus="inputFocus(scope.row.channelName,'channelName')"
                 @blur="inputBlur(scope.row.channelName)" :placeholder="scope.row.channelName"
                 v-model="scope.row.channelName">
        </template>
      </el-table-column>
      <el-table-column prop="name" label="通道名称">
        <template scope="scope">
          <input type="text" @focus="inputFocus(scope.row.channelName,'channelName')"
                 @blur="inputBlur(scope.row.channelName)" :placeholder="scope.row.channelName"
                 v-model="scope.row.channelName">
        </template>
      </el-table-column>
      <el-table-column prop="companyId" label="合作对象">
        <template scope="scope">
          <input type="text" @focus="inputFocus(scope.row.collaborator,'collaborator')"
                 @blur="inputBlur(scope.row.collaborator)" :placeholder="scope.row.collaborator"
                 v-model="scope.row.collaborator">
        </template>
      </el-table-column>
      <el-table-column prop="summary" label="通道用途">
        <template scope="scope">
          <input type="text" @focus="inputFocus(scope.row.purpose,'purpose')" @blur="inputBlur(scope.row.purpose)"
                 :placeholder="scope.row.purpose" v-model="scope.row.purpose">
        </template>
      </el-table-column>
      <el-table-column prop="rate" label="通道费率">
        <template scope="scope">
          <input type="text" @focus="inputFocus(scope.row.expense,'expense')" @blur="inputBlur(scope.row.expense)"
                 :placeholder="scope.row.expense" v-model="scope.row.expense">
        </template>
      </el-table-column>
      <el-table-column prop="enableFlag" label="通道状态">
        <!--有效标志 0为无效 1为有效-->
        <template scope="scope">
          <input type="text" @focus="inputFocus(scope.row.state,'state')" @blur="inputBlur(scope.row.state)"
                 :placeholder="scope.row.state" v-model="scope.row.state">
        </template>
      </el-table-column>
      <el-table-column prop="businessType" label="对应订单类型">
        <template scope="scope">
          <input type="text" @focus="inputFocus(scope.row.orderType,'orderType')" @blur="inputBlur(scope.row.orderType)"
                 :placeholder="scope.row.orderType" v-model="scope.row.orderType">
        </template>
      </el-table-column>
    </el-table>
    <div class="add" @click="addChannel">+</div>
  </div>
</template>
<script type="text/javascript">
  export default{
    data(){
      return {
        session: sessionStorage.getItem('session'),
        tableData: [],
        inputValue: [],
        tableCheck: [],
      }
    },
    methods: {
      addChannel(){
        this.tableData.push({channelId: (this.tableData.length + 1)});
      },
      inputBlur(data){
        if (data != null || data != '') {
          var name = this.tdName;
          this.tableData[this.tdIndex - 1][this.tdName] = data;
          this.addChannel(data);//调用添加接口
        }
      },
      inputFocus(data, name){
        this.tdName = name;
      },
      cellActive(row){
        if (row.channelId > 20) { //20代表请求回来的条数
          this.tdIndex = row.channelId % 20;
        } else {
          this.tdIndex = row.channelId
        }
        console.log(this.tdIndex);
      },
      addChannel(str){
////          添加前先检查是否存在
//          this.checkChannel();
        if (this.tdIndex - 1 > this.tableCheck.length) {//点击栏的下标大于查询回来的接口的数量 那就进行添加
          this.addChannelData(str);
        } else {//否的话继续修改
          this.changeChannelData(str);
        }
      },
      addChannelData(str){//添加
        var vm = this;
        var tdName = vm.tdName
        var addChannel = new RemoteCall();
        addChannel.init({
          router: '/base/RouteApi/add',
          session: this.session,
          data: {
            tdName: str
          },
          callback: function (data) {
            console.log(data);
            vm.checkChannel();
          }
        })
      },
      changeChannelData(str){//修改
        var vm = this;
        var tdName = vm.tdName
        var addChannel = new RemoteCall();
        addChannel.init({
          router: '/base/RouteApi/update',
          session: this.session,
          data: {
            tdName: str
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
              vm.tableCheck = data.rows;
            }
          }
        })
      }
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
