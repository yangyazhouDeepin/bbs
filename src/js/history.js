$(document).ready( function(){
	$(".item input[type='checkbox']").prop("checked",false);
	var ids = [];
	//添加选择对比的版本id
	$(".item input[type='checkbox']").on("change", function(){

		var id = $(this).siblings("input[type='hidden']").val();

		if($(this).prop("checked")){
			if(ids.length<2){
				ids.push(id);
			}else{
				$(".item input[value='"+ids[0]+"']").siblings('input[type="checkbox"]').prop("checked",false);
				ids.shift();
				ids.push(id);
			}
		}else{
			for(var i=0; i<ids.length ; i++){
				if(ids[i]==id){
					ids.splice(i,1);
				}
			}
		}

	})

	//版本对比事件
	$(".col-1 .bt").on("click", function(){
		if(ids.length==2){
			var num1 = parseInt(ids[0]);
			var num2 = parseInt(ids[1]);
			var diff = num1 > num2? num1 : num2;
			var oldid = num1 > num2? num2 : num1;
			window.location.href = window.location.origin+"/index.php?title="+$("#histroy").attr("data-title")+"&type=revision&diff="+diff+"&oldid="+oldid;
		}
	})


})