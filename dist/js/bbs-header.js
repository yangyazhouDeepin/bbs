jQuery(".add-search .new-search").click( function(evnet){
	jQuery(".ipt-search").css("display","block");
	event.stopPropagation();
})
jQuery(".add-search").click( function(event){
	event.stopPropagation();
})

// 添加搜索页面地址参数示例
// <input data-url="/?s=" type="text" placeholder="搜索...">
jQuery(".ipt-search input").keydown( function(){
	if(event.keyCode==13&&jQuery(".ipt-search input").val()){
		window.location.href = window.location.origin+jQuery(this).attr("data-url")+jQuery(".ipt-search input").val();
	}
})
jQuery(".ipt-search .icon-s").click( function(){
	if(jQuery(".ipt-search input").val()){
		window.location.href = window.location.origin+jQuery(".ipt-search input").attr("data-url")+jQuery(".ipt-search input").val();
	}
})



jQuery(document).click( function(){
	jQuery(".ipt-search").css("display","none");
	jQuery(".ipt-search input").val("");
})

    jQuery(window).on("scroll",  function() {
        var t = document.documentElement.scrollTop || document.body.scrollTop;
        if (t >=10  && !jQuery("#newHeader .new-wrap").hasClass("move") && jQuery(window).width() > 414) {
            jQuery("#newHeader .new-wrap").addClass("move")
        } else if (t < 10) {
            jQuery("#newHeader .new-wrap").removeClass("move")
        }
    });