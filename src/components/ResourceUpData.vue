<template>
  <div id="ResourceAlert">
    <div class="alertBox">
      <el-row :gutter="20">
        <el-col><h3>资源新增</h3></el-col>
        <el-col :span="2">
          <label for="">上级资源</label>
        </el-col>
        <el-col :span="6">
          <el-select v-model="fatherResourceName" @change="FartherresourceChange" filterable>
            <el-option v-for="item in ResourceData" :label="item.label" :value="item.value"
                       :key="item.label"></el-option>
          </el-select>
          <!--先不写新增完在说-->
        </el-col>
        <el-col :span="2">
          <label for="">资源名称</label>
        </el-col>
        <el-col :span="6">
          <input type="text" v-model="inputData.name">
        </el-col>
        <el-col :span="2">
          <label for="">资源权限</label>
        </el-col>
        <el-col :span="6">
          <input type="text" v-model="inputData.auth">
        </el-col>

      </el-row>
      <el-row :gutter="20">
        <el-col :span="2">
          <label for="">排序位置</label>
        </el-col>
        <el-col :span="6">
          <input type="text" v-model="inputData.showOrders">
        </el-col>
        <el-col :span="2">
          <label for="">访问地址</label>
        </el-col>
        <el-col :span="6">
          <input type="text" v-model="inputData.webUrl">
        </el-col>
        <el-col :span="2">
          <label for="">资源代码</label>
        </el-col>
        <el-col :span="6">
          <input type="text" v-model="inputData.code">
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="2">
          <label for="">上传icon</label>
        </el-col>
        <el-col :span="6">
          <input type="text" v-model="inputData.icon">
        </el-col>
        <el-col :span="2">
          <label for="">资源描述</label>
        </el-col>
        <el-col :span="6">
          <input type="text" v-model="inputData.description">
        </el-col>
        <el-col :span="2">
          <label for="">资源类型</label>
        </el-col>
        <el-col :span="6">
          <el-select v-model="resourceType" @change="resourceChange">
            <el-option v-for="item in resourceData" :value="item.value" :label="item.label"
                       :key="item.value"></el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-button @click="addResource">点击修改资源</el-button>
      <div class="close" @click="close"><img :src="urlImg" alt=""></div>
    </div>
    <div class="alertBg"></div>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  export default{
    data(){
      return {
        urlImg: require("@/assets/img/20171115165258.png"),
        session: sessionStorage.getItem('session'),
        resourceType: null,
        resourceData: [
          {
            value: null,
            label: '请选择资源类型',
          },
          {
            value: 1,
            label: '运营管理系统资源'
          }, {
            value: 2,
            label: '村医管理系统资源'
          }, {
            value: 3,
            label: '乡农保android资源'
          }, {
            value: 4,
            label: '乡农保ISO资源'
          }
        ],
        inputData: {},
        fatherResourceName: null,
        ResourceData: [
          {
            value: null,
            label: '请选择上级资源'
          }
        ]
      }
    },
    computed: mapGetters(['saveFatherResource', 'saveChangeResource']),
    methods: {
      close(){
        var vm = this;
        this.$confirm('是否取消新增资源?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$router.push('/resourceadd')
        }).catch(() => {

        });
      },
      addResource(){//调用添加函数
        var vm = this;
        for (var i = 0; i < this.inputData.length; i++) {
          if (this.inputData[i] == "") {
            this.inputData[i] = null;
          }
        }
        if (this.inputData.name == null) {
          this.$alert('资源名称不能为空', '提示', {
            confirmButtonText: '确定',
          })
          return
        }
        if (this.inputData.resourceType == null) {
          this.$alert('请选择资源类型', '提示', {
            confirmButtonText: '确定',
          })
          return
        }
        var resource = new RemoteCall();
        resource.init({
          router: '/base/resource/update',
          session: vm.session,
          data: vm.inputData,
          callback: function (data) {
            if (data.ret.errorCode === 0) {
              vm.$alert('资源修改成功', '提示', {
                confirmButtonText: '确定',
                callback: function () {
                  vm.$router.push('/resourceadd')
                }
              })
            } else {
              vm.$alert('资源修改失败', '提示', {
                confirmButtonText: '确定',
              })
            }
          },
          errorCallback: function (data) {
            vm.$alert('资源修改失败', '提示', {
              confirmButtonText: '确定',
            })
          }
        })
      },
      resourceChange(data){//资源类型改变
        this.inputData.resourceType = data;
      },
      fatherResource(){//初始化上级资源
        for (var i = 0; i < this.saveFatherResource.length; i++) {
          var option = {};
          option.label = this.saveFatherResource[i].name;
          option.value = this.saveFatherResource[i].id;
          this.ResourceData.push(option);
        }
      },
      FartherresourceChange(data){//资源选择改变
        this.inputData.parenyId = data;
      }
    },
    mounted: function () {
      var vm = this;
      if (this.saveFatherResource) {
        this.fatherResource();
        console.log(this.saveChangeResource);
        vm.inputData.id = vm.saveChangeResource.id;
        vm.inputData.parenyId = vm.saveChangeResource.parenyId;
        vm.inputData.code = vm.saveChangeResource.code;
        vm.inputData.auth = vm.saveChangeResource.auth;
        vm.inputData.showOrders = vm.saveChangeResource.showOrders;
        vm.inputData.webUrl = vm.saveChangeResource.webUrl;
        vm.inputData.name = vm.saveChangeResource.name;
        vm.inputData.icon = vm.saveChangeResource.icon;
        vm.inputData.description = vm.saveChangeResource.description;
        vm.inputData.resourceType = vm.saveChangeResource.resourceType;
        vm.fatherResourceName = vm.saveChangeResource.parenyId;
        vm.resourceType = vm.saveChangeResource.resourceType;
      } else {
        this.$router.push('/resourceadd')
      }
    }
  }
</script>
<style lang="scss" scoped>
  #ResourceAlert {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 110%;
    z-index: 20;
  }

  .el-col {
    h3 {
      padding: 20px;
    }
  }

  .alertBox {
    border-radius: 5px;
    padding: 20px;
    width: 1200px;
    height: 600px;
    position: absolute;
    left: 50%;
    top: 40%;
    background: #fff;
    margin-top: -300px;
    margin-left: -600px;
    z-index: 100;
  }

  .alertBg {
    background: #000;
    opacity: 0.4;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }

  .el-select {
    width: 100%;
  }

  .el-col {
    margin-bottom: 20px;
    label {
      display: block;
      width: 100%;
      text-align: right;
      line-height: 32px;
    }
    input {
      width: 100%;
      height: 30px;
      border-radius: 3px;
      border: 1px solid #aaa;
    }
    select {
      width: 100%;
      height: 36px;
      border-radius: 3px;
      border: 1px solid #aaa;
    }
    .close {
      position: absolute;
      width: 25px;
      height: 25px;
      top: 25px;
      right: 25px;
      cursor: pointer;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .el-button {
      background: #49df8b;
      color: #fff;
      border: 0;
      position: absolute;
      right: 25px;
      bottom: 25px;
    }
  }
</style>
