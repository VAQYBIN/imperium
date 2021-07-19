/**
 * desoslide - Take control of your slideshow with this powerful jQuery plugin
 * @version 2.2.0
 * @link https://github.com/sylouuu/desoslide
 * @license MIT
 */
!function(t,e,s,i){"use strict";function o(e,s){this.elem=e,this.options=t.extend(!0,{},n,s),this._defaults=n,this._name=r,this._namespace=r.toLowerCase(),this.props={thumbs:[],effect:{provider:null,name:null,list:{animate:{css:"animated",bounce:{in:"bounceInLeft",out:"bounceOutRight"},fade:{in:"fadeIn",out:"fadeOut"},flipX:{in:"flipInX",out:"flipOutX"},flipY:{in:"flipInY",out:"flipOutY"},fun:{in:"rubberBand",out:"hinge"},light:{in:"lightSpeedIn",out:"lightSpeedOut"},roll:{in:"rollIn",out:"rollOut"},rotate:{in:"rotateIn",out:"rotateOut"},rotateBig:{in:"rotateInDownLeft",out:"rotateOutUpRight"},sideFade:{in:"fadeInLeft",out:"fadeOutRight"},sideFadeBig:{in:"fadeInLeftBig",out:"fadeOutRightBig"},slide:{in:"slideInLeft",out:"slideOutRight"}},magic:{css:"magictime",foolish:{in:"foolishIn",out:"foolishOut"},perspective:{in:"perspectiveLeftRetourn",out:"perspectiveLeft"},puff:{in:"puffIn",out:"puffOut"},swap:{in:"swap",out:"magic"},swash:{in:"swashIn",out:"swashOut"},tin:{in:"tinLeftIn",out:"tinRightOut"},twister:{in:"twisterInDown",out:"holeOut"}}}},img:{$elem:null,$overlay:null,to_show:this.options.first,timer:null},controls:{$wrapper:null},is_transition_supported:!1,plugin_status:null},this._init()}var r="desoSlide",n={thumbs:null,thumbEvent:"click",imageClass:"img-responsive",auto:{load:!0,start:!1},first:0,interval:3e3,effect:{provider:"animate",name:"fade"},overlay:"always",controls:{show:!0,keys:!1},events:{onThumbClick:null,onThumbMouseOver:null,onImageShow:null,onImageShown:null,onImageHide:null,onImageHidden:null,onImageClick:null,onPrev:null,onPause:null,onPlay:null,onNext:null,onError:null,onWarning:null,onSuccess:null}};o.prototype={_init:function(){var e=this;null===this.options.thumbs?this._errorHandler("error","The `thumbs` option doesn't exist."):0===t(this.options.thumbs).length&&this._errorHandler("error","The `thumbs` selector ("+t(this.options.thumbs).selector+") doesn't exist.");-1===["always","hover","none"].indexOf(this.options.overlay)&&(this._errorHandler("error","Incorrect value for the `overlay` option. Default value is used."),this.options.overlay=this._defaults.overlay),t(this.options.thumbs).each((function(s,o){t(o).attr("href")!==i?t(o).find("img").length?(e.props.thumbs.push({src:t(o).attr("href"),alt:t(o).find("img").attr("alt")||null,caption_title:t(o).find("img").data(e._namespace+"-caption-title")||null,caption_link:t(o).find("img").data(e._namespace+"-caption-link")||null}),t(o).find("img").attr("alt")===i&&e._errorHandler("warning","The `alt` attribute is missing on the "+s+"-indexed thumb, it's mandatory on <img> tags."),t(o).attr("data-"+e._namespace+"-index",s)):e._errorHandler("error","Your link on the "+s+"-indexed thumb must have an `<img>` tag as a child."):e._errorHandler("error","The `href` attribute is missing on the "+s+"-indexed thumb, it's mandatory on `<a>` tags.")})),this.options.first>=this.props.thumbs.length&&(this._errorHandler("error","The `first` option must be between 0 and "+(this.props.thumbs.length-1)+". Default value is used."),this.options.first=this._defaults.first,this.props.img.to_show=this._defaults.first),e.props.is_transition_supported=e._supportsTransitions(),e._preloading(),e._wrapper(),!0===e.props.is_transition_supported&&e.setEffect(e.options.effect),this.props.thumbs[this.props.img.to_show]!==i&&e._showImage(),e._events()},rebuild:function(){return this._init(),t(this.elem)},getThumbs:function(t){return t!==i?!0===this._isThumbExists(t)?this.props.thumbs[t]:null:this.props.thumbs},setEffect:function(t){var e={provider:null,name:null};return t!==i&&null!==t.provider&&null!==t.name?this.props.effect.list.hasOwnProperty(t.provider)?"random"===t.name?(e.provider=t.provider,e.name=this._getRandomEffect(t.provider)):this.props.effect.list[t.provider].hasOwnProperty(t.name)?(e.provider=t.provider,e.name=t.name):(e.provider=this._defaults.effect.provider,e.name=this._defaults.effect.name,this._errorHandler("error","Incorrect value for the `effect.name` option. Default value is used.")):"none"===t?e.name="none":(e.provider=this._defaults.effect.provider,e.name=this._defaults.effect.name,this._errorHandler("error","Incorrect value for the `effect.provider` option. Default value is used.")):(e.provider=this._defaults.effect.provider,e.name=this._defaults.effect.name,this._errorHandler("error","Incorrect values for `effect.provider` and `effect.name` option. Default value is used.")),this.props.effect.provider=e.provider,this.props.effect.name=e.name,e},isPlaying:function(){return this.options.auto.start},pause:function(){return t(this.options.thumbs).length>1&&!0===this.options.auto.start&&this.props.img.timer&&(this.options.auto.start=!1,this._stopAnimation(),clearTimeout(this.props.img.timer),this.props.controls.$wrapper&&this.props.controls.$wrapper.find('a[href="#pause"]').hide().parent().find('a[href="#play"]').show(),this._triggerEvent("pause")),t(this.elem)},play:function(){return t(this.options.thumbs).length>1&&(!1===this.options.auto.start&&(this.options.auto.start=!0,this.goNext(!0),this.props.controls.$wrapper&&this.props.controls.$wrapper.find('a[href="#play"]').hide().parent().find('a[href="#pause"]').show()),this._triggerEvent("play")),t(this.elem)},goPrev:function(e){if(t(this.options.thumbs).length>1){var s=this;e||!0!==this.options.auto.start||this.pause(),this._hideOverlay(),this.props.img.to_show--,this.props.img.to_show<0&&(this.props.img.to_show=t(this.options.thumbs).length-1),this._hideImage((function(){s._showImage()})),this._triggerEvent("prev")}return t(this.elem)},goNext:function(e){if(t(this.options.thumbs).length>1){var s=this;e||!0!==this.options.auto.start||this.pause(),this._hideOverlay(),this.props.img.to_show++,this.props.img.to_show>=t(this.options.thumbs).length&&(this.props.img.to_show=0),this._hideImage((function(){s._showImage()})),this._triggerEvent("next")}return t(this.elem)},goTo:function(e){if(t(this.options.thumbs).length>1&&!0===this._isThumbExists(e)){var s=this;!0===this.options.auto.start&&this.pause(),e!==this.props.img.to_show&&(this._stopAnimation(),this._hideOverlay(),s.props.img.to_show=e,this._hideImage((function(){s._showImage()})))}return t(this.elem)},_supportsTransitions:function(){var t=(s.body||s.documentElement).style,e="transition",i=["Moz","webkit","Webkit","Khtml","O","ms"],o=0;if("string"==typeof t[e])return!0;for(e=e.charAt(0).toUpperCase()+e.substr(1);o<i.length;o++)if("string"==typeof t[i[o]+e])return!0;return!1},_isThumbExists:function(t){var e;return"number"==typeof t&&(this.props.thumbs[t]!==i?e=!0:(this._errorHandler("error","The "+t+"-indexed thumb doesn't exist."),e=!1)),e},_preloading:function(){!0===this.options.auto.load&&t.each(this.props.thumbs,(function(e,s){t("<img>",{src:s.src,alt:s.alt}).hide().appendTo("body")}))},_wrapper:function(){var e=t("<img>").attr("alt",this._name).addClass(this.options.imageClass);t(this.elem).html(e).wrapInner(t("<div>",{class:this._namespace+"-wrapper"})),this.props.img.$elem=t(this.elem).find("img:first")},_clearEffectClass:function(){var t,e,s=this;if(this.props.img.$elem.attr("class")!==i){var o=this.props.img.$elem.attr("class").split(/\s+/);for(t in s.props.effect.list)if(s.props.effect.list.hasOwnProperty(t))for(e in s.props.effect.list[t])s.props.effect.list[t].hasOwnProperty(e)&&(-1!==o.indexOf(s.props.effect.list[t][e])&&this.props.img.$elem.removeClass(s.props.effect.list[t][e]),s.props.effect.list[t][e].in&&-1!==o.indexOf(s.props.effect.list[t][e].in)&&this.props.img.$elem.removeClass(s.props.effect.list[t][e].in),s.props.effect.list[t][e].out&&-1!==o.indexOf(s.props.effect.list[t][e].out)&&this.props.img.$elem.removeClass(s.props.effect.list[t][e].out))}},_getRandomEffect:function(t){var e,s,i=0;for(s in this.props.effect.list[t])this.props.effect.list[t].hasOwnProperty(s)&&"css"!==s&&Math.random()<1/++i&&(e=s);return e},_hasEffect:function(){return null!==this.props.effect.provider||"none"!==this.props.effect.name},_showImage:function(){var e=this;null===this.props.plugin_status&&this._errorHandler(),this._triggerEvent("imageShow"),this.props.img.$elem.attr("src",this.props.thumbs[this.props.img.to_show].src).attr("alt",this.props.thumbs[this.props.img.to_show].alt).one("load",(function(){!1===e._hasEffect()?(t(this).css("opacity",1),e._overlay(),e._triggerEvent("imageShown")):!0===e.props.is_transition_supported?t(this).removeClass(e.props.effect.list[e.props.effect.provider].css+" "+e.props.effect.list[e.props.effect.provider][e.props.effect.name].out).addClass(e.props.effect.list[e.props.effect.provider].css+" "+e.props.effect.list[e.props.effect.provider][e.props.effect.name].in).one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",(function(){e._overlay(),e._triggerEvent("imageShown")})):t(this).css("opacity",0).animate({opacity:1},1e3,(function(){e._overlay(),e._triggerEvent("imageShown")})),!0===e.options.auto.start&&(e.props.img.timer=setTimeout((function(){e.goNext(!0)}),e.options.interval<1500?1500:e.options.interval))}))},_hideImage:function(t){var e=this;this._triggerEvent("imageHide"),!1===this._hasEffect()?(this.props.img.$elem.css("opacity",0),e._triggerEvent("imageHidden"),t&&t()):!0===e.props.is_transition_supported?(this._clearEffectClass(),this.props.img.$elem.removeClass(this.props.effect.list[this.props.effect.provider].css+" "+this.props.effect.list[this.props.effect.provider][this.props.effect.name].in).addClass(this.props.effect.list[this.props.effect.provider].css+" "+this.props.effect.list[this.props.effect.provider][this.props.effect.name].out).one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",(function(){e._triggerEvent("imageHidden"),t&&t()}))):this.props.img.$elem.animate({opacity:0},1e3,(function(){e._triggerEvent("imageHidden"),t&&t()}))},_overlay:function(){var e,s,i,o,r,n,a,p,h,l,f;"none"!==this.options.overlay&&(e=this.props.img.$elem.position(),o=parseInt(this.props.img.$elem.css("border-left-width"),10),r=this.props.img.$elem.width()+2*o,n=this.props.img.$elem.height(),0===t(this.elem).find("."+this._namespace+"-overlay").length&&t("<div>",{class:this._namespace+"-overlay"}).appendTo(t(this.elem).find("."+this._namespace+"-wrapper")),this.props.img.$overlay=t(this.elem).find("."+this._namespace+"-overlay"),a=parseInt(this.props.img.$overlay.css("padding-top"),10),p=parseInt(this.props.img.$overlay.css("padding-bottom"),10),h=parseInt(this.props.img.$overlay.css("padding-left"),10),l=parseInt(this.props.img.$overlay.css("padding-right"),10),f=parseInt(this.props.img.$overlay.css("height"),10)-(h+l),f=parseInt(n,10)-f-(a+p),s=e.top+f+2*o,i=e.left,this.props.img.$overlay.css({left:i+"px",top:s+"px",width:r+"px",borderBottomLeftRadius:this.props.img.$elem.css("border-radius"),borderBottomRightRadius:this.props.img.$elem.css("border-radius")}),"always"===this.options.overlay&&this.props.img.$overlay.animate({opacity:.7},!0===this._hasEffect()?500:0),this._caption(),!0===this.options.controls.show&&this.props.thumbs.length>1&&this._controls())},_hideOverlay:function(){null!==this.props.img.$overlay&&this.props.img.$overlay.animate({opacity:0},!0===this._hasEffect()?500:0)},_controls:function(){var e,s,i,o,r;t(this.elem).find("."+this._namespace+"-controls-wrapper").remove(),e='<a class="'+this._namespace+'-controls prev" href="#prev"></a>',s='<a class="'+this._namespace+'-controls pause" href="#pause"></a>',i='<a class="'+this._namespace+'-controls play" href="#play"></a>',o='<a class="'+this._namespace+'-controls next" href="#next"></a>',r=t("<div>",{class:this._namespace+"-controls-wrapper"}).append(e+s+i+o),this.props.img.$overlay.find("a:first").length>0?r.appendTo(this.props.img.$overlay.find("a:first")):r.appendTo(this.props.img.$overlay),this.props.controls.$wrapper=t(this.elem).find("."+this._namespace+"-controls-wrapper"),this.props.controls.$wrapper.length&&(!0===this.options.auto.start?this.props.controls.$wrapper.find('a[href="#play"]').hide().parent().find('a[href="#pause"]').show():this.props.controls.$wrapper.find('a[href="#pause"]').hide().parent().find('a[href="#play"]').show())},_caption:function(){var e,s,i,o,r,n;null!==this.props.thumbs[this.props.img.to_show].caption_title&&(this.props.img.$overlay.html('<span class="'+this._namespace+'-caption-title">'+this.props.thumbs[this.props.img.to_show].caption_title+"</span>"),s=this.props.img.$overlay.find("a:first").length>0,i=null!==this.props.thumbs[this.props.img.to_show].caption_link,e='<a href="'+this.props.thumbs[this.props.img.to_show].caption_link+'" target="_blank"></a>',!0===s&&!0===i?this.props.img.$overlay.find("a:first").attr("href",this.props.thumbs[this.props.img.to_show].caption_link):!0===s&&!1===i?(r=(o=this.props.img.$overlay.find("a:first")).children().clone(),n=o.parent(),o.remove(),r.appendTo(n),this.props.img.$overlay.find("span:first").empty()):!1===s&&!0===i&&t(this.elem).find("."+this._namespace+"-overlay span:first").wrap(e))},_stopAnimation:function(){t(this.elem).stop()},_triggerEvent:function(e){t(this.elem).triggerHandler(e+"."+this._namespace);var s=e.charAt(0).toUpperCase()+e.slice(1);this.options.events["on"+s]&&this.options.events["on"+s](this.props.img.$elem)},_events:function(){var i=this;-1!==["click","mouseover"].indexOf(this.options.thumbEvent)&&(t(this.options.thumbs).on("click",(function(e){e.preventDefault(),"click"===i.options.thumbEvent&&(i.goTo(t(this).data(i._namespace+"-index")),i._triggerEvent("thumbClick"))})),t(this.options.thumbs).on("mouseover",(function(e){e.preventDefault(),"mouseover"===i.options.thumbEvent&&(i.goTo(t(this).data(i._namespace+"-index")),i._triggerEvent("thumbMouseOver"))}))),this.props.img.$elem.on("click",(function(t){t.preventDefault(),i._triggerEvent("imageClick")})),t(this.elem).on("click","."+this._namespace+"-controls-wrapper a",t(this.elem),(function(e){switch(e.preventDefault(),t(this).attr("href")){case"#prev":i.goPrev();break;case"#pause":i.pause();break;case"#play":i.play();break;case"#next":i.goNext()}})),t(this.elem).find("."+this._namespace+"-wrapper").on({mouseover:function(){"hover"===i.options.overlay&&null!==i.props.img.$overlay&&i.props.img.$overlay.stop().animate({opacity:.7},400)},mouseleave:function(){"hover"===i.options.overlay&&null!==i.props.img.$overlay&&i.props.img.$overlay.stop().animate({opacity:0},400)}}),!0===this.options.controls.keys&&t(s).on("keydown",(function(t){switch(t.which){case 37:i.goPrev();break;case 39:i.goNext();break;case 32:t.preventDefault(),!0===i.options.auto.start?i.pause():i.play()}}));var o=function(){var t=0;return function(e,s){clearTimeout(t),t=setTimeout(e,s)}}();"none"!==this.options.overlay&&t(e).bind("resize",(function(){o((function(){i._overlay()}),100)}))},_errorHandler:function(t,e){switch(t){case"error":console!==i&&console.error(this._name+": "+e+" Check out the documentation."),this._triggerEvent("error"),this.props.plugin_status=t;break;case"warning":console!==i&&console.warn(this._name+": "+e),this._triggerEvent("warning"),this.props.plugin_status=t;break;default:this._triggerEvent("success"),this.props.plugin_status=t}}},t.fn[r]=function(e){var s,n,a=arguments;return e===i||"object"==typeof e?n=this.each((function(){t.data(this,"plugin_"+r)||t.data(this,"plugin_"+r,new o(this,e))})):"string"==typeof e&&"_"!==e[0]?(s=t.data(this[0],"plugin_"+r))[e]!==i&&(n=s[e].apply(s,Array.prototype.slice.call(a,1))):n=this.each((function(){(s=t.data(this,"plugin_"+r))instanceof o&&"function"==typeof s[e]&&s[e].apply(s,Array.prototype.slice.call(a,1))})),n}}(jQuery,window,document),$(window).scroll((function(){$(this).scrollTop()>1?($(".header").addClass("sticky"),$(".svg").attr({fill:"#000",stroke:"#000"})):($(".header").removeClass("sticky"),$(".svg").attr({fill:"#fff",stroke:"#fff"}))})),$(".header__menu-input").on("focusin",(function(){$(this).attr("placeholder","Здесь ищут это...")})),$(".header__menu-input").on("focusout",(function(){$(this).attr("placeholder","Search")})),$(".info__slidershow").html('<p class="info__slidershow-text"></p>'),$(document).ready((function(){$(".slider__inner").slick({dots:!0,infinity:!0,slidesToShow:1,fade:!0,cssEase:"ease-in-out",draggable:!1,autoplay:!0,autoplaySpeed:7e3,arrows:!1,adaptiveHeight:!1,customPaging:function(t,e){var s=$(t.$slides[e]).data("title");return'<span class="slick__dots-item"><h3 class="slick__dots-number">0'+Number(e+1)+".</h3><span>"+s+"</span></span>"}}),$(".info__slidershow").desoSlide({thumbs:$("ul.info__slider-thumbnails li > a"),effect:{provider:"animate",name:"fade"},overlay:"none",auto:{start:!0},interval:6e3})}));