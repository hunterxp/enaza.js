define(['jQuery', 'Enaza', 'modules/highlight/ext/default'], function($, Enaza){
	
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
		pub.domReady	= function(){
			_highlight = window.hljs;
			_highlight.initHighlightingOnLoad()

			$(_options.containers).each(function(i, e) {_highlight.highlightBlock(e)});
		};
		
		return pub;
		
	}(Enaza.Modules.highlight || {}, jQuery));
	
});