$(".ipt-search input").focus( function(){
	getData( function(){
		$(".ipt-search .m-list_shint").show();
	});
})
$(".ipt-search input").on("blur", function(){
	$(".ipt-search .m-list_shint").hide();
})
$(".ipt-search input").on("input", function(){
	getData();
})

function getData(fn){
	var url="/feedback/hint";
	var param = {word: $(".ipt-search input").val()};

	$.ajax({
		type: 'get',
		url: url,
		data: param,
		success: function(msg){
			var temp = [];
	     	if(msg.length){
	     		for(var i=0; i < msg.length; i++){
	     			temp.push('<li><a href="/feedback/getSearch/'+msg[i].id+'" class="z-txt_ellipse">'+msg[i].title+'</a></li>');

	     		}
	     	}else{
	     		temp.push('<li><a class="z-txt_ellipse z-txt_muted">没有任何搜索建议</a></li>');
	     	}

	     	$(".m-list_shint").html(temp.join(""));
	     	if(fn){
	     		fn();
	     	}
	   }

	})
}