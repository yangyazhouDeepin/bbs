
(function($){

$(document).ready(function(){
$(".add-search .new-search").click( function(evnet){
	$(".ipt-search").css("display","block");
})


// 添加搜索页面地址参数示例
// <input data-url="/?s=" type="text" placeholder="搜索...">
$(".ipt-search input").keydown( function(){
	if(event.keyCode==13&&$(".ipt-search input").val()){
		var formId = $(this).attr("data-form");
		if(formId){
			$("#"+formId).submit();
		}else{

			window.location.href = window.location.origin+$(this).attr("data-url")+$(".ipt-search input").val();
		}
	}
})
$(".ipt-search .icon-s").click( function(){
	var formId = $(".ipt-search input[data-form]").attr("data-form");

	if($(".ipt-search input").val()){
		if(formId){
			$("#"+formId).submit();
		}else{
			window.location.href = window.location.origin+$(".ipt-search input").attr("data-url")+$(".ipt-search input").val();
		}
	}
})



$(document).mousedown( function(event){
	event.stopPropagation();
	if(!$(event.target).parents(".add-search").length){
		clearSearch();
	}else if(event.target.className=="z-txt_ellipse"){
		window.location.href = event.target.href;
	}

})

function clearSearch(){
	$(".ipt-search").css("display","none");
}

$(window).on("scroll" , function() {
    var t = document.documentElement.scrollTop || document.body.scrollTop;
    if (t >=10  && !$("#newHeader .new-wrap").hasClass("move") && $(window).width() > 414) {
        $("#newHeader .new-wrap").addClass("move")
    } else if (t < 10) {
        $("#newHeader .new-wrap").removeClass("move")
    }
})

})
})($.ajax?$:jQuery);
