//mashup_sdk
//appid = 145
//生成时间：2017-02-13 11:24:48
//设置post参数的中文编码，否则chrome提交的中文有乱码
jQuery.ajaxSettings['contentType'] = 'application/x-www-form-urlencoded; charset=UTF-8';
var mashup_api_url = "http://v2.mashupcloud.cn";

var mashup_sdk = {
	//获得应用授权token
	auth: function(p) {
		if (!dataVerify(p, "appkey", "app的用户名", "必填", "STRING", "32", "32", "")){return;}
		if (!dataVerify(p, "appsecret", "app的密码", "必填", "STRING", "32", "32", "")){return;}
		doPost(mashup_api_url+'/developer/auth.do', p);
	},
	//我的模型的API
	//LIST - Essay - 文章
	listEssay: function(p){
		if (!dataVerify(p, "token", "app登录的token", "必填", "STRING", "32", "32", "")){return;}
		if (!dataVerify(p, "appid", "appid", "必填", "NUMBER", "1", "max", "")){return;}
		doPost(mashup_api_url+'/LIST/Essay/?appid='+p['params']['appid'], p);
	},

	//GET - Essay - 文章
	getEssay: function(p){
		if (!dataVerify(p, "token", "app登录的token", "必填", "STRING", "32", "32", "")){return;}
		if (!dataVerify(p, "appid", "appid", "必填", "NUMBER", "1", "max", "")){return;}
		if (!dataVerify(p, "id", "id", "必填", "NUMBER", "1", "max", "")){return;}
		doPost(mashup_api_url+'/GET/Essay/'+p['params']['id']+'/?appid='+p['params']['appid'], p);
	},

	//ADD - Essay - 文章
	addEssay: function(p){
		if (!dataVerify(p, "token", "app登录的token", "必填", "STRING", "32", "32", "")){return;}
		if (!dataVerify(p, "appid", "appid", "必填", "NUMBER", "1", "max", "")){return;}
		doPost(mashup_api_url+'/ADD/Essay/?appid='+p['params']['appid'], p);
	},

	//EDIT - Essay - 文章
	editEssay: function(p){
		if (!dataVerify(p, "token", "app登录的token", "必填", "STRING", "32", "32", "")){return;}
		if (!dataVerify(p, "appid", "appid", "必填", "NUMBER", "1", "max", "")){return;}
		if (!dataVerify(p, "id", "id", "必填", "NUMBER", "1", "max", "")){return;}
		doPost(mashup_api_url+'/EDIT/Essay/'+p['params']['id']+'/?appid='+p['params']['appid'], p);
	},

	//DELETE - Essay - 文章
	deleteEssay: function(p){
		if (!dataVerify(p, "token", "app登录的token", "必填", "STRING", "32", "32", "")){return;}
		if (!dataVerify(p, "appid", "appid", "必填", "NUMBER", "1", "max", "")){return;}
		if (!dataVerify(p, "id", "id", "必填", "NUMBER", "1", "max", "")){return;}
		doPost(mashup_api_url+'/DELETE/Essay/'+p['params']['id']+'/?appid='+p['params']['appid'], p);
	},

	//自定义SQL
	customSQL: function(p){
		if (!dataVerify(p, "token", "app登录的token", "必填", "STRING", "32", "32", "")){return;}
		if (!dataVerify(p, "appid", "appid", "必填", "NUMBER", "1", "max", "")){return;}
		if (!dataVerify(p, "name", "自定义SQL的name", "必填", "STRING", "1", "30", "")){return;}
		doPost(mashup_api_url+'/SQL/'+p['params']['name']+'/?appid='+p['params']['appid'], p);
	},

	//自定义JS
	customJS: function(p){
		if (!dataVerify(p, "token", "app登录的token", "必填", "STRING", "32", "32", "")){return;}
		if (!dataVerify(p, "appid", "appid", "必填", "NUMBER", "1", "max", "")){return;}
		if (!dataVerify(p, "name", "自定义JS的name", "必填", "STRING", "1", "30", "")){return;}
		doPost(mashup_api_url+'/JS/'+p['params']['name']+'/?appid='+p['params']['appid'], p);
	},

	//系统功能的API
	
	//用户系统-新用户注册
	user_register: function(p){
		if (!dataVerify(p, "token", "app登录的token", "必填", "STRING", "32", "32", "")){return;}
		if (!dataVerify(p, "appid", "appid", "必填", "NUMBER", "1", "max", "")){return;}
		if (!dataVerify(p, "username", "用户名", "必填", "STRING", "1", "20", "")){return;}
		if (!dataVerify(p, "password", "用户密码MD5", "必填", "STRING", "32", "32", "")){return;}
		if (!dataVerify(p, "mobile", "手机号码", "可选", "STRING", "1", "20", "")){return;}
		if (!dataVerify(p, "email", "电子邮件", "可选", "STRING", "1", "32", "")){return;}
		if (!dataVerify(p, "nickname", "用户昵称", "可选", "STRING", "1", "32", "")){return;}
		if (!dataVerify(p, "verifyCode", "验证码", "可选", "STRING", "4", "4", "")){return;}
		if (!dataVerify(p, "verifySMS", "短信验证码", "可选", "STRING", "4", "4", "")){return;}
		if (!dataVerify(p, "verifyEmail", "邮件验证码", "可选", "STRING", "4", "4", "")){return;}
		doPost(mashup_api_url+'/system/user_register.do?appid='+p['params']['appid'], p);
	},
	//用户系统-用户登录
	user_login: function(p){
		if (!dataVerify(p, "token", "app登录的token", "必填", "STRING", "32", "32", "")){return;}
		if (!dataVerify(p, "appid", "appid", "必填", "NUMBER", "1", "max", "")){return;}
		if (!dataVerify(p, "username", "用户名", "必填", "STRING", "1", "20", "")){return;}
		if (!dataVerify(p, "password", "用户密码MD5", "必填", "STRING", "32", "32", "")){return;}
		if (!dataVerify(p, "verifyCode", "验证码", "可选", "STRING", "4", "4", "")){return;}
		if (!dataVerify(p, "verifySMS", "短信验证码", "可选", "STRING", "4", "4", "")){return;}
		if (!dataVerify(p, "verifyEmail", "邮件验证码", "可选", "STRING", "4", "4", "")){return;}
		doPost(mashup_api_url+'/system/user_login.do?appid='+p['params']['appid'], p);
	},
	//用户系统-检查当前用户是否登录
	user_check: function(p){
		if (!dataVerify(p, "token", "app登录的token", "必填", "STRING", "32", "32", "")){return;}
		if (!dataVerify(p, "appid", "appid", "必填", "NUMBER", "1", "max", "")){return;}
		if (!dataVerify(p, "sessionkey", "用户登录的会话sessionkey", "必填", "STRING", "32", "32", "")){return;}
		doPost(mashup_api_url+'/system/user_check.do?appid='+p['params']['appid'], p);
	},
	//用户系统-找回密码
	user_findPassword: function(p){
		if (!dataVerify(p, "token", "app登录的token", "必填", "STRING", "32", "32", "")){return;}
		if (!dataVerify(p, "appid", "appid", "必填", "NUMBER", "1", "max", "")){return;}
		doPost(mashup_api_url+'/system/user_findPassword.do?appid='+p['params']['appid'], p);
	},
	//用户系统-修改当前用户信息
	user_modify: function(p){
		if (!dataVerify(p, "token", "app登录的token", "必填", "STRING", "32", "32", "")){return;}
		if (!dataVerify(p, "appid", "appid", "必填", "NUMBER", "1", "max", "")){return;}
		if (!dataVerify(p, "sessionkey", "用户登录的会话sessionkey", "必填", "STRING", "32", "32", "")){return;}
		if (!dataVerify(p, "password", "用户密码MD5", "必填", "STRING", "32", "32", "")){return;}
		if (!dataVerify(p, "mobile", "手机号码", "可选", "STRING", "1", "20", "")){return;}
		if (!dataVerify(p, "email", "电子邮件", "可选", "STRING", "1", "32", "")){return;}
		if (!dataVerify(p, "nickname", "用户昵称", "可选", "STRING", "1", "32", "")){return;}
		doPost(mashup_api_url+'/system/user_modify.do?appid='+p['params']['appid'], p);
	},
	//验证服务-显示图片验证码
	verify_getImageJS: function(p){
		if (!dataVerify(p, "token", "app登录的token", "必填", "STRING", "32", "32", "")){return;}
		if (!dataVerify(p, "appid", "appid", "必填", "NUMBER", "1", "max", "")){return;}
		document.write("<script src='"+mashup_api_url+"/system/verify_getImageJS.do?appid='+p['params']['appid']+'&token='+p['params']['token']></script>");
	},
	//验证服务-发送验证短信
	verify_sendSMS: function(p){
		if (!dataVerify(p, "token", "app登录的token", "必填", "STRING", "32", "32", "")){return;}
		if (!dataVerify(p, "appid", "appid", "必填", "NUMBER", "1", "max", "")){return;}
		if (!dataVerify(p, "mobile", "手机号码", "必填", "STRING", "1", "20", "")){return;}
		if (!dataVerify(p, "verifySessionId", "从verify_getImageJS返回的变量", "必填", "STRING", "32", "32", "")){return;}
		doPost(mashup_api_url+'/system/verify_sendSMS.do?appid='+p['params']['appid'], p);
	},
	//验证服务-发送验证邮件
	verify_sendEmail: function(p){
		if (!dataVerify(p, "token", "app登录的token", "必填", "STRING", "32", "32", "")){return;}
		if (!dataVerify(p, "appid", "appid", "必填", "NUMBER", "1", "max", "")){return;}
		if (!dataVerify(p, "email", "电子邮件", "必填", "STRING", "1", "32", "")){return;}
		if (!dataVerify(p, "subject", "邮件主题", "必填", "STRING", "1", "100", "")){return;}
		if (!dataVerify(p, "content", "邮件正文", "必填", "STRING", "1", "1000", "")){return;}
		doPost(mashup_api_url+'/system/verify_sendEmail.do?appid='+p['params']['appid'], p);
	},
	//文件系统-上传1个文件，必须使用form提交
	filesystem_upload: function(p){
		if (!dataVerify(p, "token", "app登录的token", "必填", "STRING", "32", "32", "")){return;}
		if (!dataVerify(p, "appid", "appid", "必填", "NUMBER", "1", "max", "")){return;}
		if (!dataVerify(p, "formid", "提交文件的form的id属性", "必填", "STRING", "1", "20", "")){return;}
		if (!dataVerify(p, "path", "文件保存的路径", "可选", "STRING", "1", "20", "")){return;}
		var form = $('#'+p['params']['formid']);
		form.attr('action', mashup_api_url+'/system/filesystem_upload.do?appid='+p['params']['appid']);
		form.submit();
	},
	//文件系统-下载文件， fileId或uuid必选1个
	filesystem_download: function(p){
		if (!dataVerify(p, "token", "app登录的token", "必填", "STRING", "32", "32", "")){return;}
		if (!dataVerify(p, "appid", "appid", "必填", "NUMBER", "1", "max", "")){return;}
		if (!dataVerify(p, "fileId", "文件id", "可选", "NUMBER", "1", "max", "")){return;}
		if (!dataVerify(p, "uuid", "文件的uuid", "可选", "STRING", "36", "36", "")){return;}
		if (!dataVerifyOne(p, ['fileId', 'uuid'], 1)){return;}
		location.href = mashup_api_url+'/system/filesystem_download.do?appid='+p['params']['appid']+'&token='+p['params']['token']+'&fileId='+p['params']['fileId']+'&uuid='+p['params']['uuid'];
	},
	//文件系统-显示图片文件或网页文件， fileId或uuid必选1个，contentType 文件MIME类型，默认image/png。显示网页，contentType=text/html
	filesystem_show: function(p){
		if (!dataVerify(p, "token", "app登录的token", "可选", "STRING", "32", "32", "")){return;}
		if (!dataVerify(p, "appid", "appid", "必填", "NUMBER", "1", "max", "")){return;}
		if (!dataVerify(p, "uuid", "文件的uuid", "必填", "STRING", "36", "36", "")){return;}
		if (!dataVerify(p, "contentType", "文件MIME类型", "可选", "STRING", "1", "50", "")){return;}
		if (!dataVerify(p, "type", "文件版本类型，空=原图，其他值是用户在image_*中自定义的", "可选", "STRING", "1", "20", "")){return;}
		var url = mashup_api_url+'/system/filesystem_show.do?appid='+p['params']['appid']+'&token='+p['params']['token']+'&uuid='+p['params']['uuid']+'&contentType='+p['params']['contentType']+'&type='+p['params']['type'];
		//此处只是返回文件的url，调用者可以用<img>显示图片或用location.href显示网页
		return url;
	},
	//文件系统-删除记录和物理删除文件,fileId或uuid必选1个
	filesystem_delete: function(p){
		if (!dataVerify(p, "token", "app登录的token", "必填", "STRING", "32", "32", "")){return;}
		if (!dataVerify(p, "appid", "appid", "必填", "NUMBER", "1", "max", "")){return;}
		if (!dataVerify(p, "fileId", "文件id", "可选", "NUMBER", "1", "max", "")){return;}
		if (!dataVerify(p, "uuid", "文件的uuid", "可选", "STRING", "36", "36", "")){return;}
		if (!dataVerifyOne(p, ['fileId', 'uuid'], 1)){return;}
		doPost(mashup_api_url+'/system/filesystem_delete.do?appid='+p['params']['appid'], p);
	},
	//图片管理-图片缩放,fileId或uuid必选1个
	image_scale: function(p){
		if (!dataVerify(p, "token", "app登录的token", "必填", "STRING", "32", "32", "")){return;}
		if (!dataVerify(p, "appid", "appid", "必填", "NUMBER", "1", "max", "")){return;}
		if (!dataVerify(p, "fileId", "文件id", "可选", "NUMBER", "1", "max", "")){return;}
		if (!dataVerify(p, "uuid", "文件的uuid", "可选", "STRING", "36", "36", "")){return;}
		if (!dataVerify(p, "width", "希望缩放的宽度", "可选", "NUMBER", "1", "max", "")){return;}
		if (!dataVerify(p, "height", "希望缩放的高度", "可选", "NUMBER", "1", "max", "")){return;}
		if (!dataVerify(p, "withWidth", "限定宽度，按原始比例缩放", "可选", "NUMBER", "1", "max", "")){return;}
		if (!dataVerify(p, "withHeight", "限定高度，按原始比例缩放", "可选", "NUMBER", "1", "max", "")){return;}
		if (!dataVerify(p, "type", "指定的保存文件名类型后缀，例如:small, large或 <width>_<height>", "必填", "STRING", "1", "20", "")){return;}
		if (!dataVerifyOne(p, ['fileId', 'uuid'], 1)){return;}
		//检查参数组合
		var hasOne = false;
		var params = p['params'];
		var width = params['width'];
		var width_missing = (width == undefined || width == '');
		var height = params['height'];
		var height_missing = (height == undefined || height == '');
		if ((width_missing && !height_missing) || (!width_missing && height_missing)) {
			onDataVerifyError("image_scale", "width, height必须同时有值，或者同时无值（此时必须有参数withWidth或withHeight）。");
			return false;
		}
		if (!width_missing && !height_missing) {
			hasOne = true;
		}
		var withWidth = params['withWidth'];
		var withWidth_missing = (withWidth == undefined || withWidth == '');
		var withHeight = params['withHeight'];
		var withHeight_missing = (withHeight == undefined || withHeight == '');
		if (hasOne) {
			//已经指定了width,height，此时就不能指定withWidth, withHeight了
			if (!withWidth_missing || !withHeight_missing) {
				onDataVerifyError("image_scale", "已经指定了width,height，此时就不能指定withWidth, withHeight了");
				return false;
			}
		}else{
			//没指定width,height，此时必须指定withWidth或withHeight
			if (withWidth_missing && withHeight_missing) {
				//没指定withWidth和withHeight，不允许
				onDataVerifyError("image_scale", "没指定width,height，此时必须指定withWidth或withHeight");
				return false;
			}
		}
		if (!withWidth_missing && !withHeight_missing) {
			onDataVerifyError("image_scale", "withWidth或withHeight只能指定1个值");
			return false;
		}
		
		doPost(mashup_api_url+'/system/image_scale.do?appid='+p['params']['appid'], p);
	},
	//图片管理-给图片添加水印,fileId或uuid必选1个，注意：type不能是空（保留原图），即只能对缩放过的图片添加水印
	image_watermark: function(p){
		if (!dataVerify(p, "token", "app登录的token", "必填", "STRING", "32", "32", "")){return;}
		if (!dataVerify(p, "appid", "appid", "必填", "NUMBER", "1", "max", "")){return;}
		if (!dataVerify(p, "fileId", "文件id", "可选", "NUMBER", "1", "max", "")){return;}
		if (!dataVerify(p, "uuid", "文件的uuid", "可选", "STRING", "36", "36", "")){return;}
		if (!dataVerify(p, "srctype", "要加水印的图片的类型后缀，空表示原图", "可选", "STRING", "1", "20", "")){return;}
		if (!dataVerify(p, "type", "指定的保存文件名类型后缀，例如:small, large或 <width>_<height>", "必填", "STRING", "1", "20", "")){return;}
		if (!dataVerify(p, "text", "水印文字", "必填", "STRING", "1", "30", "")){return;}
		if (!dataVerify(p, "x", "文字坐标x", "必填", "NUMBER", "1", "max", "")){return;}
		if (!dataVerify(p, "y", "文字坐标y", "必填", "NUMBER", "1", "max", "")){return;}
		if (!dataVerifyOne(p, ['fileId', 'uuid'], 1)){return;}
		doPost(mashup_api_url+'/system/image_watermark.do?appid='+p['params']['appid'], p);
	},
	//角色菜单-列出指定角色的菜单项
	rolemenu_list: function(p){
		if (!dataVerify(p, "token", "app登录的token", "必填", "STRING", "32", "32", "")){return;}
		if (!dataVerify(p, "appid", "appid", "必填", "NUMBER", "1", "max", "")){return;}
		if (!dataVerify(p, "roleId", "角色id", "必填", "NUMBER", "1", "max", "")){return;}
		doPost(mashup_api_url+'/system/rolemenu_list.do?appid='+p['params']['appid'], p);
	},
	//网络功能-访问外网url返回结果
	mashup_geturl: function(p){
		if (!dataVerify(p, "token", "app登录的token", "必填", "STRING", "32", "32", "")){return;}
		if (!dataVerify(p, "appid", "appid", "必填", "NUMBER", "1", "max", "")){return;}
		if (!dataVerify(p, "url", "要访问的网址url", "必填", "STRING", "1", "max", "")){return;}
		doPost(mashup_api_url+'/system/mashup_geturl.do?appid='+p['params']['appid'], p);
	},
	end: true	
};
			
//内部功能

//分析url参数
function QueryString(item){
	var sValue = location.search.match(new RegExp("[\?\&]"+item+"=([^\&]*)(\&?)","i"));
	return sValue ? decodeURIComponent(sValue[1]) : sValue;
}

//设置cookie
function setCookie(name, value){
	deleteCookie(name);
	document.cookie = name + "=" + encodeURIComponent(value) + ";path=/;expires="+(new Date((new Date()).getTime()+365*24*60*60*1000));
}
//访问cookie
function getCookie(cookieName){
	var cookieString = document.cookie;
	var start = cookieString.indexOf(cookieName + '=');
	if (start == -1) // 找不到
		return null;
	start += cookieName.length + 1;
	var end = cookieString.indexOf(';', start);
	if (end == -1) return decodeURIComponent(cookieString.substring(start));
	return decodeURIComponent(cookieString.substring(start, end));
}
//删除cookie
function deleteCookie(name) {
	document.cookie = name + "=deleted;path=/;expires=Fri, 31 Dec 1999 23:59:59 GMT;";
}
//分析并处理模板，用于jquery.tmpl.js
function tmpl(templateId, data, insertPointId) {
	$('#'+templateId).tmpl(data).appendTo('#'+insertPointId);
}
//兼容浏览器的event
function getEvent() {
	if (document.all) return window.event;
	func = getEvent.caller;
	while(func != null) {
		var arg0 = func.arguments[0];
		if (arg0) {
			if ((arg0.constructor == Event || arg0.constructor == MouseEvent)
				|| (typeof(arg0) == 'object' && arg0.preventDefault && arg0.stopPropagation)) {
				return arg0;
			}
		}
		func = func.caller;
	}
	return null;
}
//去掉字符串前后的空格
function trim(s) {
	return s.replace(/^\s*/, '').replace(/\s*$/, '');
}
//表格交替显示颜色
function switchTrColor(tbody) {
	var trs = $(tbody).find('tr');
	$(trs).each(function(i){
		var tr = $(trs)[i];
		$(tr).removeClass('tr1').removeClass('tr2').addClass(i % 2 == 0 ? 'tr1' : 'tr2');
	});
}
//如果undefined则返回空
function format(v) {
	return v == undefined ? '' : v;
}

//指定post提交
function doPost(url, p) {
	var params = p['params'];
	var onOK = p['onOK'];
	var onERR = p['onERR'];
	$.post(url, params, function(json, status){
		if (json[0] == 'OK') {
			if (jQuery.isFunction(onOK)) {
				(onOK)(json);
			}
		}else{
			if (jQuery.isFunction(onERR)) {
				(onERR)(json);
			}else{
				alert('ERR '+json[1]);
			}
		}
	}, "json");
}

//给指定id的节点指定click事件
function bindClick(idtag, f) {
	$(idtag).unbind('click').click(f);
}

//数据验证-验证几个参数中必选且只能选n个
function dataVerifyOne(p, names, n) {
	//参数
	var params = p['params'];
	var count = 0;
	var cname = '';
	$(names).each(function(){
		var name = this;
		if (cname != '') {
			cname += ', ';
		}
		cname += name;
		var v = params[name];
		if (v == undefined || v == '') {
			//do nothing
		}else{
			count ++;
		}
	});
	if (count != n) {
		onDataVerifyError(cname, "这几个参数必选且只能选"+n+"个");
		return false;
	}
	return true;
}
//数据验证
function dataVerify(p, name, cname, required, type, min, max, note) {
	//参数
	var params = p['params'];
	var errmsg = '格式错误：' + cname + ', ' + required + ', ' + type + ', 值范围＝' + min + '~' + max + ', ' + note;
	var v = params[name];
	//必填
	if (required == '必填' && (v == undefined || v == '')) {
		onDataVerifyError(cname, "不能为空");
		return false;
	}
	if (v == undefined) {
		//可选项，可以是空
		return true;
	}
	//类型检查
	if (type == 'STRING') {
		var len = v.length;
		if (min != 'min' && len < parseInt(min)) {
			onDataVerifyError(cname, "请输入至少"+min+"个字符");
			return false;
		}
		if (max != 'max' && len > parseInt(max)) {
			onDataVerifyError(cname, "长度超出有效范围");
			return false;
		}
	}else if (type == 'NUMBER') {
		if (min != 'min' && parseInt(v) < parseInt(min)) {
			onDataVerifyError(cname, "数值超出有效范围");
			return false;
		}
		if (max != 'max' && parseInt(v) > parseInt(max)) {
			onDataVerifyError(cname, "数值超出有效范围");
			return false;
		}
	}else if (type == 'INT') {
		if (!v.match(new RegExp("^\d+$", "i"))) {
			onDataVerifyError(cname, "只能输入整数");
			return false;
		}
		if (min != 'min' && parseInt(v) < parseInt(min)) {
			onDataVerifyError(cname, "数值超出有效范围");
			return false;
		}
		if (max != 'max' && parseInt(v) > parseInt(max)) {
			onDataVerifyError(cname, "数值超出有效范围");
			return false;
		}
	}else if (type == 'FLOAT') {
		if (!v.match(new RegExp("^\\d+\.*\\d*$", "i"))) {
			onDataVerifyError(cname, "只能输入小数");
			return false;
		}
		if (min != 'min' && parseFloat(v) < parseFloat(min)) {
			onDataVerifyError(cname, "数值超出有效范围");
			return false;
		}
		if (max != 'max' && parseFloat(v) > parseFloat(max)) {
			onDataVerifyError(cname, "数值超出有效范围");
			return false;
		}
	}else if (type == 'PASSWORD') {
		var ok1 = false;
		if (v.match(new RegExp("^.{6,10}$", "i"))) {
			ok1 = true;
		}
		var ok2 = false;
		if (v.match(new RegExp("\d+", "i"))) {
			ok2 = true;
		}
		var ok3 = false;
		if (v.match(new RegExp("[a-zA-Z]+", "i"))) {
			ok3 = true;
		}
		var ok4 = false;
		if(v.replace(/[a-zA-Z\d]+/, '').length > 0) {
			ok4 = true;
		}
		if(!ok1 || !ok2 || !ok3 || !ok4) {
			onDataVerifyError(cname, " 密码必须是6-10位的数字、字母、符号的组合");
			return false;
		}
	}else if (type == 'DATETIME') {
		if (!v.match(new RegExp("^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$", "i"))) {
			onDataVerifyError(cname, errmsg+" 日期时间格式：2013-11-23 12:34:56");
			return false;
		}
	}else if (type == 'DATE') {
		if (!v.match(new RegExp("^\d{4}-\d{2}-\d{2}$", "i"))) {
			onDataVerifyError(cname, errmsg+" 日期格式：2013-11-23");
			return false;
		}
	}else if (type == 'EMAIL') {
		if (!v.match(new RegExp("^[a-zA-Z0-9_+.-]+\@([a-zA-Z0-9-]+\.)+[a-zA-Z0-9]{2,4}$", "i"))) {
			onDataVerifyError(cname, "请输入有效的email地址");
			return false;
		}
	}else if (type == 'URL') {
		if (!v.match(new RegExp("^(https?|ftp|mms):\/\/([A-z0-9]+[_\-]?[A-z0-9]+\.)*[A-z0-9]+\-?[A-z0-9]+\.[A-z]{2,}(\/.*)*\/?$", "i"))) {
			onDataVerifyError(cname, "请输入有效的URL");
			return false;
		}
	}else if (type == 'TELEPHONE') {
		if (!v.match(new RegExp("^\(?\d{3,4}[-\)]?\d{7,8}$", "i"))) {
			onDataVerifyError(cname, "请输入有效的电话号码");
			return false;
		}
	}else if (type == 'MOBILE') {
		if (!v.match(new RegExp("^\d{11}$", "i"))) {
			onDataVerifyError(cname, "请输入有效的移动电话");
			return false;
		}
	}else if (type == 'POSTCODE') {
		if (!v.match(new RegExp("^\d{6}$", "i"))) {
			onDataVerifyError(cname, "请输入有效的邮政编码");
			return false;
		}
	}else if (type == 'IDCARD') {
		var match18 = v.match(new RegExp("^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$", "i"));
		var match15 = v.match(new RegExp("^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$", "i"));
		
		if (!match18 && !match15) {
			onDataVerifyError(cname, "请输入有效的省份证号码");
			return false;
		}
	}else if (type == 'QQ') {
		//五到十位数字,开头不以0开头
		if (!v.match(new RegExp("^[1-9]\d{4,9}$", "i"))) {
			onDataVerifyError(cname, "请输入有效的QQ");
			return false;
		}
	}else if (type == 'IP') {
		if (!v.match(new RegExp("^\\d{1,3}\.\\d{1,3}\.\\d{1,3}\.\\d{1,3}$", "i"))) {
			onDataVerifyError(cname, "请输入有效的IP地址");
			return false;
		}
	}
	//自定义验证规则
	var verify = p['verify'];
	if (verify) {
		var rule = verify[name];
		if (rule) {
			var reg = rule[0];
			var msg = rule[1];
			console.debug(name);
			console.debug(reg);
			console.debug(msg);
			if (!v.match(new RegExp(reg, "i"))) {
				onDataVerifyError(cname, msg);
				return false;
			}
		}
	}
	return true;
}

//数据验证错误提示
function onDataVerifyError(name, errmsg) {
	//alert('抱歉'+name+','+errmsg);
	console.debug('ERROR '+name+' '+errmsg);
	$("#outa").click();
	$("#myModalLabelCenter").html("<h4>错误字段："+name+"，提示："+errmsg+"</h4>");
}
//把列表list数据转换为回车分开的文本
function list2text(list) {
	var v = '';
	$(list).each(function(i){
		if (v != '') {
			v += '\n';
		}
		v += list[i];
	});
	return v;
}
//把回车分开的文本转换为list
function text2list(text) {
	var list = [];
	var pair = text.split('\n');
	$(pair).each(function(i){
		list.push(pair[i]);
	});
	return $.toJSON(list);
}
//动态调整图片的尺寸（只缩小），根据外框大小自动居中
//1.要求图片<img>标签不能设置width,height
//2.并且调用<img onload="imagefit(this, width, height)">
//3.外层div必须设置width,height
function imagefit(img, width, height){
	var w = $(img).width();
	var h = $(img).height();
	//缩小图片
	if (w > width || h > height) {
		//原始图片宽高比
		var rate = w / h;
		var newW = width;
		var newH = height;
		if((width / height) <= rate){
			newH = width * rate;
		}else{
			newW = height * rate;
		}
		$(img).css('width', newW);
		$(img).css('height', newH);
	}
	//调整图片位置
	if (h < height) {
		$(img).css('padding-top', ((height - h)/2)+'px');
	}
	if (w < width) {
		$(img).css('padding-left', ((width - w)/2)+'px');
	}
}
//给string增加类似java的startsWith功能
String.prototype.startWith = function(str){
	var reg=new RegExp("^"+str);
	return reg.test(this);
}
//给string增加类似java的endsWith功能
String.prototype.endsWith = function(str){
	var reg=new RegExp(str+"$");
	return reg.test(this);
}

//获取url中#后面的内容
function getUrlAnchor() {
	return window.location.hash.substr(1);
}

//异步ajax加载队列，严格按次序调用
var ajax_queues = [];
var ajax_queue_index = 0;

//添加方法到队列，只能添加没有参数的方法
function ajax_queue_add(func) {
	ajax_queues.push(func);
}
//队列调用，每个方法执行完毕后要在ok和err中调用ajax_queue_run()以便队列继续执行下去
function ajax_queue_run() {
	if (ajax_queue_index < ajax_queues.length) {
		var func = ajax_queues[ajax_queue_index];
		ajax_queue_index ++;
		(func)();
	}
}
//生成翻页条
/**
 * 参数：
 * 	pagination	翻页条的ul的id名称
 * 	pageNumber	当前页号
 * 	totalPage	总页数
 * 	call		翻页链接调用的函数名称，会自动加上第一个pageNumber参数
 * 	otherparam	后续其他参数串，注意：开头要加上逗号
 * 调用示例：
 * 	makePager('pagerId', 1, 100, 'listUser', ', name, age');
	<ul class="pagination" id="pagination">
	</ul>
 */
function makePager(pagination, pageNumber, totalPage, call, otherparam) {
	var page_first;
	var page_prev;
	var page_next;
	var page_last;
	var page_numbers = '';

	if (pageNumber == 1) {
		page_first = '<li class="page-first disabled"><a href="javascript:void(0)" onclick="'+call+'(1'+otherparam+')">&lt;&lt;</a></li>';
		page_prev = '<li class="page-pre disabled"><a href="javascript:void(0)" onclick="'+call+'(1'+otherparam+')">&lt;</a></li>';
	}else{
		page_first = '<li class="page-first"><a href="javascript:void(0)" onclick="'+call+'(1'+otherparam+')">&lt;&lt;</a></li>';
		page_prev = '<li class="page-pre"><a href="javascript:void(0)" onclick="'+call+'('+(pageNumber-1)+otherparam+')">&lt;</a></li>';
	}
	if (pageNumber == totalPage) {
		page_next = '<li class="page-next disabled"><a href="javascript:void(0)" onclick="'+call+'('+totalPage+otherparam+')">&gt;</a></li>';
		page_last = '<li class="page-last disabled"><a href="javascript:void(0)" onclick="'+call+'('+totalPage+otherparam+')">&gt;&gt;</a></li>';
	}else{
		page_next = '<li class="page-next"><a href="javascript:void(0)" onclick="'+call+'('+(pageNumber+1)+otherparam+')">&gt;</a></li>';
		page_last = '<li class="page-last"><a href="javascript:void(0)" onclick="'+call+'('+totalPage+otherparam+')">&gt;&gt;</a></li>';
	}
	//中间最多5个页码，当前页面前后各2个
	var page1 = pageNumber - 2;
	var page2 = pageNumber - 1;
	var page3 = pageNumber;
	var page4 = pageNumber + 1;
	var page5 = pageNumber + 2;
	
	if (page1 > 0) {
		page_numbers += '<li class="page-number"><a href="javascript:void(0)" onclick="'+call+'('+page1+otherparam+')">'+page1+'</a></li>';
	}
	if (page2 > 0) {
		page_numbers += '<li class="page-number"><a href="javascript:void(0)" onclick="'+call+'('+page2+otherparam+')">'+page2+'</a></li>';
	}
	if (page3 > 0) {
		page_numbers += '<li class="page-number active disabled"><a href="javascript:void(0)" onclick="'+call+'('+page3+otherparam+')">'+page3+'</a></li>';
	}
	if (page4 <= totalPage) {
		page_numbers += '<li class="page-number"><a href="javascript:void(0)" onclick="'+call+'('+page4+otherparam+')">'+page4+'</a></li>';
	}
	if (page5 <= totalPage) {
		page_numbers += '<li class="page-number"><a href="javascript:void(0)" onclick="'+call+'('+page5+otherparam+')">'+page5+'</a></li>';
	}
	
	var html = page_first + page_prev + page_numbers + page_next + page_last;
	$('#'+pagination).html(html);
}