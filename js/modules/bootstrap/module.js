define(['jQuery', 'Enaza'], function($, Enaza){
	
	return Enaza.Modules.bootstrap  = (function(pub, $) {

		var _options = {}

		pub.name 		= "bootstrap";

		/**
		 * Module was loaded
		 */
		pub.init 		= function(){};
		
		/**
		 * DOM is ready
		 */
		pub.domReady	= function(){};
		
		return pub;
		
		
	}(Enaza.Modules.highlight || {}, jQuery));
	
});