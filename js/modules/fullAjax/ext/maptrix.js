define(['jQuery', 'Enaza', 'modules/fullAjax/module'], function($, Enaza, module){

	return Enaza.Modules.fullAjax = (function(pub, $) {
		
		/**
		 * Параметры запуска 
		 */
		pub.options 	=  [{
			element : ".js_url",
			event   : 'click',
			params 	: {
				url: function (el) {
					return $(el).attr('href');
				},
				container   : '.ajax_container',
				after   	: function () {}, 
				before   	: function () {}, 
				preloader 	: false,
				scrollToTop	: false,
				title 		: ""
			}
		}];

		return pub;
		
	}(Enaza.Modules.fullAjax || {}, jQuery));
	
});