define(['jQuery', 'Enaza'], function($, Enaza){
	
	return Enaza.Modules.Notify  = (function(pub, $) {

		var _options    = {
            url    : "/subscribe/"+userData.deviceToken
        }
        ,_poll = function (){
            setTimeout(function(){
                $.ajax({ url: _options.url, success: function(data){
                     console.log(data);
                    _poll();
                }, dataType: "json"});
               }, 30000);
        };

		pub.name 		= "notify";

		/**
		 * Module was loaded
		 */
		pub.init 		= function(){};
		
		/**
		 * DOM is ready
		 */
		pub.domReady	= function(){
            pub.listen();
        };
        
        pub.listen      = function(){
            
            var _ajax = Enaza.Core.ajax;
            
            pub.Action  = new Action(this, $);
            
            _ajax({},{url:_options.url, timeout : 40000, type: "GET",dataType:"json"}).success(function(_response){
                
                if(_response.action != "undefined"){
                    switch (_response.action){
                        case "inviteToFriendship" : {
                            Enaza.Modules.Notify.Action.inviteToFriendship(_response);
                        }; break;
                        
                        case "addFriend" : {
                            Enaza.Modules.Notify.Action.addFriend(_response);
                        }; break;
                        case "addChekinComment" : {
                            Enaza.Modules.Notify.Action.addChekinComment(_response);
                        }; break;
                        case "placeInvite" : {
                            Enaza.Modules.Notify.Action.placeInvite(_response);
                        }; break;
                    }      
                }

                Enaza.Modules.Notify.listen();
            });
        };
        
        /**
         *
         */
        var Action      = function(self, $){
            
            this.addFriend  = function(data){
                console.log(data);
            };
            
            this.addChekinComment  = function(data){
                console.log(data);
            };
            
            this.inviteToFriendship  = function(data){
                console.log(data);
            };
            
            this.placeInvite        = function(data){
                console.log(data);
            };
            
        };
        
		return pub;
		
	}(Enaza.Modules.Notify || {}, jQuery));
	
});