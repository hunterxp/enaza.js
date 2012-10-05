// @name: enazaFullAjax
// @author: Dmitriy Chertkov (chertkov@enaza.ru)
// @date: 2011.09.10
// @modified: Eugene Vasev (vasev@enaza.ru)
// @date: 2011.09.19
// @modified: Pavel Mikrukov (mikrukov@enaza.ru)
// @date: 2011.10.31
// @version: 1.2
// @description: Enaza Infinite Carousel - scroll storefront's, or other products-lists

(function($){
	$.infiniteEnazaCarousel = function(t, options) {
		var self = $('> ul', t);

		var holderWidth = parseInt($(t).outerWidth());
		var childCount = $('> li', self).length; // считаем 
		var childWidth = parseInt($('> li', self).outerWidth(true));
		var childScroll = 1;
		for(var i = 1; i*childWidth < holderWidth; i++){
			childScroll = i; // вычисляем количество видимых элементов
		}
         
		var childTotalWidth = childCount*childWidth;
        var last_childWidth = $('> li:last', self).width();
        
        var visibleWidth = childTotalWidth - (childWidth - last_childWidth);
        
        //console.log(visibleWidth, visibleWidth == holderWidth);
		//console.log(holderWidth, childCount, childWidth, childScroll, childTotalWidth);
			
		// опции
		var options = $.extend({
			width: ($('> li', self).outerWidth() + parseInt($('> li', self).css('margin-right'))),
			left_value: ($('> li', self).outerWidth() + parseInt($('> li', self).css('margin-right')))*(-1),
			controls_class_name: '.products_list_controls',
			//offset: 1, // смещение родителя (актуально для центрирования, например, баннер на главной (0.75 = 75%))
			offset: 0,
			speed: 500,
            scroll: childScroll,
            callback: 0,
            mode: 'smooth', // chunk - циклично и группой 
            autoscroll: 0 // автоскролинг, передается время цикла, если ноль то выключен, использовать пока только для mode:chunk
		}, options);
        
        if(childScroll >= options.scroll){
        childScroll = options.scroll; //кол-во прокручиваемых, но не больше чем видимых элементов, опционально
        }
        
        //console.log(options['scroll'] , childScroll);
        
        var callback_fun = options.callback;//название юзерской функции, опционально
                
		// класс
		var methods = {
			init: function(param) {
				if(childTotalWidth <= holderWidth || visibleWidth == holderWidth){
					$(options.controls_class_name,t).remove();
				}else{
                    if(options.mode == 'smooth'){
                    
                    $('> li', self).clone().appendTo(self);
                        
                    //console.log(childCount, childTotalWidth / childCount);
                        
                    $(options.controls_class_name,t).hover( function() {
						var way = $(this).attr('data-direction'); // back, next
                        //console.log('Over');
                        $(self).stop();
                        var n = 0;
                                                
                        while(n <= holderWidth){
                            n++;
                            methods.direction(way);
                        }
                        //console.log(self);
						//return false;
					},
                    function (){
                        //console.log('Out');
                        methods.consummation();
                    });
                    }
                    else if(options.mode == 'chunk'){
                        $('> li:first', self).before($('> li:last', self));
                    
                        if(childCount <= childScroll*3)//если количества элементов не хватает- клонируем
                        {
                            var clone_length = (childScroll*3)-childCount;//количество недостоющих элементов
                            n = 0;
                            while (n < clone_length) {
                                n ++
                                $('> li', self).eq(n).clone().appendTo(self);
                                //console.log(clone_length);
                            }
                        }
                        
                        if(childScroll > 1){childScroll = childScroll - 1};//нужно ли крутить на колличесво видимых минус 1 или нет 
                        $('> li:first', self).before($('> li', self).eq(-childScroll).nextAll());
                        $(self).css({'margin-left':(options.left_value+options.offset)*childScroll});
                        
                        $(options.controls_class_name,t).live('click', function() {
						var way = $(this).attr('data-direction'); // back, next
						methods.direction(way);
                        //console.log(self);
						return false;
					       });
                           
                        if( options.autoscroll > 0){
                            var interval = options.autoscroll;
                            var go;
                            
                            function play() { go = setInterval(function(){ $(self,t).parent().find('.next').click(); }, interval); }
                            function stop() { clearInterval(go);  }
                            
                            $(self,t).parent().hover( function(){
                                stop();
                                //console.log('on');
                            },
                            function(){
                                play();
                                //console.log('off');
                            });
                            
                            $(document).bind('ajaxStart',function () {
                                stop();
                                //console.log('ajax reload');
                            });
                            
                            play();
                            
                            return false;
                        }
                    }
				}
			},
            direction: function(way) {
              if(options.mode == 'smooth'){
				if(way == 'back' || way == 'next'){
					if(way == 'next'){
					   //console.log(childScroll);
                       $(self).animate({"margin-left": "-="+ childWidth*0.05},50,'linear',function(){
                        var marginLeft = parseInt($(self).css('margin-left'));
                        if(marginLeft <= -childTotalWidth+childWidth+childWidth*childScroll){
                            $('> li:first', self).insertAfter($('> li', self).last()); 
                            $(self).css({'margin-left':"+="+ childWidth});
                            //console.log('<<< clone');
                        }
                        //console.log(marginLeft);
                       });
					}else if(way == 'back'){
					   //console.log(childScroll);
                       $(self).animate({"margin-left": "+="+ childWidth*0.05},50,'linear',function(){
                        var marginLeft = parseInt($(self).css('margin-left'));
                        if(marginLeft >= -childWidth){
                            $('> li:last', self).insertBefore($('> li', self).first()); 
                            $(self).css({'margin-left':"-="+ childWidth});                           
                            //console.log('>>> clone');
                        }
                        //console.log(marginLeft);
                       });
					}
				}
                }else if(options.mode == 'chunk'){
				if(way == 'back' || way == 'next'){
					if(way == 'back'){
					   //console.log(childScroll);
						direction = childScroll;
					}else if(way == 'next'){
					   //console.log(childScroll);
						direction = -childScroll;
					}
					
					//left_indent = (parseInt(($(self).css('margin-left')) + $('> li', self).css('margin-right')) + (options.width*direction))*options.offset;
					left_indent = (parseInt(($(self).css('margin-left')) + $('> li', self).css('margin-right')) + (options.width*direction))+options.offset;
					//console.log(left_indent);
                    
					$(self).animate({'margin-left':left_indent-options.offset}, options.speed, function () {
						if(way == 'back'){
						  $(this).clearQueue();//очищает очередь анимации
							$('> li:first', self).before($('> li', self).eq(-childScroll-1).nextAll());
						}else{
						  $(this).clearQueue();//очищает очередь анимации
							$('> li:last', self).after($('> li', self).eq(childScroll).prevAll());
                            //console.log($('> li:first', self));
                            //console.log($('> li', self).eq(-childScroll).nextAll());
						}
                        if(!callback_fun == 0){
                            eval(callback_fun());
                        }
						//$(self).css({'margin-left':options.left_value*options.offset});
						$(self).css({'margin-left':(options.left_value+options.offset)*childScroll});
						//$(self).css({'margin-left':options.offset});
					});
				}
			
                }
			},
            consummation: function(){
                $(self).clearQueue();
                var marginLeft = parseInt($(self).css('margin-left'));
                //console.log(marginLeft + ' <<<');
                //console.log(childWidth);
                var a = Math.round(marginLeft / childWidth);
                var b = childWidth * a;
                //console.log(b + ' смещение');
                $(self).animate({'margin-left':b},500,'linear', function() {
                        // complete
                    });
                
            }
		};
		
		methods.init();
	};

	$.fn.infiniteEnazaCarousel = function(options) {
		this.each(function(){
			$.infiniteEnazaCarousel(this, options);
		});
	};
})(jQuery);