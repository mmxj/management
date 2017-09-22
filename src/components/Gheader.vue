<template>
	<div id="Gheader">
		<header class="clearfix">
			<h1>社保金融服务应用平台</h1>
			<div class="title-center">
				<div class="title">医疗管理后台</div>
				<div>你好,<span>石头村卫生站的罗嘉伦医生</span></div>
				<div>今天是<span class="today">2017年7月19日</span></div>
			</div>
			<div class="site">
				惠州市惠来县水丰镇
			</div>
		</header>
		<h2 class="page1 left-title">运营管理后台首页</h2>
	</div>

</template>
<script type="text/javascript">
  export default{
  }
</script>
<style type="text/css" lang="scss" scoped="" >
	#Gheader{
		header{
		    font-size:14px;
		    line-height:70px;
		    height:70px;
		    background:#32BC6F;
		    color:#fff;
		    text-align:center;
		    position:relative;
		    h1{
		        font-size:18px;
		        font-weight:normal;
		        float: left;
		        width: 290px;
		        height: 66px;
		    }
		   div{
		    float:left;
		   }
		}
		.left-title{
		    height:60px;
		    line-height: 60px;
		    text-align: left;
		    padding-left: 3.16%;
		    color:#32BC6F;
		    cursor:pointer;
		}
		.title-center{
		    position:absolute;
		    right:260px;
		    top:0;
		    div{
		        padding:0 40px;
		    }
		}
		.site {
		    float: right;
		    width: 260px;
		    height: 100%;
		    /* line-height: 70px; */
		}
	}
	.page1{
		background:#fff;
	}
</style>
