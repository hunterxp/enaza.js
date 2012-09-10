#[enaza.js](http://team.enaza.ru/) - LMD javascript framework
---

Паттерн организации JavaScript модулей для обеспечения быстрого старта приложений. 

###1. Create init file (Создание инициализационного файла)
Первоначальная подготовка приложения склыдвается к написанию инициализационного файла с минимальным набором модулей, моделей, расширений.
Которые будут использоваться в проекте.

````javascript
//default params
var _params = {
	core 		: [],
	models 		: ["models/example.model"],
	modules 	: ["modules/fullAjax/module","modules/highlight/module"],
	extensions 	: ["modules/fullAjax/ext/default", "modules/highlight/ext/default"]
};

//set require config
require.config({
	baseUrl	: "/js/",
	paths	: {
		jQuery 		: "external/jquery-1.7.2.min",
		underscore	: "external/underscore-min",
		Enaza		: "enaza.bundle",
		external 	: "external",
		models 		: "models/default",
		modules 	: "modules"
	}
});

define(["Enaza","jQuery","underscore"],function(Enaza, $, _){
	Enaza.init("maptrix", _params);
});
````

###2. Init application (Инициализация приложения)
Подключение проекта, одной строкой вызова в шапке сайта

````html
<script data-main="/js/sites/default" src="/js/external/require.js" type="text/javascript"></script>
````

###3. Write models (Пиши модели)
Данный компонент является частью из общей парадигмы MVC - а именно обеспечивает взаимосвязь JS и AJAX интерфейсов, подготовки данных, а так же обеспечивает их обработку
````javascript
define(['jQuery', 'Enaza'], function($, Enaza){
	
	return Enaza.Models.Example = (function(pub, $) {
		
		pub.name 		= "instrument";
		
		pub.inviteFriend	= function(_data){
			var _ajax 		= Enaza.Core.ajax;
			var _options 	= {
				url 	: "/Example/test/",
				type	: "POST",
				dataType: 'json'
			};
			var _data 		= {
				data: _data,
			};
			
			return _ajax(_data,_options);
		};
		
		return pub;
		
	}(Enaza.Models.Example || {}, jQuery));
});
````

###4. Write modules (Пиши модули)
Mодуль — функционально законченный фрагмент программы, оформленный в виде отдельного файла с исходным кодом или поименованной непрерывной её части, предназначенный для использования в других программах. Модули позволяют разбивать сложные задачи на более мелкие в соответствии с принципом модульности. Обычно проектируются таким образом, чтобы предоставлять программистам удобную для многократного использования функциональность (интерфейс) в виде набора функций, классов, констант. Модули могут объединяться в пакеты и, далее, в библиотеки.
````javascript
//Укажем зависимости модуля и возвращаемый после загрузки контекст
define(['jQuery', 'Enaza', 'external/highlight.min'], function($, Enaza){
	
	return Enaza.Modules.highlight  = (function(pub, $) {

		var _options = {
			containers : "table div"
		}
		,_highlight = {};

		pub.name 		= "highlight";

		//Module was loaded
		pub.init 		= function(){

		};
		
		//DOM is ready
		pub.domReady	= function(){};
		
		return pub;
		
	}(Enaza.Modules.highlight || {}, jQuery));
	
});
````

###5. Wirte extension (Пиши расширения)
В текущем понимании, расширение - это класс, отдельный модуль, который унаследуется от основного модуля, и может применять методы и свойства родительского объекта, а так же изменить его конструкцию и поведение. Применимо для когда есть необходимость внести изменения в логику или поведение для разных проектов.
Этот пример показывает. что после загрузки расширения - происходит инициалиция компонента highlight - для опеределенных элементов в DOM
````javascript
//Укажем зависимости модуля и возвращаемый после загрузки контекст
define(['jQuery', 'Enaza', 'modules/highlight/ext/default'], function($, Enaza){
	return Enaza.Modules.highlight  = (function(pub, $) {
		var _options = {
			containers : "pre code"
		}
		,_highlight = {};
		pub.name 		= "highlight";

		//Module was loaded
		pub.init 		= function(){};
		
		//DOM is ready
		pub.domReady	= function(){
			_highlight 	= window.hljs;
			_highlight.initHighlightingOnLoad()
			$(_options.containers).each(function(i, e) {_highlight.highlightBlock(e)});
		};
		
		return pub;
		
	}(Enaza.Modules.highlight || {}, jQuery));
	
});
````

###6. Use safety coding ;) (Используй безопасный кодинг)
Описаание будет здесь очень скоро

###7. Make minify file with node.js (Создавай минификационные(обфусцированный) файлы с node.js)
Описаание будет здесь очень скоро