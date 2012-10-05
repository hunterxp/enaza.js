/**
 * @author Churakov Andrey (churakov@enaza.ru)
 * Генерация прелодера  http://fgnass.github.com/spin.js/
 */

define(['jQuery', 'Enaza', 'external/jquery.spinner.min.v1.2.6'], function($, Enaza){

	return Enaza.Modules.preloader = (function(pub, $) {

		"use strict";

		// Параметры по умолчанию 
		var _options = {
			lines: 13, // The number of lines to draw
			length: 7, // The length of each line
			width: 4, // The line thickness
			radius: 10, // The radius of the inner circle
			corners: 1, // Corner roundness (0..1)
			rotate: 0, // The rotation offset
			color: '#f1f1f1', // #rgb or #rrggbb
			speed: 1, // Rounds per second
			trail: 60, // Afterglow percentage
			shadow: false, // Whether to render a shadow
			hwaccel: false, // Whether to use hardware acceleration
			className: 'spinner', // The CSS class to assign to the spinner
			zIndex: 2e9, // The z-index (defaults to 2000000000)
			top: 'auto', // Top position relative to parent in px
			left: 'auto', // Left position relative to parent in px,
			 background : 'rgba(30,30,30,0.6)'
		}


		// Значения для быстрого формирования картинок смотри pub.default
		, _default = {
			"tiny"	: { lines: 7, length: 0, width: 4, radius: 4 },
			"small" : { lines: 9, length: 0, width: 5, radius: 9 , color: '#333'},
			"large" : { lines: 17, length: 0, width: 8, radius: 28, background : 'rgba(30,30,30,0.6)' }
		}


		/**
		 * Создаем контейнер для прелоадера 
		 * @param style - стили для создаваймого элемента
		 * @return 	- элемент
		 */
		, _createElement = function (style) {
			var defautlStyle = {
					class : 'enaza-preloader',
					css : {
						position  : 'absolute',
						'z-index' : '1000000000',
						top  	  : '0px',
						left 	  : '0px',
						right	  : '0px',
						bottom	  : '0px',
					}
			}

			return $('<div></div>',$.extend(true,{}, defautlStyle, style));
		}

		// Добавляем плагин в jQuery 
		, _createPlugin = function () {
			(function($) {
			$.fn.spin = function(opts) {
				if (Spinner) {
				  this.each(function() {
				    var $this = $(this),
				        data = $this.data();

				    if (data.spinner) {
				      data.spinner.stop();
				      delete data.spinner;
				    }

				    if (opts !== false) {
				      data.spinner = new Spinner( $.extend(_options, opts) ).spin(this);
				    }

				  });
				  return this;
				} else {
					console.log('error');
				}
			};
			})(jQuery);
		}

		/**
		 * Добавляет прелоадер
		 * @param {element} el    Элемент в котором будет показыватся прелоадер
		 * @param {object}  opts  Параметры для запуска спинера 
		 * @param {object}  style параметры создаваймого элемента для перекрытия сайта 
		 */
		, _addPreloader = function (el,opts,style) {
			var style 		= style || {};

			if (typeof opts === "string") {
				if (opts in pub.default) {
					opts = _default[opts];
				}
			}



			$(el).each(function (key,val) {
				var _element 	= _createElement(style);
				if ('background' in opts) {
					_element.css({
						background : opts.background
					});
				}
				
				$(_element).appendTo($(val)).spin(opts);	
			});

			
		}

		/**
		 * Удаляет прелоадер
		 * @param  {element} el Элменмент из которго удаляем прелоадер 
		 * @return {element}
		 */
		, _removePreloader = function (el) {
			$(el).find('.enaza-preloader').remove();
		};


		pub.name 		= 'preloader';
		pub.default 	= _default;

		/**
		 * Показать прелоадер
		 * @param {element} el   Элемент в котором будет показыватся прелоадер
		 * @param {object} opts  Параметры для запуска спинера 
		 * @param {object} style параметры создаваймого элемента для перекрытия сайта 
		 */
		pub.show 		= function (el,opts,style) {
			_addPreloader(el,opts,style);
		};

		/**
		 * Скрыть прелоаде
		 * @param  {element} 
		 */
		pub.hide 		= function (el) {
			_removePreloader(el);
		};

		/**
		 * Module was loade
		 */
		pub.init 		= function(){
			
		};
		
		/**
		 * DOM is ready
		 */
		pub.domReady	= function(){

			_createPlugin();

			$(window).bind('fullAjax.start',function (e) {
				pub.show('#ajax_container','large',{css : { position : 'fixed' }});
			});

			$(window).bind('fullAjax.ready',function (e) {
				pub.hide('#ajax_container');
			});
 			
		};



		return pub;

	}(Enaza.Modules.preloader || {}, jQuery));
	
});