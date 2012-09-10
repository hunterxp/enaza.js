define(['jQuery', 'Enaza', 'modules/bootstrap/module','external/bootstrap.min'], function($, Enaza){
	
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