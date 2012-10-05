define(['jQuery', 'Enaza', 'modules/chat/module'], function($, Enaza){
	
	return Enaza.Modules.Chat  = (function(pub, $) {

		var _options = {
			jabber : {
				host 	: "/http-bind/",
				server 	: "elena.enaza.ru"
			},
            container   : ".chat"
		};

		pub.name 		= "Chat";

		/**
		 * Module was loaded
		 */
		pub.init 		= function(){

		};
		
		/**
		 * DOM is ready
		 */
		pub.domReady	= function(){
			
			var _events 	= Enaza.Events;
			
			//pub.XMPP 		= {};
			
			console.log(XMPP);
			
			
			/*pub.XMPP 		= new XMPP(	   this, window.Strophe, $);
			pub.UserChat 	= new UserChat(this, window.Strophe, $);
			pub.Actions 	= new Actions( this, window.Strophe, $);
			pub.Events 		= new Events(  this, window.Strophe, $, _events);
			pub.Views 		= new Views(   this, window.Strophe, $);
			
			
			this.Events.registerEvents();
            
			//make xmpp connection
			this.XMPP.init(_options.jabber.host, function(XMPP){
				XMPP.connect(userData.id+"@"+_options.jabber.server, userData.jabberPass);
			});
			
			//close connection on logout
			_events.bind(".menu-exit", "click", function(e){
				window.Enaza.Modules.Chat.XMPP.onWindowUnload();
			});
			
			this.Views.UserChat.render();
			
			$(window).on('fullAjax.ready',function () {
				
				var self 	= this.Enaza.Modules.Chat;
				
					self.Views.UserChat.render();
			});
			
			*/
			
			//console.log(Enaza.Module);
			
		};
	
		var Events 			= function(self, Strophe, $, events){
		
			this.registerEvents  = function(){
				
				//incoming message
				events.add("chat.user.incomingMessage", function(messageData){
					//определим
					self.Views.UserChat.render();
				});
				
				events.add("chat.user.sendMessage", function(messageData){
					console.log(messageData);
				});
				
				events.add("chat.user.openChat", function(messageData){
					console.log(messageData);
				});
				
				events.add("chat.user.closeChat", function(messageData){
					console.log(messageData);
				});

			};
			
		};
		
		var Views 			= function(self, Strophe, $){
			
			this.options 	= {
				container : ".userChat"
			};
			
			this.UserChat 	= {
				
				render 		: function(){

					var _container 	= $(self.Views.options.container);
					var _template 	= false;
					//Получим данные о пользователях с которыми мы будем работать
					var _keys = _.keys(self.UserChat.get());
				
					if(_keys.length > 0){
						
						Enaza.Models.User.getUsersData(_keys.join(","), false).success(function(_response){
							
							
							_template = _.template($("script.chatTemplate").html());
							
							
							
							var _html = _template({
								data : {
									userData : _response.data,
									chatData : self.UserChat.get()
								}
							});
							
							$(self.Views.options.container).html('');
							$(_html).appendTo(_container);
							
						});	
					}

				}
				
			},
			this.GroupChat 	= {
				
				
			},
			this.PlaceChat 	= {
				
			}
			
		};
		
		return pub;
		
	}(Enaza.Modules.Chat || {}, jQuery));
	
});
