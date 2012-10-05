define(['jQuery'], function(){
	
	//Set Enaza object in window context
	window.Enaza = (function(pub, $) {
		pub._about = {
			name		: 'Enaza JS',
			version		: '1.0.2',
			site		: ""
		};
		
		/**
		 * Enaza object 
 		 * @param {String} _site 	- site name
 		 * @param {Object} _options	- options 
		 */
		pub.init = function(_site, _options) {
			Enaza.Console.time('Enaza init');
			pub._about.site = 		_site;
			this.Core.init(			_site, 	_options.core); 		//core
			this.Models.init(		_site, 	_options.models);		//models
 			this.Modules.init(		_site, 	_options.modules);		//modules
 			this.Extensions.init(	_site,	_options.extensions);	//extensions
            this.Console.init(	    _site,	_options.console);	    //console
		};
			
		return pub;
				
	}(window.Enaza || {}, jQuery)); 
	
		/**
		 * Enaza.Core component
		 */		
		Enaza.Core 			= (function(pub, $) {
			
			var _options 	= {
					debug		: false
				}
				,_timestamp			//timestamp
				,_site; 			//site name
				
			pub.init 		= function(site, options) {
				//extend default params
				$.extend(true, _options, options);
				//set current timestamp
				_timestamp	= Math.round((new Date()).getTime() / 1000);
				//set site variable
				_site 		= site;
			};
			
			pub.ajax 		= function (data,params) {
				// Параметры по умолчанию
				var options = {
					url           : "",
					async         : true,
					cache         : true,
					data          : data,
					crossDomain   : false,
					dataType      : 'html',
					timeout       : 60000,
					type          : 'POST'
				};
				// Присвоение новых параметров
				$.extend(options, params);  
				return $.ajax(options);
	  		};
			
			/**
			 * @return int _timestamp;
			 */
			pub.getTimestamp 	= function(){
				return _timestamp;
			};
			
			/**
			 * @return string _site
			 */
			pub.getSite			= function(){
				return _site;	
			};
				
			return pub;
			
		}(Enaza.Core || {}, jQuery));
		
		/**
		 * Enaza.Models component
		 */	
		Enaza.Models 		= (function(pub, $) {
			
			var _options 	= {
					debug		: false
				};
				
			pub.init 		= function(site, options) {
				//extend default params
				$.extend(true, _options, options);
				//try to load models
				_.each(options, function(_key, _value){
					require(_key.split(), function(_model){
						Enaza.Console.time("model: "+_model.name+"  was loaded");
					});
				});

			};
			
			return pub;
			
		}(Enaza.Models || {}, jQuery));	
		
		/**
		 * Enaza.Modules component
		 */
		Enaza.Modules 		= (function(pub, $) {
			
			var _options 	= {
					debug		: false
				};
				
			pub.init 		= function(site, options) {
				//extend default params
				$.extend(true, _options, options);
				
				//try to load and init module
				_.each(options, function(_key, _value){
					require(_key.split(), function(_module){
						Enaza.Console.time("module: "+_module.name+" was loaded");
						_module.init();
						$(function() {
							_module.domReady();
						});	
					});
				});
			};
			
			return pub;
			
		}(Enaza.Modules || {}, jQuery));
		
		/**
		 * Enaza.Console component
		 */
		Enaza.Console		= (function(pub, $) {
			
			var
                _options 	= {
                    debug		: false,
                    types       : ['log','init','warn','info','time']
                }
                ,_getTime 		= function(){
                    var currentTime = new Date();
                    var hours 		= currentTime.getHours();
                    var minutes 	= currentTime.getMinutes();
                    var seconds 	= currentTime.getSeconds();
                    
                    if (minutes < 10)
                        minutes 	= "0" + minutes;
                    
                    if (seconds < 10)
                        seconds 	= "0" + seconds;
                    
                    return hours + ":" + minutes + ":" + seconds;
                }
                ,_redefine        = function(_types){
                    
                    if (Function.prototype.bind && (typeof console === 'object' || typeof console === 'function') && typeof console.log == "object") {
                        ["log","info","warn","error","assert","dir","clear","profile","profileEnd"].forEach(function (method) {
                            console[method] = this.call(console[method], console);
                        }, Function.prototype.bind);
                    }
                    
                    if (!window.log) {
                        window.log = function () {
                            log.history = log.history || [];  // store logs to an array for reference
                            log.history.push(arguments);
                            if (typeof console != 'undefined' && typeof console.log == 'function') {
                            
                                if (window.opera) {
                                    var i = 0;
                                    while (i < arguments.length) {
                                        console.log("Item " + (i+1) + ": " + arguments[i]);
                                        i++;
                                    }
                                }
                                
                                // All other modern browsers
                                else if ((Array.prototype.slice.call(arguments)).length == 1 && typeof Array.prototype.slice.call(arguments)[0] == 'string') {
                                    console.log( (Array.prototype.slice.call(arguments)).toString() );
                                }
                                else {
                                    console.log( Array.prototype.slice.call(arguments) );
                                }
                            }
                            
                            // IE8
                            else if (!Function.prototype.bind && typeof console != 'undefined' && typeof console.log == 'object') {
                                Function.prototype.call.call(console.log, console, Array.prototype.slice.call(arguments));
                            }
                            
                            // IE7 and lower, and other old browsers
                            else {
                                // Inject Firebug lite
                                if (!document.getElementById('firebug-lite')) {
                                    var script      = document.createElement('script');
                                        script.type = "text/javascript";
                                        script.id   = 'firebug-lite';
                                        script.src  = 'https://getfirebug.com/firebug-lite.js';
                                    document.getElementsByTagName('HEAD')[0].appendChild(script);
                                    setTimeout(function () { log( Array.prototype.slice.call(arguments) ); }, 2000);
                                } else {
                                    setTimeout(function () { log( Array.prototype.slice.call(arguments) ); }, 500);
                                }
                            }
                        };
                    }
                };
            			
                
			pub.init 		= function(site, options) {
				$.extend(true, _options, options);
                //_redefine(options.types);
			};

			pub.log 		= function(message){
				console.log(message);
			};
			
			pub.warn 		= function(message){
				console.warn(message);
			};
			
			pub.info 		= function(message){
				console.info(message);
			};
			
			pub.time 		= function(message){
				console.log("["+_getTime()+"] "+message);
			};
			
			return pub;

		}(Enaza.Console || {}, jQuery));	
		
		/**
		 * Enaza.Events components
		 */
		Enaza.Events		= (function(pub, $) {
			
			var _options 	= {
				debug		: false
			};
			
			pub.events		= {};
			
			
			pub.init 		= function(site, options) {
				//extend default params
				$.extend(true, _options, options);
			};
			
			/**
			 * Bind action to element 
 			 * @param {Object} 		object 		- current object or element
 			 * @param {Event} 		event		- event
 			 * @param {Function}	callback	- callback function
			 */
			pub.bind 		= function(object, event, callback){
				$(object).live(event, callback);
				var calls = pub.events || (events = {});
				var list  = calls[event] || (calls[event] = []);
				list.push([object, event]);
				return this;
			};
			
			/**
			 * Unbind action to element 
 			 * @param {Object} 		object 		- current object or element
 			 * @param {Event} 		event		- event
 			 * @param {Function}	callback	- callback function
			 */
			pub.unbind		= function(object, event, callback){
				//эмулируем наш callback
				var _callback = callback;
				//отпишем от события
				if($(object).off(event)){
					//удалим из observer
					var _event = pub.events[event];
					if(_event.length > 0){
						$.each(_event, function(key, value){
						if(value[0] == object && value[1]==event){
						  _event.splice(key, 1);
						}
						});
					 }
					//все прошло удачно, вызываем callback
					_callback();
				}
			};
			
			/**
			 * Subscribe to triger 
 			 * @param {Object} 		object 		- current object or element
 			 * @param {Event} 		event		- event
 			 * @param {Function}	callback	- callback function
			 */
			pub.trigger		= function(object, event, callback){
				//эмулируем наш callback
				var _callback = callback;
				if($(object).trigger(event)){
					_callback();
				}
			};
			
			pub.add 		= function(eventName, callback){
				return pub.events[eventName] = callback;
			};
			
			pub.call 		= function(eventName, data){
				return pub.events[eventName](data);
			};
			
			pub.remove 		= function(eventName){
				delete pub.events[eventName];
			}
			
			return pub;
			
		}(Enaza.Events || {}, jQuery));
		
		/**
		 * Enaza.Extensions component
		 */
		Enaza.Extensions 	= (function(pub, $) {
			
			var _options 	= {
					debug		: false
				};
				
			pub.init 		= function(site, options) {
				//extend default params
				$.extend(true, _options, options);
				
				//try to load and init extension
				_.each(options, function(_key, _value){
					require(_key.split(), function(_module){
						Enaza.Console.time("extension: "+_module.name+" was loaded");
					});
				});

			};
			
			return pub;
			
		}(Enaza.Extensions || {}, jQuery));
		
		
		Enaza.Utils 		= (function(pub, $) {
			
			pub.unixToHuman 	= function(d){
				if(typeof d === 'number') d = new Date(d);
				if(!(d instanceof Date)) return d;
				function pad(n){return n<10 ? '0'+n : n}
				return pad(d.getHours()) + ":"
						+ pad(d.getMinutes()) + ":"
						+ pad(d.getSeconds());
				
			
			};
			
			
			return pub;
		
		}(Enaza.Utils || {}, jQuery));
		
		
	return window.Enaza;
});
