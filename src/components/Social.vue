<template>
  <div id="Social">
    <div class="table-data">
      <table v-for="datas in tableData">
        <tr v-for="(value,key) in datas">
          <td>{{key}}</td>
          <td>{{value}}</td>
        </tr>
      </table>
    </div>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  export default{
    data(){
      return {
        session: sessionStorage.getItem('session'),
        tableData: [
          {
//            '社保名称': '惠州市农村医疗保险',
            '姓名': null,//卡主
            '关系': null,//成员关系
            '社保类型': null, //社保类型名称
            '社保卡号': null, //卡号
            '社保归属地': null,//暂无 //通过归属商户查找归属地
            '社保卡发行日期': null, //发行时间
            '绑卡时间': '',//绑卡时间无
            '绑卡商户': null, //绑卡终端商户
            '社保卡个账余额': '', //这些接口没有
          }
        ]
      }
    },
    computed: mapGetters(['userData']),
    methods: {
      getSocial(){
        console.log(this.userData)
        if (!this.userData) {
          this.$router.push('/user')
        }
        var vm = this;
        var getSocial = new RemoteCall();
        getSocial.init({
          router: '/user/card/bind/get',
          session: this.session,
          data: {
            userId: this.userData.id,
            pageInfo: {
              pageSize: 10,
              pageNum: 1
            },
          },
          callback: function (data) {
            console.log(data);
            if (data.rows.length > 0) {
              for (var i = 0; i < data.rows.length; i++) {
                vm.tableData[i].姓名 = data.rows[i].userName;
                vm.tableData[i].关系 = data.rows[i].relationTypeName;
                vm.tableData[i].社保类型 = data.rows[i].securityTypeName;
                vm.tableData[i].社保卡号 = data.rows[i].account;
                vm.tableData[i].社保归属地 = data.rows[i].areaId;
                vm.tableData[i].社保卡发行日期 = data.rows[i].issueDate.split(" ")[0];
                vm.tableData[i].绑卡时间 = data.rows[i].sfsCreate;
                vm.tableData[i].绑卡商户 = data.rows[i].merchantName;
                vm.tableData[i].社保卡个账余额 = null;
              }
            }
          }
        })
      }
    },
    mounted: function () {
      if (typeof(RemoteCall) == 'undefined') {
        this.$router.push('/user')
      }
      this.getSocial();
    }
  }
</script>
<style lang="scss" scoped>
  .table-data {
    margin-top: 30px;
    table {
      margin-top: 30px;
      border-right: 1px solid #747474;
      border-bottom: 1px solid #747474;
    }
    td {
      border-top: 1px solid #747474;
      border-left: 1px solid #747474;
      padding: 10px;
      min-width: 150px;
    }
  }
</style>
