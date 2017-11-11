<template>
  <div id="Channel">
    <el-table :data="tableData" border style="width:100%" @cell-click="cellActive">
      <el-table-column prop="no" label="通道编号" width="150">
        <template slot-scope="scope">
          <input type="text" @focus="inputChange(scope.$index)" @change="inputChange(scope.$index)"
                 v-model="scope.row.no">
        </template>
      </el-table-column>
      <el-table-column prop="name" label="通道名称">
        <template slot-scope="scope">
          <input type="text" @focus="inputChange(scope.$index)" @change="inputChange(scope.$index)"
                 v-model="scope.row.name">
        </template>
      </el-table-column>
      <el-table-column prop="callerName" label="调用者名称">
        <template slot-scope="scope">
          <input type="text" @focus="inputChange(scope.$index)" @change="inputChange(scope.$index)"
                 v-model="scope.row.callerName">
        </template>
      </el-table-column>
      <el-table-column prop="callerUrl" label="调用者回调地址" width="150">
        <template slot-scope="scope">
          <input type="text" @focus="inputChange(scope.$index)" @change="inputChange(scope.$index)"
                 v-model="scope.row.callerUrl">
        </template>
      </el-table-column>
      <el-table-column prop="companyName" label="合作对象">
        <template slot-scope="scope">
          <!--<input type="text" :remote="!btnArr[scope.$index]"  remote  @focus="inputChange(scope.$index)" @change="inputChange(scope.$index)" v-model="scope.row.companyName">-->
          <el-select filterable :remote="!btnArr[scope.$index]" reserve-keyword :remote-method="getcompanyName"
                     @focus="inputChange(scope.$index)" @change="inputChange(scope.$index)"
                     v-model="scope.row.companyName">
            <el-option v-for="item in collaborate" :key="item.value" :label="item.label"
                       :value="item.label"></el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column prop="summary" label="通道用途">
        <template slot-scope="scope">
          <input type="text" @focus="inputChange(scope.$index)" @change="inputChange(scope.$index)"
                 v-model="scope.row.summary">
        </template>
      </el-table-column>
      <el-table-column prop="rate" label="通道费率">
        <template slot-scope="scope">
          <input type="text" @focus="inputChange(scope.$index)" @change="inputChange(scope.$index)"
                 v-model="scope.row.rate">
        </template>
      </el-table-column>
      <el-table-column prop="enableFlag" label="通道状态">
        <!--有效标志 0为无效 1为有效-->
        <template slot-scope="scope">
          <!--<input type="text" @focus="inputChange(scope.$index)" @change="inputChange(scope.$index)" v-model="scope.row.enableFlag">-->
          <el-select filterable v-model="scope.row.enableFlag" @change="selectChange(scope.$index)">
            <el-option v-for="item in enableFlag" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column prop="businessType" label="对应订单类型">
        <template slot-scope="scope">
          <!--<input type="text" @focus="inputChange(scope.$index)" @change="inputChange(scope.$index)" v-model="scope.row.businessType">-->
          <el-select filterable v-model="scope.row.businessType" @change="selectChange(scope.$index)">
            <el-option v-for="item in businessType" :key="item.value" :label="item.label"
                       :value="item.value"></el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button
            size="small"
            @click="handleEdit(scope.$index, scope.row , scope)" :disabled="btnArr[scope.$index]"><span
            ref="btn">保存</span>
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
        tdData: null,
        collaborate: [],
        enableFlag: [{
          value: 0,
          label: '不可用'
        }, {
          value: 1,
          label: '可用'
        }
        ],
        businessType: [{
          value: 1,
          label: '缴费'
        }, {
          value: 2,
          label: '挂号'
        }, {
          value: 3,
          label: '门诊'
        }]
      }
    },
    methods: {
      addNewChannel(){
        this.tableData.push({channelId: (this.tableData.length + 1), newData: 1});
        this.btnArr.push(true)
      },
      getCollaborate(name){
        var vm = this;
        vm.collaborate = [];
        var collaborateGet = new RemoteCall();
        collaborateGet.init({
          router: '/company/get',
          session: vm.session,
          data: {
            pageInfo: {
              pageSize: 100,
              pageNum: 1
            },
            name: name
          },
          callback: function (data) {
           if(data.rows){
             if (data.rows.length == 0) {
               vm.collaborate = [];
             }
             for (var i = 0; i < data.rows.length; i++) {
               var options = {};
               options.value = data.rows[i].id;
               options.label = data.rows[i].name;
               vm.$set(vm.collaborate, i, options);
             }
           }
          }
        })
      },
      inputChange(index){
//          this.tableData[index].btn='保存';
        this.$set(this.btnArr, index, false)
        this.$nextTick(function () {
//          console.log(this.tableData);
        })
      },
      selectChange(index){
        this.$set(this.btnArr, index, false);
//         if(this.tableData[index].companyName=""){
//           this.tableData[index].companyName=null;
//         }
//         if(this.tableData[index].companyName){
//           this.getCollaborate(this.tableData[index].companyName)
//         }
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
            if (data.ret.errorCode === 0) {
              vm.$alert('保存成功', '提示', {
                confirmButtonText: '确定',
                callback: function () {
                  vm.checkChannel()
                }
              });
            } else {
              vm.$alert(data.ret.errorMessage, '提示', {
                confirmButtonText: '确定',
                callback: function () {
                  vm.checkChannel()
                }
              });
            }
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
            vm.$alert('保存成功', '提示', {
              confirmButtonText: '确定'
            });
            vm.checkChannel();
            vm.getCollaborate(null);
          }
        })
      },
      deleteChannel(str){ //删除
        var vm = this;
        if (str) {
          var addChannel = new RemoteCall();
          addChannel.init({
            router: '/base/RouteApi/delete',
            session: this.session,
            data: {
              id: str
            },
            callback: function (data) {
              vm.$alert('删除成功', '提示', {
                confirmButtonText: '确定'
              });
              vm.checkChannel();
            }
          })
        } else {
          vm.checkChannel();
        }

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
                vm.btnArr[i] = true
                vm.tableData[i].rate = vm.tableData[i].rate * 100 + '%';
              }
            }
          },
          errorCallback: function (data) {
            if (data) {
              vm.$router.push('/login')
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
          if (isNaN(parseInt(row.rate))) {
            this.$alert('请输入对应的比例比如：10%', '提示', {
              confirmButtonText: '确定'
            });
            row.rate = null;
            return;
          } else {
            row.rate = parseInt(row.rate) / 100;
          }

        }
        if (row.companyId == null) {
          row.rate = row.rate * 100 + '%';
          if (row.enableFlag == 1) {
            row.enableFlag = '可用';
          } else if (row.enableFlag === 0) {
            row.enableFlag = '不可用';
          }
          ;
          if (row.businessType == 1) {
            row.businessType = '缴费';
          }
          else if (row.businessType == 2) {
            row.businessType = '挂号';
          }
          else if (row.businessType == 3) {
            row.businessType = '门诊';
          }
          this.$alert('合作公司不存在，请添加', '提示', {
            confirmButtonText: '确定',
          });
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
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

          this.deleteChannel(row.id);

        }).catch(() => {


        });

      },
      getcompanyName(data){
//        this.collaborate = [];
        if (data != "") {
          this.getCollaborate(data);
        } else {
          this.getCollaborate(null);
        }
      }
    },
    mounted: function () {
      this.checkChannel();
      this.getCollaborate(null)
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
