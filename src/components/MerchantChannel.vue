<template>
  <div id="MerchantChannel">
    <div class="upFile">
      上传文件
      <input type="file" id="demo" v-on:change="importf($event)">
    </div>
    <el-button v-on:click="importData">确定上传</el-button>
    <a class="downExcel" href="static/xlsx/social_security_merchant_template.xlsx">下载商户导入模板</a>
    <el-table :data="tableData" border width="100%" max-height="800">
      <el-table-column prop="index" label="序号" width="120"></el-table-column>
      <el-table-column prop="cityCode" label="城市代码" width="120"></el-table-column>
      <el-table-column prop="companyType" label="商户类型" width="150"></el-table-column>
      <el-table-column prop="merchantNo" label="商户编号" width="150"></el-table-column>
      <el-table-column prop="merchantName" label="商户名称" width="200"></el-table-column>
      <el-table-column prop="terminalNo" label="POS终端号" width="200"></el-table-column>
      <el-table-column prop="mainKey" label="明文秘钥" width="200"></el-table-column>
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
  import '@/assets/js/jquery-table2excel.js'
  import {mapGetters, mapActions} from 'vuex'
  export default{
    data(){
      return {
        tableData: [],
        MerchantUp: null,
        index: 0,
        ev: null
      }
    },
    computed: mapGetters(['saveSession']),
    methods: {
      importf(e) {//导入
        var vm = this;
        if (e.currentTarget.files.length > 0) {
          this.ev = e.currentTarget;
          this.loading = this.$loading({
            lock: true,
            text: '正在读取文件',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          });
          setTimeout(function () {
            vm.inputChange();
          }, 100)
        }
      },
      inputChange(){
        var _this = this;
        var vm = this;
        var obj = this.ev;
        var wb;//读取完成的数据
        var wbData;//存储json
        var rABS = false; //是否将文件读取为二进制字符串
        if (!obj.files) {
          return false;
        }
        if (obj.files[0].name.split('.')[1] != 'xlsx') {
          vm.loading.close();
          vm.$alert('请上传格式后缀为xlsx的文件', '提示', {
            confirmButtonText: '确定'
          })
          return
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
          var table = {
            status: 1,
            enableFlag: 1
          };
          if (data[i].序号) {
            table.index = parseInt(data[i].序号);
          }
          if (data[i].城市代码) {
            table.cityCode = data[i].城市代码;
          }
          if (data[i].商户类型) {
            table.companyType = parseInt(data[i].商户类型);
          }
          if (data[i].明文秘钥) {
            table.mainKey = data[i].明文秘钥
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
            var date = data[i].装机日期;
            var dates = date.replace(/^(\d{4})(\d{2})(\d{2})(\d{2})$/, "$1-$2-$3 $4:00:00")
            table.openDate = dates;
          }
//          if (data[i].状态) {
//            table.status = data[i].状态;
//          }
          if (data[i].适用范围) {
            table.scope = data[i].适用范围;
          }
//          if (data[i].有效标志) {
//            table.enableFlag = data[i].有效标志;
//          }
          if (JSON.stringify(table) != "{}") {
            this.tableData.push(table);
          }
        }
        this.loading.close();
      },
      importData(){
        var vm = this;
        if (this.tableData.length <= 0) {
          vm.$alert('请选择文件', '提示', {
            confirmButtonText: '确定',
            callback: function () {
              vm.index = 0;
            }
          })
          return
        }
        this.tableData[vm.index].companyType = parseInt(this.tableData[vm.index].companyType);
        if (isNaN(this.tableData[vm.index].companyType) || this.tableData[vm.index].companyType === 0) {
          this.tableData[vm.index].companyType = 4;
        }
        var timer = vm.tableData.length * 400 / 1000;
        if (timer > 60) {
          timer = Math.round(timer / 60);
          vm.text = vm.text = '正在上传大概需要' + timer + '分钟';
        } else {
          timer = Math.round(timer)
          vm.text = vm.text = '正在上传大概需要' + timer + '秒';
        }

        this.loadings = this.$loading({
          lock: true,
          text: vm.text,
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });

        setTimeout(function () {
          vm.MerchantUp = new RemoteCall();
          vm.MerchantUp.init({
            router: "/company/import",
            session: vm.saveSession,
            data: vm.tableData[vm.index],
            async: false,
            callback: function (data) {
              if (data.ret.errorCode === 0) {
                if (vm.index == vm.tableData.length - 1) {
                  vm.loadings.close()
                  vm.$alert('上传成功', '提示', {
                    confirmButtonText: '确定',
                    callback: function () {
                      document.getElementsByClassName("el-table")[0].style.display = 'none';
                      document.getElementById('demo').value = null;
                      vm.index = 0;
                    }
                  });
                } else {
                  vm.index++;
                  vm.importData();
                }
              } else {
                if (data.ret.errorMessage == '同名公司多于一个') {
                  vm.loadings.close()
                  vm.$alert(vm.tableData[vm.index].merchantName + '，这个商户已存在，请修改', '提示', {
                    confirmButtonText: '确定',
                    callback: function () {
                      vm.index = 0;
                    }
                  });
                } else {
                  vm.loadings.close()
                  vm.$alert('上传失败,' + data.ret.errorMessage, '提示', {
                    confirmButtonText: '确定',
                    callback: function () {
                      vm.index = 0;
                    }
                  })
                }
              }
            }
          })
        }, 20)
      }
    },
    mounted: function () {

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
    min-width: 100px;
    margin: 0;
  }

  .downExcel {
    display: inline-block;
    padding: 11px 15px;
    min-width: 100px;
    text-decoration: none;
    color: #fff;
    background: #32BC6F;
    text-align: center;
    border-radius: 4px;
    font-size: 14px;
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
