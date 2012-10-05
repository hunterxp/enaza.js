/**
 * Переключение между витринами 
 * @author Churakov Andrey (churakov@enaza.ru)
 * 
 */

define(['jQuery', 'Enaza', 'models/topsales.model'], function($, Enaza){

	return Enaza.Modules.shopwindow = (function(pub, $) {

		"use strict";

		var _options 	= {
			handlers : {
				getShopwindow : {
					handler : '.js_getShopwindow',
					event 	: 'click',
					tpl 	: 'YWpheC9zaG9wd2luZG93L2FqYXhfc3cudHBs' // ajax/shopwindow/ajax_sw.tpl
				}
			}
		}
		, _mTopsales 	=  Enaza.Models.Topsales
		, _cache	 	=  {}

		/**
		 * Делает запрос для загрузки витрины
		 * @param  {string} sysname Название витрины в панеле 
		 * @return {[type]}         [description]
		 */
		, _laodProduct = function (sysname,tpl) {
			var sw = _mTopsales.getShopwindow(sysname, tpl, 1)
				.success(function (data) {
					_setCache(sysname,data);
				});
			return sw;
		}

		/**
		 * Получить витрину
		 * @param  {string} sysname названеи витрины
		 * @return {object}         витрина
		 */
		, _getShopwindow  = function (sysname,tpl) {
			if (_cache.hasOwnProperty(sysname)) {
				return  _getCache(sysname);
			} else {
				return  _laodProduct(sysname,tpl);
			}
		}

		/**
		 * Сохраняем запрос витрины
		 * @param  {string} name название витриный sysname
		 * @param  {object} data данные
		 */
		, _setCache   = function (name,data) {
			_cache[name] = data;
		}

		/**
		 * Возвращает кеш витрины
		 * @param  {string} name название витриный sysname
		 * @return {object}      витрина
		 */
		, _getCache   = function (name) {
			return _cache[name] || false;
		}

		, _parseContainerName = function (name) {
			return name.replace(/[#.\s]/g, '');
		}


		// Название скрипта 
		pub.name	 = "shopwindow";
		pub.options  = _options;


		/**
		 * Генерация событий при обновлений витрины
		 * @param  {string} containerName Селектор контейнера витриный
		 */
		pub.eventStart 	= function(containerName) {
			$(window).trigger( pub.name + '.' + _parseContainerName(containerName) +'.start');
		};
		pub.eventStop	= function(containerName) {
			$(window).trigger( pub.name + '.' + _parseContainerName(containerName) +'.stop');
		};

		/**
		 * Генирация названия события сменфы витрины по названию контейнера 
		 * @param  {string} containerName Селектор контейнера витриный
		 * @return {string}               названеи события 
		 */
		pub.onEventStart 	= function (containerName,callback) {
			$(window).on(pub.name + '.' + _parseContainerName(containerName) +'.start',callback);
		};

		pub.onEventStop 	= function (containerName,callback) {
			$(window).on(pub.name + '.' + _parseContainerName(containerName) +'.stop',callback);
		};

		/**
		 * Действие на элементе вызывающим смену витрины 
		 * @param  {string} name  название витрины для js 
		 * @param  {object} param содержит параметры необходимые для загрузки витрины
		 */
		pub.makeShopwindow	= function (name,param) {
			$(document).on(param.event, param.handler, function  (e) {
				e.preventDefault();
				var data  = $(this).data();
				pub.showProduct(data.swName,data.swTo,param.tpl);
			});
		};

		/**
		 * Получает витрину и отправляет ее для отображения
		 * @param  {string} sysname   название витрины
		 * @param  {string} container селектор контейнера для втсавки витрины
		 */
		pub.showProduct = function (sysname,container,tpl) {

			pub.eventStart(container);
			$.when(_getShopwindow(sysname,tpl))
			 .then(function (data) {
			 	pub.successLoadProduct(data,container);
			});

		};

		/**
		 * Вставляет данные в указанный контейнер 
		 * @param  {object} data   название витрины
		 * @param  {string} container селектор контейнера для втсавки витрины
		 */
		pub.successLoadProduct = function (data,container) {
			$(container).html(data.html);
			pub.eventStop(container);
		};

		/**
		 * Module was loade
		 */
		pub.init 		= function() {

			// Дополнительный дом реди чтоб оставить базовый читстым для расширейний сайтов 
			$(function () {
				var handlers = pub.options.handlers;
				$.each(handlers, function (key,value) {
					pub.makeShopwindow(key,value);
				});
			});

		};

		/**
		 * DOM is ready
		 */
		pub.domReady	= function() {



		};



		return pub;

	}(Enaza.Modules.shopwindow  || {}, jQuery));
	
});
