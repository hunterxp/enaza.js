/**
 * Модель бля работы с интерфейсом topsales Витрины
 */

define(['jQuery', 'Enaza'], function($, Enaza){
	
	return Enaza.Models.Topsales = (function(pub, $) {

		var _ajax 		= Enaza.Core.ajax

		, _options		= {
			url 	: "/",
			type	: "POST",
			dataType: 'json'
		}

		, _data 		= {
			"interface" : 'topsales.ajax_sw',
			"method"	: 'ajax'
		};



		pub.name 			= "Topsales";
		
		/**
		 * Получить витрину 
		 * @param  {string}  sysname  название витрины в панели управления 
		 * @param  {string}  show_tpl Шаблона витрины в base64
		 * @param  {number}  is_group Находится витрина в групе или нет 0|1
		 * @return {ajax}           
		 */
		pub.getShopwindow	= function(sysname, show_tpl, is_group) {   
		
			return _ajax($.extend(_data,{
				'sysname'   : sysname,
				'show_tpl'  : show_tpl,
				'is_group'  : is_group
			}),
			_options);
		};


		
		return pub;
		
	}(Enaza.Models.Topsales || {}, jQuery));

});