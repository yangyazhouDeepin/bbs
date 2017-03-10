$(document).ready(function() {
    sildePosition();
    window.onresize = function(){
       sildePosition();
    }

    window.onscroll = function(){
       checkNav();
    }

    function sildePosition(){
        $(".slide").css("left",parseInt($(".wrap").css("marginLeft"))+2);
        $(".slide").css("height",$(window).height()-204);
    }
    
   

    $(".nav").append($("#toc > ul"));

    $("li ul").addClass("sub-nav");

    $('.search_box input').on("focus", function() {
        $(".search_box").addClass("active");
    })
    $('.search_box input').on("blur", function() {
        $(".search_box").removeClass("active");
    })

    $(".nav li").on("click", function(event) {
        event.stopPropagation();
        $(".active").removeClass("active");
        $(this).parents("li").addClass("active");
        $(this).addClass("active");
    })

    //控制导航的展开

    function checkNav(){
        var temp =  $(window).scrollTop();
        $(".slide .nav a").each( function(i){
            if($("span[id='"+$(this).attr("href").replace("#","")+"']").offset().top<=(temp+10)){
                $(".active").removeClass("active");
                $(this).addClass("active");
                $(this).parents("li").addClass("active");
            }
        })
    }


})