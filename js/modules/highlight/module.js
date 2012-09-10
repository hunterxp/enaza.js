define(['jQuery', 'Enaza', 'external/highlight.min'], function($, Enaza){
	
	return Enaza.Modules.highlight  = (function(pub, $) {

		var _options = {
			containers : "pre code"
		}
		,_highlight = {};

		pub.name 		= "highlight";

		/**
		 * Module was loaded
		 */
		pub.init 		= function(){

		};
		
		/**
		 * DOM is ready
		 */
		pub.domReady	= function(){};
		
		return pub;
		
	}(Enaza.Modules.highlight || {}, jQuery));
	
});