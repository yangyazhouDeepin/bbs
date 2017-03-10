$(document).ready( function(){
	init();
	$(".search input[type='text']").on("keydown", function(event){
		if(event.keyCode == 13){
			goSearch();
		}
	})

	$(".search .icon-search").on("click", function(){
		goSearch();
	})

	function goSearch(){
		var val = $(".search input[type='text']").val();
		if(val){
			window.location.href = "/index.php?title=Special%3A搜索&search="+val;
		}
	}

	$("#page-search .searchresults .content .button").on("click", function(){
		var newWord = $(this).attr("data-title");
		window.location = "/index.php?title="+newWord+"&action=edit";
	})

	function init(){

		var temp = new RegExp($(".search .text").val(),"i");

		//关键字高亮
		$(".mw-search-result-heading a").each( function(){$(this).html($(this).html().replace(temp,"<span class='highlight'>"+$(".search .text").val().replace(/(\w)/,function(v){return v.toUpperCase()})+"</span>"))});

		//判断是否去掉line的样式
		if($(".mw-search-results").length){
			$(".search .line").css("background", "#ffffff");
		}
	}



})