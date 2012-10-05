define(['jQuery', 'Enaza' , 'external/jquery.jcarousel'], function($, Enaza){
	return Enaza.Modules.carousel = (function(pub, $) {
		
		

		var _pluginName =  	'jcarousel'; // Название плагина дял карусели 
		var _options 	= 	{
			element : '#jcarusel_1',
			param   : {
				wrap : 'circular'
			},
			ext     : {
				macControl : {
					element     : '.tynec_style',
					activeClass : 'active'
				},
				autoplay   : {
					time   : 5000,
					scroll : '+=1'
				}
			}
		};

		var priv 	   = {};


		/**
		 * Иницализация карусели 
		 */
		priv.initCarousel = function (settings) {

			$.each(settings, function (key,val) {
					$(val.element).attr('data-index',key);
					$(val.element)[_pluginName](val.param);

					priv.carouselExternal.init(val);
			});
		};

		/**
		 * Дополнительные функций для карусели 
		 * control    - Вперед/Назад
		 * autoplay   - autop lay
		 * macControl - Добавляет переключатели в стиле mac
		 */
		priv.carouselExternal = function () {
				var _jcaruselCurrentElement = 0;
				
				
				return {
					
					init : function (params) {
							if (params.ext) {
									$.each(params.ext,function (key,param) {
											priv.carouselExternal[key](params);
									});
							}
					},

					/**
					 * Добавляет кнопки управления для карусели 
					 * control : {
					 *    next  : 'element',
					 *    prev  : 'element',
					 *    count : count 
					 * }
					 */
					control : function (params) {
							var _carousels  = $(params.element);
							// Если много элементов в селекторе 
							$.each(_carousels,function (key,_carousel) {
									var _carousel  = $(this);

			
									var _next    = params.ext.control.next;
									var _prev    = params.ext.control.prev;

									// Скрыть стрелки если они не нужны
									if ($('.jcarousel-item-visible',_carousel).size() == _carousel.jcarousel('items').size()) {
										// $(_next).hide();
										// $(_prev).hide();
									}


									var _count      = params.ext.control.count;
									var _nextScroll = '+='+ _count;
									var _prevScroll = '-='+ _count;

									$(_next).off('click');
									$(_prev).off('click');

									$(_next).on('click',function (e) {
										e.preventDefault();
										$(_carousel).jcarousel('scroll',_nextScroll);
									 });

									$(_prev).on('click',function (e) {
										e.preventDefault();
										 $(_carousel).jcarousel('scroll',_prevScroll);
									});


							});
					},           

					/**
					 * Автоплей для jcarousel
					 */
					autoplay : function (params) {
							
							var _carousels  = $(params.element);
							// Если много элементов в селекторе 
							$.each(_carousels,function (key,_carousel) {
									var _carousel  = $(this);
									var _target    = _carousel.find('.jcarousel-item-visible');
									var _time      = params.ext.autoplay.time;
									var _scroll    = params.ext.autoplay.scroll;
									
									var _play      = true;  
									
									var _next = function () {
												_carousel.jcarousel('scroll',_scroll);
									};
									
									$(_carousel)
											.mouseenter(function () {
													_play = false;
											})
											.mouseleave(function () {
													_play = true;
											});
									
									if (_carousel.jcarousel('items').size() > 1) {
										setInterval(function ( ){
												if (_play && $(_carousel).is(':visible')) {
													_next();
												}
										},_time);
									}

							});
					},

					/**
					 * Добавляет переключатели в стиле mac
					 * для jcarousel
					 */
					macControl  : function (params) {

						var _carousels  = $(params.element);
						
						// Если много элементов в селекторе 
						$.each(_carousels,function (key,_carousel) {
										
							var _this  = $(this);
							var _count = _this.find('li').size();
							
							var _container      =  $(_this).find(params.ext.macControl.element);
							var _activeClass    =  params.ext.macControl.activeClass;
							
							var _items   = _this.jcarousel('items');
							
							_this.attr('data-indexnum',key);
							_container.html('');
							
							// Добавляем индекс каждому элементу чтоб потом по нему искать
							$.each(_items,function (key,item){
								 var _index = $(item).index();
								 $(item).attr('data-jcarouselindex',_index);
							});
							
							
							
							// Создаем контролы для слайдов               
							for (var i = 0; i < _count; i++) {
							 _container.append(
									$('<a href="#" data-num="'+i+'" />').click(function (e) {
										 var num  = $(this).index();
									
										 $(_this).jcarousel('scroll',_this.find('[data-jcarouselindex='+num+']')[0]);
										 $(this).parent().find('a').removeClass(_activeClass);
										 $(this).addClass(_activeClass);
										 
										 return false;
									})
								);
							} 

							// Выделеям первый элемент
							_container.find('a:first').addClass(_activeClass);
							
							// Меняем контрал при смене вида элемента.
							$(_this).bind('jcarouselscrollend', function(event, carousel, target, animate) {
									var _index = $(_this).jcarousel('target').data('jcarouselindex');
									$( _container).find('a').removeClass(_activeClass);
									$( _container).find('a:eq('+_index+')').addClass(_activeClass);
							});
						
						});
					}
				}
		}();



		pub.name 		= 'carousel'

		pub.options 	= [_options];

		/**
		 * Module was loaded
		 */
		pub.init 		= function(){

		};
		
		/**
		 * DOM is ready
		 */
		pub.domReady	= function(){

			priv.initCarousel(pub.options);

			$(window).on('ajaxUrl.ready', function() {
				setTimeout(function () {
					priv.initCarousel(pub.options)
				},1000);
			});

		};

		return pub;
		
	}(Enaza.Modules.carousel || {}, jQuery));
	
});


	