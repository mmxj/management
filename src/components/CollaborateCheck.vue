<template>
  <div id="MerchantCheck">
    <div>
      <el-row :gutter="10">
        <el-col :span="6">
          <div class="el-ipt">
            <!--<input type="text" :placeholder="placeholder" v-model="valChange" @keyup="holder" @keydown.13="getText2">-->
            <!--<ul class="company" ref="searchBox">-->
            <!--<li v-for="name in companyName" @click="changeChose(name)">{{name}}</li>-->
            <!--</ul>-->
            <el-select v-model="valChange" filterable remote reserve-keyword placeholder="请输入合作行业名称搜索对应合作行业图片信息"
                       :remote-method="remoteMethod">
              <el-option v-for="item in companyName" :value="item.value" :label="item.label"
                         :key="item.value"></el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="2">
          <div class="el-btn">
            <button type="button" @click="getText">搜索</button>
          </div>
        </el-col>
      </el-row>
    </div>
    <div>
      <el-row :gutter="10" class="logoContent">
        <el-col :span="24" class="imgBox">
          <img class="MerchantImg" :src="imgUrl"/>
        </el-col>
      </el-row>
      <el-row class="el-page-btns">
        <el-col :offset="9" :span="2">
          <el-button @click="pageAdd">上一页</el-button>
        </el-col>
        <el-col :span="4">
          <div class="el-page-title">{{pictureName}}</div>
        </el-col>
        <el-col :span="2">
          <el-button @click="pageDown">下一页</el-button>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script type="text/javascript">
  import {mapGetters, mapActions} from 'vuex'
  export default{
    data(){
      return {
        imgUrl: require("@/assets/img/login_bg.png"),
        pictureName: '合作行业证件显示',
        session: sessionStorage.getItem('session'),
        valChange: null,
        companyName: [],
        picList: [],
        index: 0
      }
    },
    computed: mapGetters(['getCollaborate']),
    methods: {
      ...mapActions(['saveCollaborate']),
      getPic(name){//根据名字查找图片
        var vm = this;
        $.ajax({
          url: "http://www.yxunionpay.com:8087/yxsj-openapi-web/openapi/download/download_base64.do",
          type: 'post',
          data: {
            'download_type': '4',
            'file_name': name,
            'id': '0'
          },
          success: function (res) {
            if (res) {
              vm.imgUrl = 'data:image/png;base64,' + JSON.parse(res).data;
            }
          }
        })
      },

      pageAdd(){//上一页
        var vm = this;
        if (vm.index > 0) {
          vm.index--;
          vm.pictureName = vm.picList[vm.index].certificateTypeName;
          vm.getPic(vm.picList[vm.index].certificatePic);

        } else {
          vm.$alert('已经是第一张图片了', '提示', {
            confirmButtonText: '确定',
          })
        }
      },
      pageDown(){//下一页
        var vm = this;
        if (vm.index < vm.picList.length - 1) {
          vm.index++
          vm.pictureName = vm.picList[vm.index].certificateTypeName;
          vm.getPic(vm.picList[vm.index].certificatePic)
        } else {
          vm.$alert('已经是最后一张图片了', '提示', {
            confirmButtonText: '确定',
          })
        }
      },
      remoteMethod(data){//搜索框文字变化是触发
        if (data == '') {
          data = null;
        }
        this.getCompany(data);
      },
      getText(){//点击时候触发
        var vm = this;
        if (vm.valChange != '' && vm.valChange != null) {
          var getPicList = new RemoteCall();
          getPicList.init({
            router: '/company/certificate/get',
            session: vm.session,
            data: {
              companyName: vm.valChange,
              pageInfo: {
                pageSize: 100,
                pageNum: 1
              }
            },
            callback: function (data) {
              if (data.ret.errorCode === 0) {
                if (data.rows.length > 0) {
                  vm.picList = data.rows;
                  vm.pictureName = vm.picList[vm.index].certificateTypeName;
                  vm.getPic(vm.picList[vm.index].certificatePic)
                } else {
                  vm.$alert('查无该公司的证件信息请添加', '提示', {
                    confirmButtonText: '确定',
                  })
                }
              } else {
                vm.$alert('查询失败' + data.ret.errorMessage, '提示', {
                  confirmButtonText: '确定',
                })
              }
            }
          })
        } else {
          vm.$alert('请输入公司名', '提示', {
            confirmButtonText: '确定',
          })
        }
      },
      getCompany(name){//初始化公司列表
        var vm = this;
        var componyname = null;
        if (name) {
          componyname = name
        }
        vm.companyName = [];
        var getCompany = new RemoteCall();
        getCompany.init({
          router: '/company/get',
          session: vm.session,
          data: {
            name: componyname,
            pageInfo: {
              pageSize: 100,
              pageNum: 1
            }
          },
          callback: function (data) {
            if (data.ret.errorCode === 0) {
              vm.companyName = data.rows.map(item => {
                return {value: item.name, label: item.name}
              });
            }
          }
        })
      }
    },
    mounted: function () {
      var vm = this;
      if (this.getCollaborate != null) {
        vm.valChange = vm.getCollaborate;
        vm.getText();
        vm.saveCollaborate(null);
      }
      this.getCompany();
    },
    watch: {

    }
  }
</script>
<style lang="scss" scoped>
  #MerchantCheck {
    margin: 15px;
    padding: 20px;
    background: #fff;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px;
  }

  .el-select {
    width: 100%;
  }
  .el-ipt {
    position: relative;
    input {
      width: 100%;
      height: 32px;
      border: 1px solid #aaa;
      border-radius: 4px;
      text-indent: 1em;
      position: relative;
      z-index: 1000;
    }
  }

  .el-btn {
    button {
      width: 100%;
      height: 36px;
      background: #32BC6F;
      color: #fff;
      border: 0;
      border-radius: 4px;
      cursor: pointer;
    }
  }

  .MerchantImg {
    height: 900px;

  }

  .el-page-btns {
    text-align: center;
  }

  .el-page-title {
    line-height: 36px;
  }

  .logoContent {
    margin: 40px 0;
  }

  .el-col-offset-9 {
    margin-left: 33%;
  }

  .imgBox {
    text-align: center;
  }
  .company {
    background: #fff;
    border: 1px solid #aaa;
    position: absolute;
    width: 100%;
    top: 38px;
    border-top: 0;
    font-size: 14px;
    color: #666;
    border-radius: 0 0 4px 4px;
    margin-top: -4px;
    padding-top: 4px;
    z-index: 9999;
    display: none;
    li {
      cursor: pointer;
      line-height: 35px;
      text-indent: 1em;
    }
    li:hover {
      background: #bbbbbb;
    }

  }
</style>
