define(['jQuery', 'Enaza'], function($, Enaza){

	/**
	 * [Модель для работы с объектом польщователей]
	 * @return {[void]} [объект карты]
	 */
	return Enaza.Models.Geo = (function(pub, $) {
		
		pub.name 		= "geo";
		
		/**
		 * Установить пользовательские координаты
		 * @param {Object} _latitude 				- Широта
		 * @param {Object} _longitude				- Долгота
		 * @param {Object} _accuracy				- Точность
		 * @param {Object} _includeFriendsCoords	- Включая дружественные координаты
		 * @param {Object} _getCoordsTime			- За последнее время
		 */
		pub.setUserCoords = function(_latitude, _longitude, _accuracy, _includeFriendsCoords, _getCoordsTime){
			var _ajax 		= Enaza.Core.ajax;
		 	var _options 	= {
				url 	: "/geo/setUserCoords/",
				type	: "POST",
				dataType: 'json'
			};
			var _data 		= {
				latitude			: _latitude,
				longitude			: _longitude,
				accuracy			: _accuracy,
				includeFriendsCoords: _includeFriendsCoords,
				getCoordsTime		: _getCoordsTime
			};
			
			return _ajax(_data,_options);
		};
		
		/**
		 * Получение только координат друзей
	 	 * @param {Object} _getCoordsTime
		 */
		pub.getFriendsCoords = function(_getCoordsTime){
			var _ajax 		= Enaza.Core.ajax;
	 		var _options 	= {
				url 	: "/geo/getFriendsCoords/",
				type	: "POST",
				dataType: 'json'
			};
			var _data 		= {
				getCoordsTime			: _getCoordsTime
			};
			
			return _ajax(_data,_options);
		};
		
		return pub;
		
		
	}(Enaza.Models.Geo || {}, jQuery));
});