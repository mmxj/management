<template>
  <div id="NavBar">
    <ul class="clearfix">
      <li v-for="(data,index) in readList">
        <router-link :to="getUrlArr[index]">{{data}}</router-link>
        <span class="close" @click="close(index)">x</span></li>
    </ul>
  </div>
</template>
<script type="text/javascript">
  import {mapGetters, mapActions} from 'vuex'
  export default{
    data(){
      return {}
    },
    computed: mapGetters(['readList', 'getUrlArr']),
    methods: {
      ...mapActions(['addList', 'urlArrs']),
      close(index){
        this.readList.splice(index, 1);
        this.getUrlArr.splice(index, 1);
      },
      goURl(){//在这里写路由跳转的原因是 操作数组比较方便 如果将传递的数据换成json来传递url的话

      }
    },
    watch: {
      readList(){
      }
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
  }
</style>
