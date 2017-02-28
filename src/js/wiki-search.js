$(document).ready( function(){

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
			window.location.href = window.location.origin+"/index.php?title=Special%3A搜索&search="+val;
		}
	}


})