<template>
  <div id="SystemMaintenance">
    <el-row :gutter="20">
      <el-col :span="4">
        <label for="">刷新openapi 缓存:</label>
      </el-col>
      <el-col :span="6"><input type="text" placeholder="请输入密钥" v-model="openApi"></el-col>
      <el-col :span="3">
        <el-button @click="upDataOpenapi">点击刷新</el-button>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="4">
        <label for="">刷新银联交易前置终端缓存:</label>
      </el-col>
      <el-col :span="2">
        <!--<el-select v-model="te">-->
        <!--<el-option>终端类型</el-option>-->
        <!--</el-select>-->
      </el-col>
      <el-col :span="3">
        <el-button @click="dealUpdata">点击刷新</el-button>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  export default{
    data(){
      return {
        openApi: null,
        deal: null,
        session: sessionStorage.getItem('session'),
      }
    },
    methods: {
      upDataOpenapi(){
        var vm = this;
        if (this.openApi == '') {
          this.openApi = null;
          return
        }
        if (this.openApi != null) {
          var openApiup = new RemoteCall();
          openApiup.init({
            router: '/opeanapi/refreshCache',
            session: this.session,
            data: {
              key: this.openApi
            },
            callback: function (data) {
              if (data.ret.errorCode === 0) {
                vm.$alert('刷新openapi 缓存成功', '提示', {
                  confirmButtonText: '确定',
                });
              } else {
                vm.$alert(data.ret.errorMessage, '提示', {
                  confirmButtonText: '确定',
                });
              }
            }
          })
        } else {
          vm.$alert('密匙不能为空', '提示', {
            confirmButtonText: '确定',
          });
        }
      },
      dealUpdata(){
        var vm = this;
        var openApiup = new RemoteCall();
        openApiup.init({
          router: '/base/union/terminal/refreshCache',
          session: this.session,
          data: {
            deviceType: 3,
          },
          callback: function (data) {
            if (data.ret.errorCode === 0) {
              vm.$alert('刷新银联交易前置终端缓存', '提示', {
                confirmButtonText: '确定',
              });
            } else {
              vm.$alert(data.ret.errorMessage, '提示', {
                confirmButtonText: '确定',
              });
            }
          }
        })

      }
    }

  }
</script>
<style lang="scss" scoped>
  #SystemMaintenance {
    margin: 15px;
    padding: 15px;
    background: #fff;
    min-height: 700px;
    input {
      width: 100%;
      height: 32px;
      border: 1px solid #aaa;
      border-radius: 4px;
      text-indent: 1em;
    }
    label {
      width: 100%;
      height: 100%;
      text-align: right;
      display: block;
      line-height: 32px;
    }
    .el-col-4 {
      min-width: 14em;
    }
    .el-row {
      margin-bottom: 20px;
    }
    .el-button {
      background: #32BC6F;
      color: #fff;
      border: 0;
    }
  }
</style>
