define(['jQuery', 'Enaza' , 'external/dragdealer.v0.9.5', 'external/timer'], function($, Enaza){
	return Enaza.Modules.silderDragdealer = (function(pub, $) {

		var priv     = {};
		var _options = {
				timer  : 3000,   // Время смены картинки 
				handle : {
					wrapper : '#js-slideshow',  // Контейнер слайдера
					handle  : '.handle',
					slide   : '.js-slide',
          			tooltip : '#js-slides-list',    // Маленькие картинки 
					cursor  : '.js-slides-cursor',
					next    : '#js-slideshow-next',
					prev    : '#js-slideshow-prev',
					navs 	: '.navbar-media'
				}
		};



		var _silderDragdealer = function (settings) {

			var h = settings.handle;
			var timer = new Timer(settings.timer);
			var wrapper     = $(h.wrapper);
      	    var tooltip     = $(h.tooltip);
      	    var navs 		= $(h.navs);
			var handle      = $(h.handle, wrapper);
			var first_slide = $(h.slide+':first', wrapper).clone();
			var last_slide  = $(h.slide+':last', wrapper).clone();
				handle.prepend(last_slide);
				handle.append(first_slide);

			var slides      = $(h.slide, wrapper);
			var prev        = $(h.prev);
			var next        = $(h.next);



			var step_width  = $(slides[0]).outerWidth(true);
			var step_height = $(slides[0]).outerHeight(true);

			var slideshow_width = 0;
				slides.each(function(i, slide){
					slideshow_width += $(slide).outerWidth(true);
				});

			$(handle).width(slideshow_width);

			var current_step 	 = 1;
			var callback_x 		 = 0;
			var released		 = false;
			var slide_size 	   	 = 1/(slides.length-1);


			var stepRatios = [];
				for(var i = 0; i <= slides.length - 1; i++){
					stepRatios[i] = i / (slides.length - 1);
				}

			var body_el = $('html, body');
				if($.browser.safari){
					body_el = $('body');
				}

			$(handle).bind('mousedown touchstart', function(){
				released = false;
			});

			var speed = 45;
				// if(mobile){
				// 	var speed = 55;
				// }

			var tooltip_items = $('a', tooltip);
			var selected_tip = $('a.selected', tooltip);

			var getClosestStep = function(value, steps, stepRatios){
				var k = 0;
				var min = 1;
				for(var i = 0; i <= steps - 1; i++){
					if(Math.abs(stepRatios[i] - value) < min){
						min = Math.abs(stepRatios[i] - value);
						k = i;
					}
				}
				return stepRatios[k];
			}


			var slideshow = new Dragdealer(wrapper.attr('id'),{
				//steps: slides.length,
				loose: true,
				vertical: false,
				horizontal: true,
				speed: speed,
				x: slide_size,
				left: 0,
				callback: function(x, y){
					released = true;
					var target = getClosestStep(x, slides.length, stepRatios);
					if(target == 0){
						target = stepRatios[slides.length - 2];
						slideshow.setValue(1-(slide_size-callback_x), 0, true);
						slideshow.setValue(target);
						current_step = (slides.length - 2);
					}
					else if(target == 1){
						target = stepRatios[1];
						slideshow.setValue(callback_x - stepRatios[slides.length - 2], 0, true);
						slideshow.setValue(target);
						current_step = 1;
					}
					else{
						slideshow.setValue(target);
						current_step = stepRatios.indexOf(target);
					}
					timer.reset();
					timer.start();
				},
				animationCallback: function(x, y){
					callback_x = x;
					if(!released){
						$(body_el ).scrollTop($(body_el ).scrollTop() + Math.round(y * step_height));
					}
				}
			});

			timer.addEventListener(TimerEvent.TIMER, function(e){
				if(current_step > slides.length-3){
					current_step = 1;
					slideshow.setValue(0, 0, true);
					slideshow.setValue((current_step) * slide_size, 0, false);
				}
				else{
					current_step += 1;
					slideshow.setValue((current_step) * slide_size, 0, false);
				}


				tooltip_items.removeClass('selected');
				tooltip_items.eq(current_step-1).addClass('selected');

			});



			tooltip_items.each(function(i, item){
				$(item).click(function(e){
					e.preventDefault();
					current_step = i + 1;
					slideshow.setValue(stepRatios[current_step]);

					selected_tip.removeClass('selected');
					$(item).addClass('selected');
					selected_tip = $(item);

					timer.reset();
					timer.start();
				});
			});
			$(function () {
				timer.start();
			});

			$(prev).click(function(e){
				e.preventDefault();
				if(current_step < 2){
					slideshow.setValue(1, 0, true);
					current_step = slides.length - 2;
					slideshow.setValue(stepRatios[current_step]);
				}
				else{
					current_step -= 1;
					slideshow.setValue(stepRatios[current_step]);
				}
				tooltip_items.removeClass('selected');
				$(tooltip_items[current_step-1]).addClass('selected');
				selected_tip = $(tooltip_items[current_step-1]);

				timer.reset();
				timer.start();
			});

			$(next).click(function(e){
				e.preventDefault();
				if(current_step > slides.length-3){
					current_step = 1;
					slideshow.setValue(0, 0, true);
					slideshow.setValue(stepRatios[current_step]);
				}
				else{
					current_step += 1;
					slideshow.setValue(stepRatios[current_step]);
				}
				tooltip_items.removeClass('selected');
				$(tooltip_items[current_step-1]).addClass('selected');
				selected_tip = $(tooltip_items[current_step-1]);

				timer.reset();
				timer.start();
			});

			$(prev).hover(
				function(){
					$(prev).addClass('active');
				}, 
				function(){
					$(prev).removeClass('active');
				}
			);

			$(next).hover(
				function(){
					$(next).addClass('active');
				}, 
				function(){
					$(next).removeClass('active');
				}
			);

			$([wrapper, navs, $('.slideshow')]).each(function(i, el){
				$(el).mouseenter(
					function(){
						timer.stop();
					}).mouseleave(
					function(){
						timer.start();
					}
				);
			});

			$('body').bind('overlay', function(e, shown){
				if(shown){
					slideshow.disable();
					timer.stop();
				}
				else{
					slideshow.enable();
					timer.start();
				}
			});
		};

		/** 
		 * Инициализация слайдера 
		 */
		priv.init 		= function (params) {
			$.each(params, function(key, value){
				// Назначение параметров 
				var settings = $.extend(true,{}, _options, value);
				//вызов конструктора
				if ($(settings.handle.wrapper).size()>0) {
					_silderDragdealer(settings);

					// Если челоек покадиет страницу отключаем драгдилер 
					$(window).one('fullAjax.start', function() {
						if (typeof timer !== 'undefined') {
							timer.stop();
						}
					});
				}
			});  
		}


		pub.name    	= 'silderDragdealer';
		pub.options 	= [_options];


		/**
		 * Module was loaded
		 */
		pub.init    = function(){

		};
		
		/**
		 * DOM is ready
		 */
		pub.domReady  = function(){
			priv.init(pub.options);

			$(window).on('fullAjax.ready', function() {
				setTimeout(function () {
					priv.init(pub.options);
				},1000);
			});	
		};

		return pub;
		
	}(Enaza.Modules.silderDragdealer || {}, jQuery));
	
});


	