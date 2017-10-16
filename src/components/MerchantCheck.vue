<template>
  <div id="MerchantCheck">
    <div>
      <el-row :gutter="10">
        <el-col :span="6">
          <div class="el-ipt">
            <input type="text" :placeholder="placeholder" v-model="valChange" @keyup="holder">
            <ul class="company" ref="searchBox">
              <li v-for="name in companyName" v-on:click="getText(name)">{{name}}</li>
            </ul>
          </div>
        </el-col>
        <el-col :span="2">
          <div class="el-btn">
            <button type="button" @click="getText2">搜索</button>
          </div>
        </el-col>
      </el-row>
    </div>
    <div>
      <el-row :gutter="10" class="logoContent">
        <el-col :span="16" :offset="4">
          <img class="MerchantImg" :src="imgUrl"/>
        </el-col>
      </el-row>
      <el-row class="el-page-btns">
        <el-col :offset="9" :span="2">
          <el-button @click="pageDown">上一页</el-button>
        </el-col>
        <el-col :span="2">
          <div class="el-page-title">{{pictureName}}</div>
        </el-col>
        <el-col :span="2">
          <el-button @click="pageAdd">下一页</el-button>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script type="text/javascript">
  export default{
    data(){
      return {
        imgUrl: require("@/assets/img/login_bg.png"),
        pictureName: '商品证件显示',
        session: null,
        valChange: null,
        companyName: [],
        dataList: null,
        saveData: [],
        index: 0,
        valChange: null,
        placeholder: '请输入商家名称或编号搜索对应商户图片信息'
      }
    },
    methods: {
      getPicture(){
        var pictureMessage = new RemoteCall();
        pictureMessage.init({
          router: "/company/certificate/get",
          session: this.session,
          data: {
            companyName: this.valChange,
            pageInfo: {
              pageSize: 15,
              pageNum: 1
            }
          },
          callback: this.dataCallback
        })
      },
      dataCallback(data){//对数据进行检查 将公司名字提取出来
        this.dataList = data.rows;
        this.companyName = [];
        if (data.rows) {
          if (data.rows.length > 0) {
            addArr:
              for (var i = 0; i < data.rows.length; i++) {
                for (var j = 0; j < this.companyName.length; j++) {
                  if (data.rows[i].companyName == this.companyName[j]) {
                    continue addArr
                  }
                }
                this.companyName.push(data.rows[i].companyName);
              }
          }
        }

      },
      getSession(){
        if (sessionStorage.getItem('session')) {
          this.session = sessionStorage.getItem('session');//获取本地存储保存session状态
        } else {
          this.$router.push({path: '/login'})
        }
      },
      showPic(i){//展示照片和信息到页面中
        if (i) {
          this.index = i;
        }
        this.pictureName = this.saveData[this.index].certificateTypeName;
        this.getPic(this.saveData[this.index].certificatePic)
      },
      getPic(name){//根据名字查找图片
        var vm = this;
        $.ajax({
          url: "http://192.168.0.137:18081/yxsj-openapi-web/openapi/download/download_base64.do",
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
      getText(name){//点击获取
        this.placeholder = name;
        this.valChange = null;
        this.saveData = [];
        for (var i = 0; i < this.dataList.length; i++) {
          if (name == this.dataList[i].companyName) {
            this.saveData.push(this.dataList[i])//将匹配的信息保存的到数组中
          }
        }
        this.$refs.searchBox.style.display = 'none';
        this.showPic()
      },
      getText2(){//点击搜索触发
        this.getText(this.valChange);
      },
      pageAdd(){//上一页
        if (this.index < this.saveData.length - 1) {
          this.index++
          this.showPic(this.index);
        }
      },
      pageDown(){//下一页
        if (this.index > 0) {
          this.index--
          this.showPic(this.index);
        }
      },
      holder(){
        if (!this.valChange) {
          this.placeholder = '请输入商家名称或编号搜索对应商户图片信息'
        }
        console.log(111)
      }
    },
    mounted: function () {
      this.getSession();
    },
    watch: {
      valChange: function () {
        this.getPicture();
        if (this.companyName != '[]') {
          if (this.companyName.length > 0) {
            this.$refs.searchBox.style.display = 'block';
          } else {
            this.$refs.searchBox.style.display = 'none';
          }
        }
      }
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

  .el-ipt {
    position: relative;
    input {
      width: 100%;
      height: 32px;
      border: 1px solid #aaa;
      border-radius: 4px;
      text-indent: 1em;
      position: relative;
      z-index: 10000;
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
    }
  }

  .MerchantImg {
    width: 100%;

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
