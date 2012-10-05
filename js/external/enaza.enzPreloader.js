/*  
		enzPreloader
		Прелодер добавляет к указаному элменту элемент '<div class="ajaxPreloader"></div>' 
		Добавляет слой поверх указаного +10px во все стороны
		
		.ajaxPreloader {
				display:block;
			position:absolute;
			top:-10px;
			left:-10px;
			right:-10px;
			bottom:-10px;
			background:url('../img/preloader.gif') center center no-repeat;
			background-color:rgba(255,255,255,0.4);
		}

		
		$(element).enzPreloader('show') - Показать;
		$(element).enzPreloader('hide') - Скрыть

*/
(function( $ ){
		
		//Настройки
		var settings = {
				element : '<div class="ajaxPreloader"></div>',
				after   : function () {},
				before  : function () {},
				css : {
						top: 0,
						bottom: 0,
						left: 0,
						right: 0,
						'z-index': 2
				}
		};
		
		// Создаем элемент
		var preloaderEl = $(settings.element).hide().css(settings.css);
				 
		// Здесь идёт код плагина 
		var methods = {
				// Показать прелодер
				show : function( options ) {
					// debugger;
					if (typeof options !== 'undefined') { 
							$.extend( settings, options );
					}
					var $this = $(this);

					$this
							.append(preloaderEl)
							.show()
							.find(preloaderEl)
							.show();
					// $this.css({position:'relative'});
				}, 
				// Скрыть
				hide : function( ) {
					var $this = $(this);

					$this
							.hide()
							.find(preloaderEl)
							.remove();
				}
		};
		
		//вызываемый метод        
		$.fn.enzPreloader = function( method ) {
				if ( methods[method] ) {
					return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
				} else if ( typeof method === 'object' || !method ) {
					return methods.init.apply( this, arguments );
				} else {
					$.error( 'Метод ' +  method + ' не существует' );
				}    
		};
	
})( jQuery );