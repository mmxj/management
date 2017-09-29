<template>
<div id="LeftList">
	<el-menu default-active="2" router class="el-menu-vertical-demo"  @open="handleOpen" @close="handleClose" theme="dark">
      <el-submenu index="1">
        <template slot="title">基础信息管理</template>
        <el-menu-item index="/user"  class="menu-border-bottom el-lvtwo">用户信息</el-menu-item>
		<el-submenu index="1-2">
          <template slot="title"><router-link class="el-lvtwo" to="/merchant">商户信息</router-link></template>
          <el-menu-item index="/merchantadd"  class="menu-border-bottom el-lvthree">添加新商户</el-menu-item>
          <el-menu-item index="/merchantcheck"  class="menu-border-bottom el-lvthree">查阅商户证件</el-menu-item>
          <el-menu-item index="/merchantchannel"  class="menu-border-bottom el-lvthree">导入商户信息</el-menu-item>
        </el-submenu>
        <el-submenu index="1-3">
          <template slot="title"><router-link class="el-lvtwo" to="/collaborate">合作行业</router-link></template>
          <el-menu-item index="/collaborateadd"  class="menu-border-bottom el-lvthree">新增合作行业客户</el-menu-item>
          <el-menu-item index="/collaboratecheck"  class="menu-border-bottom el-lvthree">查阅行业客户证件</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="/order"  class="menu-border-bottom">订单管理</el-menu-item>
      <el-submenu index="3">
      	<template slot="title">产品管理</template>
      	<el-menu-item index="channel"  class="menu-border-bottom el-lvtwo">产品通道基础管理</el-menu-item>
      </el-submenu>
	  <el-submenu index="4">
	  	<template slot="title">医疗后台管理</template>
	  	<el-menu-item index="/uploaddir"  class="menu-border-bottom el-lvtwo">三大目录上传</el-menu-item>
	  	<el-menu-item index="/dirlist"  class="menu-border-bottom el-lvtwo">三大目录列表</el-menu-item>
	  	<el-menu-item index="/dirmanage"  class="menu-border-bottom el-lvtwo">三大目录管理</el-menu-item>
	  	<el-submenu index="4-4">
        <template slot="title"><router-link class="el-lvtwo" to="/healthstation">卫生站管理</router-link></template>
	  		<el-menu-item index="/healthstationadd"  class="menu-border-bottom el-lvthree">添加卫生站</el-menu-item>
	  		<el-menu-item index="/doctoradd"  class="menu-border-bottom el-lvthree">添加村医</el-menu-item>
	  		<el-menu-item index="/doctormanage"  class="menu-border-bottom el-lvthree">管理村医</el-menu-item>
	  	</el-submenu>
	  	<el-submenu index="4-5">
	  		<template slot="title">医疗后台信息发布</template>
	  		<el-menu-item index="/businessissue"  class="menu-border-bottom el-lvthree">业务专区发布</el-menu-item>
	  		<el-menu-item index="/informationup"  class="menu-border-bottom el-lvthree">信息专区发布</el-menu-item>
	  	</el-submenu>
		<el-submenu index="4-6">
	  		<template slot="title">数据管理系统</template>
	  		<el-menu-item index="/paydata"  class="menu-border-bottom el-lvthree">支付流水数据</el-menu-item>
	  		<el-menu-item index="/dataadministration"  class="menu-border-bottom el-lvthree">绑卡数据管理</el-menu-item>
	  		<el-menu-item index="/datareport"  class="menu-border-bottom el-lvthree">数据报表</el-menu-item>
	  	</el-submenu>
	  </el-submenu>
	  <el-menu-item index="/terminal"  class="menu-border-bottom">社保受理终端管理平台</el-menu-item>
      <el-submenu index="6">
      		<template slot="title">系统管理</template>
      		<el-menu-item index="6-1"  class="menu-border-bottom el-lvtwo">系统用户管理</el-menu-item>
      		<el-menu-item index="6-2"  class="menu-border-bottom el-lvtwo">系统权限管理</el-menu-item>
      </el-submenu>
    </el-menu>
</div>
</template>
<script type="text/javascript">
	export default {
		data(){
			return {
			}
		},
		 methods: {
      handleOpen(key, keyPath) {
        	console.log(key, keyPath);
	      },
	      handleClose(key, keyPath) {
	        console.log(key, keyPath);
	      }
	    },
		mounted:function(){

		}
	}
</script>
<style type="text/css" lang="scss" scoped="">
	#LeftList{
	    background: #fff;
	    min-height: 1234px;
	    border-top: 1px solid #EEEEEE;
	    li{
	    	color:#333;
	    	text-indent: 25%;
    		font-size: 16px;
   			font-weight: bold;
   			line-height: 50px;
   			div{
   				font-size:14px;
   				font-weight:normal;
   				line-height: 50px;
   				border-bottom: 1px solid #EEEEEE;
   			}
   			span{
   				display: block;
   				line-height: 50px;
   				border-bottom: 1px solid #EEEEEE;
   				position: relative;
   			}
   			.secondary{
   				border-bottom:0;
   				div{
   					font-size:12px;
					background: #EEEEEE;
				    border-bottom: 1px solid #fff;
				    color: #333;;
   				}
   			}
	    }
	    .unfold>span:after{
			content: "";
		    position: absolute;
		    width: 15px;
		    height: 9px;
		    cursor: pointer;
		    background-image: url(../assets/img/u87_selected_2.png);
		    background-size: cover;
		    right: 18px;
		    top: 21px;
	    }
	}
</style>
<style type="text/css">
	.el-menu li{
		text-indent:0 !important;
		background: #fff !important;
	}
	.el-submenu__title{
		padding-left:20% !important;
		font-size:14px !important;
		font-weight:normal !important;
		border-bottom:1px solid #EEEEEE;
		color:#333 !important;
	}
	.el-menu-vertical-demo>.el-submenu>.el-submenu__title{
		color:#333 !important;
		font-size:16px !important;
		font-weight:bold !important;
	}
	.el-menu-item{
		padding-left:20% !important;
	}
	.el-menu-item-group__title{
		padding-left:20px !important;
	}
	.el-submenu__title:hover{
		background: #fff !important;
	}
	.menu-border-bottom{
		border-bottom:1px solid #EEEEEE;
	}
	.el-lvtwo{
		font-size:14px !important;
		font-weight:normal !important;
	}
	a.el-lvtwo{
		color:#333 !important;
		font-size:14px !important;
		text-decoration: none;
    width: 100%;
    height: 100%;
    display:block;
	}
	li.el-lvthree{
		font-size:12px !important;
		font-weight:normal !important;
		color: #9C9C9C !important;
		background: #EEEEEE !important;
		border-top: 1px solid #fff !important;
	}
	li.el-lvthree:nth-child(1){
		border-top: 0 !important;
	}
	.el-submenu.is-active .el-submenu__title{
		    border-bottom-color:#EEEEEE !important;
	}
</style>
