/**
 * Google Maps wrapper
 * @author 	chernbrov@enaza.ru
 * @since	17.09.2012
 */
define(['jQuery', 'Enaza', 'external/jquery.gmap.min','external/customInput.jquery','external/chosen.jquery.min'], function($, Enaza){
	
	return Enaza.Modules.Map  = (function(pub, $) {
		
        pub.name 		= "map";
		
		/**
		 * Module was loaded
		 */
		pub.init 		= function(){};
		
		/**
		 * DOM is ready
		 */
		pub.domReady	= function(){
			
				
			pub.GoogleMap 	= new GoogleMap($, 		this);
			pub.Collection	= new Collection($, 	this)
			pub.Filters 	= new Filters($, 		this);
			pub.Bind 		= new Bind($, 			this);
			pub.DataManager = new DataManager($,	this);
			pub.Effects 	= new Effects($,		this);
			
			var _currentUser = {
				user : {
					name 		: userData.firstName + " " + userData.lastName,
					latitude 	: userData.latitude,
					longitude 	: userData.longitude,
					index 		: 1000,
					photo 		: userData.avatar
				}
			};
			
			if(this.GoogleMap.init()){
				//Effects
				//checkbox view
				this.Effects.filterCheckbox();
				//filter form toggle
				this.Effects.filterToggle();
				//Set user marker
				this.Collection.add(this.GoogleMap.get(), "f-user", _currentUser);	
			}
			
			//Binds
			this.Bind.filters();
				
			//full ajax
			$(window).on('fullAjax.ready',function () {
				
				var self 	= this.Enaza.Modules.Map;
				
					if(self.GoogleMap.init()){
						self.Effects.filterCheckbox();
						self.Collection.show(self.Collection.get());
						self.Collection.add(self.GoogleMap.get(), "f-user", _currentUser);	
					}
			});
			
        };
		
		/**
		 * Google map component
		 */
		GoogleMap 	= (function($, self){
			
			var
				_map  		= false
				,_container = false
				,_options 	= {
					container : "#map_canvas",
					settings  : {
						zoom						: 15,
						center						: new google.maps.LatLng(57.9874171,56.2081335),
						mapTypeId					: google.maps.MapTypeId.ROADMAP,
						mapTypeControl				: true,
						mapTypeControlOptions		: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU},
						navigationControl			: true,
						navigationControlOptions	: {style: google.maps.NavigationControlStyle.SMALL},
					}
				}
				,geoPosition 	= function(){
					if(navigator.geolocation){
						navigator.geolocation.getCurrentPosition(_positionDetectSuccess, _positionDetectError);
					}
				};
			
			/**
			 * Init google map
			 * @param 	object 	container
			 * @param 	object 	settings
			 * @return 	object
			 */
			this.init 	= function(){
				_container 	= $(_options.container);
				if(_container.length != 0)
					return _map = new google.maps.Map(_container[ 0 ],_options.settings);
			};
			
		
			/**
			 * Set center position
			 * @param 	float 	latitude
			 * @param 	float 	longitude
			 * 
			 */
			this.center = function(latitude, longitude){
				_options.settings.center = new google.maps.LatLng(latitude * 1,longitude * 1);
			};
			
			/**
			 * Set zoome level
			 * @parm 	int 	zoomLevel
			 */
			this.zoom 	= function(zoomLevel){
				_options.settings.zoom = zoomLevel;
			};
						
			/**
			 * Get map object
			 */
			this.get	= function(){
				return _map;
			};
			
		});
		
		/**
		 * Map markers collection component
		 */
		Collection 	= (function($, self) {
			
			var _markers = {};
			
			/**
			 * Add markers on map
			 * @param object 	map
			 * @param string 	key
			 * @param array  	markers
			 */
			this.add 		= function(map, key, markers){

				var _shape = {
					coord	: [1, 1, 1, 20, 18, 20, 18 , 1],
					type	: 'poly'
				};
				
				var _collection = [];
				var _pin 	= '/web/static/maptrix/images/news_ico/ico_3.png';
				_.each(markers, function(_value, _key){
					
					if(_value.photo)
						_pin 	= "/userupload/"+_value.photo;
					
					var _marker 	= new google.maps.Marker({
							position	: new google.maps.LatLng(_value.latitude * 1, _value.longitude * 1),
							map			: map,
							shadow		: new google.maps.MarkerImage('/web/static/maptrix/images/news_ico/ico_3.png',
												new google.maps.Size(57, 52),
												new google.maps.Point(0,0),
												new google.maps.Point(0, 52)
							),
							icon		: new google.maps.MarkerImage('/web/static/maptrix/images/news_ico/ico_3.png',
												new google.maps.Size(50, 52),
												new google.maps.Point(0,0),
												new google.maps.Point(0, 52)
							),
							shape		: _shape,
							title		: (_value.name 	|| _value.firstName+" "+_value.lastName),
							zIndex		: (_value.index || 10)
					});
					_collection.push(_marker);
				});
				
				_markers[key] = _collection;
			};
			
			/**
			 * Remove markers from map
			 * @param 	string collection
			 * @return	void 
			 */
			this.remove 	= function(collection){
				if (_markers[collection]) {
					_.each(_markers[collection], function(_key, _value){
						_key.setMap(null)
					});
					delete _markers[collection];
				}
			};
			
			/**
			 * Get markers
			 * @return object
			 */
			this.get 		= function(){
				return _markers;
			}
			
			this.show 		= function(collection){
				_.each(collection, function(_value, _key){
					_.each(_value, function(_mark, _makrKey){
						_mark.setMap(self.GoogleMap.get());
					});
				});
			};
		});	
		
		/**
		 * Bind component
		 */
		Bind 	 	= (function($, self) {
			
			var
				_register 	= {}
				,_bind 		= Enaza.Events.bind
				,_options 	= {
					filters 	: {
						container 	: '.filters form',
						element 	: 'input',
						classs 		: 'standart-checkbox'
					}	
				}
			
			this.filters 	= function(){
				//Binds on filter elements
				_bind($(_options.filters.container).find(_options.filters.element),'click', function(e){
					self.Filters.add($(this).attr("rel"), function(_filters){
						self.DataManager.get("filters", _filters, function(_data){
								
						});
					});
				});
			};
				

		});
		
		/**
		 * Filters Component
		 */
		Filters 	= (function($, self) {
			
			var _filters 	= ["f-user"];
			
			/**
			 * Add filter to filters array
			 * @param 	string 		filterId
			 * @param 	function callback function
			 * @return 	callback function
			 */
			this.add 		= function(filterId, callback){
				
				var _callback = callback;
				
				if(_.indexOf(_filters, filterId) == -1)
					_filters.push(filterId)
				else {
					self.Collection.remove(filterId);
					_filters = _.without(_filters, filterId);
				}
				
				_callback(_filters);
			};
			
			/**
			 * Remove filter from collection
			 * @param 	string 		filterId
			 * @param 	function 	callback function
			 * @return 	callback function
			 */
			this.remove 	= function(filterId, callback){
				var _callback = callback;
				_filters = _.without(_filters, _filterId);
				_callback(_filters);
			};
			
			/**
			 * Get filters collection
			 * @param 	function callback function
			 * @return 	callback function
			 */
			this.get 		= function(callback){
				var _callback = callback;
				_callback(_filters);
			};

		});
		
		/**
		 * User position
		 */
		Position 	= (function($, self) {
			
			var _position = {
				latitude : 59,
				longitude : 57
			};
			
			this.set 	= function(latitude, longitude){
				return _position = {
					latitude : latitude,
					longitude : longitude
				}
			}
			
			this.get 	= function(){
				return _position;
			}
		
		});
		
		/**
		 * Map data manager
		 */
		DataManager	= (function($, self){
				
			var _storage 	= {};
			
			this.set 		= function(key, value, lifetime){};
			
			this.get 		= function(key, ids, callback){
				
				var _callback = callback;
				var _data 	  = [];
				
				var _collections = self.Collection.get();
				
				_.each(ids, function(_value, _key){
					switch(_value){
						
						case 'f-place' : {
							if(!_collections[_value] || _collections[_value].length == 0){
								Enaza.Models.Place.search(userData.latitude, userData.longitude).success(function(_response){
									self.Collection.add(self.GoogleMap.get(),_value, _response.data);
								});	
							}
							
						} break;
						
						case 'f-friends' : {
							if(!_collections[_value] || _collections[_value].length == 0){
								Enaza.Models.Friend.get("approve").success(function(_response){
									self.Collection.add(self.GoogleMap.get(),_value, _response.data.friends.approve);
								});
							}
						} break;

						
						case 'f-peopleAround' : {
							if(!_collections[_value] || _collections[_value].length == 0){
								Enaza.Models.User.searchAround(userData.latitude, userData.longitude).success(function(_response){
									self.Collection.add(self.GoogleMap.get(),_value, _response.data);
								});
							}
						} break;
						
						
						case 'f-woman' : {
							
							if(!_collections[_value] || _collections[_value].length == 0){
								Enaza.Models.User.searchAround(userData.latitude, userData.longitude, false, 'woman').success(function(_response){
									self.Collection.add(self.GoogleMap.get(),_value, _response.data);
								});
							}
							
						} break;
						
						case 'f-man' : {
							if(!_collections[_value] || _collections[_value].length == 0){
								Enaza.Models.User.searchAround(userData.latitude, userData.longitude, false, 'man').success(function(_response){
									self.Collection.add(self.GoogleMap.get(),_value, _response.data);
								});
							}
						} break;
						
					}
				});
					
			}
			
		});
		
		/**
		 * Effects
		 */
		Effects 	= (function($, self){
			
			var _options = {
				filterToggle : {
					container : ".fheader",
					element	  : ".filtr",
					action 	  : "click"
				},
				filters 	: {
					container 	: '.filters form',
					element 	: 'input',
					classs 		: 'standart-checkbox'
				}	
			}
			,_bind 		= Enaza.Events.bind;
			
			this.filterToggle 	= function(){
				_bind(_options.filterToggle.container, _options.filterToggle.action, function(e){
					$(_options.filterToggle.element).slideToggle(250);
					e.preventDefault();
				});
			};
			
			this.filterCheckbox = function(){
					
				self.Filters.get(function(_filters){
					_.each(_filters, function(_value, _key){
						$(_options.filters.container).find("input[rel="+_value+"]").attr("checked","checked");
					});
				})
				
				//Apply checkbox styles
				$(_options.filters.container).each(function(i,elem) {
					if ($(this).find(_options.filters.element).hasClass(_options.filters.classs)) {} else {$(this).find(_options.filters.element).customInput();}
				});
			};
			
		});
		
			
		return pub;
		
	}(Enaza.Modules.Map || {}, jQuery));
	
});