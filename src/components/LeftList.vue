<template>
  <div id="LeftList">
    <el-menu default-active="2" router class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
             theme="dark" :unique-opened="opened">
      <el-submenu index="1">
        <template slot="title">基础信息管理</template>
        <el-menu-item index="/user" class="menu-border-bottom el-lvtwo" @click="getIndex(0)">{{listArr[0]}}
        </el-menu-item>
        <el-submenu index="1-2">
          <template slot="title">
            <router-link class="el-lvtwo" to="/merchant" @click.native="getIndex(1)">{{listArr[1]}}</router-link>
          </template>
          <el-menu-item index="/merchantadd" class="menu-border-bottom el-lvthree" @click="getIndex(2)">{{listArr[2]}}
          </el-menu-item>
          <el-menu-item index="/merchantcheck" class="menu-border-bottom el-lvthree" @click="getIndex(3)">
            {{listArr[3]}}
          </el-menu-item>
          <el-menu-item index="/merchantchannel" class="menu-border-bottom el-lvthree" @click="getIndex(4)">{{listArr[4]}}</el-menu-item>
        </el-submenu>
        <el-submenu index="1-3">
          <template slot="title">
            <router-link class="el-lvtwo" @click.native="getIndex(5)" to="/collaborate">{{listArr[5]}}</router-link>
          </template>
          <el-menu-item index="/collaborateadd" class="menu-border-bottom el-lvthree" @click="getIndex(6)">{{listArr[6]}}</el-menu-item>
          <el-menu-item index="/collaboratecheck" class="menu-border-bottom el-lvthree" @click="getIndex(7)">
            {{listArr[7]}}
          </el-menu-item>
        </el-submenu>
        <!--部门管理-->
        <el-submenu index="4-7">
          <template slot="title">部门管理</template>
          <el-menu-item index="/department" class="menu-border-bottom el-lvthree" @click="getIndex(26)">
            {{listArr[26]}}
          </el-menu-item>
          <el-menu-item index="/departmentmanage" class="menu-border-bottom el-lvthree" @click="getIndex(29)">
            {{listArr[29]}}
          </el-menu-item>
          <el-menu-item index="/roleadd" class="menu-border-bottom el-lvthree" @click="getIndex(27)">{{listArr[27]}}
          </el-menu-item>
          <el-menu-item index="/rolemanage" class="menu-border-bottom el-lvthree" @click="getIndex(30)">
            {{listArr[30]}}
          </el-menu-item>
          <el-menu-item index="/staffadd" class="menu-border-bottom el-lvthree" @click="getIndex(25)">{{listArr[25]}}
          </el-menu-item>
          <el-menu-item index="/staffmanage" class="menu-border-bottom el-lvthree" @click="getIndex(31)">{{listArr[31]}}
          </el-menu-item>
        </el-submenu>

      </el-submenu>
      <el-menu-item index="/order" class="menu-border-bottom" @click="getIndex(8)">{{listArr[8]}}</el-menu-item>
      <el-submenu index="3">
        <template slot="title">产品管理</template>
        <el-menu-item index="/channel" class="menu-border-bottom el-lvtwo" @click="getIndex(9)">{{listArr[9]}}
        </el-menu-item>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title">医疗后台管理</template>
        <el-menu-item index="/uploaddir" class="menu-border-bottom el-lvtwo" @click="getIndex(10)">{{listArr[10]}}
        </el-menu-item>
        <el-menu-item index="/dirlist" class="menu-border-bottom el-lvtwo" @click="getIndex(11)">{{listArr[11]}}
        </el-menu-item>
        <el-menu-item index="/dirmanage" class="menu-border-bottom el-lvtwo" @click="getIndex(12)">{{listArr[12]}}
        </el-menu-item>
        <el-submenu index="4-4">
          <template slot="title">
            卫生站管理
          </template>
          <el-menu-item index="/healthstationadd" class="menu-border-bottom el-lvthree" @click="getIndex(13)">
            {{listArr[13]}}
          </el-menu-item>
          <el-menu-item index="/healthstation" class="menu-border-bottom el-lvthree" @click="getIndex(14)">{{listArr[14]}}</el-menu-item>
          <el-menu-item index="/doctoradd" class="menu-border-bottom el-lvthree" @click="getIndex(15)">{{listArr[15]}}
          </el-menu-item>
          <el-menu-item index="/doctormanage" class="menu-border-bottom el-lvthree" @click="getIndex(16)">{{listArr[16]}}</el-menu-item>
        </el-submenu>
        <!--<el-submenu index="4-7">-->
        <!--<template slot="title">部门管理</template>-->
        <!--<el-menu-item index="/department" class="menu-border-bottom el-lvthree" @click="getIndex(26)">-->
        <!--{{listArr[26]}}-->
        <!--</el-menu-item>-->
        <!--<el-menu-item index="/departmentmanage"  class="menu-border-bottom el-lvthree" @click="getIndex(29)">{{listArr[29]}}</el-menu-item>-->
        <!--<el-menu-item index="/roleadd" class="menu-border-bottom el-lvthree" @click="getIndex(27)">{{listArr[27]}}-->
        <!--</el-menu-item>-->
        <!--<el-menu-item index="/rolemanage"  class="menu-border-bottom el-lvthree" @click="getIndex(30)">{{listArr[30]}}</el-menu-item>-->
        <!--<el-menu-item index="/staffadd" class="menu-border-bottom el-lvthree" @click="getIndex(25)">{{listArr[25]}}-->
        <!--</el-menu-item>-->
        <!--</el-submenu>-->
        <el-submenu index="4-5">
          <template slot="title">医疗后台信息发布</template>
          <el-menu-item index="/businessissue" class="menu-border-bottom el-lvthree" @click="getIndex(17)">{{listArr[17]}}</el-menu-item>
          <el-menu-item index="/informationup" class="menu-border-bottom el-lvthree" @click="getIndex(18)">{{listArr[18]}}</el-menu-item>
        </el-submenu>
        <el-submenu index="4-6">
          <template slot="title">数据管理系统</template>
          <el-menu-item index="/paydata" class="menu-border-bottom el-lvthree" @click="getIndex(19)">{{listArr[19]}}
          </el-menu-item>
          <el-menu-item index="/dataadministration" class="menu-border-bottom el-lvthree" @click="getIndex(20)">
            {{listArr[20]}}
          </el-menu-item>
          <el-menu-item index="/datareport" class="menu-border-bottom el-lvthree" @click="getIndex(21)">
            {{listArr[21]}}
          </el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="/terminal" class="menu-border-bottom" @click="getIndex(22)">{{listArr[22]}}</el-menu-item>
      <el-submenu index="6">
        <template slot="title">系统管理</template>
        <el-menu-item index="/systemmange" class="menu-border-bottom el-lvtwo" @click="getIndex(23)">{{listArr[23]}}
        </el-menu-item>
        <el-menu-item index="/systemthrones" class="menu-border-bottom el-lvtwo" @click="getIndex(24)">{{listArr[24]}}
        </el-menu-item>
        <el-menu-item index="/systemmaintenance" class="menu-border-bottom el-lvtwo" @click="getIndex(28)">{{listArr[28]}}
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>
<script type="text/javascript">
  import {mapActions} from 'vuex'
  export default {
    data(){
      return {
        opened: true,
        listArr: ['用户信息', '商户信息', '添加新商户', '查阅商户证件', '导入商户信息', '合作行业', '新增合作行业客户', '查阅行业客户证件',
          '订单管理', '产品通道基础管理', '三大目录上传', '三大目录列表', '三大目录管理', '添加卫生站', '管理卫生站', '添加村医',
          '管理村医', '业务专区发布', '信息专区发布', '支付流水数据', '绑卡数据管理', '数据报表', '社保受理终端管理平台', '系统用户管理', '系统权限管理', '添加员工',
          '添加部门', '添加角色', '系统维护', '管理部门', '管理角色', '管理员工'],
        listUrl: ['/user', '/merchant', '/merchantadd', '/merchantcheck', '/merchantchannel', '/collaborate', '/collaborateadd', '/collaboratecheck',
          '/order', '/channel', '/uploaddir', '/dirlist', '/dirmanage', '/healthstationadd', '/healthstation', '/doctoradd', '/doctormanage',
          '/businessissue', '/informationup', '/paydata', '/dataadministration', '/datareport', '/terminal', '/systemmange', '/systemthrones', '/staff',
          '/department', '/roleadd', '/systemmaintenance', '/departmentmanage', '/rolemanage', '/staffmanage'],//staff是25 最后一个为31
        saveList: [],
        saveUrl: [],
      }
    },
    methods: {
      ...mapActions(['addList', 'urlArr']),
      handleOpen(key, keyPath) {
      },
      handleClose(key, keyPath) {
      },
      getIndex(index){
//        console.log(this.listArr[index]) //将这个用数组储存起来用vuex传递
        for (var i = 0; i < this.saveList.length; i++) {
          if (this.saveList[i] == this.listArr[index]) {
            return;
          }
        }
        this.saveList.push(this.listArr[index]);
        this.saveUrl.push(this.listUrl[index])
        this.addList(this.saveList);
        this.urlArr(this.saveUrl);
        sessionStorage.setItem('saveList', this.saveList);
        sessionStorage.setItem('urlArr', this.saveUrl);
      },
      getStart(){
        this.addList(this.saveList);
        this.urlArr(this.saveUrl);
      }
    },
    mounted: function () {
      var vm = this;
      if (sessionStorage.getItem('urlArr')) {
//          this.saveUrl=sessionStorage.getItem('urlArr').split(',')
        sessionStorage.getItem('urlArr').split(',').forEach(function (item, i) {
          vm.saveUrl[i] = item
        });
        sessionStorage.getItem('saveList').split(',').forEach(function (item, i) {
          vm.saveList[i] = item
        });
        vm.getStart();
      } else {
        vm.getStart();
      }
    },
  }
</script>
<style type="text/css" lang="scss" scoped="">
  #LeftList {
    background: #fff;
    min-height: 900px;
    border-top: 1px solid #EEEEEE;
    height: 100%;
    li {
      color: #333;
      text-indent: 25%;
      font-size: 16px;
      font-weight: bold;
      line-height: 50px;
      div {
        font-size: 14px;
        font-weight: normal;
        line-height: 50px;
        border-bottom: 1px solid #EEEEEE;
      }
      span {
        display: block;
        line-height: 50px;
        border-bottom: 1px solid #EEEEEE;
        position: relative;
      }
      .secondary {
        border-bottom: 0;
        div {
          font-size: 12px;
          background: #EEEEEE;
          border-bottom: 1px solid #fff;
          color: #333;;
        }
      }
    }
    .unfold > span:after {
      content: "";
      position: absolute;
      width: 15px;
      height: 9px;
      cursor: pointer;
      background-image: url(../assets/img/u87_selected_2.png);
      background-size: cover;
      right: 18px;
      top: 21px;
    }
  }
</style>
<style type="text/css">
  .el-menu li {
    text-indent: 0 !important;
    background: #fff !important;
  }

  .el-submenu__title {
    padding-left: 20% !important;
    font-size: 14px !important;
    font-weight: normal !important;
    border-bottom: 1px solid #EEEEEE;
    color: #333 !important;
  }

  .el-menu-vertical-demo > .el-submenu > .el-submenu__title {
    color: #333 !important;
    font-size: 16px !important;
    font-weight: bold !important;
  }

  .el-menu-item {
    padding-left: 20% !important;
  }

  .el-menu-item-group__title {
    padding-left: 20px !important;
  }

  .el-submenu__title:hover {
    background: #fff !important;
  }

  .menu-border-bottom {
    border-bottom: 1px solid #EEEEEE;
  }

  .el-lvtwo {
    font-size: 14px !important;
    font-weight: normal !important;
  }

  a.el-lvtwo {
    color: #333 !important;
    font-size: 14px !important;
    text-decoration: none;
    width: 100%;
    height: 100%;
    display: block;
  }

  li.el-lvthree {
    font-size: 12px !important;
    font-weight: normal !important;
    color: #9C9C9C !important;
    background: #EEEEEE !important;
    border-top: 1px solid #fff !important;
  }

  li.el-lvthree:nth-child(1) {
    border-top: 0 !important;
  }

  .el-submenu.is-active .el-submenu__title {
    border-bottom-color: #EEEEEE !important;
  }
</style>
