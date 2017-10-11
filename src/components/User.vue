<template>
	<div id="User">
		<div>
			<el-row :gutter="20">
				<el-col :span="2"><div class="girid-content"><label>姓名</label></div></el-col>
				<el-col :span="6"><div class="girid-content girid-ipt"><input type="text" name=""></div></el-col>
				<el-col :span="2"><div class="girid-content"><label>身份证</label></div></el-col>
				<el-col :span="6"><div class="girid-content girid-ipt"><input type="text" name=""></div></el-col>
				<el-col :span="2"><div class="girid-content"><label>社保卡号</label></div></el-col>
				<el-col :span="6"><div class="girid-content girid-ipt"><input type="text" name=""></div></el-col>
			</el-row>
			<el-row :gutter="20">
				<el-col :span="2"><div class="girid-content"><label>社保卡号</label></div></el-col>
				<el-col :span="6"><div class="girid-content girid-ipt"><input type="text" name=""></div></el-col>
				<el-col :span="3"><div class="girid-content girid-btn"><button type="button">搜索</button></div></el-col>
			</el-row>
		</div>
		<div class="table-box">
			<el-table :data="tableData" border style="width:100%" max-height="600">
				<el-table-column label="管理" width="120">
					<template scope='scope'>
						<el-button type="text"><router-link to="/userdetails">用户详情</router-link></el-button>
					</template>
				</el-table-column>
				<el-table-column prop="ordinal" label="序号" width="120">
				</el-table-column>
				<el-table-column prop="name" label="姓名" width="120">
				</el-table-column>
				<el-table-column prop="cardId" label="身份证号" width="180">
				</el-table-column>
				<el-table-column prop="isSocial" label="是否绑定社保卡" width="180">
				</el-table-column>
				<el-table-column prop="socialNum" label="社保卡号" width="180">
				</el-table-column>
				<el-table-column prop="socialarea" label="社保卡归属地区" width="180">
				</el-table-column>
				<el-table-column prop="socialType" label="社保卡类型" width="180">
				</el-table-column>
				<el-table-column prop="socialDate" label="社保卡发行日期" width="180">
				</el-table-column>
				<el-table-column prop="socialPhone" label="社保卡手机" width="180">
				</el-table-column>
				<el-table-column prop="isBank" label="是否绑定银行卡" width="180">
				</el-table-column>
				<el-table-column prop="bankNum" label="银行卡号" width="180">
				</el-table-column>
				<el-table-column prop="bankPhone" label="银行卡手机号" width="180">
				</el-table-column>
			</el-table>
		</div>
	</div>
</template>
<script type="text/javascript">
	export default{
		data(){
			return {
				tableData:[{
					ordinal: "111"
				}]
			}
		}
	}
</script>
<style type="text/css"  lang="scss" scoped>
	#User{
		margin:15px;
		padding:25px;
		background: #fff;
		border-radius:5px;
		color:#333;
	}
  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .girid-content{
  	line-height:30px;
  	text-align: right;
  	input{
  		width: 100%;
  		height:30px;
  		border-radius:5px;
  		border:1px solid #aaa;
  	}
  }
  .girid-ipt{
  	text-align: left;
  }
  .girid-btn{
  	button{
  		background:#32BC6F;
  		border-radius:5px;
  		width: 120px;
  		height:36px;
  		vertical-align: middle;
		color:#fff;
		border:5px;
  	}
  }
  .table-box{
  	margin-top:50px;
  }
  /*媒体查询做兼容*/
  @media screen and (max-width: 1760px) {
    label{
      font-size:15px;
      min-width: 5em;
    }
  }
  @media screen and (max-width: 1700px) {
    .el-col-2{
      width:10%;
    }
    .el-col-6{
      width:23.333333%;
    }
    .el-col-3 {
      width: 15.5%;
    }
  }
  @media screen and (max-width: 1420px) {
    .el-col-2{
      width:10%;
    }
    .el-col-6{
      width:23.333333%;
    }
    .el-col-3 {
      width: 17.5%;
    }
  }
</style>
