<template>
  <div id="ResourceAdd">
    <el-button @click="runAdd">新增资源</el-button>
    <router-view></router-view>
    <div>
      <div class="row-header-box">
        <el-row class="el-row1 el-row-header">
          <el-col :span="5">资源名称</el-col>
          <el-col :span="4">资源编码</el-col>
          <el-col :span="4">资源描述</el-col>
          <el-col :span="4">资源路径</el-col>
          <el-col :span="4">资源类型</el-col>
          <el-col :span="2">操作</el-col>
        </el-row>
      </div>
      <div class="row-box">
        <el-row v-for="item in tableData" class="el-row1" :key="item.index">
          <el-col :span="5">
            <div class="listbox" @click="changeShow(item.index)"><img :src="item.src" alt="">{{item.name}}</div>
          </el-col>
          <el-col :span="4">{{item.code}}</el-col>
          <el-col :span="4">{{item.description}}</el-col>
          <el-col :span="4">{{item.webUrl}}</el-col>
          <el-col :span="4">{{item.resourceTypeName}}</el-col>
          <el-col :span="2"><b @click="resourceUpData(item)">修改</b><span @click="deleteResource(item.id)">删除</span>
          </el-col>
          <el-col v-if="item.children.length>0">
            <!--是否显示二级菜单-->
            <el-row v-show="item.show" v-for="items in item.children" :key="items.index">
              <el-col :span="5" class="el-row2">
                <div class="listbox" @click="changeShow(items.index)"><img :src="items.src" alt="">{{items.name}}</div>
              </el-col>
              <el-col :span="4">{{items.code}}</el-col>
              <el-col :span="4">{{items.description}}</el-col>
              <el-col :span="4">{{items.webUrl}}</el-col>
              <el-col :span="4">{{items.resourceTypeName}}</el-col>
              <el-col :span="2"><b @click="resourceUpData(items)">修改</b><span
                @click="deleteResource(items.id)">删除</span></el-col>
              <el-col v-if="items.children.length>0">
                <!--是否显示三级菜单-->
                <el-row v-show="items.show" v-for="itemChild in items.children" :key="itemChild.index">
                  <el-col :span="5" class="el-row3"><img :src="itemChild.src" alt="">{{itemChild.name}}</el-col>
                  <el-col :span="4">{{itemChild.code}}</el-col>
                  <el-col :span="4">{{itemChild.description}}</el-col>
                  <el-col :span="4">{{itemChild.webUrl}}</el-col>
                  <el-col :span="4">{{itemChild.resourceTypeName}}</el-col>
                  <el-col :span="2"><b @click="resourceUpData(itemChild)">修改</b><span
                    @click="deleteResource(itemChild.id)">删除</span></el-col>
                </el-row>
              </el-col>

            </el-row>
          </el-col>
        </el-row>
      </div>
    </div>

  </div>
</template>
<script>
  import {mapActions} from 'vuex'
  export default{
    data(){
      return {
        session: sessionStorage.getItem('session'),
        urlImg1: require("@/assets/img/1.png"),
        urlImg2: require("@/assets/img/2.png"),
        urlImg3: require("@/assets/img/3.png"),
        urlImg4: require("@/assets/img/2a.png"),
        urlImg5: require("@/assets/img/2b.png"),
        urlImg6: require("@/assets/img/1a.png"),
        tableData: [
//          {
//            parenyId: "long,父资源",
//            code: "string,代码",
//            auth: "string,资源权限",
//            sfsCreater: "long,录入人",
//            icon: "string,图标",
//            description: "string,资源描述",
//            sfsModifierName: "string,修改人",
//            sfsModified: "date-time,修改时间",
//            sfsCreate: "date-time,录入时间",
//            sfsModifier: "long,修改人",
//            showOrders: "integer,排序位置",
//            webUrl: "string,访问url",
//            name: "string,名称",
//            id: "long",
//            resourceTypeName:"integer,资源类型 "
//          },
        ],
        savefarth: [],
        allData: [],//全部资源信息;
        pageNum: 1
      }
    },
    methods: {
      ...mapActions(['saveFatherResource', 'saveChangeResource']),
      runAdd(){
        this.saveFatherResource(this.savefarth);
        this.$router.push('/resourceadd/add')
      },
      getResource(){//查询所有的资源
        var vm = this;
        var resourceGet = new RemoteCall();
        resourceGet.init({
          router: '/base/resource/get',
          session: vm.session,
          data: {
            pageInfo: {
              pageSize: 100,
              pageNum: vm.pageNum
            }
          },
          callback: function (data) {
            if (data.ret.errorCode === 0) {
              data.rows.forEach(function (item, i) {
                item.show = true;
                item.index = i;
                item.src = vm.urlImg1
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
              vm.allData[j].src = vm.urlImg2
              vm.savefarth.push(vm.allData[j]);//将二级菜单也保存到父级列表
            }
          }
          for (var k = 0; k < vm.tableData[i].children.length; k++) {
            vm.tableData[i].children[k].children = [];
            for (var l = 0; l < vm.allData.length; l++) {
              if (vm.tableData[i].children[k].id == vm.allData[l].parenyId) {
                vm.tableData[i].children[k].src = vm.urlImg5;
                vm.allData[l].src = vm.urlImg3;
                vm.tableData[i].children[k].children.push(vm.allData[l]);
              }
            }
          }
        }
      },
      deleteResource(id){
        var vm = this;
        this.$confirm('此操作将永久删除该资源, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var delResource = new RemoteCall();
          delResource.init({
            router: '/base/resource/delete',
            session: vm.session,
            data: {
              id: id
            },
            callback: function (data) {
              if (data.ret.errorCode === 0) {
                vm.$alert('删除成功', '标题名称', {
                  confirmButtonText: '确定',
                  callback: function () {
                    vm.tableData = [];
                    vm.savefarth = [];
                    vm.allData = [];
                    vm.pageNum = 1;
                    vm.getResource();
                  }
                });
              }

            }
          })
        }).catch(() => {

        });
      },
      resourceUpData(data){//修改资源
        console.log(data);
        this.saveChangeResource(data);
        this.saveFatherResource(this.savefarth);
        this.$router.push('/resourceadd/updata');
      },
      changeShow(data){
        var vm = this;
        for (var i = 0; i < vm.tableData.length; i++) {
          if (vm.tableData[i].index == data) {
            vm.tableData[i].show = !vm.tableData[i].show;
//                  vm.tableData[i].src=
            if (!vm.tableData[i].show) {
              vm.tableData[i].src = vm.urlImg6;
            } else {
              vm.tableData[i].src = vm.urlImg1;
            }
            return
          }
          for (var j = 0; j < vm.tableData[i].children.length; j++) {
            if (vm.tableData[i].children[j].index == data) {
              vm.tableData[i].children[j].show = !vm.tableData[i].children[j].show;
              if (vm.tableData[i].children[j].children.length > 0) {
                if (!vm.tableData[i].children[j].show) {
                  vm.tableData[i].children[j].src = vm.urlImg4;
                } else {
                  vm.tableData[i].children[j].src = vm.urlImg5;
                }
              }
              return
            }
          }
        }
      }
    },
    mounted: function () {
      this.getResource()
    },
    watch: {
      $route(){
        var vm = this;
        vm.tableData = [];
        vm.savefarth = [];
        vm.allData = [];
        vm.pageNum = 1;
        this.getResource();
      }
    }
  }
</script>
<style scoped>
  #ResourceAdd {
    margin: 15px;
    padding: 15px;
    background: #fff;
    min-height: 800px;
    height: 800px;
    overflow: auto;
  }

  .row-left {
    display: inline-block;
  }

  .row-right {
    display: inline-block;
  }
  .el-button {
    background: #49df8b;
    color: #fff;
    border: 0;
  }

  .el-col-4 {
    width: 17%;
    padding: 0 10px;
    border-bottom: 1px solid #dfe6ec;
    border-right: 1px solid #dfe6ec;
    height: 38px;
    line-height: 38px;
  }

  .el-col-5 {
    width: 22%;
    padding: 0 10px;
    border-bottom: 1px solid #dfe6ec;
    border-right: 1px solid #dfe6ec;
    height: 38px;
    line-height: 38px;
  }

  .el-col-2 {
    width: 10%;
    padding: 0 10px;
    height: 38px;
    line-height: 38px;
    border-bottom: 1px solid #dfe6ec;
    border-right: 1px solid #dfe6ec;
  }

  @media screen and (max-width: 1344px) {
    .el-col-5 {
      width: 24%;
      overflow: hidden;
    }

    .el-col-4 {
      width: 16%;
      overflow: hidden
    }

    .el-col-2 {
      width: 12%;
    }
  }

  .el-col-2 span {
    cursor: pointer;
    color: orangered;
  }

  .el-row2 img {
    margin-left: 5px;
  }

  .el-row3 img {
    margin-left: 5px;
  }

  .el-row-header {
    border-top: 1px solid #dfe6ec;
    margin-top: 20px;
  }

  .el-row1 {
    border-left: 1px solid #dfe6ec;
  }

  img {
    position: relative;
    top: -2px;
    margin-right: 4px;
    vertical-align: middle;
  }

  b {
    color: dodgerblue;
    margin-right: 10px;
    font-weight: normal;
    cursor: pointer;
  }

  .listbox {
    cursor: pointer;
  }

  .row-box {
    height: 640px;
    overflow: auto;
    /*overflow-x: hidden;*/
    border-bottom: 1px solid #dfe6ec;
  }

  .row-header-box {
    margin-right: 17px;
  }
</style>
