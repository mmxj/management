<template>
  <div id="ImportBankPFX">
    <el-row :gutter="20">
      <el-col :span="2">
        <label for="">证书密码<span class="must">*</span></label>
      </el-col>
      <el-col :span="4">
        <input type="text" class="input" v-model="filePassword">
      </el-col>
      <el-col :span="6">
        <input type="text" class="input" v-model="fileName">
      </el-col>
      <el-col :span="2">
        <el-button>
          上传zip文件
          <form enctype="multipart/form-data" name="Form1" id="form1" target="frame1">
            <input type="file" name="file" id="img1" ref="file" @click="fileClick" v-on:change="fileChange"
                   accept="aplication/zip" multiple>
            <!--webkitdirectory-->
            <input type="text" name="upload_type" value="5" style="display:none">
          </form>
        </el-button>
      </el-col>
      <el-col :span="2">
        <el-button @click="importPFX">确定导入</el-button>
      </el-col>
    </el-row>
    <el-table :data="tableData" border align="center" style="width:100%" max-height="700" v-show="tableData.length>0"
              @cell-dblclick="changePassword">
      <el-table-column prop="index" label="序号" width="80"></el-table-column>
      <el-table-column prop="merchantNo" label="商户号"></el-table-column>
      <el-table-column label="证书密码(双击修改)">
        <template slot-scope="scope">
          <input type="text" :value="scope.row.payCerPassword" disabled="true">
        </template>
      </el-table-column>
      <el-table-column prop="payPfxPath" label="证书名称"></el-table-column>
      <el-table-column label="操作" width="120">
        <template slot-scope="scope">
          <el-button @click="getItem(scope)">删除</el-button>
        </template>
      </el-table-column>

    </el-table>
  </div>
</template>
<script>
  export default{
    data(){
      return {
        tableData: [],
        fileName: null,
        filePassword: null,
        session: sessionStorage.getItem('session'),
      }
    },
    methods: {
      getItem(data){
        console.log(data);
        var vm = this;
        this.$confirm('此操作将永久删除该项目, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          vm.tableData.splice(data.$index, 1);
          vm.tableData.forEach(function (item, i) {
            item.index = (i + 1);
          })
          vm.$alert('删除成功', '提示', {
            confirmButtonText: '确定'
          })
        }).catch(() => {

        });
      },
      fileClick(e){
        var vm = this;
        if (this.filePassword == null || this.filePassword == '') {
          vm.$alert('证书密码不能为空', '提示', {
            confirmButtonText: '确定'
          })
          if (e && e.preventDefault) {
            e.preventDefault();
          } else {
            window.event.returnValue = false;
          }
          return false;
        }
      },
      fileChange(e){
        var files = e.target.files || e.dataTransfer.files;
        if (!files.length)return;
        var vm = this;
        var reader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.onload = function () {
          if (files[0].name.split('.')[1] != 'zip') {
            vm.$alert('请上传格式后缀为zip的文件', '提示', {
              confirmButtonText: '确定'
            })
            return
          }
          vm.fileName = files[0].name;
          vm.upPFX();
        };

      },
      importPFX(){
        var vm = this;
        console.log(vm.tableData);
        if (vm.tableData.length > 0) {
          vm.loadings = this.$loading({
            lock: true,
            text: '导入中...',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          });
          setTimeout(function () {
            for (var i = 0; i < vm.tableData.length; i++) {
              if (vm.tableData[i].merchantNo) {
                var PFX = new RemoteCall();
                PFX.init({
                  router: '/company/file/pfx/import',
                  session: vm.session,
                  data: vm.tableData[i],
                  async: false,
                  callback: function (data) {
                    if (data.ret.errorCode === 0) {
                      vm.$alert('导入成功', '提示', {
                        confirmButtonText: '确定'
                      })
                      vm.loadings.close();
                      vm.tableData = [];
                      vm.$refs.file.value = null;
                      vm.fileName = null;
                      vm.filePassword = null;
                    } else {
                      vm.$alert('导入失败', '提示', {
                        confirmButtonText: '确定'
                      })
                      vm.loadings.close();
                      return
                    }
                  },
                  errorCallback: function (ret) {
                    vm.$alert('导入失败' + ret.responseText, '提示', {
                      confirmButtonText: '确定'
                    })
                    vm.loadings.close()
                  }
                })
              }
            }

          }, 200)
        } else {
          vm.$alert('请上传zip文件', '提示', {
            confirmButtonText: '确定'
          })
        }

      },
      upPFX(){
        var vm = this;
        vm.loadings = this.$loading({
          lock: true,
          text: '读取文件中...',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        setTimeout(function () {
          $('#form1').ajaxSubmit({
            type: 'POST',
            url: 'http://www.yxunionpay.com:8087/yxsj-openapi-web/openapi/upload/upload.do',
            async: false,
            success: function (ret) {
              ret = JSON.parse(ret)
              console.log(ret.rows)
              for (var i = 0; i < ret.rows.length; i++) {
                var datas = {};
                datas.index = (i + 1);
                datas.merchantNo = ret.rows[i].merchant;
                datas.payCerPassword = vm.filePassword;
                datas.payPfxPath = ret.rows[i].name;
                vm.tableData.push(datas)
              }
              vm.loadings.close();
            },
            error: function (ret) {
              vm.$alert('读取文件失败satus为' + ret.status, '提示', {
                confirmButtonText: '确定'
              })
              vm.loadings.close()
            }
          })
        }, 100)

      },
      changePassword(row, column, cell, event){
//          console.log(row);
        if (cell.getElementsByTagName('input').length > 0) {
          var t = cell.getElementsByTagName('input')[0].value;
          cell.getElementsByTagName('input')[0].disabled = false;
          cell.getElementsByTagName('input')[0].value = '';
          cell.getElementsByTagName('input')[0].focus();
          cell.getElementsByTagName('input')[0].value = t;
          cell.getElementsByTagName('input')[0].onblur = function () {
            row.payCerPassword = cell.getElementsByTagName('input')[0].value;
            this.disabled = true;
          };
        }
      },

    }
  }
</script>
<style lang="scss" scoped>
  #ImportBankPFX {
    background: #fff;
    margin: 10px;
    min-height: 800px;
    padding: 0 20px;
    padding-top: 20px;

  }

  .el-col {
    margin-bottom: 20px;
    label {
      display: block;
      width: 100%;
      text-align: right;
      line-height: 30px;
    }
    .input {
      width: 100%;
      height: 30px;
      border-radius: 3px;
      border: 1px solid #aaa;
      padding-left: 6px;
    }
    select {
      width: 100%;
      height: 36px;
      border-radius: 3px;
      border: 1px solid #aaa;
    }
    .el-date-editor.el-input {
      width: 100%;
    }
    .el-timer, .area .el-col {
      margin: 0;
    }
    .el-button {
      color: #fff;
      border: 0;
      background: #32BC6F;
    }
    .must {
      color: red;
      vertical-align: middle;
    }
  }

  .el-col-2 {
    min-width: 108px;
  }

  .el-button {
    position: relative;
  }

  #img1 {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
  }

  input[type="text"]:disabled {
    background-color: transparent;
    border: 0;
  }

  input {
    border: 0;
    background-color: transparent;
  }

  .el-table__body-wrapper {
    overflow-x: hidden;
  }

  /*#form1*/
</style>
