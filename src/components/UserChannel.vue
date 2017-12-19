<template>
  <div id="UserChannel">
    <div class="btnBox">
      <el-button>
        选择文件
        <input type="file" id="demo" ref="file" @change="importf($event)">
      </el-button>
      <el-button @click="userImport">
        确定导入
      </el-button>
      <a class="downExcel" href="static/xlsx/用户信息.xlsx">
        下载用户导入模板
      </a>
    </div>
    <div class="tableBox">
      <!--v-show="tableData.length==0"-->
      <el-table :data="tableData" border max-height="750" v-show="tableData.length>0">
        <el-table-column prop="registerInfo.loginMobile" label="注册手机" width="140"></el-table-column>
        <el-table-column prop="registerInfo.password" label="登录密码" width="200"></el-table-column>
        <el-table-column prop="userInfo.idCardNo" label="身份证号" width="150"></el-table-column>
        <el-table-column prop="userInfo.idCardName" label="身份证上的名称" width="200"></el-table-column>
        <el-table-column prop="userInfo.nickName" label="昵称" width="100"></el-table-column>
        <el-table-column prop="userInfo.sex" label="性别" width="100"></el-table-column>
        <el-table-column prop="userInfo.birthday" label="出生日期" width="100"></el-table-column>
        <el-table-column prop="userInfo.nation" label="民族" width="100"></el-table-column>
        <el-table-column prop="userInfo.address" label="详细地址" width="100"></el-table-column>
        <el-table-column prop="userInfo.qq" label="qq" width="100"></el-table-column>
        <el-table-column prop="userInfo.wechat" label="微信" width="100"></el-table-column>
        <el-table-column prop="userInfo.email" label="邮箱" width="100"></el-table-column>
        <el-table-column prop="userInfo.telephone" label="其它联系电话" width="150"></el-table-column>
        <el-table-column prop="bindInfo.mobile" label="绑卡手机号码" width="150"></el-table-column>
        <el-table-column prop="bindInfo.account" label="绑卡卡号" width="150"></el-table-column>
        <el-table-column label="绑卡的社保局或银行" width="180"></el-table-column>
        <el-table-column prop="bindInfo.cardType" label="卡类型" width="100"></el-table-column>
        <el-table-column prop="bindInfo.merchantNo" label="绑卡商户号" width="180"></el-table-column>
        <el-table-column prop="bindInfo.merchantName" label="绑卡商户名称" width="220"></el-table-column>
        <el-table-column prop="bindInfo.terminalNo" label="绑卡终端号" width="220"></el-table-column>
        <el-table-column prop="bindInfo.securityType" label="社保类型" width="100"></el-table-column>
        <el-table-column prop="bindInfo.issueDate" label="卡的发行日期" width="140"></el-table-column>
        <el-table-column prop="bindInfo.expiryDate" label="卡的有效期" width="140"></el-table-column>
        <el-table-column label="卡序列号" width="100"></el-table-column>
        <el-table-column prop="familyInfo.relationType" label="成员关系" width="100"></el-table-column>
        <el-table-column prop="familyInfo.sex" label="成员性别" width="100"></el-table-column>
        <el-table-column prop="familyInfo.birthday" label="成员出生日期" width="140"></el-table-column>
        <el-table-column prop="familyInfo.idCardNo" label="成员身份证号" width="140"></el-table-column>
        <el-table-column prop="familyInfo.idCardName" label="成员身份证上的名字" width="200"></el-table-column>
        <el-table-column prop="bindInfo.sfsCreate" label="绑卡时间" width="220"></el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
  import '@/assets/js/jquery-table2excel.js'
  export default {
    data(){
      return {
        session: sessionStorage.getItem('session'),
        tableData: [],
        ev: null,
        loading: null,
        loadings: null,
        text: null
      }
    },
    methods: {
      importf(e){
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
        var vm = this;
        var obj = this.ev;
        var wb;//读取完成的数据
        var wbData;//存储json
        var rABS = false; //是否将文件读取为二进制字符串
        if (!obj.files) {
          return false;
        }
        var f = obj.files[0];
        if (obj.files[0].name.split('.')[1] != 'xlsx') {
          vm.loading.close();
          vm.$alert('请上传格式后缀为xlsx的文件', '提示', {
            confirmButtonText: '确定'
          })
          return
        }
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
          vm.createTable(wbData);

        };
        if (rABS) {
          reader.readAsArrayBuffer(f);
        } else {
          reader.readAsBinaryString(f);
        }

      },
      createTable(data){
        data = JSON.parse(data);
        var vm = this;
        vm.tableData = [];
        for (var i = 0; i < data.length; i++) {
          var table = {
            "registerInfo": {},
            "userInfo": {},
            "bindInfo": {},
            "familyInfo": {}
          };
          if (data[i].注册手机) {
            table.registerInfo.loginMobile = data[i].注册手机;
          }
          if (data[i].登录密码) {
            table.registerInfo.password = data[i].登录密码;
          }
          if (data[i].卡类型) {
            table.bindInfo.cardType = parseInt(data[i].卡类型);
          }
          if (data[i].绑卡卡号) {
            table.bindInfo.account = data[i].绑卡卡号;
          }
          if (data[i].绑卡商户号) {
            table.bindInfo.merchantNo = data[i].绑卡商户号;
          }
          if (data[i].绑卡商户名称) {
            table.bindInfo.merchantName = data[i].绑卡商户名称;
          }
          if (data[i].绑卡手机号码) {
            table.bindInfo.mobile = data[i].绑卡手机号码;
          }
          if (data[i].绑卡时间) {
            table.bindInfo.sfsCreate = data[i].绑卡时间;
          }
          if (data[i].绑卡终端号) {
            table.bindInfo.terminalNo = data[i].绑卡终端号;
          }
          if (data[i].身份证上的名称) {
            table.userInfo.idCardName = data[i].身份证上的名称;
          }
          if (data[i].身份证号) {
            table.userInfo.idCardNo = data[i].身份证号;
          }
          if (data[i].昵称) {
            table.userInfo.nickName = data[i].昵称;
          }
          if (data[i].性别) {
            table.userInfo.sex = parseInt(data[i].性别);
          }
          if (data[i].出生日期) {
            table.userInfo.birthday = data[i].出生日期;
          }
          if (data[i].社保类型) {
            table.bindInfo.securityType = parseInt(data[i].社保类型);
          }
          if (data[i].卡的发行日期) {
            table.bindInfo.issueDate = data[i].卡的发行日期
          }
          if (data[i].卡的有效期) {
            table.bindInfo.expiryDate = data[i].卡的有效期
          }
          if (data[i].民族) {
            table.userInfo.nation = parseInt(data[i].民族)
          }
          if (data[i].详细地址) {
            table.userInfo.address = data[i].详细地址
          }
          if (data[i].qq) {
            table.userInfo.qq = data[i].qq
          }
          if (data[i].微信) {
            table.userInfo.wechat = data[i].微信
          }
          if (data[i].邮箱) {
            table.userInfo.email = data[i].邮箱
          }
          if (data[i].其它联系电话) {
            table.userInfo.telephone = data[i].其它联系电话
          }
          if (data[i].成员关系) {
            table.familyInfo.relationType = parseInt(data[i].成员关系)
          }
          if (data[i].成员性别) {
            table.familyInfo.sex = parseInt(data[i].成员性别)
          }
          if (data[i].成员出生日期) {
            table.familyInfo.birthday = data[i].成员出生日期
          }
          if (data[i].成员身份证上的名字) {
            table.familyInfo.idCardName = data[i].成员身份证上的名字
          }
          if (data[i].成员身份证号) {
            table.familyInfo.idCardNo = data[i].成员身份证号
          }
          vm.tableData.push(table);
        }
        this.loading.close();
      },
      userImport(){
        var vm = this;

        if (vm.tableData.length == 0) {
          vm.$alert('请先选择excel文件', '提示', {
            confirmButtonText: '确定',
          })
          return
        }
        var timer = vm.tableData.length * 200 / 1000;
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
          for (let i = 0; i < vm.tableData.length; i++) {
            var userImport = new RemoteCall();
            userImport.init({
              router: '/user/import',
              session: vm.session,
              data: vm.tableData[i],
              async: false,
              callback: function (data) {
                if (i == vm.tableData.length - 1) {
                  vm.loadings.close();
                  console.log(vm.$alert)
                  vm.$alert('上传成功', '提示', {
                    confirmButtonText: '确定',
                    callback: function () {
                      vm.tableData = [];
                      vm.ev = null;
                      vm.$refs.file.value = null;
                    }
                  });
                }
              }
            });
          }
        }, 1000);

      }
    }
  }
</script>
<style scoped>
  #UserChannel {
    margin: 10px;
    background: #fff;
    min-height: 600px;
  }

  #UserChannel .el-button {
    margin: 0;
  }

  .el-button {
    background: #32BC6F;
    color: #fff;
    border: 0;
    height: 36px;
    font-size: 14px;
    min-width: 100px;
    margin: 0;
    position: relative;
  }

  .tableBox {
    margin: 0 15px;
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

  .btnBox {
    padding: 15px;
  }

  .downExcel {
    display: inline-block;
    padding: 11px 15px;
    text-decoration: none;
    color: #fff;
    background: #32BC6F;
    text-align: center;
    border-radius: 4px;
    font-size: 14px;
  }

  .v-loading {
    width: 100%;
    height: 100%;
    position: absolute;
    background: rgba(255, 255, 255, 0.5);
    text-algin: center;
    top: 0;
    left: 0;
    display: none;
  }
</style>
