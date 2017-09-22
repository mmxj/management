<template>
	<div id="Merchant">
		<div>
			<el-row :gutter="20">
				<el-col :span="2"><div class="girid-content"><label>商户类型</label></div></el-col>
				<el-col :span="6">
					<div class="girid-content girid-ipt">
						<select>
							<option>请选择商户类型</option>
							<option>镇卫生站</option>
							<option>村卫生站</option>
							<option>药店</option>
							<option>其他</option>
						</select>
					</div>
				</el-col>
				<el-col :span="2"><div class="girid-content"><label>商户名称</label></div></el-col>
				<el-col :span="6">
					<div class="girid-content girid-ipt">
						<input type="text" name="">
					</div>
				</el-col>
				<el-col :span="2"><div class="girid-content"><label>商户证件类型</label></div></el-col>
				<el-col :span="6">
					<div class="girid-content girid-ipt">
						<select>
							<option>请选择证件类型</option>
							<option>营业执照</option>
							<option>个人身份证</option>
							<option>无证件</option>
							<option>行业准入资格证</option>
							<option>其他证件</option>
						</select>
					</div>
				</el-col>
			</el-row>
			<el-row :gutter="20">
				<el-col :span="2"><div class="girid-content"><label>商户证件号</label></div></el-col>
				<el-col :span="6"><div class="girid-content girid-ipt"><input type="text" name=""></div></el-col>
				<el-col :span="3"><div class="girid-content girid-btn"><button type="button">搜索</button></div></el-col>
				<el-col :span="2"><div class="girid-content girid-btn"><button type="button">添加新商户</button></div></el-col>
			</el-row>
		</div>
		<div class="table-box">
			<el-table :data="tableData" border style="width:100%" max-height="600" @selection-change="handleSelectionChange">
				<el-table-column type="selection" width="55"></el-table-column>
				<el-table-column prop="ordinal" label="序号" width="120">
				</el-table-column>
				<el-table-column prop="merchantId" label="商户编码" width="120"></el-table-column>
				<el-table-column prop="merchantType" label="商户类型" width="120">
				</el-table-column>
				<el-table-column prop="merchantName" label="商户名称" width="180">
				</el-table-column>
				<el-table-column prop="merchantCardType" label="商户证件类型" width="180">
				</el-table-column>
				<el-table-column prop="merchantArea" label="商户地址" width="300">
				</el-table-column>
				<el-table-column prop="legalPerson" label="商户法人" width="180">
				</el-table-column>
				<el-table-column prop="linkman" label="商户联系人" width="180">
				</el-table-column>
				<el-table-column prop="linkmanPhone" label="联系人手机" width="180">
				</el-table-column>
				<el-table-column prop="linkmanEamil" label="联系邮箱" width="180">
				</el-table-column>
				<el-table-column prop="business" label="商户主营业务" width="180">
				</el-table-column>
				<el-table-column prop="accountName" label="商户银行账户名" width="180">
				</el-table-column>
				<el-table-column prop="account" label="银行卡手机号" width="220">
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
		},
		methods: {
			//变化的时候出发 将数据放入multipleSelection中
	      toggleSelection(rows) {
	        if (rows) {
	          rows.forEach(row => {
	            this.$refs.multipleTable.toggleRowSelection(row);
	          });
	        } else {
	          this.$refs.multipleTable.clearSelection();
	        }
	      },
	      handleSelectionChange(val) {
	        this.multipleSelection = val;
	        console.log(this.multipleSelection)
	      }
	    }
	}

</script>
<style type="text/css" lang="scss" scoped>
	#Merchant{
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
  	select{
  		width: 100%;
  		height:36px;
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
  
</style>
<style type="text/css">
	.el-table th{
  		text-align:center !important;
  	}
  	.el-table td{
  		text-align:center !important;
  	}
</style>