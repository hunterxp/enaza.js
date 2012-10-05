define(['jQuery', 'Enaza','external/jquery.colorbox-min'], function($, Enaza){
	
	return Enaza.Modules.Auth  = (function(pub, $) {
		
		var _options = {
			element : ".box",
			event 	: "click",
			url 	: ""
		};
		
		pub.name 		= "Auth";
		
		pub.init 		= function(){};
				
		pub.domReady	= function(){
			_bind 	= Enaza.Events.bind;
			_ajax 	= Enaza.Core.ajax;
			
			_bind(_options.element, _options.event, function(e){
				
				var _socialNetwork 	= $(this).attr("rel");
							
				var _data 		= {
					socialNetwork: _socialNetwork
				};
				
				var _options 	= {
					url 	: "/api/?method=user.getAuthLink",
					type	: "GET",
					dataType: 'json',
					crossDomain : true
				};					
				
				var _data = _ajax(_data,_options).success(function(_data){
					//$.colorbox({href: _data.result.link});
// 					
					// _ajax({},{url:_data.result.link, crossDomain : true}).success(function(_data){
						// console.log(_data);
					// });
						
					var popupWin  = window.open(_data.result.link, "Maptrix auth", "location,width=400,height=300,top=0");
						popupWin.focus();
				});
				
				e.preventDefault();
					
			});
			
		};
		
		return pub;
		
	}(Enaza.Modules.Auth || {}, jQuery));
	
});