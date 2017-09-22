<template>
	<div id="RightPage">
		<NavBar></NavBar>
		<router-view></router-view>
	</div>
</template>
<script type="text/javascript">
	import NavBar from './NavBar.vue'
	export default{
		components:{
			NavBar
		}
	}
</script>
<style type="text/css" scopted="">
	#RightPage{
		
	}
</style>