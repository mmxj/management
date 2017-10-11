<template>
  <div id="MerchantChannel">
    <div class="upFile">
      上传文件
      <input type="file" id="demo" v-on:change="importf($event)">
    </div>
    <el-button v-on:click="importData">确定上传</el-button>
    <el-table :data="tableData" border width="100%">
      <el-table-column prop="cityId" label="城市代码" width="120"></el-table-column>
      <el-table-column prop="consultType" label="商户类型" width="150"></el-table-column>
      <el-table-column prop="consultNumber" label="商户编号" width="150"></el-table-column>
      <el-table-column prop="consultName" label="商户名称" width="200"></el-table-column>
      <el-table-column prop="POSNumber" label="POS终端号" width="200"></el-table-column>
      <el-table-column prop="PSAMCard" label="PSAM卡号" width="200"></el-table-column>
      <el-table-column prop="linkMan" label="联系人" width="150"></el-table-column>
      <el-table-column prop="linkPhone" label="联系电话" width="150"></el-table-column>
      <el-table-column prop="linkMobile" label="联系手机" width="150"></el-table-column>
      <el-table-column prop="address" label="详细地址" width="300"></el-table-column>
      <el-table-column prop="installDate" label="装机日期" width="150"></el-table-column>
      <el-table-column prop="state" label="状态" width="100"></el-table-column>
      <el-table-column prop="range" label="适用范围" width="150"></el-table-column>
      <el-table-column prop="effective" label="有效标志" width="100"></el-table-column>
    </el-table>
  </div>
</template>
<!--<script src="http://oss.sheetjs.com/js-xlsx/xlsx.full.min.js"></script>-->
<script>
//  import xlsx from '../../static/js/table-xlsx'
  import {mapGetters,mapActions} from 'vuex'
  export default{
      data(){
          return {
              tableData:[],
              MerchantUp:null,
          }
      },
      computed:mapGetters(['saveSession']),
      methods:{
      importf(e) {//导入
          var _this=this;
          var obj = e.currentTarget;
          var wb;//读取完成的数据
          var wbData;//存储json
          var rABS = false; //是否将文件读取为二进制字符串
          if(!obj.files) {
            return false;
          }
          var f = obj.files[0];
          var reader = new FileReader();
          reader.onload = function(e) {
            var data = e.target.result;
            if(rABS) {
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
            wbData=JSON.stringify( XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]));
            console.log(wbData);
            _this.createTable(wbData)
          };
          if(rABS) {
            reader.readAsArrayBuffer(f);
          } else {
            reader.readAsBinaryString(f);
          }
        },
        fixdata(data) { //文件流转BinaryString
          var o = "",
            l = 0,
            w = 10240;
          for(; l < data.byteLength / w; ++l) o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w, l * w + w)));
          o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)));
          return o;
        },
        createTable(data) {
          data=JSON.parse(data);
          if(data.length>0){
              document.getElementsByClassName("el-table")[0].style.display="block";
          }
          this.tableData=[];
          for(var i=0;i<data.length;i++){
            var table={};
            table.cityId=data[i].城市代码;
            table.consultType=data[i].商户类型;
            table.consultNumber=data[i].商户编号;
            table.consultName=data[i].商户名称;
            table.POSNumber=data[i].POS终端号;
            table.PSAMCard=data[i].PSAM卡号;
            table.linkMan=data[i].联系人;
            table.linkPhone=data[i].联系电话;
            table.linkMobile=data[i].联系手机;
            table.address=data[i].详细地址;
            table.installDate=data[i].装机日期;
            table.state=data[i].状态;
            table.range=data[i].适用范围;
            table.effective=data[i].有效标志;
            this.tableData.push(table);
          }
        },
      importData(){
        var _this=this;
//        console.log(_this.tableData.length);
        for(let i=0;i<_this.tableData.length;i++){
            _this.MerchantUp=new RemoteCall();
            _this.MerchantUp.init({
                  router:"/company/import",
                  session:this.saveSession,
                  data:{
                        terminalNo: _this.tableData[i].POSNumber,
                        eaderMobile: _this.tableData[i].linkMobile,
                        address: _this.tableData[i].address,
                        companyType: _this.tableData[i].consultType,
                        cityCode: _this.tableData[i].cityId,
                        pSimNo: _this.tableData[i].PSAMCard,
                        telephone: _this.tableData[i].linkPhone,
                        merchantName: _this.tableData[i].consultName,
                        leaderName: _this.tableData[i].linkMan,
                        openData: _this.tableData[i].installDate,
                        enableFlag: _this.tableData[i].effective,
                        scope: _this.tableData[i].range,
                        merchantNo: _this.tableData[i].consultNumber,
                        status: _this.tableData[i].state
                    }
            })
        }
      }
    }
  }
</script>
<style scoped="scoped">
  #MerchantChannel{
    margin:15px;
    padding:20px;
    background:#fff;
    min-height:1000px;
  }
  .el-table{
    margin-top: 20px;
    display: none;
  }
  .upFile{
    display:inline-block;
    position:relative;
    width:100px;
    background:#32BC6F;
    border-radius:4px;
    color:#fff;
    border:0;
    height:36px;
    line-height:36px;
    text-align:center;
    font-size:14px;
  }
  #demo{
    top:0;
    left:0;
    width: 100%;
    height:100%;
    opacity: 0;
    position:absolute;
    cursor:pointer;
  }
  .el-button{
    background:#32BC6F;
    color:#fff;
    border:0;
    height:36px;
    font-size:14px;
    width: 100px;
  }
</style>
<style type="text/css">
  .el-table th{
    text-align: center !important;
  }
  .el-table td{
    text-align: center !important;
  }
</style>
