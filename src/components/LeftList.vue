<template>
  <div id="LeftList">
    <el-menu default-active="2" router class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
             theme="dark" :unique-opened="opened">
      <el-submenu index="1" v-show="listArrName[33]==showArrName[33]">
        <template slot="title">{{listArrName[33]}}</template>
        <el-submenu index="1-1">
          <template slot="title" v-show="listArrName[44]==showArrName[44]">
            {{listArrName[44]}}
          </template>
          <el-menu-item index="/user" v-show="listArrName[0]==showArrName[0]" class="menu-border-bottom el-lvthree"
                        @click="getIndex(0)">{{listArr[0]}}
          </el-menu-item>
          <el-menu-item index="/userchannel" v-show="listArrName[45]==showArrName[45]"
                        class="menu-border-bottom el-lvthree"
                        @click="getIndex(33)">{{listArr[33]}}
          </el-menu-item>
        </el-submenu>
        <el-submenu index="1-2" v-show="listArrName[42]==showArrName[42]">
          <template slot="title">
            {{listArrName[42]}}
          </template>
          <el-menu-item index="/merchant" class="menu-border-bottom el-lvthree" v-show="listArrName[1]==showArrName[1]"
                        @click="getIndex(1)">
            {{listArr[1]}}
          </el-menu-item>
          <el-menu-item index="/merchantadd" class="menu-border-bottom el-lvthree"
                        v-show="listArrName[2]==showArrName[2]" @click="getIndex(2)">{{listArr[2]}}
          </el-menu-item>
          <el-menu-item index="/merchantcheck" class="menu-border-bottom el-lvthree"
                        v-show="listArrName[3]==showArrName[3]" @click="getIndex(3)">
            {{listArr[3]}}
          </el-menu-item>
          <el-menu-item index="/merchantchannel" class="menu-border-bottom el-lvthree"
                        v-show="listArrName[4]==showArrName[4]" @click="getIndex(4)">{{listArr[4]}}
          </el-menu-item>
          <el-menu-item index="/importbankpfx" class="menu-border-bottom el-lvthree"
                        v-show="listArrName[46]==showArrName[46]" @click="getIndex(34)">
            {{listArr[34]}}
          </el-menu-item>
        </el-submenu>
        <el-submenu index="1-3" v-show="listArrName[43]==showArrName[43]">
          <template slot="title"> {{listArrName[43]}}</template>
          <el-menu-item index="/collaborate" class="menu-border-bottom el-lvthree"
                        v-show="listArrName[5]==showArrName[5]" @click="getIndex(5)">
            {{listArr[5]}}
          </el-menu-item>
          <el-menu-item index="/collaborateadd" class="menu-border-bottom el-lvthree"
                        v-show="listArrName[6]==showArrName[6]" @click="getIndex(6)">{{listArr[6]}}
          </el-menu-item>
          <el-menu-item index="/collaboratecheck" class="menu-border-bottom el-lvthree"
                        v-show="listArrName[7]==showArrName[7]" @click="getIndex(7)">
            {{listArr[7]}}
          </el-menu-item>
        </el-submenu>
        <!--部门管理-->
        <el-submenu index="4-7" v-show="listArrName[34]==showArrName[34]">
          <template slot="title">{{listArrName[34]}}</template>
          <el-menu-item index="/department" class="menu-border-bottom el-lvthree"
                        v-show="listArrName[26]==showArrName[26]" @click="getIndex(26)">
            {{listArr[26]}}
          </el-menu-item>
          <el-menu-item index="/departmentmanage" class="menu-border-bottom el-lvthree"
                        v-show="listArrName[29]==showArrName[29]" @click="getIndex(29)">
            {{listArr[29]}}
          </el-menu-item>
          <el-menu-item index="/roleadd" class="menu-border-bottom el-lvthree" v-show="listArrName[27]==showArrName[27]"
                        @click="getIndex(27)">{{listArr[27]}}
          </el-menu-item>
          <el-menu-item index="/rolemanage" class="menu-border-bottom el-lvthree"
                        v-show="listArrName[30]==showArrName[30]" @click="getIndex(30)">
            {{listArr[30]}}
          </el-menu-item>
          <el-menu-item index="/staffadd" class="menu-border-bottom el-lvthree"
                        v-show="listArrName[25]==showArrName[25]" @click="getIndex(25)">{{listArr[25]}}
          </el-menu-item>
          <el-menu-item index="/staffmanage" class="menu-border-bottom el-lvthree"
                        v-show="listArrName[31]==showArrName[31]" @click="getIndex(31)">{{listArr[31]}}
          </el-menu-item>
        </el-submenu>

        <el-submenu index="7" v-show="listArrName[40]==showArrName[40]">
          <template slot="title">
            {{listArrName[40]}}
          </template>
          <el-menu-item index="/terminal" class="menu-border-bottom el-lvthree"
                        v-show="listArrName[22]==showArrName[22]"
                        @click="getIndex(22)">{{listArr[22]}}
          </el-menu-item>
          <el-menu-item index="/terminalmanage" class="menu-border-bottom el-lvthree"
                        v-show="listArrName[32]==showArrName[32]" @click="getIndex(32)">{{listArr[32]}}
          </el-menu-item>
        </el-submenu>

      </el-submenu>
      <el-menu-item index="/order" class="menu-border-bottom" v-show="listArrName[8]==showArrName[8]"
                    @click="getIndex(8)">{{listArr[8]}}
      </el-menu-item>
      <el-submenu index="3" v-show="listArrName[35]==showArrName[35]">
        <template slot="title">{{listArrName[35]}}</template>
        <el-menu-item index="/channel" class="menu-border-bottom el-lvtwo" v-show="listArrName[9]==showArrName[9]"
                      @click="getIndex(9)">{{listArr[9]}}
        </el-menu-item>
      </el-submenu>
      <el-submenu index="4" v-show="listArrName[36]==showArrName[36]">
        <template slot="title">{{listArrName[36]}}</template>
        <el-menu-item index="/uploaddir" class="menu-border-bottom el-lvtwo" v-show="listArrName[10]==showArrName[10]"
                      @click="getIndex(10)">{{listArr[10]}}
        </el-menu-item>
        <el-menu-item index="/dirlist" class="menu-border-bottom el-lvtwo" v-show="listArrName[11]==showArrName[11]"
                      @click="getIndex(11)">{{listArr[11]}}
        </el-menu-item>
        <el-menu-item index="/dirmanage" class="menu-border-bottom el-lvtwo" v-show="listArrName[12]==showArrName[12]"
                      @click="getIndex(12)">{{listArr[12]}}
        </el-menu-item>
        <el-submenu index="4-4" v-show="listArrName[37]==showArrName[37]">
          <template slot="title">
            {{listArrName[37]}}
          </template>
          <el-menu-item index="/healthstationadd" class="menu-border-bottom el-lvthree"
                        v-show="listArrName[13]==showArrName[13]" @click="getIndex(13)">
            {{listArr[13]}}
          </el-menu-item>
          <el-menu-item index="/healthstation" class="menu-border-bottom el-lvthree"
                        v-show="listArrName[14]==showArrName[14]" @click="getIndex(14)">{{listArr[14]}}
          </el-menu-item>
          <el-menu-item index="/doctoradd" class="menu-border-bottom el-lvthree"
                        v-show="listArrName[15]==showArrName[15]" @click="getIndex(15)">{{listArr[15]}}
          </el-menu-item>
          <el-menu-item index="/doctormanage" class="menu-border-bottom el-lvthree"
                        v-show="listArrName[16]==showArrName[16]" @click="getIndex(16)">{{listArr[16]}}
          </el-menu-item>
        </el-submenu>
        <el-submenu index="4-5" v-show="listArrName[38]==showArrName[38]">
          <template slot="title">{{listArrName[38]}}</template>
          <el-menu-item index="/businessissue" class="menu-border-bottom el-lvthree"
                        v-show="listArrName[17]==showArrName[17]" @click="getIndex(17)">{{listArr[17]}}
          </el-menu-item>
          <el-menu-item index="/informationup" class="menu-border-bottom el-lvthree"
                        v-show="listArrName[18]==showArrName[18]" @click="getIndex(18)">{{listArr[18]}}
          </el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-submenu index="5" v-show="listArrName[39]==showArrName[39]">
        <template slot="title">{{listArrName[39]}}</template>
        <el-menu-item index="/paydata" class="menu-border-bottom el-lvtwo" v-show="listArrName[19]==showArrName[19]"
                      @click="getIndex(19)">{{listArr[19]}}
        </el-menu-item>
        <el-menu-item index="/dataadministration" class="menu-border-bottom el-lvtwo"
                      v-show="listArrName[20]==showArrName[20]" @click="getIndex(20)">
          {{listArr[20]}}
        </el-menu-item>
        <el-menu-item index="/datareport" class="menu-border-bottom el-lvtwo"
                      v-show="listArrName[21]==showArrName[21]" @click="getIndex(21)">
          {{listArr[21]}}
        </el-menu-item>
      </el-submenu>
      <!--<el-submenu index="7" v-show="listArrName[40]==showArrName[40]">-->
      <!--<template slot="title">-->
      <!--{{listArrName[40]}}-->
      <!--&lt;!&ndash;<router-link class="el-lvone" to="/terminal" @click.native="getIndex(22)">{{listArr[22]}}</router-link>&ndash;&gt;-->
      <!--</template>-->
      <!--<el-menu-item index="/terminal" class="menu-border-bottom el-lvtwo" v-show="listArrName[22]==showArrName[22]"-->
      <!--@click="getIndex(22)">{{listArr[22]}}-->
      <!--</el-menu-item>-->
      <!--<el-menu-item index="/terminalmanage" class="menu-border-bottom el-lvtwo"-->
      <!--v-show="listArrName[32]==showArrName[32]" @click="getIndex(32)">{{listArr[32]}}-->
      <!--</el-menu-item>-->
      <!--</el-submenu>-->
      <el-submenu index="6" v-show="listArrName[41]==showArrName[41]">
        <template slot="title">{{listArrName[41]}}</template>
        <el-menu-item index="/systemmange" class="menu-border-bottom el-lvtwo" v-show="listArrName[23]==showArrName[23]"
                      @click="getIndex(23)">{{listArr[23]}}
        </el-menu-item>
        <el-menu-item index="/resourceadd" class="menu-border-bottom el-lvtwo" v-show="listArrName[24]==showArrName[24]"
                      @click="getIndex(24)">{{listArr[24]}}
        </el-menu-item>
        <el-menu-item index="/systemmaintenance" class="menu-border-bottom el-lvtwo"
                      v-show="listArrName[28]==showArrName[28]" @click="getIndex(28)">{{listArr[28]}}
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
        listArr: ['用户管理', '管理商户', '添加新商户', '查阅商户证件', '导入商户信息', '管理合作行业', '新增合作行业客户', '查阅行业客户证件', '订单管理', '产品通道基础管理',
          '三大目录上传', '三大目录列表', '三大目录管理', '添加卫生站', '管理卫生站', '添加村医', '管理村医', '业务专区发布', '信息专区发布', '支付流水数据',
          '绑卡数据管理', '数据报表', '添加终端', '系统用户管理', '系统资源管理', '添加员工', '添加部门', '添加角色', '系统维护', '管理部门',
          '管理角色', '管理员工', '终端管理', '用户导入', '导入银联证书'],
        listUrl: ['/user', '/merchant', '/merchantadd', '/merchantcheck', '/merchantchannel', '/collaborate', '/collaborateadd', '/collaboratecheck',
          '/order', '/channel', '/uploaddir', '/dirlist', '/dirmanage', '/healthstationadd', '/healthstation', '/doctoradd', '/doctormanage',
          '/businessissue', '/informationup', '/paydata', '/dataadministration', '/datareport', '/terminal', '/systemmange', '/resourceadd', '/staff',
          '/department', '/roleadd', '/systemmaintenance', '/departmentmanage', '/rolemanage', '/staffmanage', '/terminalmanage', '/userchannel', '/importbankpfx'],//staff是25 //最后为34
        saveList: [],
        saveUrl: [],
        listArrName: ['用户管理', '管理商户', '添加新商户', '查阅商户证件', '导入商户信息', '管理合作行业', '新增合作行业客户', '查阅行业客户证件', '订单管理', '产品通道基础管理',
          '三大目录上传', '三大目录列表', '三大目录管理', '添加卫生站', '管理卫生站', '添加村医', '管理村医', '业务专区发布', '信息专区发布', '支付流水数据',
          '绑卡数据管理', '数据报表', '添加终端', '系统用户管理', '系统资源管理', '添加员工', '添加部门', '添加角色', '系统维护', '管理部门',
          '管理角色', '管理员工', '终端管理', '基础信息管理', '部门管理', '产品管理', '医疗后台管理', '卫生站管理', '医疗后台信息发布', '数据管理系统',
          '社保受理终端管理平台', '系统管理', '商户信息', '合作行业', '用户信息', '用户导入', '导入银联证书'],//46
        session: sessionStorage.getItem('session'),
        showArrName: []
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
      if (sessionStorage.getItem('roleId')) {
        var roleId = sessionStorage.getItem('roleId');
        var getRole = new RemoteCall();
        getRole.init({
          router: '/base/roleresource/get',
          session: vm.session,
          data: {
            pageInfo: {
              pageSize: 100,
              pageNum: 1
            },
            id: roleId
          },
          callback: function (data) {
            if (data.ret.errorCode === 0) {
              if (data.resourceRows.length > 0) {
                data.resourceRows.forEach(function (item) {
                  for (var i = 0; i < vm.listArrName.length; i++) {
                    if (item.sfsResourceName == vm.listArrName[i]) {
//                                vm.showArrName[i]=item.sfsResourceName;
                      vm.$set(vm.showArrName, i, item.sfsResourceName)
                    }
                  }
                })
              }

//            vm.showArrName=vm.listArrName;
            }
          }
        })
      }
    },
    watch: {}
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

  .el-lvone {
    color: #333 !important;
    text-decoration: none;
  }
  .el-lvtwo {
    font-size: 14px !important;
    font-weight: normal !important;
    /*text-indent: 1em !important;*/
  }

  /*li.el-lvtwo{*/
  /*text-indent: 1em !important;*/
  /*}*/
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

  @media screen and (max-width: 1550px) {
    .el-menu-item {
      padding-left: 14% !important;
      /*min-width: 5em;*/
    }

    .el-submenu__title {
      padding-left: 14% !important;
    }

    .el-submenu__icon-arrow {
      right: 15px !important;
    }

    #Gheader .left-title {
      padding-left: 2.16% !important;
    }
  }
</style>
