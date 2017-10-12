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
  export default{
    data(){
      return {
        tableData: [
          {
            '社保名称': '惠州市农村医疗保险',
            '社保卡号': '44656556565',
            '社保归属地': '广东省惠州市',
            '社保类型': '农村综合医疗保险',
            '社保卡发行日期': '2017.08.01',
            '绑卡时间': '2017.08.10 18:09:01',
            '绑卡商户': '大森林药店',
            '社保卡缴费记录': '2018.08   缴费3000  2018.09   缴费3000',
            '社保卡个账余额': '3098元 ',
          },
          {
            '社保名称': '广州市职工社保',
            '社保卡号': '44656556565',
            '社保归属地': '广东省惠州市',
            '社保类型': '农村综合医疗保险',
            '社保卡发行日期': '2017.08.01',
            '绑卡时间': '2017.08.10 18:09:01',
            '绑卡商户': '大森林药店',
            '社保卡缴费记录': '2018.08   缴费3000  2018.09   缴费3000',
            '社保卡个账余额': '3098元 ',
          }
        ]
      }
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
    }
  }
</style>
