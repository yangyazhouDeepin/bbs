(function() {
    window.onload = function() {
        var index = Math.floor(Math.random() * 4) + 1;

        /* Tool Fucntion */
        window.location.params = function(params) {
            var obj = {},
                i, parts, len, key, value;

            if (typeof params === 'string') {
                value = location.search.match(new RegExp('[?&]' + params + '=?([^&]*)[&#$]?'));
                return value ? value[1] : undefined;
            }var _params = location.search.substr(1).split('&');

            for (i = 0, len = _params.length; i < len; i++) {
                parts = _params[i].split('=');
                if (!parts[0]) {
                    continue;
                }
                obj[parts[0]] = parts[1] || true;
            }

            if (typeof params !== 'object') {
                return obj;
            }

            for (key in params) {
                value = params[key];
                if (typeof value === 'undefined') {
                    delete obj[key];
                } else {
                    obj[key] = value;
                }
            }

            parts = [];
            for (key in obj) {
                parts.push(key + (obj[key] === true ? '' : '=' + obj[key]));
            }

            location.search = parts.join('&');
        };

        var capthcaImage = document.getElementById('captchaImage')
        if (capthcaImage) {
            captchaImage.addEventListener('click', function(e) {
                var req = new XMLHttpRequest();
                req.open('GET', '/oauth2/captcha/key', false);
                req.send(null);
                var key = req.getResponseHeader("Captcha-Key");
                document.getElementById("captchaKey").value = key
                e.target.src = '/oauth2/captcha?key=' + key;
            });
        }

        var changeZh = document.getElementById('changeZh');
        if (changeZh) {
            changeZh.addEventListener('click', function(e) {
                var p = window.location.params();
                p['lang'] = 'zh'
                console.log(p)
                window.location.params(p)
                return false;
            });
        }

        var changeEn = document.getElementById('changeEn');
        if (changeEn) {
            changeEn.addEventListener('click', function(e) {
                var p = window.location.params();
                p['lang'] = 'en'
                console.log(p)
                window.location.params(p)
                return false;
            });
        }
    }
})();


(function($) {
    "use strict";

    function gettext(text) {
        if (typeof trans !== 'undefined' && text in trans) {
            return trans[text];
        }
        return text;
    }

    jQuery.cookie = function(name, value, options)  {
        if (typeof value != 'undefined')  { // name and value given, set cookie
            options = options ||  {};
            if (value === null)  {
                value = '';
                options.expires = -1;
            }
            var expires = '';
            if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString))  {
                var date;
                if (typeof options.expires == 'number')  {
                    date = new Date();
                    date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
                } else  {
                    date = options.expires;
                }
                expires = '; expires=' + date.toUTCString();
            }
            var path = options.path ? '; path=' + (options.path) : '';
            var domain = options.domain ? '; domain=' + (options.domain) : '';
            var secure = options.secure ? '; secure' : '';
            document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
        } else  {
            var cookieValue = null;
            if (document.cookie && document.cookie != '')  {
                var cookies = document.cookie.split(';');
                for (var i = 0; i < cookies.length; i++)  {
                    var cookie = jQuery.trim(cookies[i]);
                    if (cookie.substring(0, name.length + 1) == (name + '='))  {
                        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                        break;
                    }
                }
            }
            return cookieValue;
        }
    };

    jQuery.getCookie = function(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for(var i=0; i<ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1);
            if (c.indexOf(name) == 0) {
                return c.substring(name.length,c.length);
            }
        }
        return '';
    }


    if (!$) {
        throw "jQuery is required!"
    }

    var $body = $(document.body);

    $body.height($(window).height());

    $(window).resize(function() {
        $body.height($(window).height());
    });


    $(document).ready(function() {
        (function(){
            var bgIndex = parseInt($.getCookie('bg_index'));
            var path = '/static/login/'
            if(isNaN(bgIndex)) {
              bgIndex = Math.floor((Math.random() * 100) + 1) % 4 + 1;
              $.cookie('bg_index', bgIndex, {path: '/', expires: 1});
            }

            $(document.body).css({
              // 'background-image': "url(" + path + 'image/bg_' + bgIndex + '.jpg' +")"
              'background-image': "url(" + 'image/bg_' + bgIndex + '.jpg' +")"
            });
        })();

        (function() {
            var $body = $(document.body);
            $body.height($(window).height());

            function centerContent() {
                var $content = $('#content');
                if ($(window).height() <= 580) {
                    $content.css({
                        left: $(document.body).width() / 2 - $content.outerWidth() / 2 + 'px',
                        top: ($(document.body).height() / 2 - $content.outerHeight() / 2 ) / 3 + 'px'
                    });
                    var $footer = $('#footer');
                    $footer.css({
                        bottom: 8 + 'px'
                    });
                    var $logo = $('.logo');
                    $logo.css({
                        "margin-bottom": 30+$(document.body).height() / 20 + 'px'
                    });
                } else {
                    $content.css({
                        left: $(document.body).width() / 2 - $content.outerWidth() / 2 + 'px',
                        top: $(document.body).height() / 2 - $content.outerHeight() / 2 + 'px'
                    });
                }
            }

            centerContent();

            $(window).resize(function() {
                $body.height($(window).height());
                centerContent();
            });

        })();


        //Handles page redirects;
        (function() {
            var timeout = 5000;
            var interval = timeout / timeout * 1000;
            var $redirect = $('.need_redirect');
            $redirect.prepend($('<span class="counter"></span>'));

            var id = window.setInterval(function() {

                timeout -= interval;

                if ($redirect.length) {
                    $redirect.find('.counter').html('' + (timeout / interval + 1) + 's ');

                    if (timeout === 0) {
                        window.location.href = $redirect.attr('href');
                        window.clearInterval(id);
                    }

                }
            }, interval);
        })();

        /*姝ｅ父鎻愮ず鏍峰紡*/
        function tipStyle(bindName){
            $(bindName).next().hide();
            $(bindName).css('border','1px solid rgba(0, 0, 0, 0.74)');
        }

        /*閿欒鎻愮ず*/
        function showTip(bindName, content) {
            var $tip = $(bindName).next();
            $tip.show();
            $('.content', $tip).html(content);
            $(bindName).css('border','1px solid rgba(255,193,60,0.8)');
            $(bindName).css('box-shadow','0 0 3px rgba(31,41,60,0.08)');
        }

        function hideUsernamePasswordTip() {
            tipStyle($('.username'));
            tipStyle($('.password'));
        }

        $('.username').focus(function(){
            hideUsernamePasswordTip();
            $(this).css('border','1px solid rgba(255,255,255,1)');
        });

        $('.password').focus(function(){
            hideUsernamePasswordTip();
            $(this).css('border','1px solid rgba(255,255,255,1)');
        });

        $('#captchaCode').focus(function(){
            tipStyle($(this));
            $(this).css('border','1px solid rgba(255,255,255,1)');
        });

        /*鐢ㄦ埛鍚嶆娴�*/
        $('.username').blur(function(event){
            tipStyle($(this));
            $(this).css('border','1px solid rgba(0, 0, 0, 0.74)');
            event.stopPropagation();
        });

        /*瀵嗙爜妫€娴�*/
        $('.password').blur(function(event){
            tipStyle($(this));
            $(this).css('border','1px solid rgba(0, 0, 0, 0.74)');
            event.stopPropagation();
        });

        /*楠岃瘉鐮佹娴�*/
        $('#captchaCode').blur(function(event) {
            tipStyle($(this));
            $(this).css('border', '1px solid rgba(0, 0, 0, 0.74)');
            event.stopPropagation();
        });

        if ($('#error_no')) {
            switch ($('#error_no').val()) {
                case '0':
                    break;
                case '11':
                case '12':
                case '13':
                    return showTip($('.username'), $('#error').text());
                case '21':
                    return showTip($('.password'), $('#error').text());
                case '31':
                    return showTip($('#captchaCode'), $('#error').text());
                default:
                    return $('#error').css('display', 'block');
            }
        }
    });
})(jQuery);