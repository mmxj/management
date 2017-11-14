<template>
  <div id="NavBar">
    <ul class="clearfix">
      <li v-for="(data,index) in readList" :class="{liActive:getUrlArr[index]==url}">
        <router-link :to="getUrlArr[index]">{{data}}</router-link>
        <span class="close" @click="close(index)">x</span></li>
    </ul>
  </div>
</template>
<script type="text/javascript">
  import {mapGetters, mapActions} from 'vuex'
  export default{
    data(){
      return {
        url: null,
      }
    },
    computed: mapGetters(['readList', 'getUrlArr']),
    methods: {
      ...mapActions(['addList', 'urlArrs']),
      close(index){
        this.readList.splice(index, 1);
        this.getUrlArr.splice(index, 1);
        if (this.getUrlArr.length > 0) {
          this.$router.push(this.getUrlArr[this.getUrlArr.length - 1])
        } else {
          this.$router.push('/homepage')
        }
        sessionStorage.setItem('saveList', this.readList);
        sessionStorage.setItem('urlArr', this.getUrlArr);
      },
      goURl(){//在这里写路由跳转的原因是 操作数组比较方便 如果将传递的数据换成json来传递url的话

      }
    },
    watch: {
      readList(){
      },
      $route(){
        this.url = this.$route.fullPath
      }
    },
    mounted: function () {
      this.url = this.$route.fullPath
    }
  }
</script>
<style type="text/css" lang="scss" scoped="">
  #NavBar {
    height: 30px;
    border-bottom: 2px solid #82DFAB;
    width: 100%;
  }

  #NavBar {
    background: #fff;
    ul {
      overflow: hidden;
      height: 100%;
      li {
        float: left;
        background: #49df8b;
        color: #fff;
        font-size: 14px;
        padding: 8px 10px;
        margin-right: 10px;
        position: relative;
        padding-right: 2em;
        text-align: center;
        overflow: hidden; /*自动隐藏文字*/
        text-overflow: ellipsis; /*文字隐藏后添加省略号*/
        white-space: nowrap; /*强制不换行*/
        width: 6em; /*不允许出现半汉字截断*/
        a {
          color: #fff;
          text-decoration: none;
        }
        .close {
          position: absolute;
          right: 10px;
          font-size: 16px;
          cursor: pointer;
        }
      }
    }
    .liActive {
      background: #36c675;
    }
  }
</style>
