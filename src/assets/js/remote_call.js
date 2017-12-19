/*
*project 村医后台
*author 马学坚
*email webmxj@163.com
*date 2017.09.02
*需要先引入jquery和jquery.md5.js插件
 * 传进来的值要为对象
 * callback 成功的回调函数
 * errorCallback 失败的回调函数
*/
function RemoteCall(){
	this.setting={//外部传进来的参数http://192.168.0.104
    // openUrl : "http://onlinepay.site:8091",//设置请求的域名
    openUrl: "http://www.yxunionpay.com:8091",//设置请求的域名
		router:"/base/validatecode/picture/get", //设置请求的地址路径
    appid: 3,
    callback: function () {
    },
    errorCallback: function () {
    }
	}
	//
	this.tempSignature = "";//计算后返回的signature 算法在下面makeSignature中
	this.version ="1.0.0"; //版本号 默认是1.0.0
	this.key = "qazwsxedc";//参数密匙
	this.nonce = Math.ceil(Math.random()*1000);//随机数
	this.timestamp = new Date().getTime();//时间戳
	this.url=null;//定义地址
	this.res=null;
}
/*
 *@param validateCodeType1 登录验证码 2 重置密码验证码
 *传进来的数据 opt={
 *					validateCodeType:"",
 *					data:{}
 *					}
 */
RemoteCall.prototype.init = function(opt){
	// 将传进来的值克隆给setting;
	extend(this.setting,opt);
	// 将this.setting.data转为字符串 post要求
	this.data=JSON.stringify(this.setting.data);
	if(!this.setting.session){
		this.url=this.setting.openUrl+this.setting.router+"?appid=" +this.setting.appid + "&version=" + this.version + "&nonce=" + this.nonce + "&timestamp=" + this.timestamp + "&signature=" + this.makeSignature("", this.data);
	}else{
		this.url=this.setting.openUrl+this.setting.router+"?appid=" +this.setting.appid + "&version=" + this.version + "&nonce=" + this.nonce + "&session="+ this.setting.session +"&timestamp=" + this.timestamp + "&signature=" + this.makeSignature(this.setting.session, this.data);
	}
   	var _this=this;
    /*
    *contentType设置请求头
    */

    $.ajax({
    	type: 'POST',
    	async:false,
        url: this.url,
        contentType: "application/json; charset=utf-8",
        data:this.data,
        dataType: 'json',
        success: function (resp) {
        		_this.res=resp;
          _this.setting.callback(resp)//成功的回调函数
          if (resp.ret.errorCode == -1) {//等于-1返回错误信息
            if (resp.ret.errorMessage != "ValidateCode error" && resp.ret.errorMessage != "user login not exist" && resp.ret.errorMessage != "password error") {
              alert(resp.ret.errorMessage);
            }
          }
        },
        error:function (resp) {
          _this.setting.errorCallback(resp);
          if(resp.responseText=='session not found'){
            alert('身份认证失效,请重新登录');
          };
        }
    });
}

//md5转码函数
RemoteCall.prototype.makeSignature = function(session, biz_content){
	this.md5Content = $.md5(biz_content).toUpperCase();
	// if(this.setting.interface=="login"){
	// 	var signature ="appid="+this.setting.appid + "&nonce="+ this.nonce +"&timestamp=" +this.timestamp + "&version=" + this.version + "&key=" + this.key;
	// }else{
		if(!session){
			var signature ="appid="+this.setting.appid +"&biz_content="+this.md5Content + "&nonce="+ this.nonce +"&timestamp=" +this.timestamp + "&version=" + this.version + "&key=" + this.key;
		} else{
			var signature="appid="+this.setting.appid +"&biz_content="+this.md5Content + "&nonce="+ this.nonce + "&session="+session+"&timestamp=" +this.timestamp + "&version=" + this.version + "&key=" + this.key;
		}
	// }
	this.tempSignature = $.md5(signature).toUpperCase();
	return this.tempSignature;
}
//for in 函数赋值
function extend(obj1,obj2){
	for(var i in obj2){
		obj1[i]=obj2[i]
	}
}
