$(document).ready(function() {

    // $(".search .text").on("focus", function(event) {
    //     $(".search .data-list").show();
    // })

    $(document).click(function(event) {
        if ($(event.target).parents(".search").length) {

        } else {
            $(".search .data-list").css("display", "none");
        }
    })

    changeHeight();

    function changeHeight() {
        var tl = $("#page .slideLeft").outerHeight();
        var tr = $("#page .slideRight").outerHeight();

        if (tl - tr > 0) {
            $("#page .slideRight").height($("#page .slideRight").height() + (tl - tr));
        } else if (tl - tr < 0) {
            $("#page .slideLeft").height($("#page .slideLeft").height() + (tr - tl));
        }

        var bl = $("#page .bottomLeft").outerHeight();
        var br = $("#page .bottomRight").outerHeight();

        if (bl - br > 0) {
            $("#page .bottomRight").height($("#page .bottomRight").height() + (bl - br));
        } else if (bl - br < 0) {
            $("#page .bottomLeft").height($("#page .bottomLeft").height() + (br - bl));
        }
    }


    //获取数据
    $(".search .text").on("input", function(){
        var iptText = $(this).val();
        var temp = [];
        var params = {
            action: "opensearch",
            format: "json",
            formatversion: 2,
            search: iptText,
            namespace: 0,
            limit: 10,
            suggest: true
        };

        if(iptText){
            $.ajax({
                url: "/api.php",
                type: 'get',
                data:  params,
                success: function(data){
                    if(data[1].length){
                        for(var i = 0; i < data[1].length; i++){
                            temp.push("<li><a href='"+data[3][i]+"'>"+data[1][i]+"</a></li>");
                        }
                        $(".data-list").html(temp.join(""));
                        $(".data-list").show();
                    }else{
                        $(".data-list").hide();
                    }
                }
            })
        }else{
            $(".data-list").hide();
        }
    })

    //搜索的点击事件    http://www-data.deepin.org/index.php?title=Special%3A%E6%90%9C%E7%B4%A2&search=
    $(".slideRight .search .text").on("keyup", function(e){
        var value = $(this).val();
        if(value && e.keyCode == 13){
            window.location = window.location.origin+"/index.php?title=Special%3A%E6%90%9C%E7%B4%A2&search="+value;
        }
    })

    $(".slideRight .search .button").on("click", function(){
        var value = $(".slideRight .search .text").val();
        if(value){
            window.location = window.location.origin+"/index.php?title=Special%3A%E6%90%9C%E7%B4%A2&search="+value;
        }
    })
})