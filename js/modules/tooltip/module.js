define(['jQuery', 'Enaza', 'external/tiptip.min'], function($, Enaza){
	
	return Enaza.Modules.Tooltip  = (function(pub, $) {

		var _options = {
            container  : ".tip",
            tip        : {
                maxWidth        : "auto",
                edgeOffset      : 10,
                defaultPosition : "top"
            }
        };

		pub.name 		= "tooltip";

		/**
		 * Module was loaded
		 */
		pub.init 		= function(){};
		
		/**
		 * DOM is ready
		 */
		pub.domReady	= function(){
			$(window).on('fullAjax.ready',function () {
				$(_options.container).tipTip(_options.tip);
			});
			
            $(_options.container).tipTip(_options.tip);
        };
		
		return pub;
		
	}(Enaza.Modules.Tooltip || {}, jQuery));
	
});