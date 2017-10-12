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
  export default{
    data(){
      return {
        tableData: {
          '姓名': '刘佳佳',
          '身份证号': '447363837373636464',
          '手机号码1': '13927773737',
          '手机号码2': '13087464464',
          '手机号码3': '13927773737',
          '手机号码4': '13087464464',
          '家庭住址': '广东省惠州市惠来县水丰镇励志街道办89号',
          '注册日期': '2018-09-20 19:08:01',
          '注册地址': '广东省惠州市惠来县水丰镇赖家街道36号大参林药店',
          '注册商户': '赖家街道36号大参林药店010107',
          '已绑定社保卡': '是',
          '已绑定银行卡': '否',
          '已注册乡银保': '否'
        }
      }
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
    }
  }
</style>
