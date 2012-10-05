define(['jQuery', 'Enaza','modules/preloader/module'], function($, Enaza){

	return Enaza.Modules.Catalog = (function(pub, $) {

		'use strict';
	
		var _options  =	{
			catalog_box : '#catalogContent',  // Каталог с продуктами ,
			preloader   : '#ajaxCatalog_preloader', // контейнер прелодераб
			productsTpl : 'YWpheC9wcm9kdWN0cy50cGw=', // ajax/products.tpl
			after       : function () {},   // Выполнится после удачного запроса 
			before      : function () {},   // Перед отправкой запроса 
			eventStart  : function () {       
					$(window).trigger(pub.name+'.start'); 
					_showPreloading();        
			},
			eventReady  : function () {
					$(window).trigger(pub.name+'.ready'); 
					_hidePreloading();        
			}
		}

		, _preloader = Enaza.Modules.preloader
		, ajaxStatus = false
		, catalogParams = null

		/**
		 * Возвращает гет параметры функций 
		 * @return {object} - переменные  
		 */
		, _getUrlVars = function () {
		    var vars 	= new Object();//[], hash;
		    var hashes 	= window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
		    for(var i = 0; i < hashes.length; i++)
		    {
		        var hash = hashes[i].split('=');
		        vars[hash[0]] = hash[1];
		    }
		    return vars;
		}
		
		// Показать прелоадер
		, _showPreloading = function () {
			var el = $(pub.options.preloader);
			_preloader.show(el,'small',{color:'#000'});
		}
		

		// Скрыть прелоадер 
		, _hidePreloading = function () {
			var el = $(pub.options.preloader);
			_preloader.hide(el);
		}
		
		/**
		* Получить продукты из каталога
		*/
		, _getProduct = function () {
		// переменная с доступом к ИД категории: CAT_ID;
		//spinner.spin(spinner_target); // загрузчик (параметры определены в main.js, останавливается в комплите)
		
			 _isCatalog();
			 var search = $("#searchCatalog").val();

			 if(search)
			 		search = search;

			var getParams = _getUrlVars();  
					
			var param = {
					"interface"   : 'product.get_catalog',
					"method"      : 'ajax',
					"start_price" : 0,
					"stop_price"  : 0,
					"showtpl"     : pub.options.productsTpl,
					"search"      : search
			};
			$.extend(param,catalogParams);
			$.extend(param,getParams);

			if (ajaxStatus == false) {
					ajaxStatus = true ;
					pub.options.eventStart();
					var ajax = Enaza.Core.ajax(param);
					ajax.success(function (data) {
						if(catalogParams.offset >= catalogParams.CAT_counts){
							_unbindScroll();
						}else{
							 if (_isCatalog()) {
								$(data).appendTo(pub.options.catalog_box);
								$('.js_ajaxCatalog_count').html(_countsLoaded());
								pub.options.after(catalogParams);  
							}
						}
						ajaxStatus = false;
						pub.options.eventReady();
					})
					.fail(function (error) {
							console.warn(error);
							ajaxStatus = false ;
					});
			}
		}

		/**
		 *  Привязываем событие к прокрутки контекта 
		 */
		, _bindScroll = function  (){
			if (_isCatalog()) { 
				if(catalogParams.category &&  catalogParams.offset < catalogParams.CAT_counts ){
					$(window).on('scroll', function(){
						if ($(document).height() - $(window).height() <= $(window).scrollTop() + 550) { 
							_getProduct();
						} 
					});
				}
			}
		}
		 
		, _unbindScroll = function () {
			$(window).off('scroll');
		}
		 
		/**
		 *  Количетсов загруженых продуктов 
		 */
		, _countsLoaded = function () {
			var count = -1;
			if (_isCatalog()) {
				catalogParams.offset = catalogParams.offset + catalogParams.COUNT_CARD_IN_CATALOG;
				if(catalogParams.offset >= catalogParams.CAT_counts){
						 count = catalogParams.CAT_counts;
				}else{
						 count = catalogParams.offset;
				} 
			}        
			return count;                      
		 }
			
		/**
		 *  Проверка что страница каталог и в ней есть переменная  ENAZA_ajaxCatalog
		 */
		, _isCatalog  = function () {
		 // if (typeof ENAZA_ajaxCatalog != 'undefined') {
			if ($(pub.options.preloader).size()>0)    {
					catalogParams = ENAZA_ajaxCatalog;
					return true;
			} else {
					return false;
			}
		};

		

		pub.name 		= 'Catalog';
		pub.options 	= _options;

		pub.getProduct  = function () {
			_getProduct();
		};

		pub.init 		= function () {

			$(function () {
				_bindScroll();
			});

			$(window).on('fullAjax.start', function(){
				_unbindScroll();
			});
			
			$(window).on('fullAjax.ready', function(){
				if (_isCatalog()) {
					_bindScroll();   
				}
			});

		};

		pub.domReady 	= function () {
			
		};

			

		return pub;

	}(Enaza.Modules.Catalog  || {}, jQuery));
	
});
