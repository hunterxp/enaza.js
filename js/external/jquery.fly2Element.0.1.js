  /*
  Чураков Андрей fobazzz@yandex.ru 29.11.2011  
  Анимация полета элемента в указаный элемент.
  $('element').({'elementTarget'});
  
    Параметры.
              element: null,   -  элемент в который политит выбраный
              speed: 500,      -  Скорость анимация    
              start: function () {},  - Не работает
              stop: function () {},   - После анимация выполняется
              z_index:99,             - Индекс
              opacity:0.75;           - Прозрачность
    
  */
  
(function($){
       $.fn.fly2Element = function(options) {
          var options = $.extend({
              element: null,
              speed: 500,
              start: function () {},
              stop: function () {},
              z_index:99,
              opacity:0.75
          }, options);
          

         var finalEl = $(options.element);

         if (options.element == null )  {
               console.warn('Анимация корзины нет элемента');
               return false;
         }
           

        var  getCenterPos = function (item){
      
        	var pos = $(item).offset(),
                cntPos =  {
                    x:0,
                    y:0
                };

        	cntPos.y = Math.round((item.outerHeight()-item.outerHeight())/2)+pos.top;
        	cntPos.x = Math.round((item.outerWidth()-item.outerWidth())/2)+pos.left;

            //console.log(cntPos);
        	return cntPos;
        }
        
        var put2car_animate = function (elem) {
            var startEl    = elem,
                cartPos    = getCenterPos(finalEl);
                startElPos = startEl.offset(),
        
        		startEl
                .clone(true)
                .appendTo('body')
                .css({'top':startElPos.top+'px','position':'absolute','z-index':options.z_index,'left':startElPos.left+'px','opacity':options.opacity})
                .animate({
                  top: cartPos.y+'px',
                  left: cartPos.x+'px',
        		  width: 15+'px',
        		  height: 15+'px',
        		  opacity: 0.05
                },options.speed,function () {
        			$(this).remove();
                    options.stop();
        		});
            
        }

           
           
           
          return this.each(function () {
            var self = $(this);

            put2car_animate(self);
          });
       };
})(jQuery);