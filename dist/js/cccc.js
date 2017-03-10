mw.loader.implement("ext.cleanchanges", function($, jQuery, require, module) {
    (function(mw, $) {
        'use strict';
        window.toggleVisibilityE = function(levelId, otherId, linkId, type) {
            var thisLevel = document.getElementById(levelId),
                otherLevel = document.getElementById(otherId),
                linkLevel = document.getElementById(linkId);
            if (thisLevel.style.display === 'none') { thisLevel.style.display = type;
                otherLevel.style.display = 'none';
                linkLevel.style.display = 'inline'; } else { thisLevel.style.display = 'none';
                otherLevel.style.display = 'inline';
                linkLevel.style.display = 'none'; } };
        window.showUserInfo = function(sourceVar, targetId) { $('#' + targetId).html(mw.config.get(sourceVar)); };
        $(function() {
            $('.mw-cleanchanges-showuserinfo').each(function() {
                var $this, id, target;
                $this = $(this);
                id = $this.data('mw-userinfo-id');
                target = $this.data('mw-userinfo-target');
                if (id !== undefined) { $this.click(function(e) { e.preventDefault();
                        window.showUserInfo('wgUserInfo' + id, target); }); } });
            $('.mw-cleanchanges-showblock').each(function() {
                var $this, level, other, link;
                $this = $(
                    this);
                level = $this.data('mw-cleanchanges-level');
                other = $this.data('mw-cleanchanges-other');
                link = $this.data('mw-cleanchanges-link');
                if (level !== undefined) { $this.click(function(e) { e.preventDefault();
                        window.toggleVisibilityE(level, other, link, 'block'); }); }
            });
        });
    }(mediaWiki, jQuery));
});
mw.loader.implement("jquery.checkboxShiftClick", function($, jQuery, require, module) {
    (function($) { $.fn.checkboxShiftClick = function() {
            var prevCheckbox = null,
                $box = this;
            $box.click(function(e) {
                if (prevCheckbox !== null && e.shiftKey) { $box.slice(Math.min($box.index(prevCheckbox), $box.index(e.target)), Math.max($box.index(prevCheckbox), $box.index(e.target)) + 1).filter(function() {
                        return !this.disabled; }).prop('checked', !!e.target.checked); }
                prevCheckbox = e.target; });
            return $box; }; }(jQuery)); });
mw.loader.implement("jquery.cookie", function($, jQuery, require, module) {
    (function($, document, undefined) {
        var pluses = /\+/g;

        function raw(s) {
            return s; }

        function decoded(s) {
            return unRfc2068(decodeURIComponent(s.replace(pluses, ' '))); }

        function unRfc2068(value) {
            if (value.indexOf('"') === 0) { value = value.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\'); }
            return value; }

        function fromJSON(value) {
            return config.json ? JSON.parse(value) : value; }
        var config = $.cookie = function(key, value, options) {
            if (value !== undefined) {
                options = $.extend({}, config.defaults, options);
                if (value === null) { options.expires = -1; }
                if (typeof options.expires === 'number') {
                    var days = options.expires,
                        t = options.expires = new Date();
                    t.setDate(t.getDate() + days); }
                value = config.json ? JSON.stringify(value) : String(value);
                return (document.cookie = [encodeURIComponent(key), '=', config.raw ? value : encodeURIComponent(value), options.expires ? '; expires=' + options.expires.toUTCString() : '', options.path ? '; path=' + options.path : '', options.domain ? '; domain=' + options.domain : '',
                    options.secure ? '; secure' : ''
                ].join(''));
            }
            var decode = config.raw ? raw : decoded;
            var cookies = document.cookie.split('; ');
            var result = key ? null : {};
            for (var i = 0, l = cookies.length; i < l; i++) {
                var parts = cookies[i].split('=');
                var name = decode(parts.shift());
                var cookie = decode(parts.join('='));
                if (key && key === name) { result = fromJSON(cookie);
                    break; }
                if (!key) { result[name] = fromJSON(cookie); } }
            return result;
        };
        config.defaults = {};
        $.removeCookie = function(key, options) {
            if ($.cookie(key) !== null) { $.cookie(key, null, options);
                return true; }
            return false; };
    })(jQuery, document);
});
mw.loader.implement("jquery.getAttrs", function($, jQuery, require, module) {
    function serializeControls(controls) {
        var i, data = {},
            len = controls.length;
        for (i = 0; i < len; i++) { data[controls[i].name] = controls[i].value; }
        return data; }
    jQuery.fn.getAttrs = function() {
        return serializeControls(this[0].attributes); };
    jQuery.fn.serializeObject = function() {
        return serializeControls(this.serializeArray()); };; });
mw.loader.implement("jquery.highlightText", function($, jQuery, require, module) {
    (function($, mw) {
        $.highlightText = {
            splitAndHighlight: function(node, pat) {
                var i, patArray = pat.split(' ');
                for (i = 0; i < patArray.length; i++) {
                    if (patArray[i].length === 0) {
                        continue; }
                    $.highlightText.innerHighlight(node, patArray[i]); }
                return node; },
            innerHighlight: function(node, pat) {
                var i, match, pos, spannode, middlebit, middleclone;
                if (node.nodeType === Node.TEXT_NODE) { match = node.data.match(new RegExp('(^|\\s)' + mw.RegExp.escape(pat), 'i'));
                    if (match) { pos = match.index + match[1].length;
                        spannode = document.createElement('span');
                        spannode.className = 'highlight';
                        middlebit = node.splitText(pos);
                        middlebit.splitText(pat.length);
                        middleclone = middlebit.cloneNode(true);
                        spannode.appendChild(middleclone);
                        middlebit.parentNode.replaceChild(spannode, middlebit); } } else if (node.nodeType === Node.ELEMENT_NODE && node.childNodes && !/(script|style)/i.test(node.tagName) && !(node.tagName.toLowerCase() === 'span' && node.className.match(/\bhighlight/))) {
                    for (i = 0; i < node.childNodes
                        .length; ++i) { $.highlightText.innerHighlight(node.childNodes[i], pat); }
                }
            }
        };
        $.fn.highlightText = function(matchString) {
            return this.each(function() {
                var $el = $(this);
                $el.data('highlightText', { originalText: $el.text() });
                $.highlightText.splitAndHighlight(this, matchString); }); };
    }(jQuery, mediaWiki));
});
mw.loader.implement("jquery.makeCollapsible", function($, jQuery, require, module) {
    (function($, mw) {
        function toggleElement($collapsible, action, $defaultToggle, options) {
            var $collapsibleContent, $containers, hookCallback;
            options = options || {};
            if (!$collapsible.jquery) {
                return; }
            if (action !== 'expand' && action !== 'collapse') {
                return; }
            if ($defaultToggle === undefined) { $defaultToggle = null; }
            if ($defaultToggle !== null && !$defaultToggle.jquery) {
                return; }
            $collapsible.trigger(action === 'expand' ? 'beforeExpand.mw-collapsible' : 'beforeCollapse.mw-collapsible');
            hookCallback = function() { $collapsible.trigger(action === 'expand' ? 'afterExpand.mw-collapsible' : 'afterCollapse.mw-collapsible'); };
            if (!options.plainMode && $collapsible.is('table')) {
                if ($collapsible.find('> caption').length) { $containers = $collapsible.find('> * > tr'); } else { $containers = $collapsible.find('> tbody > tr'); }
                if ($defaultToggle) { $containers = $containers.not($defaultToggle.closest('tr')); }
                if (action === 'collapse') {
                    if (options.instantHide) { $containers.hide();
                        hookCallback(); } else { $containers.stop(true, true).fadeOut().promise().done(hookCallback); }
                } else { $containers.stop(true, true).fadeIn().promise().done(hookCallback); }
            } else if (!options.plainMode && ($collapsible.is('ul') || $collapsible.is('ol'))) { $containers = $collapsible.find('> li');
                if ($defaultToggle) { $containers = $containers.not($defaultToggle.parent()); }
                if (action === 'collapse') {
                    if (options.instantHide) { $containers.hide();
                        hookCallback(); } else { $containers.stop(true, true).slideUp().promise().done(hookCallback); } } else { $containers.stop(true, true).slideDown().promise().done(hookCallback); } } else {
                $collapsibleContent = $collapsible.find('> .mw-collapsible-content');
                if (!options.plainMode && $collapsibleContent.length) {
                    if (action === 'collapse') {
                        if (options.instantHide) { $collapsibleContent.hide();
                            hookCallback(); } else { $collapsibleContent.slideUp().promise().done(hookCallback); } } else { $collapsibleContent.slideDown().promise().done(hookCallback); } } else {
                    if (action === 'collapse') {
                        if (options.instantHide) {
                            $collapsible.hide();
                            hookCallback
                                ();
                        } else {
                            if ($collapsible.is('tr') || $collapsible.is('td') || $collapsible.is('th')) { $collapsible.fadeOut().promise().done(hookCallback); } else { $collapsible.slideUp().promise().done(hookCallback); } }
                    } else {
                        if ($collapsible.is('tr') || $collapsible.is('td') || $collapsible.is('th')) { $collapsible.fadeIn().promise().done(hookCallback); } else { $collapsible.slideDown().promise().done(hookCallback); } }
                }
            }
        }

        function togglingHandler($toggle, $collapsible, e, options) {
            var wasCollapsed, $textContainer, collapseText, expandText;
            options = options || {};
            if (e) {
                if (e.type === 'click' && options.linksPassthru && $.nodeName(e.target, 'a') && $(e.target).attr('href') && $(e.target).attr('href') !== '#') {
                    return; } else if (e.type === 'keypress' && e.which !== 13 && e.which !== 32) {
                    return; } else { e.preventDefault();
                    e.stopPropagation(); } }
            if (options.wasCollapsed !== undefined) { wasCollapsed = options.wasCollapsed; } else { wasCollapsed = $collapsible.hasClass('mw-collapsed'); }
            $collapsible.toggleClass('mw-collapsed', !wasCollapsed);
            if (options.toggleClasses) {
                $toggle.
                toggleClass('mw-collapsible-toggle-collapsed', !wasCollapsed).toggleClass('mw-collapsible-toggle-expanded', wasCollapsed);
            }
            if (options.toggleText) { collapseText = options.toggleText.collapseText;
                expandText = options.toggleText.expandText;
                $textContainer = $toggle.find('> a');
                if (!$textContainer.length) { $textContainer = $toggle; }
                $textContainer.text(wasCollapsed ? collapseText : expandText); }
            toggleElement($collapsible, wasCollapsed ? 'expand' : 'collapse', $toggle, options);
        }
        $.fn.makeCollapsible = function(options) {
            options = options || {};
            this.each(function() {
                var $collapsible, collapseText, expandText, $caption, $toggle, actionHandler, buildDefaultToggleLink, premadeToggleHandler, $toggleLink, $firstItem, collapsibleId, $customTogglers, firstval;
                $collapsible = $(this).addClass('mw-collapsible');
                if ($collapsible.data('mw-made-collapsible')) {
                    return; } else { $collapsible.data('mw-made-collapsible', true); }
                collapseText = options.collapseText || $collapsible.attr('data-collapsetext') || mw.msg('collapsible-collapse');
                expandText = options.expandText || $collapsible.attr('data-expandtext') || mw.msg('collapsible-expand');
                actionHandler = function(e, opts) {
                    var defaultOpts = { toggleClasses: !0, toggleText: { collapseText: collapseText, expandText: expandText } };
                    opts = $.extend(defaultOpts, options, opts);
                    togglingHandler($(this), $collapsible, e, opts); };
                buildDefaultToggleLink = function() {
                    return $('<a href="#"></a>').text(collapseText).wrap('<span class="mw-collapsible-toggle"></span>').parent().prepend('<span class="mw-collapsible-bracket">[</span>').append('<span class="mw-collapsible-bracket">]</span>').on('click.mw-collapsible keypress.mw-collapsible', actionHandler); };
                premadeToggleHandler = function(e, opts) {
                    var defaultOpts = { toggleClasses: !0, linksPassthru: !0 };
                    opts = $.extend(defaultOpts, options, opts);
                    togglingHandler($(this), $collapsible, e, opts); };
                if (options.$customTogglers) { $customTogglers = $(options.$customTogglers); } else {
                    collapsibleId = $collapsible.attr('id') || '';
                    if (collapsibleId.indexOf('mw-customcollapsible-') === 0) {
                        $customTogglers = $('.' + collapsibleId.replace('mw-customcollapsible', 'mw-customtoggle')).addClass('mw-customtoggle');
                    }
                }
                if ($customTogglers && $customTogglers.length) { actionHandler = function(e, opts) {
                        var defaultOpts = {};
                        opts = $.extend(defaultOpts, options, opts);
                        togglingHandler($(this), $collapsible, e, opts); };
                    $toggleLink = $customTogglers.on('click.mw-collapsible keypress.mw-collapsible', actionHandler).prop('tabIndex', 0); } else {
                    if ($collapsible.is('table')) {
                        $caption = $collapsible.find('> caption');
                        if ($caption.length) { $toggle = $caption.find('> .mw-collapsible-toggle');
                            if (!$toggle.length) { $toggleLink = buildDefaultToggleLink().appendTo($caption); } else { actionHandler = premadeToggleHandler;
                                $toggleLink = $toggle.on('click.mw-collapsible keypress.mw-collapsible', actionHandler).prop('tabIndex', 0); } } else {
                            $firstItem = $collapsible.find('tr:first th, tr:first td');
                            $toggle = $firstItem.find('> .mw-collapsible-toggle');
                            if (!$toggle.length) { $toggleLink = buildDefaultToggleLink().prependTo($firstItem.eq(-1)); } else {
                                actionHandler = premadeToggleHandler;
                                $toggleLink =
                                    $toggle.on('click.mw-collapsible keypress.mw-collapsible', actionHandler).prop('tabIndex', 0);
                            }
                        }
                    } else if ($collapsible.is('ul') || $collapsible.is('ol')) { $firstItem = $collapsible.find('li:first');
                        $toggle = $firstItem.find('> .mw-collapsible-toggle');
                        if (!$toggle.length) { firstval = $firstItem.prop('value');
                            if (firstval === undefined || !firstval || firstval === '-1' || firstval === -1) { $firstItem.prop('value', '1'); }
                            $toggleLink = buildDefaultToggleLink();
                            $toggleLink.wrap('<li class="mw-collapsible-toggle-li"></li>').parent().prependTo($collapsible); } else { actionHandler = premadeToggleHandler;
                            $toggleLink = $toggle.on('click.mw-collapsible keypress.mw-collapsible', actionHandler).prop('tabIndex', 0); } } else {
                        $toggle = $collapsible.find('> .mw-collapsible-toggle');
                        if (!$collapsible.find('> .mw-collapsible-content').length) { $collapsible.wrapInner('<div class="mw-collapsible-content"></div>'); }
                        if (!$toggle.length) { $toggleLink = buildDefaultToggleLink().prependTo($collapsible); } else {
                            actionHandler = premadeToggleHandler;
                            $toggleLink =
                                $toggle.on('click.mw-collapsible keypress.mw-collapsible', actionHandler).prop('tabIndex', 0);
                        }
                    }
                }
                $(this).data('mw-collapsible', { collapse: function() { actionHandler.call($toggleLink.get(0), null, { instantHide: !0, wasCollapsed: !1 }); }, expand: function() { actionHandler.call($toggleLink.get(0), null, { instantHide: !0, wasCollapsed: !0 }); }, toggle: function() { actionHandler.call($toggleLink.get(0), null, null); } });
                if (options.collapsed || $collapsible.hasClass('mw-collapsed')) { actionHandler.call($toggleLink.get(0), null, { instantHide: !0, wasCollapsed: !1 }); }
            });
            mw.hook('wikipage.collapsibleContent').fire(this);
            return this;
        };
    }(jQuery, mediaWiki));
}, {
    "css": [
        ".mw-collapsible-toggle{float:right;-moz-user-select:none;-webkit-user-select:none;-ms-user-select:none;user-select:none}  .mw-content-ltr .mw-collapsible-toggle,.mw-content-rtl .mw-content-ltr .mw-collapsible-toggle{float:right} .mw-content-rtl .mw-collapsible-toggle,.mw-content-ltr .mw-content-rtl .mw-collapsible-toggle{float:left}.mw-customtoggle,.mw-collapsible-toggle{cursor:pointer} caption .mw-collapsible-toggle,.mw-content-ltr caption .mw-collapsible-toggle,.mw-content-rtl caption .mw-collapsible-toggle,.mw-content-rtl .mw-content-ltr caption .mw-collapsible-toggle,.mw-content-ltr .mw-content-rtl caption .mw-collapsible-toggle{float:none} li .mw-collapsible-toggle,.mw-content-ltr li .mw-collapsible-toggle,.mw-content-rtl li .mw-collapsible-toggle,.mw-content-rtl .mw-content-ltr li .mw-collapsible-toggle,.mw-content-ltr .mw-content-rtl li .mw-collapsible-toggle{float:none} .mw-collapsible-toggle-li{list-style:none}"
    ]
}, {
    "collapsible-collapse": "\u6298\u53e0",
    "collapsible-expand": "\u5c55\u5f00"
});
mw.loader.implement("jquery.mw-jump", function($, jQuery, require, module) { jQuery(function($) { $('.mw-jump').on('focus blur', 'a', function(e) {
            if (e.type === 'blur' || e.type === 'focusout') { $(this).closest('.mw-jump').css({ height: 0 }); } else { $(this).closest('.mw-jump').css({ height: 'auto' }); } }); }); });
mw.loader.implement("jquery.placeholder", function($, jQuery, require, module) {
    (function($) {
        var isInputSupported = 'placeholder' in document.createElement('input'),
            isTextareaSupported = 'placeholder' in document.createElement('textarea'),
            prototype = $.fn,
            valHooks = $.valHooks,
            propHooks = $.propHooks,
            hooks, placeholder;

        function safeActiveElement() {
            try {
                return document.activeElement; } catch (err) {} }

        function args(elem) {
            var newAttrs = {},
                rinlinejQuery = /^jQuery\d+$/;
            $.each(elem.attributes, function(i, attr) {
                if (attr.specified && !rinlinejQuery.test(attr.name)) { newAttrs[attr.name] = attr.value; } });
            return newAttrs; }

        function clearPlaceholder(event, value) {
            var input = this,
                $input = $(input);
            if (input.value === $input.attr('placeholder') && $input.hasClass('placeholder')) {
                if ($input.data('placeholder-password')) { $input = $input.hide().next().show().attr('id', $input.removeAttr('id').data('placeholder-id'));
                    if (event === true) { $input[0].value = value;
                        return value; }
                    $input.focus(); } else {
                    input.value = '';
                    $input.removeClass('placeholder');
                    if (input === safeActiveElement()) { input.select(); }
                }
            }
        }

        function setPlaceholder() {
            var $replacement, input = this,
                $input = $(input),
                id = this.id;
            if (!input.value) {
                if (input.type === 'password') {
                    if (!$input.data('placeholder-textinput')) {
                        try { $replacement = $input.clone().attr({ type: 'text' }); } catch (e) { $replacement = $('<input>').attr($.extend(args(this), { type: 'text' })); }
                        $replacement.removeAttr('name').data({ 'placeholder-password': $input, 'placeholder-id': id }).bind('focus.placeholder drop.placeholder', clearPlaceholder);
                        $input.data({ 'placeholder-textinput': $replacement, 'placeholder-id': id }).before($replacement); }
                    $input = $input.removeAttr('id').hide().prev().attr('id', id).show(); }
                $input.addClass('placeholder');
                $input[0].value = $input.attr('placeholder'); } else { $input.removeClass('placeholder'); } }

        function changePlaceholder(text) {
            var hasArgs = arguments.length,
                $input = this;
            if (hasArgs) {
                if ($input.attr('placeholder') !== text) { $input.prop('placeholder', text);
                    if ($input.hasClass('placeholder')) { $input[0].value = text; } } } }
        if (
            isInputSupported && isTextareaSupported) { placeholder = prototype.placeholder = function(text) {
                var hasArgs = arguments.length;
                if (hasArgs) { changePlaceholder.call(this, text); }
                return this; };
            placeholder.input = placeholder.textarea = !0; } else {
            placeholder = prototype.placeholder = function(text) {
                var $this = this,
                    hasArgs = arguments.length;
                if (hasArgs) { changePlaceholder.call(this, text); }
                $this.filter((isInputSupported ? 'textarea' : ':input') + '[placeholder]').filter(function() {
                    return !$(this).data('placeholder-enabled'); }).bind({ 'focus.placeholder drop.placeholder': clearPlaceholder, 'blur.placeholder': setPlaceholder }).data('placeholder-enabled', true).trigger('blur.placeholder');
                return $this; };
            placeholder.input = isInputSupported;
            placeholder.textarea = isTextareaSupported;
            hooks = {
                get: function(element) {
                    var $element = $(element),
                        $passwordInput = $element.data('placeholder-password');
                    if ($passwordInput) {
                        return $passwordInput[0].value; }
                    return $element.data('placeholder-enabled') && $element.hasClass('placeholder') ? '' : element.value; },
                set: function(element, value) {
                    var $element = $(element),
                        $passwordInput = $element.data('placeholder-password');
                    if ($passwordInput) { $passwordInput[0].value = value;
                        return value; }
                    if (!$element.data('placeholder-enabled')) { element.value = value;
                        return value; }
                    if (!value) { element.value = value;
                        if (element !== safeActiveElement()) { setPlaceholder.call(element); } } else if ($element.hasClass('placeholder')) {
                        if (!clearPlaceholder.call(element, true, value)) { element.value = value; } } else { element.value = value; }
                    return $element; }
            };
            if (!isInputSupported) { valHooks.input = hooks;
                propHooks.value = hooks; }
            if (!isTextareaSupported) { valHooks.textarea = hooks;
                propHooks.value = hooks; }
            $(function() { $(document).delegate('form', 'submit.placeholder', function() {
                    var $inputs = $('.placeholder', this).each(clearPlaceholder);
                    setTimeout(function() { $inputs.each(setPlaceholder); }, 10); }); });
            $(window).bind('beforeunload.placeholder', function() { $('.placeholder').each(function() { this.value = ''; }); });
        }
    }(jQuery));
});
mw.loader.implement("jquery.suggestions", function($, jQuery, require, module) {
    (function($) {
        var hasOwn = Object.hasOwnProperty;
        $.suggestions = {
            cancel: function(context) {
                if (context.data.timerID !== null) { clearTimeout(context.data.timerID); }
                if ($.isFunction(context.config.cancel)) { context.config.cancel.call(context.data.$textbox); } },
            hide: function(context) { context.data.$container.find('.suggestions-result-current').removeClass('suggestions-result-current');
                context.data.$container.hide(); },
            restore: function(context) { context.data.$textbox.val(context.data.prevText); },
            update: function(context, delayed) {
                function maybeFetch() {
                    var val = context.data.$textbox.val(),
                        cache = context.data.cache,
                        cacheHit;
                    if (typeof context.config.update.before === 'function') { context.config.update.before.call(context.data.$textbox); }
                    if (val.length === 0) { $.suggestions.hide(context);
                        context.data.prevText = ''; } else if (val !== context.data.prevText || !context.data.$container.is(':visible')) {
                        context.data.prevText = val;
                        if (context.config.cache &&
                            hasOwn.call(cache, val)) {
                            if (+new Date() - cache[val].timestamp < context.config.cacheMaxAge) { context.data.$textbox.suggestions('suggestions', cache[val].suggestions);
                                if (typeof context.config.update.after === 'function') { context.config.update.after.call(context.data.$textbox, cache[val].metadata); }
                                cacheHit = !0; } else { delete cache[val]; } }
                        if (!cacheHit && typeof context.config.fetch === 'function') { context.config.fetch.call(context.data.$textbox, val, function(suggestions, metadata) { suggestions = suggestions.slice(0, context.config.maxRows);
                                context.data.$textbox.suggestions('suggestions', suggestions);
                                if (typeof context.config.update.after === 'function') { context.config.update.after.call(context.data.$textbox, metadata); }
                                if (context.config.cache) { cache[val] = { suggestions: suggestions, metadata: metadata, timestamp: +new Date() }; } }, context.config.maxRows); }
                    }
                    $.suggestions.special(context);
                }
                $.suggestions.cancel(context);
                if (delayed) { context.data.timerID = setTimeout(maybeFetch, context.config.delay); } else { maybeFetch(); }
            },
            special: function(context) {
                if (typeof context.config.special.render === 'function') { setTimeout(function() {
                        var $special = context.data.$container.find('.suggestions-special');
                        context.config.special.render.call($special, context.data.$textbox.val(), context); }, 1); } },
            configure: function(context, property, value) {
                var newCSS, $result, $results, $spanForWidth, childrenWidth, i, expWidth, maxWidth, text;
                switch (property) {
                    case 'fetch':
                    case 'cancel':
                    case 'special':
                    case 'result':
                    case 'update':
                    case '$region':
                    case 'expandFrom':
                        context.config[property] = value;
                        break;
                    case 'suggestions':
                        context.config[property] = value;
                        if (context.data !== undefined) {
                            if (context.data.$textbox.val().length === 0) { $.suggestions.hide(context); } else {
                                context.data.$container.show();
                                newCSS = { top: context.config.$region.offset().top + context.config.$region.outerHeight(), bottom: 'auto', width: context.config.$region.outerWidth(), height: 'auto' };
                                context.config.expandFrom = (function(expandFrom) {
                                    var regionWidth, docWidth, regionCenter, docCenter, docDir = $(document.documentElement).css('direction'),
                                        $region = context.config.$region;
                                    if (context.config.positionFromLeft) { expandFrom = 'left'; } else if ($.inArray(expandFrom, ['left', 'right', 'start', 'end', 'auto']) === -1) { expandFrom = 'auto'; }
                                    if (expandFrom === 'auto') {
                                        if ($region.data('searchsuggest-expand-dir')) { expandFrom = $region.data('searchsuggest-expand-dir'); } else { regionWidth = $region.outerWidth();
                                            docWidth = $(document).width();
                                            if (regionWidth > (0.85 * docWidth)) { expandFrom = 'start'; } else { regionCenter = $region.offset().left + regionWidth / 2;
                                                docCenter = docWidth / 2;
                                                if (Math.abs(regionCenter - docCenter) < (0.10 * docCenter)) { expandFrom = 'start'; } else { expandFrom = regionCenter > docCenter ? 'right' : 'left'; } } } }
                                    if (expandFrom === 'start') { expandFrom = docDir === 'rtl' ? 'right' : 'left'; } else if (expandFrom === 'end') { expandFrom = docDir === 'rtl' ? 'left' : 'right'; }
                                    return expandFrom;
                                }(context.config.expandFrom));
                                if (context.config.expandFrom === 'left') { newCSS.left = context.config.$region.offset().left;
                                    newCSS.right = 'auto'; } else {
                                    newCSS.left = 'auto';
                                    newCSS.right = $('body').width() - (context.config.$region.offset().left + context.config.$region.outerWidth());
                                }
                                context.data.$container.css(newCSS);
                                $results = context.data.$container.children('.suggestions-results');
                                $results.empty();
                                expWidth = -1;
                                for (i = 0; i < context.config.suggestions.length; i++) {
                                    text = context.config.suggestions[i];
                                    $result = $('<div>').addClass('suggestions-result').attr('rel', i).data('text', context.config.suggestions[i]).mousemove(function() { context.data.selectedWithMouse = !0;
                                        $.suggestions.highlight(context, $(this).closest('.suggestions-results .suggestions-result'), false); }).appendTo($results);
                                    if (typeof context.config.result.render === 'function') { context.config.result.render.call($result, context.config.suggestions[i], context); } else { $result.text(text); }
                                    if (context.config.highlightInput) { $result.highlightText(context.data.prevText); }
                                    $spanForWidth = $result.wrapInner('<span>').children();
                                    childrenWidth = $spanForWidth.css('position', 'absolute').outerWidth();
                                    $spanForWidth.contents().unwrap();
                                    if (childrenWidth >
                                        $result.width() && childrenWidth > expWidth) { expWidth = childrenWidth + (context.data.$container.width() - $result.width()); }
                                }
                                if (expWidth > context.data.$container.width()) { maxWidth = context.config.maxExpandFactor * context.data.$textbox.width();
                                    context.data.$container.width(Math.min(expWidth, maxWidth)); }
                            }
                        }
                        break;
                    case 'maxRows':
                        context.config[property] = Math.max(1, Math.min(100, value));
                        break;
                    case 'delay':
                        context.config[property] = Math.max(0, Math.min(1200, value));
                        break;
                    case 'cacheMaxAge':
                        context.config[property] = Math.max(1, value);
                        break;
                    case 'maxExpandFactor':
                        context.config[property] = Math.max(1, value);
                        break;
                    case 'cache':
                    case 'submitOnClick':
                    case 'positionFromLeft':
                    case 'highlightInput':
                        context.config[property] = !!value;
                        break;
                }
            },
            highlight: function(context, result, updateTextbox) {
                var selected = context.data.$container.find('.suggestions-result-current');
                if (!result.get || selected.get(0) !== result.get(0)) {
                    if (result === 'prev') {
                        if (selected.hasClass('suggestions-special')) {
                            result = context.data.$container.find(
                                '.suggestions-result:last');
                        } else { result = selected.prev();
                            if (!(result.length && result.hasClass('suggestions-result'))) { result = selected.parents('.suggestions-results > *').prev().find('.suggestions-result').eq(0); }
                            if (selected.length === 0) {
                                if (context.data.$container.find('.suggestions-special').html() !== '') { result = context.data.$container.find('.suggestions-special'); } else { result = context.data.$container.find('.suggestions-results .suggestions-result:last'); } } }
                    } else if (result === 'next') {
                        if (selected.length === 0) { result = context.data.$container.find('.suggestions-results .suggestions-result:first');
                            if (result.length === 0 && context.data.$container.find('.suggestions-special').html() !== '') { result = context.data.$container.find('.suggestions-special'); } } else {
                            result = selected.next();
                            if (!(result.length && result.hasClass('suggestions-result'))) { result = selected.parents('.suggestions-results > *').next().find('.suggestions-result').eq(0); }
                            if (selected.hasClass('suggestions-special')) { result = $([]); } else if (result.length === 0 && context.data.$container.find('.suggestions-special').html() !== '') { result = context.data.$container.find('.suggestions-special'); }
                        }
                    }
                    selected.removeClass('suggestions-result-current');
                    result.addClass('suggestions-result-current');
                }
                if (updateTextbox) {
                    if (result.length === 0 || result.is('.suggestions-special')) { $.suggestions.restore(context); } else { context.data.$textbox.val(result.data('text'));
                        context.data.$textbox.change(); }
                    context.data.$textbox.trigger('change'); }
            },
            keypress: function(e, context, key) {
                var selected, wasVisible = context.data.$container.is(':visible'),
                    preventDefault = !1;
                switch (key) {
                    case 40:
                        if (wasVisible) { $.suggestions.highlight(context, 'next', true);
                            context.data.selectedWithMouse = !1; } else { $.suggestions.update(context, false); }
                        preventDefault = !0;
                        break;
                    case 38:
                        if (wasVisible) { $.suggestions.highlight(context, 'prev', true);
                            context.data.selectedWithMouse = !1; }
                        preventDefault = wasVisible;
                        break;
                    case 27:
                        $.suggestions.hide(context);
                        $.suggestions.restore(context);
                        $.suggestions.
                        cancel(context);
                        context.data.$textbox.trigger('change');
                        preventDefault = wasVisible;
                        break;
                    case 13:
                        preventDefault = wasVisible;
                        selected = context.data.$container.find('.suggestions-result-current');
                        $.suggestions.hide(context);
                        if (selected.length === 0 || context.data.selectedWithMouse) { $.suggestions.cancel(context);
                            preventDefault = !1; } else if (selected.is('.suggestions-special')) {
                            if (typeof context.config.special.select === 'function') {
                                if (context.config.special.select.call(selected, context.data.$textbox) === true) { preventDefault = !1; } } } else {
                            if (typeof context.config.result.select === 'function') {
                                if (context.config.result.select.call(selected, context.data.$textbox) === true) { preventDefault = !1; } } }
                        break;
                    default:
                        $.suggestions.update(context, true);
                        break;
                }
                if (preventDefault) { e.preventDefault();
                    e.stopPropagation(); }
            }
        };
        $.fn.suggestions = function() {
            var returnValue, args = arguments;
            $(this).each(function() {
                var context, key;
                context = $(this).data('suggestions-context');
                if (context === undefined || context === null) {
                    context = {
                        config: { fetch: function() {}, cancel: function() {}, special: {}, result: {}, update: {}, $region: $(this), suggestions: [], maxRows: 10, delay: 120, cache: !1, cacheMaxAge: 60000, submitOnClick: !1, maxExpandFactor: 3, expandFrom: 'auto', highlightInput: !1 }
                    };
                }
                if (args.length > 0) {
                    if (typeof args[0] === 'object') {
                        for (key in args[0]) { $.suggestions.configure(context, key, args[0][key]); } } else if (typeof args[0] === 'string') {
                        if (args.length > 1) { $.suggestions.configure(context, args[0], args[1]); } else if (returnValue === null || returnValue === undefined) { returnValue = (args[0] in context.config ? undefined : context.config[args[0]]); } } }
                if (context.data === undefined) {
                    context.data = { timerID: null, prevText: null, cache: {}, visibleResults: 0, mouseDownOn: $([]), $textbox: $(this), selectedWithMouse: !1 };
                    context.data.$container = $('<div>').css('display', 'none').addClass('suggestions').append($('<div>').addClass('suggestions-results').mousedown(function(e) { context.data.mouseDownOn = $(e.target).closest('.suggestions-results .suggestions-result'); }).mouseup(function(e) {
                        var $result = $(e.target).closest('.suggestions-results .suggestions-result'),
                            $other = context.data.mouseDownOn;
                        context.data.mouseDownOn = $([]);
                        if ($result.get(0) !== $other.get(0)) {
                            return; }
                        if (!(e.which !== 1 || e.altKey || e.ctrlKey || e.shiftKey || e.metaKey)) { $.suggestions.highlight(context, $result, true);
                            if (typeof context.config.result.select === 'function') { context.config.result.select.call($result, context.data.$textbox); }
                            setTimeout(function() { $.suggestions.hide(context); }, 0); }
                        context.data.$textbox.focus(); })).append($('<div>').addClass('suggestions-special').mousedown(function(e) { context.data.mouseDownOn = $(e.target).closest('.suggestions-special'); }).mouseup(function(e) {
                        var $special = $(e.target).closest('.suggestions-special'),
                            $other = context.data.mouseDownOn;
                        context.data.mouseDownOn = $([]);
                        if ($special.get(0) !== $other.get(0)) {
                            return; }
                        if (!(e.which !== 1 || e.altKey || e.ctrlKey || e.shiftKey || e.metaKey)) {
                            if (typeof context.config.special.select === 'function') {
                                context.config.special.select.call(
                                    $special, context.data.$textbox);
                            }
                            setTimeout(function() { $.suggestions.hide(context); }, 0);
                        }
                        context.data.$textbox.focus();
                    }).mousemove(function(e) { context.data.selectedWithMouse = !0;
                        $.suggestions.highlight(context, $(e.target).closest('.suggestions-special'), false); })).appendTo($('body'));
                    $(this).attr('autocomplete', 'off').keydown(function(e) { context.data.keypressed = e.which;
                        context.data.keypressedCount = 0; }).keypress(function(e) { context.data.keypressedCount++;
                        $.suggestions.keypress(e, context, context.data.keypressed); }).keyup(function(e) {
                        if (context.data.keypressedCount === 0) { $.suggestions.keypress(e, context, context.data.keypressed); } }).blur(function() {
                        if (context.data.mouseDownOn.length > 0) {
                            return; }
                        $.suggestions.hide(context);
                        $.suggestions.cancel(context); });
                }
                $(this).data('suggestions-context', context);
            });
            return returnValue !== undefined ? returnValue : $(this);
        };
    }(jQuery));
}, {
    "css": [
        ".suggestions{overflow:hidden;position:absolute;top:0;left:0;width:0;border:none;z-index:1099;padding:0;margin:-1px 0 0 0}.suggestions-special{position:relative;background-color:white;cursor:pointer;border:solid 1px #aaaaaa;padding:0;margin:0;margin-top:-2px;display:none;padding:0.25em 0.25em;line-height:1.25em}.suggestions-results{background-color:white;cursor:pointer;border:solid 1px #aaaaaa;padding:0;margin:0}.suggestions-result{color:black;margin:0;line-height:1.5em;padding:0.01em 0.25em;text-align:left; overflow:hidden;-o-text-overflow:ellipsis; text-overflow:ellipsis;white-space:nowrap}.suggestions-result-current{background-color:#4C59A6;color:white}.suggestions-special .special-label{color:gray;text-align:left}.suggestions-special .special-query{color:black;font-style:italic;text-align:left}.suggestions-special .special-hover{background-color:silver}.suggestions-result-current .special-label,.suggestions-result-current .special-query{color:white}.highlight{font-weight:bold}"
    ]
});
mw.loader.implement("mediawiki.api", function($, jQuery, require, module) {
    (function(mw, $) {
        var defaultOptions = { parameters: { action: 'query', format: 'json' }, ajax: { url: mw.util.wikiScript('api'), timeout: 30 * 1000, dataType: 'json' } },
            promises = {};

        function mapLegacyToken(action) {
            var csrfActions = ['edit', 'delete', 'protect', 'move', 'block', 'unblock', 'email', 'import', 'options'];
            if ($.inArray(action, csrfActions) !== -1) { mw.track('mw.deprecate', 'apitoken_' + action);
                mw.log.warn('Use of the "' + action + '" token is deprecated. Use "csrf" instead.');
                return 'csrf'; }
            return action; }
        promises[defaultOptions.ajax.url] = {};
        $.each(mw.user.tokens.get(), function(key, value) { promises[defaultOptions.ajax.url][key] = $.Deferred().resolve(value).promise({ abort: function() {} }); });
        mw.Api = function(options) {
            options = options || {};
            if (options.ajax && options.ajax.url !== undefined) { options.ajax.url = String(options.ajax.url); }
            options.parameters = $.extend({}, defaultOptions.parameters, options.parameters);
            options.ajax = $.extend({}, defaultOptions.ajax, options.ajax);
            this.defaults = options;
            this.requests = [];
        };
        mw.Api.prototype = {
            abort: function() { $.each(this.requests, function(index, request) {
                    if (request) { request.abort(); } }); },
            get: function(parameters, ajaxOptions) { ajaxOptions = ajaxOptions || {};
                ajaxOptions.type = 'GET';
                return this.ajax(parameters, ajaxOptions); },
            post: function(parameters, ajaxOptions) { ajaxOptions = ajaxOptions || {};
                ajaxOptions.type = 'POST';
                return this.ajax(parameters, ajaxOptions); },
            preprocessParameters: function(parameters) {
                var key;
                for (key in parameters) {
                    if ($.isArray(parameters[key])) { parameters[key] = parameters[key].join('|'); }
                    if (parameters[key] === false || parameters[key] === undefined) { delete parameters[key]; } } },
            ajax: function(parameters, ajaxOptions) {
                var token, requestIndex, api = this,
                    apiDeferred = $.Deferred(),
                    xhr, key, formData;
                parameters = $.extend({}, this.defaults.parameters, parameters);
                ajaxOptions = $.extend({}, this.defaults.ajax, ajaxOptions);
                if (parameters.token) { token = parameters.token;
                    delete parameters.token; }
                this.preprocessParameters(parameters);
                if (
                    ajaxOptions.type === 'POST' && window.FormData && ajaxOptions.contentType === 'multipart/form-data') { formData = new FormData();
                    for (key in parameters) { formData.append(key, parameters[key]); }
                    if (token) { formData.append('token', token); }
                    ajaxOptions.data = formData;
                    ajaxOptions.processData = !1;
                    ajaxOptions.contentType = !1; } else { ajaxOptions.data = $.param(parameters);
                    if (token) { ajaxOptions.data += '&token=' + encodeURIComponent(token); }
                    ajaxOptions.data = ajaxOptions.data.replace(/\./g, '%2E');
                    if (ajaxOptions.contentType === 'multipart/form-data') { delete ajaxOptions.contentType; } }
                xhr = $.ajax(ajaxOptions).fail(function(xhr, textStatus, exception) { apiDeferred.reject('http', { xhr: xhr, textStatus: textStatus, exception: exception }); }).done(function(result, textStatus, jqXHR) {
                    if (result === undefined || result === null || result === '') { apiDeferred.reject('ok-but-empty', 'OK response but empty result (check HTTP headers?)', result, jqXHR); } else if (result.error) {
                        var code = result.error.code === undefined ? 'unknown' : result.error.code;
                        apiDeferred.reject(
                            code, result, result, jqXHR);
                    } else { apiDeferred.resolve(result, jqXHR); }
                });
                requestIndex = this.requests.length;
                this.requests.push(xhr);
                xhr.always(function() { api.requests[requestIndex] = null; });
                return apiDeferred.promise({ abort: xhr.abort }).fail(function(code, details) {
                    if (!(code === 'http' && details && details.textStatus === 'abort')) { mw.log('mw.Api error: ', code, details); } });
            },
            postWithToken: function(tokenType, params, ajaxOptions) {
                var api = this;
                return api.getToken(tokenType, params.assert).then(function(token) { params.token = token;
                    return api.post(params, ajaxOptions).then(null, function(code) {
                        if (code === 'badtoken') { api.badToken(tokenType);
                            params.token = undefined;
                            return api.getToken(tokenType, params.assert).then(function(token) { params.token = token;
                                return api.post(params, ajaxOptions); }); }
                        return this; }); }); },
            getToken: function(type, assert) {
                var apiPromise, promiseGroup, d;
                type = mapLegacyToken(type);
                promiseGroup = promises[this.defaults.ajax.url];
                d = promiseGroup && promiseGroup[type + 'Token'];
                if (!d) {
                    apiPromise = this.get({
                        action: 'query',
                        meta: 'tokens',
                        type: type,
                        assert: assert
                    });
                    d = apiPromise.then(function(res) {
                        if (!res.query.tokens[type + 'token']) {
                            return $.Deferred().reject('token-missing', res); }
                        return res.query.tokens[type + 'token']; }, function() { delete promiseGroup[type + 'Token'];
                        return this; }).promise({ abort: apiPromise.abort });
                    if (!promiseGroup) { promiseGroup = promises[this.defaults.ajax.url] = {}; }
                    promiseGroup[type + 'Token'] = d;
                }
                return d;
            },
            badToken: function(type) {
                var promiseGroup = promises[this.defaults.ajax.url];
                type = mapLegacyToken(type);
                if (promiseGroup) { delete promiseGroup[type + 'Token']; } }
        };
        mw.Api.errors = ['ok-but-empty', 'timeout', 'duplicate', 'duplicate-archive', 'noimageinfo', 'uploaddisabled', 'nomodule', 'mustbeposted', 'badaccess-groups', 'missingresult', 'missingparam', 'invalid-file-key', 'copyuploaddisabled', 'mustbeloggedin', 'empty-file', 'file-too-large', 'filetype-missing', 'filetype-banned', 'filetype-banned-type', 'filename-tooshort', 'illegal-filename', 'verification-error', 'hookaborted', 'unknown-error', 'internal-error',
            'overwrite', 'badtoken', 'fetchfileerror', 'fileexists-shared-forbidden', 'invalidtitle', 'notloggedin', 'autoblocked', 'blocked', 'stashfailed', 'stasherror', 'stashedfilenotfound', 'stashpathinvalid', 'stashfilestorage', 'stashzerolength', 'stashnotloggedin', 'stashwrongowner', 'stashnosuchfilekey'
        ];
        mw.Api.warnings = ['duplicate', 'exists'];
    }(mediaWiki, jQuery));
});
mw.loader.implement("mediawiki.cookie", function($, jQuery, require, module) {
    (function(mw, $) {
        'use strict';
        mw.cookie = {
            set: function(key, value, options) {
                var config, defaultOptions, date;
                config = mw.config.get(['wgCookiePrefix', 'wgCookieDomain', 'wgCookiePath', 'wgCookieExpiration']);
                defaultOptions = { prefix: config.wgCookiePrefix, domain: config.wgCookieDomain, path: config.wgCookiePath, secure: !1 };
                if ($.type(options) !== 'object') { defaultOptions.expires = options;
                    options = defaultOptions; } else { options = $.extend(defaultOptions, options); }
                if (options.expires === undefined && config.wgCookieExpiration !== 0) { date = new Date();
                    date.setTime(Number(date) + (config.wgCookieExpiration * 1000));
                    options.expires = date; } else if (typeof options.expires === 'number') { date = new Date();
                    date.setTime(Number(date) + (options.expires * 1000));
                    options.expires = date; } else if (options.expires === null) { delete options.expires; }
                key = options.prefix + key;
                delete options.prefix;
                if (value !== null) { value = String(value); }
                $.cookie(key, value, options); },
            get: function(key, prefix, defaultValue) {
                var result;
                if (prefix === undefined || prefix === null) { prefix = mw.config.get('wgCookiePrefix'); }
                if (arguments.length < 3) { defaultValue = null; }
                result = $.cookie(prefix + key);
                return result !== null ? result : defaultValue; }
        };
    }(mediaWiki, jQuery));
});
mw.loader.implement("mediawiki.icon", function($, jQuery, require, module) {}, {
    "css": [
        ".mw-icon-arrow-collapsed,.mw-collapsible-arrow.mw-collapsible-toggle-collapsed{background-image:url(/resources/src/mediawiki/images/arrow-collapsed-ltr.png?20324);background-image:linear-gradient(transparent,transparent),url(data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22UTF-8%22%3F%3E%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%3E%3Cpath%20d%3D%22M4%201.533v9.671l4.752-4.871z%22%20fill%3D%22%23797979%22%2F%3E%3C%2Fsvg%3E);background-image:linear-gradient(transparent,transparent),url(/resources/src/mediawiki/images/arrow-collapsed-ltr.svg?afbe0)!ie;background-image:-o-linear-gradient(transparent,transparent),url(/resources/src/mediawiki/images/arrow-collapsed-ltr.png?20324);background-repeat:no-repeat;background-position:left bottom}.mw-icon-arrow-expanded,.mw-collapsible-arrow.mw-collapsible-toggle-expanded{background-image:url(/resources/src/mediawiki/images/arrow-expanded.png?0888e);background-image:linear-gradient(transparent,transparent),url(data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22UTF-8%22%3F%3E%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%3E%3Cpath%20d%3D%22M1.165%203.624h9.671l-4.871%204.752z%22%20fill%3D%22%23797979%22%2F%3E%3C%2Fsvg%3E);background-image:linear-gradient(transparent,transparent),url(/resources/src/mediawiki/images/arrow-expanded.svg?f9843)!ie;background-image:-o-linear-gradient(transparent,transparent),url(/resources/src/mediawiki/images/arrow-expanded.png?0888e);background-repeat:no-repeat;background-position:left bottom}"
    ]
});
mw.loader.implement("mediawiki.searchSuggest", function($, jQuery, require, module) {
    (function(mw, $) {
        mw.searchSuggest = { request: function(api, query, response, maxRows) {
                return api.get({ formatversion: 2, action: 'opensearch', search: query, namespace: 0, limit: maxRows, suggest: !0 }).done(function(data, jqXHR) { response(data[1], { type: jqXHR.getResponseHeader('X-OpenSearch-Type'), query: query }); }); } };
        $(function() {
            var api, map, searchboxesSelectors, $searchRegion = $('#simpleSearch, #searchInput').first(),
                $searchInput = $('#searchInput'),
                previousSearchText = $searchInput.val();
            map = { opera: [
                    ['>=', 9.6]
                ], konqueror: [
                    ['>=', '4.11']
                ], docomo: !1, blackberry: !1, ipod: [
                    ['>=', 6]
                ], iphone: [
                    ['>=', 6]
                ] };
            if (!$.client.test(map)) {
                return; }

            function getFormData(context) {
                var $form, baseHref, linkParams;
                if (!context.formData) {
                    $form = context.config.$region.closest('form');
                    baseHref = $form.attr('action');
                    baseHref += baseHref.indexOf('?') > -1 ? '&' : '?';
                    linkParams = $form.serializeObject();
                    context.formData = {
                        textParam: context.data.$textbox.attr('name'),
                        linkParams: linkParams,
                        baseHref: baseHref
                    };
                }
                return context.formData;
            }

            function onBeforeUpdate() {
                var searchText = this.val();
                if (searchText && searchText !== previousSearchText) { mw.track('mediawiki.searchSuggest', { action: 'session-start' }); }
                previousSearchText = searchText; }

            function getInputLocation(context) {
                return context.config.$region.closest('form').find('[data-search-loc]').data('search-loc') || 'header'; }

            function onAfterUpdate(metadata) {
                var context = this.data('suggestionsContext');
                mw.track('mediawiki.searchSuggest', { action: 'impression-results', numberOfResults: context.config.suggestions.length, resultSetType: metadata.type || 'unknown', query: metadata.query, inputLocation: getInputLocation(context) }); }

            function renderFunction(text, context) {
                var formData = getFormData(context),
                    textboxConfig = context.data.$textbox.data('mw-searchsuggest') || {};
                formData.linkParams[formData.textParam] = text;
                mw.track('mediawiki.searchSuggest', { action: 'render-one', formData: formData, index: context.config.suggestions.indexOf(text) + 1 });
                this.text(text);
                if (textboxConfig.wrapAsLink !== false) { this.wrap($('<a>').attr('href', formData.baseHref + $.param(formData.linkParams)).attr('title', text).addClass('mw-searchSuggest-link')); }
            }

            function selectFunction($input) {
                var context = $input.data('suggestionsContext'),
                    text = $input.val();
                mw.track('mediawiki.searchSuggest', { action: 'click-result', numberOfResults: context.config.suggestions.length, clickIndex: context.config.suggestions.indexOf(text) + 1 });
                return true; }

            function specialRenderFunction(query, context) {
                var $el = this,
                    formData = getFormData(context);
                formData.linkParams[formData.textParam] = query;
                if ($el.children().length === 0) { $el.append($('<div>').addClass('special-label').text(mw.msg('searchsuggest-containing')), $('<div>').addClass('special-query').text(query)).show(); } else { $el.find('.special-query').text(query); }
                if ($el.parent().hasClass('mw-searchSuggest-link')) { $el.parent().attr('href', formData.baseHref + $.param(formData.linkParams) + '&fulltext=1'); } else {
                    $el.wrap($('<a>').attr('href', formData
                        .baseHref + $.param(formData.linkParams) + '&fulltext=1').addClass('mw-searchSuggest-link'));
                }
            }
            searchboxesSelectors = ['#searchInput', '.mw-searchInput'];
            $(searchboxesSelectors.join(', ')).suggestions({ fetch: function(query, response, maxRows) {
                    var node = this[0];
                    api = api || new mw.Api();
                    $.data(node, 'request', mw.searchSuggest.request(api, query, response, maxRows)); }, cancel: function() {
                    var node = this[0],
                        request = $.data(node, 'request');
                    if (request) { request.abort();
                        $.removeData(node, 'request'); } }, result: { render: renderFunction, select: function() {
                        return true; } }, update: { before: onBeforeUpdate, after: onAfterUpdate }, cache: !0, highlightInput: !0 }).bind('paste cut drop', function() { $(this).trigger('keypress'); }).each(function() {
                var $this = $(this);
                $this.data('suggestions-context').data.$container.css('fontSize', $this.css('fontSize')); });
            if ($searchRegion.length === 0) {
                return; }
            $searchInput.suggestions({
                update: { before: onBeforeUpdate, after: onAfterUpdate },
                result: { render: renderFunction, select: selectFunction },
                special: {
                    render: specialRenderFunction,
                    select: function($input) { $input.closest('form').append($('<input type="hidden" name="fulltext" value="1"/>'));
                        return true; }
                },
                $region: $searchRegion
            });
            $searchInput.closest('form').on('submit', function() {
                var context = $searchInput.data('suggestionsContext');
                mw.track('mediawiki.searchSuggest', { action: 'submit-form', numberOfResults: context.config.suggestions.length, $form: context.config.$region.closest('form'), inputLocation: getInputLocation(context) }); }).find('.mw-fallbackSearchButton').remove();
        });
    }(mediaWiki, jQuery));
}, {
    "css": [
        ".suggestions a.mw-searchSuggest-link,.suggestions a.mw-searchSuggest-link:hover,.suggestions a.mw-searchSuggest-link:active,.suggestions a.mw-searchSuggest-link:focus{color:black;text-decoration:none}.suggestions-result-current a.mw-searchSuggest-link,.suggestions-result-current a.mw-searchSuggest-link:hover,.suggestions-result-current a.mw-searchSuggest-link:active,.suggestions-result-current a.mw-searchSuggest-link:focus{color:white}.suggestions a.mw-searchSuggest-link .special-query{ overflow:hidden;-o-text-overflow:ellipsis; text-overflow:ellipsis;white-space:nowrap}"
    ]
}, { "searchsuggest-containing": "\u542b\u6709...", "searchsuggest-search": "\u641c\u7d22" });
mw.loader.implement("mediawiki.user", function($, jQuery, require, module) {
    (function(mw, $) {
        var i, userInfoPromise, byteToHex = [];

        function getUserInfo() {
            if (!userInfoPromise) { userInfoPromise = new mw.Api().getUserInfo(); }
            return userInfoPromise; }
        for (i = 0; i < 256; i++) { byteToHex[i] = (i + 256).toString(16).slice(1); }
        $.extend(mw.user, {
            generateRandomSessionId: function() {
                var rnds, i, r, hexRnds = new Array(8),
                    crypto = window.crypto || window.msCrypto;
                if (crypto && crypto.getRandomValues) { rnds = new Uint8Array(8);
                    crypto.getRandomValues(rnds); } else { rnds = new Array(8);
                    for (i = 0; i < 8; i++) {
                        if ((i & 3) === 0) { r = Math.random() * 0x100000000; }
                        rnds[i] = r >>> ((i & 3) << 3) & 255; } }
                for (i = 0; i < 8; i++) { hexRnds[i] = byteToHex[rnds[i]]; }
                return hexRnds.join(''); },
            getId: function() {
                return mw.config.get('wgUserId', 0); },
            getName: function() {
                return mw.config.get('wgUserName'); },
            getRegistration: function() {
                var registration = mw.config.get('wgUserRegistration');
                if (mw.user.isAnon()) {
                    return false; }
                if (registration === null) {
                    return null; }
                return new Date(registration); },
            isAnon: function() {
                return mw.user.getName() === null; },
            sessionId: function() {
                var sessionId = mw.cookie.get('mwuser-sessionId');
                if (sessionId === null) { sessionId = mw.user.generateRandomSessionId();
                    mw.cookie.set('mwuser-sessionId', sessionId, { expires: null }); }
                return sessionId; },
            id: function() {
                return mw.user.getName() || mw.user.sessionId(); },
            bucket: function(key, options) {
                var cookie, parts, version, bucket, range, k, rand, total;
                options = $.extend({ buckets: {}, version: 0, expires: 30 }, options || {});
                cookie = mw.cookie.get('mwuser-bucket:' + key);
                if (typeof cookie === 'string' && cookie.length > 2 && cookie.indexOf(':') !== -1) { parts = cookie.split(':');
                    if (parts.length > 1 && Number(parts[0]) === options.version) { version = Number(parts[0]);
                        bucket = String(parts[1]); } }
                if (bucket === undefined) {
                    if (!$.isPlainObject(options.buckets)) {
                        throw new Error('Invalid bucket. Object expected for options.buckets.'); }
                    version = Number(options.version);
                    range = 0;
                    for (k in options.buckets) { range += options.buckets[k]; }
                    rand = Math.random() * range;
                    total = 0;
                    for (k in options.buckets) {
                        bucket = k;
                        total += options.buckets[k];
                        if (total >= rand) {
                            break; }
                    }
                    mw.cookie.set('mwuser-bucket:' + key, version + ':' + bucket, { expires: Number(options.expires) * 86400 });
                }
                return bucket;
            },
            getGroups: function(callback) {
                var userGroups = mw.config.get('wgUserGroups', []);
                return $.Deferred().resolve(userGroups).done(callback); },
            getRights: function(callback) {
                return getUserInfo().then(function(userInfo) {
                    return userInfo.rights; }, function() {
                    return []; }).done(callback); }
        });
    }(mediaWiki, jQuery));
});
mw.loader.implement("mediawiki.api.user", function($, jQuery, require, module) {
    (function(mw, $) { $.extend(mw.Api.prototype, { getUserInfo: function() {
                return this.get({ action: 'query', meta: 'userinfo', uiprop: ['groups', 'rights'] }).then(function(data) {
                    if (data.query && data.query.userinfo) {
                        return data.query.userinfo; }
                    return $.Deferred().reject().promise(); }); } }); }(mediaWiki, jQuery)); });
mw.loader.implement("mediawiki.page.ready", function($, jQuery, require, module) {
    (function(mw, $) {
        var supportsPlaceholder = 'placeholder' in document.createElement('input');
        if (mw.config.get('wgBreakFrames')) {
            if (window.top !== window.self) { window.top.location.href = location.href; } }
        mw.hook('wikipage.content').add(function($content) {
            var $sortableTables;
            if (!supportsPlaceholder) { $content.find('input[placeholder]').placeholder(); }
            $content.find('.mw-collapsible').makeCollapsible();
            $sortableTables = $content.find('table.sortable');
            if ($sortableTables.length) { mw.loader.using('jquery.tablesorter', function() { $sortableTables.tablesorter(); }); }
            $content.find('input[type="checkbox"]:not(.noshiftselect)').checkboxShiftClick(); });
        $(function() {
            var $nodes, $oouiNodes;
            if (!supportsPlaceholder) { $('input[placeholder]').not('#mw-content-text input').placeholder(); }
            if (document.querySelectorAll) { $nodes = $(document.querySelectorAll('[accesskey]')); } else {
                $nodes = $(
                    '#column-one a, #mw-head a, #mw-panel a, #p-logo a, input, label, button');
            }
            $nodes.updateTooltipAccessKeys();
            $oouiNodes = $('[data-ooui]');
            if ($oouiNodes.length) { mw.loader.using(['mediawiki.widgets', 'mediawiki.widgets.UserInputWidget', 'mediawiki.widgets.SearchInputWidget']).done(function() { $oouiNodes.each(function() { OO.ui.infuse(this); }); }); }
            $nodes = $('.catlinks[data-mw="interface"]');
            if ($nodes.length) { mw.hook('wikipage.categories').fire($nodes); }
        });
    }(mediaWiki, jQuery));
});
mw.loader.implement("mediawiki.special.changeslist.legend.js", function($, jQuery, require, module) {
    (function(mw, $) {
        var cookieName = 'changeslist-state',
            isCollapsed = mw.cookie.get(cookieName) === 'collapsed';
        $(function() { $('.mw-changeslist-legend').makeCollapsible({ collapsed: isCollapsed }).on('beforeExpand.mw-collapsible', function() { mw.cookie.set(cookieName, 'expanded'); }).on('beforeCollapse.mw-collapsible', function() { mw.cookie.set(cookieName, 'collapsed'); }); }); }(mediaWiki, jQuery)); });
mw.loader.implement("site", "");
mw.loader.implement("user.defaults", function($, jQuery, require, module) {
    mw.user.options.set({
        "ccmeonemails": 0,
        "cols": 80,
        "date": "default",
        "diffonly": 0,
        "disablemail": 0,
        "editfont": "default",
        "editondblclick": 0,
        "editsectiononrightclick": 0,
        "enotifminoredits": 0,
        "enotifrevealaddr": 0,
        "enotifusertalkpages": 1,
        "enotifwatchlistpages": 1,
        "extendwatchlist": 1,
        "fancysig": 0,
        "forceeditsummary": 0,
        "gender": "unknown",
        "hideminor": 0,
        "hidepatrolled": 0,
        "hidecategorization": 1,
        "imagesize": 2,
        "math": 1,
        "minordefault": 0,
        "newpageshidepatrolled": 0,
        "nickname": "",
        "norollbackdiff": 0,
        "numberheadings": 0,
        "previewonfirst": 0,
        "previewontop": 1,
        "rcdays": 7,
        "rclimit": 50,
        "rows": 25,
        "showhiddencats": 0,
        "shownumberswatching": 1,
        "showtoolbar": 1,
        "skin": "vector",
        "stubthreshold": 0,
        "thumbsize": 5,
        "underline": 2,
        "uselivepreview": 0,
        "usenewrc": 1,
        "watchcreations": 1,
        "watchdefault": 1,
        "watchdeletion": 0,
        "watchuploads": 1,
        "watchlistdays": 3,
        "watchlisthideanons": 0,
        "watchlisthidebots": 0,
        "watchlisthideliu": 0,
        "watchlisthideminor": 0,
        "watchlisthideown": 0,
        "watchlisthidepatrolled": 0,
        "watchlisthidecategorization": 1,
        "watchlistreloadautomatically": 0,
        "watchmoves": 0,
        "watchrollback": 0,
        "wllimit": 250,
        "useeditwarning": 1,
        "prefershttps": 1,
        "language": "zh-cn",
        "variant-gan": "gan",
        "variant-iu": "iu",
        "variant-kk": "kk",
        "variant-ku": "ku",
        "variant-shi": "shi",
        "variant-sr": "sr",
        "variant-tg": "tg",
        "variant-uz": "uz",
        "variant-zh": "zh",
        "searchNs0": !0,
        "searchNs1": !1,
        "searchNs2": !1,
        "searchNs3": !1,
        "searchNs4": !1,
        "searchNs5": !1,
        "searchNs6": !1,
        "searchNs7": !1,
        "searchNs8": !1,
        "searchNs9": !1,
        "searchNs10": !1,
        "searchNs11": !1,
        "searchNs12": !1,
        "searchNs13": !1,
        "searchNs14": !1,
        "searchNs15": !1,
        "searchNs2300": !1,
        "searchNs2301": !1,
        "searchNs2302": !1,
        "searchNs2303": !1
    });
});
