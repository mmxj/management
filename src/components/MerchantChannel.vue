<template>
  <div id="MerchantChannel">
    <div class="upFile">
      上传文件
      <input type="file" id="demo" v-on:change="importf($event)">
    </div>
    <el-button v-on:click="importData">确定上传</el-button>
    <el-table :data="tableData" border width="100%" max-height="800">
      <el-table-column prop="cityCode" label="城市代码" width="120"></el-table-column>
      <el-table-column prop="companyType" label="商户类型" width="150"></el-table-column>
      <el-table-column prop="merchantNo" label="商户编号" width="150"></el-table-column>
      <el-table-column prop="merchantName" label="商户名称" width="200"></el-table-column>
      <el-table-column prop="terminalNo" label="POS终端号" width="200"></el-table-column>
      <el-table-column prop="pSimNo" label="PSAM卡号" width="200"></el-table-column>
      <el-table-column prop="leaderName" label="联系人" width="150"></el-table-column>
      <el-table-column prop="telephone" label="联系电话" width="150"></el-table-column>
      <el-table-column prop="leaderMobile" label="联系手机" width="150"></el-table-column>
      <el-table-column prop="address" label="详细地址" width="300"></el-table-column>
      <el-table-column prop="openDate" label="装机日期" width="150"></el-table-column>
      <el-table-column prop="status" label="状态" width="100"></el-table-column>
      <el-table-column prop="scope" label="适用范围" width="150"></el-table-column>
      <el-table-column prop="enableFlag" label="有效标志" width="100"></el-table-column>
    </el-table>
  </div>
</template>
<!--<script src="http://oss.sheetjs.com/js-xlsx/xlsx.full.min.js"></script>-->
<script>
  //  import xlsx from '../../static/js/table-xlsx'
  import {mapGetters, mapActions} from 'vuex'
  export default{
    data(){
      return {
        tableData: [],
        MerchantUp: null,
      }
    },
    computed: mapGetters(['saveSession']),
    methods: {
      importf(e) {//导入
        var _this = this;
        var obj = e.currentTarget;
        var wb;//读取完成的数据
        var wbData;//存储json
        var rABS = false; //是否将文件读取为二进制字符串
        if (!obj.files) {
          return false;
        }
        var f = obj.files[0];
        var reader = new FileReader();
        reader.onload = function (e) {
          var data = e.target.result;
          if (rABS) {
            wb = XLSX.read(btoa(fixdata(data)), {//手动转化
              type: 'base64'
            });
          } else {
            wb = XLSX.read(data, {
              type: 'binary'
            });
          }
          //wb.SheetNames[0]是获取Sheets中第一个Sheet的名字
          //wb.Sheets[Sheet名]获取第一个Sheet的数据
//            document.getElementById("demo").innerHTML= JSON.stringify( XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]) );
          wbData = JSON.stringify(XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]));
          console.log(wbData);
          _this.createTable(wbData)
        };
        if (rABS) {
          reader.readAsArrayBuffer(f);
        } else {
          reader.readAsBinaryString(f);
        }
      },
      fixdata(data) { //文件流转BinaryString
        var o = "",
          l = 0,
          w = 10240;
        for (; l < data.byteLength / w; ++l) o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w, l * w + w)));
        o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)));
        return o;
      },
      createTable(data) {
        data = JSON.parse(data);
        if (data.length > 0) {
          document.getElementsByClassName("el-table")[0].style.display = "block";
        }
        this.tableData = [];
        for (var i = 0; i < data.length; i++) {
          var table = {};
          if (data[i].城市代码) {
            table.cityCode = data[i].城市代码;
          }
          if (data[i].商户类型) {
            table.companyType = data[i].商户类型;
          }
          if (data[i].商户编号) {
            table.merchantNo = data[i].商户编号;
          }
          if (data[i].商户名称) {
            table.merchantName = data[i].商户名称;
          }
          if (data[i].POS终端号) {
            table.terminalNo = data[i].POS终端号;
          }
          if (data[i].PSAM卡号) {
            table.pSimNo = data[i].PSAM卡号;
          }
          if (data[i].联系人) {
            table.leaderName = data[i].联系人;
          }
          if (data[i].联系电话) {
            table.telephone = data[i].联系电话;
          }
          if (data[i].联系手机) {
            table.leaderMobile = data[i].联系手机;
          }
          if (data[i].详细地址) {
            table.address = data[i].详细地址;
          }
          if (data[i].装机日期) {
            table.openDate = data[i].装机日期;
          }
          if (data[i].状态) {
            table.status = data[i].状态;
          }
          if (data[i].适用范围) {
            table.scope = data[i].适用范围;
          }
          if (data[i].有效标志) {
            table.enableFlag = data[i].有效标志;
          }
          if (JSON.stringify(table) != "{}") {
            this.tableData.push(table);
          }

        }
      },
      importData(){
        var vm = this;
//        var _this=this;//接口改变 这一段废弃
//        console.log(_this.tableData.length)
//        导入数据
//        var num=null;//数据长度
//        var shartNum=0; //起始数据的下标
//        var saveNum=null; //保存数据的总长度
//        var index=0;  //数据的倍数 分批上传
//        if(_this.tableData.length<50){ //判断数据长度是否小于50
//            num=_this.tableData.length; //给数据长度赋值
//            importDatas() //是的话直接调用函数
//        }else{ //否的话执行下面判断
//            saveNum=_this.tableData.length; //将数据总长度赋值
//            function checkNum(){ //检查数字
//                num=50*(index+1); //目标长度等于50*倍数+1
//                shartNum=index*50; //开始长度等于倍数
//                index++; //倍数每次执行都自增
//                if(num<saveNum){ //如果目标长度小于最大长度则执行发送函数并传自身函数过去形成递归函数
//                    _this.importDatas(checkNum);
//                }else{ //如果目标长度已经大于数据本身长度则将本身最大长度替换给目标长度 调用函数
//                    num=saveNum;
//                    _this.importDatas();
//                }
//
//            }
//        }
        this.MerchantUp = new RemoteCall();
        this.MerchantUp.init({
          router: "/company/import",
          session: this.saveSession,
          data: {
            rows: this.tableData
          },
          callback: function (data) {
            if (data.ret.errorCode === 0) {
              vm.$alert('上传成功', '提示', {
                confirmButtonText: '确定',
                callback: function () {
                  document.getElementsByClassName("el-table")[0].style.display = 'none';
                }
              });
            }
          }
        })
      }
    },
    mounted: function () {
      console.log(this.saveSession)
    }
  }
</script>
<style scoped="scoped">
  #MerchantChannel {
    margin: 15px;
    padding: 20px;
    background: #fff;
    min-height: 1000px;
  }

  .el-table {
    margin-top: 20px;
    display: none;
  }

  .upFile {
    display: inline-block;
    position: relative;
    width: 100px;
    background: #32BC6F;
    border-radius: 4px;
    color: #fff;
    border: 0;
    height: 36px;
    line-height: 36px;
    text-align: center;
    font-size: 14px;
  }

  #demo {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    position: absolute;
    cursor: pointer;
  }

  .el-button {
    background: #32BC6F;
    color: #fff;
    border: 0;
    height: 36px;
    font-size: 14px;
    width: 100px;
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
