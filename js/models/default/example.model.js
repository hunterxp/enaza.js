define(['jQuery', 'Enaza'], function($, Enaza){
	
	return Enaza.Models.Example = (function(pub, $) {
		
		pub.name 		= "instrument";
		
		pub.inviteFriend	= function(_mailList){
			var _ajax 		= Enaza.Core.ajax;
			var _options 	= {
				url 	: "/Example/inviteFriend/",
				type	: "POST",
				dataType: 'json'
			};
			var _data 		= {
				mailList: _mailList,
			};
			
			return _ajax(_data,_options);
		};
		
		return pub;
		
	}(Enaza.Models.Example || {}, jQuery));

});