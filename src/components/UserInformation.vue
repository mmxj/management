<template>
  <div id="UserInformation">
    <div class="table-data">
      <table>
        <tr v-for="(value,key) in tableData">
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
        tableData: {
          '姓名': '',
          '身份证号': '',
          '手机号码': '',
          '家庭住址': '',
          '注册日期': '',
          '注册地址': '',
          '注册商户': '',
          '已绑定社保卡': '',
          '已绑定银行卡': '',
          '已注册乡银保': '是'
        }
      }
    },
    computed: mapGetters(['userData']),
    methods: {
      getUserData(){
        console.log(this.userData)
        if (!this.userData) {
          this.$router.push('/user')
        } else {
          this.tableData.姓名 = this.userData.idCardName;
          this.tableData.身份证号 = this.userData.idCardNo;
          this.tableData.手机号码 = this.userData.moblie;
          this.tableData.家庭住址 = this.userData.address;
          this.tableData.注册日期 = this.userData.sfsCreate;
          this.tableData.注册地址 = this.setDistrict(this.userData.areaId);
          this.tableData.注册商户 = this.userData.merchantName;
          this.tableData.已绑定社保卡 = this.userData.bindSecurityCardFlag;
          this.tableData.已绑定银行卡 = this.userData.bindBankCardFlag;
        }

      },
      setDistrict(areaId){//县区获取
        var getDistrict = new RemoteCall();
        getDistrict.init({
          router: "/base/area/idname/get",
          session: this.session,
          data: {
            id: areaId
          },
          callback: function (data) {
            console.log(data)
//            return data.rows[0].name
          }
        });
      }
    },
    mounted: function () {
      this.getUserData();
    },
    watch: {
    }
  }
</script>
<style lang="scss" scoped>
  .table-data {
    margin-top: 30px;
    table {
      border-right: 1px solid #747474;
      border-bottom: 1px solid #747474;
    }
    td {
      border-top: 1px solid #747474;
      border-left: 1px solid #747474;
      padding: 10px;
      text-align: center;
    }
    td:nth-last-child(1) {
      min-width: 300px;
    }
  }
</style>
