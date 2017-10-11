<template>
	<div id="MerchantAdd">
		<div>
			<el-row :gutter="20">
				<el-col :span="2" ><div class="girid-content"><label>商户类型</label></div></el-col>
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
				<el-col :span="6"><div class="girid-content girid-ipt"><input type="text" name=""></div></el-col>
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
				<el-col :span="2"><div class="girid-content"><label>商户地址</label></div></el-col>
				<el-col :span="6">
					<!--<div class="distpicker"><v-distpicker province="省" city="市" area="区"></v-distpicker></div>-->
				  <div class="distpicker">
            <select name="" id="province"  @change="setCity()">
              <option v-for="data in provinceData" v-bind:value="data.id">{{data.name}}</option>
            </select>
            <select name="" id="city" >
              <option v-for="data in cityData" v-bind:value="data.id">{{data.name}}</option>
            </select>
            <select name="" id="district">
              <option v-for="datas in districtData" v-bind:value="datas.id">{{datas.name}}</option>
            </select>
          </div>
        </el-col>
				<el-col :span="2"><div class="girid-content"><label>详细地址</label></div></el-col>
				<el-col :span="6"><div class="girid-content girid-ipt"><input type="text" name=""></div></el-col>
			</el-row>
			<el-row :gutter="20">
				<el-col :span="2"><div class="girid-content"><label>商户法人</label></div></el-col>
				<el-col :span="6"><div class="girid-content girid-ipt"><input type="text" name=""></div></el-col>
				<el-col :span="2"><div class="girid-content"><label>商户联系人</label></div></el-col>
				<el-col :span="6"><div class="girid-content girid-ipt"><input type="text" name=""></div></el-col>
				<el-col :span="2"><div class="girid-content"><label>联系电话</label></div></el-col>
				<el-col :span="6"><div class="girid-content girid-ipt"><input type="text" name=""></div></el-col>
			</el-row>
			<el-row :gutter="20">
				<el-col :span="2"><div class="girid-content"><label>商户邮箱</label></div></el-col>
				<el-col :span="6"><div class="girid-content girid-ipt"><input type="text" name=""></div></el-col>
				<el-col :span="2"><div class="girid-content"><label>主营业务</label></div></el-col>
				<el-col :span="6"><div class="girid-content girid-ipt"><input type="text" name=""></div></el-col>
				<el-col :span="2"><div class="girid-content"><label>商户编码</label></div></el-col>
				<el-col :span="6"><div class="girid-content girid-ipt"><input type="text" name=""></div></el-col>
			</el-row>
			<el-row :gutter="20">
				<el-col :span="2"><div class="girid-content"><label>银行账户名</label></div></el-col>
				<el-col :span="6"><div class="girid-content girid-ipt"><input type="text" name=""></div></el-col>
				<el-col :span="2"><div class="girid-content"><label>银行账号</label></div></el-col>
				<el-col :span="6"><div class="girid-content girid-ipt"><input type="text" name=""></div></el-col>
			</el-row>
		</div>
		<div class="upload">
			<el-row  :gutter="20">
				<el-col :span="3"><div class="girid-content"><label>营业执照上传</label></div></el-col>
				<el-col :span="8"><div class="girid-content girid-ipt"><input type="text" name=""></div></el-col>
				<el-col :span="3"><div class="upload-btn">浏览选择附件<input type="file" name=""></div></el-col>
				<el-col :span="2"><div class="checkImg">点击查看大图</div></el-col>
			</el-row>
			<el-row  :gutter="20">
				<el-col :span="3"><div class="girid-content"><label>从业资格证上传</label></div></el-col>
				<el-col :span="8"><div class="girid-content girid-ipt"><input type="text" name=""></div></el-col>
				<el-col :span="3"><div class="upload-btn">浏览选择附件<input type="file" name=""></div></el-col>
				<el-col :span="2"><div class="checkImg">点击查看大图</div></el-col>
			</el-row>
			<el-row  :gutter="20">
				<el-col :span="3"><div class="girid-content"><label>银行卡资料上传</label></div></el-col>
				<el-col :span="8"><div class="girid-content girid-ipt"><input type="text" name=""></div></el-col>
				<el-col :span="3"><div class="upload-btn">浏览选择附件<input type="file" name=""></div></el-col>
				<el-col :span="2"><div class="checkImg">点击查看大图</div></el-col>
			</el-row>
			<el-row  :gutter="20">
				<el-col :span="3"><div class="girid-content"><label>法人身份证照片上传</label></div></el-col>
				<el-col :span="8"><div class="girid-content girid-ipt"><input type="text" name=""></div></el-col>
				<el-col :span="3"><div class="upload-btn">浏览选择附件<input type="file" name=""></div></el-col>
				<el-col :span="2"><div class="checkImg">点击查看大图</div></el-col>
			</el-row>
			<el-row :gutter="20">
			  	<el-col :span="2" :offset="20"><button type="button" class="grid-content upload-btn">添加商户</button></el-col>
			</el-row>
		</div>
	</div>
</template>
<script type="text/javascript">
	import VDistpicker from 'v-distpicker'
	export default{
		data(){
		    return {
          provinceData:[{'name':'省'}],
          cityData:[{'name':'市'}],
          districtData:[{'name':'区'}],
          session:null
        }
    },
    compontents: {
			VDistpicker
		},
		methods:{
		    getArea(){
          this.session=sessionStorage.getItem('session');//本地存储保存session状态
          var getArea=new RemoteCall();
          getArea.init({
              router:"/base/area/idname/get",
              session:this.session,
              data:{
                parentAreaId:0
              }
            });
            this.provinceData=getArea.res.rows
		      },
        setCity(){
            var mySelect=document.getElementById('province');
            var index=mySelect.selectedIndex;
            var parentId=mySelect.getElementsByTagName('option')[index].value;
           var getCity=new RemoteCall();
           getCity.init({
             router:"/base/area/idname/get",
             session:this.session,
             data:{
               parentAreaId:parentId
             }
           });
           this.cityData=getCity.res.rows;
          this.setDistrict();
         },
        setDistrict(){
          var mySelect=document.getElementById('city');
          var index=mySelect.selectedIndex;
          var parentId=mySelect.getElementsByTagName('option')[index].value;
          var getDistrict=new RemoteCall();
          getDistrict.init({
            router:"/base/area/idname/get",
            session:this.session,
            data:{
              parentAreaId:parentId
            }
          });
          this.districtData=getDistrict.res.rows;
          console.log(getDistrict.res);
        }
    },
    mounted:function(){
      this.getArea();
    }
	}
</script>
<style type="text/css" lang="scss" scoped>
	#MerchantAdd{
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
  		border-radius:3px;
  		border:1px solid #aaa;
  	}
  	select{
  		width: 100%;
  		height:36px;
  		border-radius:3px;
  		border:1px solid #aaa;

  	}
  }
  .girid-ipt{
  	text-align: left;
  }
  .upload{
  	margin-top:75px;
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
  .upload-btn{
  	width: 100%;
  	overflow:hidden;
  	background:#32BC6F;
  	height:36px;
  	border-radius:4px;
  	position:relative;
  	line-height:36px;
  	color:#fff;
  	text-align:center;
  	border:0;
  	outline:none;
  	cursor:pointer;
  	input{
		position:absolute;
		width: 100%;
		height:100%;
		top:0;
		left:0;
		opacity:0;
  	}
  }
  .checkImg{
  	line-height:36px;
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
  }
  @media screen and (max-width: 1420px) {
    .el-col-2{
      width:12%;
    }
    .el-col-6{
      width:21.333333%;
    }
  }
</style>
<style type="text/css">
	.distpicker select{ width: 32% !important; height:36px; line-height:36px; padding:0.25rem ; outline:none; border:1px solid #aaa ;border-radius:3px;}
  @media screen and (max-width: 1420px) {
    .distpicker select{
      width: 31% !important;
    }
  }
</style>
