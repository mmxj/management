<template>
  <div id="RoleAccredit">
    <div class="content">
      <div class="close" @click="close"><img :src="urlImg" alt=""></div>
      <p class="title">角色权限管理</p>
      <div class="choseBox">
        <!--<el-checkbox-group v-model="checkList"  @change="checkChange">-->
        <!--<div v-for="itme in tableData">-->
        <!--<el-checkbox :label="itme.name" :value="itme.id" :key="itme.id"></el-checkbox>-->
        <!--</div>-->
        <!--</el-checkbox-group>-->
        <el-tree :data="tableData" ref="tree" default-expand-all show-checkbox node-key="id"></el-tree>
      </div>
      <div class="tree-button">
        <el-button @click="getCheckedKeys">确定授权</el-button>
      </div>
    </div>
    <div class="bg"></div>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  export default{
    data(){
      return {
        urlImg: require("@/assets/img/20171115165258.png"),
        session: sessionStorage.getItem('session'),
        allData: [],
        choseArr: [],
        tableData: [],
        savefarth: [],
        pageNum: 1,
        checkList: [],
        roleId: null,
        resourceRows: [],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      }
    },
    computed: mapGetters(['saveRole']),
    methods: {
      close(){
        var vm = this;
        this.$router.push('/rolemanage')
      },
      getResource(){//查询所有的资源
        var vm = this;
        var resourceGet = new RemoteCall();
        resourceGet.init({
          router: '/base/resource/get',
          session: vm.session,
          async: false,
          data: {
            pageInfo: {
              pageSize: 100,
              pageNum: vm.pageNum
            }
          },
          callback: function (data) {
            if (data.ret.errorCode === 0) {
              data.rows.forEach(function (item) {
                item.label = item.name;
                vm.allData.push(item);
              })
              if (data.rows.length == 100) {
                vm.pageNum++;
                vm.getResource();
              }
              vm.findFather()
            }
          }
        })
      },
      findFather(){//筛选所有的父资源插入tableData;
        var vm = this;
        for (var i = 0; i < vm.allData.length; i++) {
          if (vm.allData[i].parenyId == null) {
            vm.tableData.push(vm.allData[i]);
            vm.savefarth.push(vm.allData[i]);
          }
        }
        this.findChild()
      },
      findChild(){//筛选子菜单
        var vm = this;
        for (var i = 0; i < vm.tableData.length; i++) {
          vm.tableData[i].children = [];
          for (var j = 0; j < vm.allData.length; j++) {
            if (vm.tableData[i].id == vm.allData[j].parenyId) {
              vm.tableData[i].children.push(vm.allData[j]);
              vm.savefarth.push(vm.allData[j]);//将二级菜单也保存到父级列表
            }
          }
          for (var k = 0; k < vm.tableData[i].children.length; k++) {
            vm.tableData[i].children[k].children = [];
            for (var l = 0; l < vm.allData.length; l++) {
              if (vm.tableData[i].children[k].id == vm.allData[l].parenyId) {
                vm.tableData[i].children[k].children.push(vm.allData[l]);
              }
            }
          }
        }
        this.$nextTick(function () {
          vm.setchecked();
        })

      },
      setchecked(){
        var vm = this;
        var getRole = new RemoteCall();
        getRole.init({
          router: '/base/roleresource/get',
          session: vm.session,
          async: false,
          data: {
            pageInfo: {
              pageSize: 100,
              pageNum: 1
            },
            id: vm.roleId
          },
          callback: function (data) {
            if (data.ret.errorCode === 0) {
              outer:
                for (let i = 0; i < data.resourceRows.length; i++) {
                  for (let j = 0; j < vm.allData.length; j++) {
                    if (data.resourceRows[i].sfsResourceId == vm.allData[j].id) {
                      if (vm.allData[j].children == 0 || !vm.allData[j].children) {
                        vm.choseArr.push(vm.allData[j].id)
                      } else {
//                             console.log(vm.allData[j].children);
//                              for(let k=0;k<vm.allData[j].children.length;k++){
//                                  vm.allData.forEach(function(item){
//                                      if(item.id==vm.allData[j].children[k].id){
//                                          console.log(item);
//                                      }
//                                  })
//                              }
                      }
                    }
                  }
                }
            }

          }
        })
        console.log(vm.choseArr)
        vm.$nextTick(function () {
          vm.$refs.tree.setCheckedKeys(vm.choseArr);
        })

      },
      getCheckedKeys() {
        this.resourceRows = [];
        var vm = this;
        console.log(this.$refs.tree.getCheckedKeys());
        if (this.$refs.tree.getCheckedKeys().length === 0) {
          vm.$alert('请选择一个基础权限', '提示', {
            confirmButtonText: '确定',
          });
          return
        }
        for (var i = 0; i < this.$refs.tree.getCheckedKeys().length; i++) {
          var option = {};
          option.sfsResourceId = this.$refs.tree.getCheckedKeys()[i];
          this.resourceRows.push(option);
          outer:
            for (let j = 0; j < vm.allData.length; j++) {
              if (this.$refs.tree.getCheckedKeys()[i] == vm.allData[j].id) {
                if (vm.allData[j].parenyId) {
                  var options2 = {};
                  options2.sfsResourceId = vm.allData[j].parenyId;
                  if (this.checkResource(options2.sfsResourceId)) {
                    break outer;
                  } else {
                    this.resourceRows.push(options2);
                    if (vm.allData[j].parenyId) {
                      outers:
                        for (var k = 0; k < vm.allData.length; k++) {
                          if (vm.allData[j].parenyId == vm.allData[k].id) {
                            if (vm.allData[k].parenyId) {
                              var options3 = {};
                              options3.sfsResourceId = vm.allData[k].parenyId;
                              if (vm.checkResource(options3.sfsResourceId)) {
                                break outers;
                              } else {
                                vm.resourceRows.push(options3);
                              }
                            }
                          }
                        }
                    }
                  }
                }
              }
            }
        }
        var roleResource = new RemoteCall();
        roleResource.init({
          router: '/base/roleresource/add',
          session: vm.session,
          data: {
            resourceRows: vm.resourceRows,
            roleId: vm.roleId
          },
          callback: function (data) {
            if (data.ret.errorCode === 0) {
              vm.$alert('授权成功', '提示', {
                confirmButtonText: '确定',
                callback: function () {
                  vm.$router.push('/rolemanage')
                }
              });
            } else {
              vm.$alert('授权失败', '提示', {
                confirmButtonText: '确定',
              });
            }
          }
        })
      },
      checkResource(data){
        for (var i = 0; i < this.resourceRows.length; i++) {
          if (this.resourceRows[i].sfsResourceId == data) {
            return true
          }
        }
        return false;
      }
    },
    mounted: function () {
      console.log(this.saveRole);
      if (this.saveRole) {
        document.getElementsByTagName('body')[0].style.overflow = 'hidden';
        this.roleId = this.saveRole.id;
      } else {
        this.$router.push('/rolemanage');
      }
      this.getResource();
    }
  }
</script>
<style scoped>
  #RoleAccredit {
    position: absolute;
    width: 100%;
    height: 106%;
    top: 0;
    left: 0;
    z-index: 2;
  }

  .content {
    position: absolute;
    z-index: 2;
    width: 1000px;
    height: 600px;
    background: #fff;
    border-radius: 10px;
    left: 50%;
    margin-left: -500px;
    top: 40%;
    margin-top: -300px;
    overflow: hidden;
  }

  .bg {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: #000;
    opacity: 0.4;
  }

  .close {
    position: absolute;
    width: 25px;
    height: 25px;
    top: 25px;
    right: 25px;
    cursor: pointer;
  }

  .close img {
    width: 100%;
    height: 100%;
  }

  .el-tree {
    border: 0px;
  }

  .choseBox {
    padding: 0px;
    height: 470px;
    overflow: auto;
    margin: 20px;
    margin-top: 65px;
    position: relative;
    padding-left: 10px;
    border: 1px solid #e4e4e4;

    /*left:20px;*/
  }

  .tree-button {
    text-align: right;
    padding-right: 50px;
  }

  .tree-button .el-button {
    border: 0;
    color: #fff;
    background: #32BC6F
  }

  .title {
    position: absolute;
    left: 20px;
    top: 20px;
    font-size: 20px;
    color: #32BC6F;
  }
</style>
