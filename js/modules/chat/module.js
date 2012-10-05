/**
 * Enaza.Modules.Chat
 * @author: chernobrov@enaza.ru
 * @since 	20.09.2012
 */
define(['jQuery', 'Enaza','external/min/strophe.min'], function($, Enaza){
	
	return Enaza.Modules.Chat  = (function(pub, $) {

		var _options = {
			jabber : {
				host 	: "/http-bind/",
				server 	: "elena.enaza.ru"
			}
		};

		pub.name 		= "chat";

		/**
		 * Module was loaded
		 */
		pub.init 		= function(){};
		
		/**
		 * DOM is ready
		 */
		pub.domReady	= function(){
					
			var _events 	= Enaza.Events;
			
			pub.XMPP 		= new XMPP(	   this, window.Strophe, $);
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
			
			
		};
		
		pub.send 		= function(message){
			this.UserChat.send("234@elena.enaza.ru", message);
		};
		
		var XMPP 		= function(self, Strophe, $){
			
			var _connection = null,
				_options = {
					debug 	: false,
					autojoin: false
				},
				_user 					= null,
				_rooms 					= null,
				_registerEventHandlers 	= function() {
					self.XMPP.addHandler(self.Actions.Jabber.Version, 		Strophe.NS.VERSION, 'iq');
					//self.XMPP.addHandler(self.Actions.Jabber.Presence, 		null, 'presence');
					self.XMPP.addHandler(self.Actions.Jabber.Message, 		null, 'message');
					//self.XMPP.addHandler(self.Actions.Jabber.Room.Disco, 	Strophe.NS.DISCO_INFO, 'iq');
				};
			
			/**
			 * Initialize component
			 * @param string 	host 	 	- xmpp prebind host
			 * @param function 	callback 	- callback function
			 */
			this.init 			= function(host, callback){
				
				// Enable debug logging
				if(_options.debug) {
					self.log = function(str) {
						try { // prevent erroring
							if(typeof window.console !== undefined && typeof window.console.log !== undefined) {
								console.log(str);
							}
						} catch(e) {
							//console.error(e);
						}
					};
					self.XMPP.log('[XMPP::LOG] Debugging enabled');
				}
				
				_connection 			= new Strophe.Connection(host);
				_connection.rawInput 	= self.XMPP.input;
				_connection.rawOutput 	= self.XMPP.output;
				
				window.onbeforeunload 	= self.XMPP.onWindowUnload;
				window.onunload		 	= self.XMPP.onWindowUnload;
				
				var _callback = callback;
				
				if($.browser.mozilla) {
					$(document).keydown(function(e) {
						if(e.which === 27) {
							e.preventDefault();
						}
					});
				}

				_callback(this);
			};
			
			/**
			 * Connect
			 */
			this.connect 		= function(jid, password){
				_connection.reset();
				_registerEventHandlers();
				_connection.connect(jid, password, self.XMPP.onConnect);
			};
			
			
			/**
			 * Attach user to current connection
			 */
			this.attach 		= function(jid, sid, rid){
				_connection.attach(jid, sid, rid, self.XMPP.onConnect);
			};
			
			
			/**
			 * On connect handler
			 */
			this.onConnect 		= function(status){
				switch( status ){
					case Strophe.Status.CONNECTING : {
						self.XMPP.log("Connecting...");
					} break;
					
					case Strophe.Status.CONNFAIL : {
						self.XMPP.log("Connection was failed...");
					} break;
					
					case Strophe.Status.DISCONNECTING : {
						self.XMPP.log("Disconnecting...");
					} break;
					
					case Strophe.Status.DISCONNECTED : {
						self.XMPP.log("Disconnected...");
					} break;
		
					case Strophe.Status.CONNECTED : {
						self.XMPP.log("Connection is success");
						_connection.addHandler(self.XMPP.onMessage, null, 'message', null, null,  null);
						_connection.send($pres().tree());
					} break;					
				}
				
			};
						
			/**
			 * on message handler
			 * @param xml message 	- xmpp xml presponse
			 */
			this.onMessage 		= function(message){
				
				//define message data				
				var _messageData = {
					to 		: message.getAttribute('to'),
					from 	: message.getAttribute('from'),
					type 	: message.getAttribute('type'),
					elems 	: message.getElementsByTagName('body')
				};
			
				//switch by types
				switch ( _messageData.type ) {
					case "chat" : {
						if(_messageData.elems.length > 0){
							self.UserChat.set(_messageData.from, _messageData.to, Strophe.getText(_messageData.elems[0]));
							//Call custom event
							window.Enaza.Events.call("chat.user.incomingMessage", _messageData);
						}
							
					} break;
				}
				
				return true;
			};
			
			/**
			 * disconnect
			 */
			this.disconnect 	= function(){
				_connection.disconnect();
			};

			/**
			 * add event handler for strophe
			 * @param xml handler 		- xmpp xml presponse
			 * @param string ns 		- xmpp namespace
			 * @param string name 		- name of event
			 * @param string type 		- type event
			 * @param string id 		- id
			 * @param string from 		- from jid user
			 * @param object options	- some options...
			 */
			this.addHandler 	= function(handler, ns, name, type, id, from, options) {
				return _connection.addHandler(handler, ns, name, type, id, from, options);
			};
			
			/**
			 * Hook for Firefox an Opera
			 */
			this.onWindowUnload = function() {
				_connection.sync = true;
				self.XMPP.disconnect();
				_connection.flush();
			};
			
			/**
			 * Input recive data
			 * @param xml data	- xml from jabber server
			 */
			this.input 			= function(data){
				if(_options.debug)
					Enaza.Console.time("[xmpp::input]"+data);
			};
			
			/**
			 * Output recive data
			 * @param xml data	- xml to jabber server
			 */
			this.output 		= function(data){
				if(_options.debug)
					Enaza.Console.time("[xmpp::output]"+data);
			};
			
			/**
			 * Logging 
			 * @param string message - message for logging
			 */
			this.log			= function(message){
				if(_options.debug)
					Enaza.Console.time(message);
			};
			
			/**
			 * Get current user
			 * @return object
			 */
			this.getUser 		= function(){
				return _user;
			};
			
			/**
			 * Get connection
			 * @return object - current xmpp connection
			 */
			this.getConnection 	= function(){
				return _connection;
			};
			
			this.getOptions 	= function(){
				return _options;
			}
			
			/**
			 * get client time
			 * @return int - current client time
			 */
			this.getTime 		= function(){
				return new Date().getTime();
			};
			
		};

		var UserChat 	= function(self, Strophe, $) {
			
			var _messages 	= {};
			/**
			 * @param 	string 	from 	- jid from
			 * @param 	string 	to 		- jid to
			 * @param 	string 	message	- message
			 */
			this.set 		= function(from, to, message){
				var _id 	= Strophe.getNodeFromJid(from);
				if(!_messages[_id])
					_messages[_id] = [];
				
				var _current = _messages[_id];
					_current.push({
						time : self.XMPP.getTime(),
						from : from,
						to	 : to,
						idTo : Strophe.getNodeFromJid(to),
						idFrom : Strophe.getNodeFromJid(from),
						message : message
					});
				_messages[_id] = _current;
			
				return true;
			};
			
			/**
			 * Send message to user chat
			 * @param 	string  to 		- user JID
			 * @param 	string 	message - message
			 */
			this.send		= function(to, message){
				if(self.XMPP.getConnection().connected && self.XMPP.getConnection().authenticated){
					if(message.length > 0){

						var from 	= Strophe.getNodeFromJid(self.XMPP.getConnection().jid);
						var reply 	= $msg({
								to	: to,
								from: self.XMPP.getConnection().jid,
								type: "chat"
							}).c("body").t(message);

						self.XMPP.getConnection().send(reply.tree());
						if(self.UserChat.set(to,self.XMPP.getConnection().jid, message)){
							//Call custom event
							window.Enaza.Events.call("chat.user.sendMessage", {to: to, message: message});
						}
						
					}
				}
			};
			
			/**
			 * Get current messages
			 * @return object - chat history
			 */
			this.get 		= function(){
				return _messages;	
			};
		
		};
	
		var Actions 	= function(self, Strophe, $) {

			this.Jabber = {

				Version: function(msg) {
					self.XMPP.getConnection()
						.send($iq({type: 'result', to: msg.attr('from'), from: msg.attr('to'), id: msg.attr('id')})
						.c('query', {name: "maptrix", version: "1", os: navigator.userAgent}));
				},

				Roster: function() {
					self.XMPP.getConnection()
						.send($iq({type: 'get', xmlns: Strophe.NS.CLIENT})
						.c('query', {xmlns: Strophe.NS.ROSTER}).tree());
				},

				Presence: function(attr) {
					self.XMPP.getConnection()
						.send($pres(attr).tree());
				},
		
				Services: function() {
					self.XMPP.getConnection()
						.send($iq({type: 'get', xmlns: Strophe.NS.CLIENT})
						.c('query', {xmlns: Strophe.NS.DISCO_ITEMS}).tree());
				},

				Autojoin: function() {
					self.XMPP.getConnection()
						.send($iq({type: 'get', xmlns: Strophe.NS.CLIENT})
						.c('query', {xmlns: Strophe.NS.PRIVATE})
						.c('storage', {xmlns: Strophe.NS.BOOKMARKS}).tree());
				},

				Room: {}
			};
			
		};
		
		var Events 		= function(self, Strophe, $, events){
		
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
		
		var Views 		= function(self, Strophe, $){
			
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
			this.GroupChat 	= {},
			this.PlaceChat 	= {}
			
		};
		
		return pub;
		
	}(Enaza.Modules.Chat || {}, jQuery));
	
});