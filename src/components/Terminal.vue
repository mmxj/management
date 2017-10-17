<template>
  <div id="Terminal">
    <div>
      <el-row :gutter="20">
        <el-col :span="2">
          <label for="">归属地</label>
        </el-col>
        <el-col :span="6">
          <div class="distpicker">
            <select name="" id="province" @change="setCity()">
              <option v-for="data in provinceData" v-bind:value="data.id">{{data.name}}</option>
            </select>
            <select name="" id="city" @change="setDistrict()">
              <option v-for="data in cityData" v-bind:value="data.id">{{data.name}}</option>
            </select>
            <select name="" id="district" @change="setAreaId()">
              <option v-for="datas in districtData" v-bind:value="datas.id">{{datas.name}}</option>
            </select>
          </div>
        </el-col>
        <el-col :span="2">
          <label for="">安装地址</label>
        </el-col>
        <el-col :span="12" class="area">
          <el-row>
            <el-col :span="12">
              <div class="distpicker">
                <select name="" id="province2" @change="setCity()">
                  <option v-for="data in provinceData" v-bind:value="data.id">{{data.name}}</option>
                </select>
                <select name="" id="city2" @change="setDistrict()">
                  <option v-for="data in cityData" v-bind:value="data.id">{{data.name}}</option>
                </select>
                <select name="" id="district2" @change="setAreaId()">
                  <option v-for="datas in districtData" v-bind:value="datas.id">{{datas.name}}</option>
                </select>
              </div>
            </el-col>
            <el-col :span="12"><input type="text"></el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="2">
          <label for="">商户号</label>
        </el-col>
        <el-col :span="6">
          <input type="text">
        </el-col>
        <el-col :span="2">
          <label for="">PSAM卡</label>
        </el-col>
        <el-col :span="6">
          <input type="text">
        </el-col>
        <el-col :span="2">
          <label for="">收单行</label>
        </el-col>
        <el-col :span="6">
          <select>
            <option>请选择收单行</option>
            <option>中国银行</option>
            <option>中国建设银行</option>
            <option>中国农业银行</option>
            <option>中国工商银行</option>
            <option>中国平安银行</option>
          </select>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="2">
          <label for="">维护公司</label>
        </el-col>
        <el-col :span="6">
          <input type="text">
        </el-col>
        <el-col :span="2">
          <label for="">接入IP地址</label>
        </el-col>
        <el-col :span="6">
          <input type="text">
        </el-col>
        <el-col :span="2">
          <label for="">开通日期</label>
        </el-col>
        <el-col :span="6">
          <el-date-picker v-model="value1" align="right" type="date" placeholder="选择日期"
                          :picker-options="pickerOptions1"></el-date-picker>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="2">
          <label for="">商户名称</label>
        </el-col>
        <el-col :span="6">
          <input type="text">
        </el-col>
        <el-col :span="2">
          <label for="">商户主营业务</label>
        </el-col>
        <el-col :span="6">
          <input type="text">
        </el-col>
        <el-col :span="2">
          <label for="">终端厂家</label>
        </el-col>
        <el-col :span="6">
          <input type="text">
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="2">
          <label for="">终端型号</label>
        </el-col>
        <el-col :span="6">
          <input type="text">
        </el-col>
        <el-col :offset="2" :span="2">
          <el-button>添加</el-button>
        </el-col>
        <el-col :span="4">
          <a href="javascript:">下载所有数据</a>
        </el-col>
      </el-row>
    </div>
    <div>
      <el-table :data="tableData" border>
        <el-table-column prop="index" label="归属地" width="120"></el-table-column>
        <el-table-column label="安装地址" width="180"></el-table-column>
        <el-table-column label="商户号" width="180"></el-table-column>
        <el-table-column label="PSAM卡" width="180"></el-table-column>
        <el-table-column label="收单行" width="180"></el-table-column>
        <el-table-column label="维护公司" width="180"></el-table-column>
        <el-table-column label="接入IP地址" width="180"></el-table-column>
        <el-table-column label="开通地区" width="180"></el-table-column>
        <el-table-column label="商户名称" width="180"></el-table-column>
        <el-table-column label="商户主营业务" width="180"></el-table-column>
        <el-table-column label="终端厂家" width="180"></el-table-column>
        <el-table-column label="终端型号" width="180"></el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
  export default{
    data() {
      return {
        provinceData: [{}],
        cityData: [{}],
        districtData: [{}],
        pickerOptions0: {
          disabledDate(time) {
            return time.getTime() < Date.now() - 8.64e7;
          }
        },
        pickerOptions1: {
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },
        value1: '',
        value2: '',
        tableData: [
          {
            index: 1
          }
        ]
      }
    },
    methods: {
      //地市联动方法 //找个时间封装
      getArea(){
        if (sessionStorage.getItem('session')) {
          this.session = sessionStorage.getItem('session');//获取本地存储保存session状态
        } else {
          this.$router.push({path: '/login'})
        }
        console.log(this.session);
        var _this = this;
        var getArea = new RemoteCall();
        getArea.init({
          router: "/base/area/idname/get",
          session: _this.session,
          data: {
            parentAreaId: 0
          },
          callback: this.getAreaCallback
        });
      },
      getAreaCallback(data){
        var _this = this;
        this.provinceData = data.rows
        clearTimeout(timer)
        var timer = setTimeout(function () {
          _this.setCity();
        }, 0)
      },
      setCity(){
        var _this = this;
        var mySelect = document.getElementById('province');
        var index = mySelect.selectedIndex;
        var parentId = mySelect.getElementsByTagName('option')[index].value;
        var getCity = new RemoteCall();
        getCity.init({
          router: "/base/area/idname/get",
          session: this.session,
          data: {
            parentAreaId: parentId
          }
        });
        this.cityData = getCity.res.rows;
        clearTimeout(timer);
        var timer = setTimeout(function () {
          _this.setDistrict();
        }, 10)
      },
      setDistrict(){//县区获取
        var myCity = document.getElementById('city');
        var index = myCity.selectedIndex;
        var _this = this;
        var parentId = myCity.getElementsByTagName('option')[index].value;
        var getDistrict = new RemoteCall();
        getDistrict.init({
          router: "/base/area/idname/get",
          session: this.session,
          data: {
            parentAreaId: parentId
          }
        });
        this.districtData = getDistrict.res.rows;
        clearTimeout(timer);
        var timer = setTimeout(function () {
          _this.setAreaId();
        }, 10)
      },
      setAreaId(){//获取areaid 给inputData赋值
        var myCity = document.getElementById('district');
        var index = myCity.selectedIndex;
        var parentId = myCity.getElementsByTagName('option')[index].value;
      },
      //地市联动结束
    },
    mounted: function () {
      this.getArea()
    }
  }
</script>
<style lang="scss" scoped>
  #Terminal {
    margin: 15px;
    padding: 20px;
    background: #fff;
  }

  .el-col {
    margin-bottom: 20px;
    label {
      display: block;
      width: 100%;
      text-align: right;
      line-height: 30px;
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
    .el-date-editor.el-input {
      width: 100%;
    }
    .el-timer, .area .el-col {
      margin: 0;
    }
  }

  .el-button {
    width: 100%;
    background: #32BC6F;
    border: 0;
    color: #fff;
  }
  a {
    line-height: 30px;
  }

  @media screen and (max-width: 1760px) {
    label {
      font-size: 14px;
      min-width: 6em;
    }
  }

  @media screen and (max-width: 1700px) {
    .el-col-2 {
      width: 10%;
    }
    .el-col-6 {
      width: 23.333333%;
    }
    .el-col-3 {
      width: 15.5%;
    }
  }

  @media screen and (max-width: 1450px) {
    .el-col-2 {
      width: 12%;
    }
    .el-col-6 {
      width: 21.333333%;
    }
    .el-col-3 {
      width: 17.5%;
    }
  }
</style>
<style type="text/css">
  .el-table th {
    text-align: center !important;
  }

  .el-table td {
    text-align: center !important;
  }
</style>
<style type="text/css">
  .distpicker select {
    width: 32% !important;
    height: 36px;
    line-height: 36px;
    padding: 0.25rem;
    outline: none;
    border: 1px solid #aaa
  }

  @media screen and (max-width: 1450px) {
    .distpicker select {
      width: 31% !important;
    }
  }
</style>
