!function(a){"use strict";a.fn.nooLoadmore=function(b,c){var d={contentSelector:null,contentWrapper:null,nextSelector:"div.navigation a:first",navSelector:"div.navigation",itemSelector:"div.post",dataType:"html",finishedMsg:"<em>Congratulations, you've reached the end of the internet.</em>",loading:{speed:"fast",start:void 0},state:{isDuringAjax:!1,isInvalidPage:!1,isDestroyed:!1,isDone:!1,isPaused:!1,isBeyondMaxPage:!1,currPage:1}},b=a.extend(d,b);return this.each(function(){var d=this,e=a(this),f=e.find(".loadmore-wrap"),g=e.find(".loadmore-action"),h=g.find(".btn-loadmore"),i=g.find(".loadmore-loading");b.contentWrapper=b.contentWrapper||f;var j=function(a){if(a.match(/^(.*?)\b2\b(.*?$)/))a=a.match(/^(.*?)\b2\b(.*?$)/).slice(1);else if(a.match(/^(.*?)2(.*?$)/)){if(a.match(/^(.*?page=)2(\/.*|$)/))return a=a.match(/^(.*?page=)2(\/.*|$)/).slice(1);a=a.match(/^(.*?)2(.*?$)/).slice(1)}else{if(a.match(/^(.*?page=)1(\/.*|$)/))return a=a.match(/^(.*?page=)1(\/.*|$)/).slice(1);b.state.isInvalidPage=!0}return a};if(a(b.nextSelector).length){b.callback=function(d,e){c&&c.call(a(b.contentSelector)[0],d,b,e)},b.loading.start=b.loading.start||function(){h.hide(),a(b.navSelector).hide(),i.show(b.loading.speed,a.proxy(function(){k(b)},d))};var k=function(b){var c=a(b.nextSelector).attr("href");c=j(c);var e,f,k,l,m;b.callback;return b.state.currPage++,void 0!==b.maxPage&&b.state.currPage>b.maxPage?void(b.state.isBeyondMaxPage=!0):(e=c.join(b.state.currPage),k=a("<div/>"),void k.load(e+" "+b.itemSelector,void 0,function(c){if(l=k.children(),0===l.length)return h.hide(),void g.append('<div style="margin-top:5px;">'+b.finishedMsg+"</div>").animate({opacity:1},2e3,function(){g.fadeOut(b.loading.speed)});for(f=document.createDocumentFragment();k[0].firstChild;)f.appendChild(k[0].firstChild);a(b.contentWrapper)[0].appendChild(f),m=l.get(),i.hide(),h.show(b.loading.speed),b.callback(m)}))};h.on("click",function(c){c.stopPropagation(),c.preventDefault(),b.loading.start.call(a(b.contentWrapper)[0],b)})}})};var b=function(){var a=window,b="inner";return"innerWidth"in window||(b="client",a=document.documentElement||document.body),{width:a[b+"Width"],height:a[b+"Height"]}},d=function(){if(a(".navbar").length){var c=a(window),d=a("body"),e=a(".navbar").offset().top,g=0,h=a(".navbar"),i=a(".navbar").outerHeight(),j=0;d.hasClass("admin-bar")&&(j=a("#wpadminbar").outerHeight());var k=function(){if(b().width>992&&h.hasClass("fixed-top")){var f="navbar-fixed-top";h.hasClass("shrinkable")&&!d.hasClass("one-page-layout")&&(f+=" navbar-shrink");var k=e+i;if(c.scrollTop()+j>k){if(h.hasClass("navbar-fixed-top"))return;if(!h.hasClass("navbar-fixed-top"))return g=i,a(".navbar-wrapper").css({"min-height":g+"px"}),h.closest(".noo-header").css({position:"relative"}),void h.addClass(f).css("top",0-g).animate({top:j},300)}else{if(!h.hasClass("navbar-fixed-top"))return;h.removeClass(f),h.css({top:""}),a(".navbar-wrapper").css({"min-height":"none"}),h.closest(".noo-header").css({position:""})}}};c.bind("scroll",k).resize(k),d.hasClass("one-page-layout")&&(a('.navbar-scrollspy > .nav > li > a[href^="#"]').click(function(b){b.preventDefault();var c=a(this).attr("href").replace(/.*(?=#[^\s]+$)/,"");if(c&&a(c).length){var d=Math.max(0,a(c).offset().top);d=Math.max(0,d-(j+a(".navbar").outerHeight())+5),a("html, body").animate({scrollTop:d},{duration:800,easing:"easeInOutCubic",complete:window.reflow})}}),d.scrollspy({target:".navbar-scrollspy",offset:j+a(".navbar").outerHeight()}),a(window).resize(function(){d.scrollspy("refresh")}))}a(".noo-slider-revolution-container .noo-slider-scroll-bottom").click(function(b){b.preventDefault();var c=a(".noo-slider-revolution-container").outerHeight();a("html, body").animate({scrollTop:c},900,"easeInOutExpo")}),a("body").on("mouseenter",".masonry-style-elevated .masonry-portfolio.no-gap .masonry-item",function(){a(this).closest(".masonry-container").find(".masonry-overlay").show(),a(this).addClass("masonry-item-hover")}),a("body").on("mouseleave ",".masonry-style-elevated .masonry-portfolio.no-gap .masonry-item",function(){a(this).closest(".masonry-container").find(".masonry-overlay").hide(),a(this).removeClass("masonry-item-hover")}),a(".masonry").each(function(){var b=a(this),c=a(this).find(".masonry-container"),d=a(this).find(".masonry-filters a");c.isotope({itemSelector:".masonry-item",transitionDuration:"0.8s",masonry:{gutter:0}}),imagesLoaded(b,function(){c.isotope("layout")}),d.click(function(a){a.stopPropagation(),a.preventDefault();var d=jQuery(this);if(d.hasClass("selected"))return!1;b.find(".masonry-result h3").text(d.text());var e=d.closest("ul");e.find(".selected").removeClass("selected"),d.addClass("selected");var f={layoutMode:"masonry",transitionDuration:"0.8s",masonry:{gutter:0}},g=e.attr("data-option-key"),h=d.attr("data-option-value");h="false"===h?!1:h,f[g]=h,c.isotope(f)})}),a(window).scroll(function(){a(this).scrollTop()>500?a(".go-to-top").addClass("on"):a(".go-to-top").removeClass("on")}),a("body").on("click",".go-to-top",function(){return a("html, body").animate({scrollTop:0},800),!1}),a("body").on("click",".search-button",function(){return a(".searchbar").hasClass("hide")&&(a(".searchbar").removeClass("hide").addClass("show"),a(".searchbar #s").focus()),!1}),a("body").on("mousedown",a.proxy(function(b){var c=a(b.target);c.is(".searchbar")||0!==c.parents(".searchbar").length||a(".searchbar").removeClass("show").addClass("hide")},this))};a(document).ready(function(){a(".mc-subscribe-form").submit(function(b){b.preventDefault();var c=a(this),d=c.serializeArray();c.find("label.noo-message").remove(),a.ajax({type:"POST",url:nooL10n.ajax_url,data:d,success:function(b){var d=a.parseJSON(b),e="";d.success?""!==d.data&&(e='<label class="noo-message error" role="alert">'+d.data+"</label>",c.addClass("submited"),c.html(e)):""!==d.data&&(c.removeClass("submited"),a('<label class="noo-message" role="alert">'+d.data+"</label>").prependTo(c))},error:function(a){}})}),a('[data-toggle="tooltip"]').tooltip(),a(".form-control-chosen").chosen({placeholder_text_multiple:nooL10n.chosen_multiple_text,placeholder_text_single:nooL10n.chosen_single_text,no_result_text:nooL10n.chosen_no_result_text}),a(".noo-user-navbar-collapse").on("show.bs.collapse",function(){a(".noo-navbar-collapse").hasClass("in")&&a(".noo-navbar-collapse").collapse("hide")}),a(".noo-navbar-collapse").on("show.bs.collapse",function(){a(".noo-user-navbar-collapse").hasClass("in")&&a(".noo-user-navbar-collapse").collapse("hide")}),d()}),a(document).bind("noo-layout-changed",function(){d()})}(jQuery);