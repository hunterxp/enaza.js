/**
 * Google Maps wrapper
 * @author 	chernbrov@enaza.ru
 * @since	17.09.2012
 */
define(['jQuery', 'Enaza', 'external/jquery.gmap.min','external/customInput.jquery','external/chosen.jquery.min'], function($, Enaza){
	
	return Enaza.Modules.Map  = (function(pub, $) {
		
	
		var
            _map    	= {}
			,_bind 		= {}
			,_markers 	= {}
			,_filters 	= []
			,_position 	= {
				latitude 	: 0,
				longitude 	: 0
			}
			,_container = {}
			//default options
			,_options 	= {
                container  	: "#map_canvas",
				settings 	: {
					zoom						: 14,
					center						: null,
					mapTypeId					: google.maps.MapTypeId.ROADMAP,
					mapTypeControl				: true,
					mapTypeControlOptions		: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU},
					navigationControl			: true,
					navigationControlOptions	: {style: google.maps.NavigationControlStyle.SMALL},
				},
				filters 	: {
					container 	: '.filters form',
					element 	: 'input',
					classs 		: 'standart-checkbox'
				}
            }
			//set user position
			,_positionDetectSuccess = function(_data){
				_position.latitude 	= _data.coords.latitude * 1;
				_position.longitude = _data.coords.longitude * 1;
			}
			//error on detect user position
			,_positionDetectError 	= function(){
				Enaza.Console.log("position doesn't detected");
			}
			//detect user position
			,_detectPosition 		= function(){
				if(navigator.geolocation){
					navigator.geolocation.getCurrentPosition(_positionDetectSuccess, _positionDetectError);
				}
			}
			,_filtersInit 			= function(){
				$(_options.filters.container).each(function(i,elem) {
					if ($(this).find(_options.filters.element).hasClass(_options.filters.classs)) {} else {$(this).find(_options.filters.element).customInput();}
				});
			}
			,_init 					= function(){
				
				//if geo position was seted
				if(userData.latitude)
					_position.latitude 	= userData.latitude * 1;
				if(userData.longitude)
					_position.longitude = userData.longitude * 1;
				
				//if position is null detect on navigator.geolocaction
				if(!_position.latitude  == 0 && !_position.longitude == 0)
					_detectPosition();
				
				//Set Google Map container
				_container 			= $(_options.container);
				
				if(_container.length == 0)
					return false;
				
				//Set default options					
				_options.settings.center 	= new google.maps.LatLng(_position.latitude,_position.longitude);
				//Render map
				_map 						= new google.maps.Map(_container[ 0 ],_options.settings);
				
				//Set user position marker
				pub.addCollection("f-user",[[userData.firstName + " " + userData.lastName,_position.latitude, _position.longitude, 1]]);
				
				console.log(_markers);
				
			}
			/**
			 * Load filter data
			 */
			,_dataLoader			= function(){
				
				_.each(_filters, function(_key, _value){
					
					switch(_key){
						case 'f-place' : {
							Enaza.Models.Place.search(userData.latitude, userData.longitude).success(function(_response){
								if(_response.success === true){
									var _places = [];
									$.each(_response.data, function(_key, _value){
										_places.push([_value.name, _value.latitude * 1, _value.longitude * 1]);
									});
									pub.addCollection(_key, _places);
								}
							});
							
						} break;
						
						case 'f-friends' : {
							Enaza.Models.Friend.get("approve").success(function(_response){
								if(_response.success === true){
									var _friends = [];
									$.each(_response.data.friends.approve, function(_key, _value){
										_friends.push([_value.login, _value.latitude * 1, _value.longitude * 1]);
									});
									pub.addCollection(_key, _friends);
								}
							});
						} break;
					}
				});
				
			};
				
        pub.name 		= "map";
		
		/**
		 * Module was loaded
		 */
		pub.init 		= function(){};
		
		
		/**
		 * DOM is ready
		 */
		pub.domReady	= function(){

			//define components
			var
				_collection = new Collection()
				,_filters 	= new Filters()
				,_bind 		= new Bind()
				,_map 		= new gMaps();

			
			
			//init map
			_map 		= 
			
			
							
				
				
				

			
			/**
			 * Filters pre binder
			 */
			//_bind($(_options.filters.container).find(_options.filters.element),'click', function(e){
			//	
			//	var _filterId = $(this).attr("rel");
			//	if(_.indexOf(_filters, _filterId) == -1)
			//		_filters.push(_filterId)	
			//	else {
			//		pub.removeCollection(_filterId);
			//		_filters = _.without(_filters, _filterId);
			//	}
				
			//	console.log(_filters);
			//	
			//	_dataLoader();
			//});
			
			//_init();
			//_filtersInit();
			//$(window).on('fullAjax.ready',function () {
			//	_init();
			//	_filtersInit();
			//});
			
        };
		
		/**
		 * Google map component
		 */
		gMaps 		= (function($){
			
			var _map  	= {};
			
			/**
			 * Init google map
			 * @param 	object 	container
			 * @param 	object 	settings
			 * @return 	object
			 */
			this.init 	= function(container, settings){
				return _map 	= new google.maps.Map(container,settings);
			};
			
			this.get	= function(){
				return _map;
			}
			
		});
		
		/**
		 * Map markers collection component
		 */
		Collection 	= (function($) {
			
			var _markers = {};
			
			/**
			 * Add markers on map
			 * @param object 	map
			 * @param string 	key
			 * @param array  	markers
			 */
			this.add 		= function(map, key, markers){
				
				var _image = new google.maps.MarkerImage('/web/static/maptrix/images/news_ico/ico_3.png',
					new google.maps.Size(20, 32),
					new google.maps.Point(0,0),
					new google.maps.Point(0, 32)
				);
				
				var _shadow = new google.maps.MarkerImage('/web/static/maptrix/images/news_ico/ico_3.png',
					new google.maps.Size(37, 32),
					new google.maps.Point(0,0),
					new google.maps.Point(0, 32)
				);
				
				var _shape = {
					coord	: [1, 1, 1, 20, 18, 20, 18 , 1],
					type	: 'poly'
				};
				
				var _collection = [];
				for (var i = 0; i < markers.length; i++) {
				  var _place 	= markers[i];
				  var _myLatLng = new google.maps.LatLng(_place[1], _place[2]);
				  var _marker 	= new google.maps.Marker({
					  position	: _myLatLng,
					  map		: map,
					  shadow	: _shadow,
					  icon		: _image,
					  shape		: _shape,
					  title		: _place[0],
					  zIndex	: _place[3]
				  });
					_collection.push(_marker);
				}
				_markers[key] = _collection;
			};
			
			/**
			 * Remove markers from map
			 * @param 	string collection
			 * @return	void 
			 */
			this.remove 		= function(collection){
				if (_markers[collection]) {
					_.each(_markers[collection], function(_key, _value){
						_key.setMap(null);
					});
				}	
			};
		});	
			
		/**
		 * Bind component
		 */
		Bind 	 	= (function($) {
			
			var
				_register 	= {}
				,_bind 		= Enaza.Events.bind;
			
			this.add 	= function(){
				
			};

		});
		
		/**
		 * Filter Component
		 */
		Filters 	= (function($) {
			
			var _filters 	= [];
			
			
		});
		
			
		return pub;
		
	}(Enaza.Modules.Map || {}, jQuery));
	
});