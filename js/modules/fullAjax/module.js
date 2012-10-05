define(['jQuery', 'Enaza', 'external/jquery.history'], function($, Enaza){
	
	return Enaza.Modules.fullAjax  = (function(pub, $) {
		
		var _options = {
			element : ".js_url",
			event   : 'click',
			params 	: {
				url: function (el) {
					return $(el).attr('href');
				},
				container   : '#ajax_container',
				after   	: function () {}, 
				before   	: function () {}, 
				preloader 	: false,
				scrollToTop	: false,
				title 		: ""
			},
		};

		var _isIE 			= $.browser.msie; // Проверка является ли браузер ие
		var _ajax 			= Enaza.Core.ajax; // аякс запрос 
		var _obj_trigger 	= []; // Масив созданных ajax обьектов
		var _debug 			= false;

		var priv			= {}; // Приватные методы модуля


		/**
		* Класс для работы с fullAjax
		* @constructor
		* @param {object} data - параметры для инициализаций  перехода
		*/
		var _ajaxUrl = function (data) {
			this.container   = data.container;
			this.url         = data.url;
			this.after       = data.after;
			this.before      = data.before;
			this.preloader   = data.preloader;
			this.title       = data.title;
			this.scrollToTop = data.scrollToTop; 
			this.data        = null;
			this.eventStart  = function () {
				$(window).trigger(pub.name + '.start', data);
			};
			
			this.eventReady  = function () {             
				$(window).trigger(pub.name + '.ready', {}); 
			};
		};
	
		/**
		* Смена url в адресной строке
		* @param url - Адрес на который переходим
		* @param num  - ид ajax обьекта  
		* @return this
		*/
		_ajaxUrl.prototype.browserUrl = function(url,num) {

		  if(!_isIE){
			History.pushState({count:num}, siteParams.title, url);
		  }
		  else{
			History.pushState({count:num}, siteParams.title, '!'+url);
		  }

		  return this;
		}; 
	
		/**
		* Скрыть прелоадер
		* @return this
		*/   
		_ajaxUrl.prototype.scrollTop = function () {
			if (this.scrollToTop) {
				$(window).scrollTop(0);
			}
			return this;
		};   
	   
		/**
		* Задать другой контейнер для обьекта 
		* @param {selector} container - Новый контейнер для результата ajax запроса
		* @return this
		*/   
		_ajaxUrl.prototype.setContainer = function (container) {
		  this.container = container;
		  return this;
		};   
	   
		/**
		* Записать данные переданые в ссылке 
		* @param  data {object} - Данные переданые в ссылке
		* @return this
		*/  
		_ajaxUrl.prototype.setData = function (data) {
		  this.data = data;
		  return this;
		}
		
		/**
		* Отправить запрос на получения контента страници 
		* @param  url - адрес страници которую нужно открыть черз ajax
		* @return this
		*/  
		_ajaxUrl.prototype.getUrl = function (url) {
		  var data    = {'is_ajax':true}; 
		  var _self   = this;

		  _self.eventStart();
		  _self.before();

		  if(!_isIE){
			url = url.replace('!/','');
		  }

		  var ajax = _ajax(data,{url: url, type: 'GET'});
		  

		  ajax.success(function (result) {
			_self.success(result);
			_self.eventReady();
		  });
		  ajax.fail(function (error) {
			_self.after();
			_self.eventReady();
			window.location.href = url;
		  });

		  return this;
		};
	   
	   /**
		* Метод установления тайтла страницы
		* @return this
		*/  
		_ajaxUrl.prototype.setTitle = function () {
		  this.title = siteParams.title;
		  document.title = this.title;

		  return this;
		};
	   
		/**
		* Удачный ответ от сервера
		* @param  result - ресультат ответа 
		* @return this
		*/  
		_ajaxUrl.prototype.success = function (result) {
			$(this.container).empty();
			$(this.container).html(result);
			this.after();
			this.scrollTop();
			this.setTitle();

			return this;
		};

		/**
		 * Функция обрабатывает входящий параметр url и возвразщает строку урла для AJAX запроса 
		 * @param el - переданныи элемент 
		 * @param settings - настройки ajax перехода
		 * @return  string  - url для запроса 
		 **/ 
		_ajaxUrl.prototype.getHref = function (el) {
		  var result;
		  var _self = this;
		 
		  if (typeof this.url == 'function' ) {
		    result = this.url(el);
		  } else {
		    result = this.url;
		  }

		  return result;
		};



		// Возвращает первый обьект ajaxUrl 
		priv.globalAjaxUrl = function () {
      	  return _obj_trigger[0]; 
    	};


		/**
		 * Отслеживаем смену урла 
		 */
		priv.bindChangeUrl = function () {
			History.Adapter.bind(window, 'statechange', function() {

			  var State = History.getState();
			  var url =  encodeURI(State.url);
	
			  // условие для кнопки назад
			  if(_obj_trigger[State.data.count] != 'undefined' && typeof State.data.count  != 'undefined') {
				_obj_trigger[State.data.count].getUrl(url);
			  } else {
			  	priv.globalAjaxUrl().getUrl(url);
			  }

			});
		};

		/**
		 * Статистика перехода по ветринам 
		 */
		priv.statisticUrl  = function (el) {
			var url = el.data('href') || false;
			var data    = {'is_ajax':true}; 
			if (url) {
				console.log(url)
				_ajax(data,{url: url, type: 'GET'});
			}
		};

		/**
		 * Небольшой дебаг работы функций 
		 */
		priv.debug = function () {
			if (_debug) {

				$(window).on(pub.name + '.start',function () {
					console.info('DEBUG ', pub.name,' : ' , 'event start');
				});


				$(window).on(pub.name + '.ready',function () {
					console.info('DEBUG ', pub.name,' : ' , 'event ready');
				});

			}
		};

		/**
		 * PUBLIC 
		 */
		pub.name 		= "fullAjax";
		
		/**
		 * Параметры запуска 
		 */
		pub.options 	=  [_options];

		/**
		 * Создает событие клика по элементу 
		 * @params settings - параметры перехода 
		 */
		pub.createAjaxUrl = function (settings) {

			var host	 = window.location.host;
			var el 		 = $(settings.element);
			var ajaxUrl  = new _ajaxUrl(settings.params);

			// Задаем параметы переданные в ссылке через data атрибуты 
			ajaxUrl.setData(el.data());

			// Записываем обьект в масив чтобы к нему можно было обратится позже по индексу 
			_obj_trigger.push(ajaxUrl);
 			var number = _obj_trigger.length - 1 ;

			// Переход по AjaxUrl
			Enaza.Events.bind(settings.element, settings.event, function(e) {
					e.preventDefault();

					var _this 	= $(this);
					var url		= _obj_trigger[number].getHref(_this);

					priv.statisticUrl(_this);  

					if ((url.indexOf('http://' + host)>-1 || url.indexOf('http://') == -1) && !e.ctrlKey) {
					  _obj_trigger[number].browserUrl(url, number);
					} else {
					  window.location.href = url;
					}
			});
		};



		/**
		 * Module was loaded
		 */
		pub.init 		= function(){
			priv.bindChangeUrl();
		};
		
		/**
		 * DOM is ready
		 */
		pub.domReady	= function(){
		  var params = pub.options;
          $.each(params, function(key, value){
              // Назначение параметров 
              var settings = $.extend(true,{}, _options, value);
              //вызов конструктора
              pub.createAjaxUrl(settings);
          });   


          priv.debug();
		};

		/**
		 * Перезагрузить страницу AJAX 
		 */
		pub.reload 		= function () {
	        var State = History.getState();
	        var url = State.url;
	        var a = priv.globalAjax();
	        
	        a.getUrl(url);
		}
	
		return pub;
		
	}(Enaza.Modules.fullAjax || {}, jQuery));
	
});