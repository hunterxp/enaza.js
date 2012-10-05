define(['jQuery', 'Enaza','external/min/libs.min','external/min/candy.min'], function($, Enaza, libs, Candy){
	
	return Enaza.Modules.XMPP  = (function(pub, $) {

		pub.name 		= "XMPP";

		/**
		 * Module was loaded
		 */
		pub.init 		= function(){};
		
		/**
		 * DOM is ready
		 */
		pub.domReady	= function(){
            
            Candy.init( '/http-bind/', {
                core: {
                    debug: true,
                }, view: {
                    language: 'ru'
                }
            });
            
            Candy.Core.connect('elena.enaza.ru', null, 'nickname')
            
		};
						
		return pub;
		
	}(Enaza.Modules.User || {}, jQuery));
	
});