define([
		'jQuery',
		'Enaza',
		'modules/shopwindow/module',
		'external/jquery-ui.min',
		'external/jquery.mousewheel.min',
		'external/jquery.ui.coulisse.min',
		'external/jQuery.ui.coulisseWrapper',
		'external/lds.coulisse'
	], function($, Enaza, module){

	return Enaza.Modules.shopwindow = (function(pub, $) {
		
		/**
		 * Создает скроулинг для витрин на еназе
		 * @param  {selector} scrollpane 
		 * @param  {selector} scroller   
		 * @param  {selector} items      
		 */
		var _scrollbar_slider = function (scrollpane, scroller, items) {
			
			var pane_width = 0;
			var steps = items.length - 1;
			var viewport = $(scrollpane).parent().outerWidth();

			$(items).each(function(i, item){
				pane_width += $(item).outerWidth(true);
				if(i == steps){
					$(scrollpane).width(pane_width);
				}
			});

			$(scroller).slider( "destroy" );
			if (pane_width > viewport) {
				
				$(scroller).slider({ 
					value: 0,
					min: 0,
					max: 100,
					step: 1,
					slide: function (event, ui) {
						$(scrollpane).css('margin-left', -(((pane_width - viewport)/100) * ui.value) + 'px');
					}
				});
			};

			$(scrollpane).bind('mousewheel', function (e, delta){
				
				e.preventDefault();
				var value = $(scroller).slider('option', 'value');
				
				if(delta > 0){
					value += 5;
				} else if(delta < 0){
					value -= 5;
				}

				value = Math.max(0, Math.min(100, value));
				$(scroller).slider('option', 'value', value);
				$(scrollpane).css('margin-left', -(((pane_width - viewport)/100) * value) + 'px');
			});
		}

		, _initCoverflow 	  = function () {
			console.log('init')
			var   coverflow = $('.promo .coverflow')
				, previos 	= $('.promo .previos')
				, next 		= $('.promo .next')
				, scrollbar = $('.promo .scrollbar .scrollbar-inner')

				, images_data = {
				    "albums": [
				        {
				            "title": "Thom Yorke — Eraser 0",
				            "cover": "http://lorempixel.com/200/200/sports/1",
				            "link": "#1"
				        },
				        {
				            "title": "Thom Yorke — Eraser 1",
				            "cover": "http://lorempixel.com/200/200/sports/2",
				            "link": "#2"
				        },
				        {
				            "title": "Thom Yorke — Eraser 2",
				            "cover": "http://lorempixel.com/200/200/sports/3",
				            "link": "#3"
				        },
				        				        {
				            "title": "Thom Yorke — Eraser 0",
				            "cover": "http://lorempixel.com/200/200/sports/4",
				            "link": "#1"
				        },
				        {
				            "title": "Thom Yorke — Eraser 1",
				            "cover": "http://lorempixel.com/200/200/sports/5",
				            "link": "#2"
				        },
				        {
				            "title": "Thom Yorke — Eraser 2",
				            "cover": "http://lorempixel.com/200/200/sports/6",
				            "link": "#3"
				        },
				        				        {
				            "title": "Thom Yorke — Eraser 2",
				            "cover": "http://lorempixel.com/200/200/sports/7",
				            "link": "#3"
				        }
				    ]
				}

				, images_count 		= images_data.albums.length - 1
				, initial_index 	= Math.round(images_count / 2)
				, current_index		= initial_index;


				
				var _coulisse = $(coverflow).coulisse({
					index 			: initial_index,
					images 			: images_data.albums,
					activeSize		: 280,
					inactiveSize	: 200,
					area			: 0.5,
					imageSrcGetter	: 'cover',
					linkHrefGetter	: 'link',
					indexChanging	: function (e, arg) {
						current_index = arg.index;
						$(scrollbar).slider('option', 'value', arg.index);
						// album_title.text(images_data.albums[arg.index].title);
					}
				});

				$(scrollbar).slider({
					value: 0,
					min: 0,
					max: images_count,
					step: 1,
					slide: function (event, ui) {
						$(coverflow).coulisse('option', 'index', ui.value);
					}
				});


				$(previos).click(function(e){
					e.preventDefault();
					if(current_index > 0){
						$(coverflow).coulisse('option', 'index', current_index - 1);
					}
				});

				$(next).click(function(e){
					e.preventDefault();
					if(current_index < images_count){
						$(coverflow).coulisse('option', 'index', current_index + 1);
					}
				});



 				var mousewheelTimeoutHandle = null;
 				var mousewheelIndex 		= null;

 				$(coverflow).bind('mousewheel', function (event, delta) {
 					console.log('da');

 					window.clearTimeout(mousewheelTimeoutHandle);

					if (mousewheelIndex === null) {
						mousewheelIndex = $coulisse.coulisse('option', 'index');
					}

					mousewheelIndex += delta;
					mousewheelIndex = Math.min(myImages.length - 1, mousewheelIndex);
					mousewheelIndex = Math.max(0, mousewheelIndex);

					$(coverflow).coulisse('option', 'index', Math.round(mousewheelIndex));

					mousewheelTimeoutHandle = window.setTimeout(function () {
						mousewheelIndex = null; 
					}, 300);

					return false; 
 				});

		}




		pub.options = {
			handlers : {
				getShopwindow : {
					handler : '.js_getShopwindow',
					event 	: 'click',
					tpl 	: 'YWpheC9zaG9wd2luZG93L2FqYXhfc3cudHBs' // ajax/shopwindow/ajax_sw.tpl
				}
			}
		};

		pub.makeShopwindow	= function (name,param) {
			$(document).on(param.event, param.handler, function  (e) {
				e.preventDefault();
				var data  = $(this).data();

				$(param.handler).parent().removeClass('active');
				$(this).parent().addClass('active');

				pub.showProduct(data.swName,data.swTo,param.tpl);
			});
		};

		pub.initScroll 		= function () {
			$('.clips .tab-pane').each(function(i, el){
				_scrollbar_slider(
					$('.scrollable-inner', el),
					$('.scrollbar-inner', el),
					$('.scrollable-inner figure', el)
				);
			});
		};



		pub.domReady = function () {

			$(window).on('fullAjax.ready',function () {

				pub.initScroll();
				if ($('.promo .coverflow').size() > 0) {
					_initCoverflow();
				}
			});


			if ($('.promo .coverflow').size() > 0) {
				_initCoverflow();
			}
			pub.initScroll();

			pub.onEventStop('recommend_video_list', function () {
				pub.initScroll();
			});

		};



		return pub;
		
	}(Enaza.Modules.shopwindow || {}, jQuery));
	
});