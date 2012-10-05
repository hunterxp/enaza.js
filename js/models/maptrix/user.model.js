define(['jQuery', 'Enaza'], function($, Enaza){	
	
	return Enaza.Models.User = (function(pub, $) {
		
		pub.name 		= "user";
		
		/**
		 * @param {String} _socialNetworks		- Идентфикатор социальной сети, по которой надо получить ссылку на авторизацию
		 */
		pub.getAuthLink 	= function(_socialNetwork){
			var _ajax 		= Enaza.Core.ajax;		
			var _options 	= {
				url 	: "/user/getAuthLink/",
				type 	: "POST",
				dataType: 'json'
			};
			var _data 		= {
				socialNetwork : _socialNetwork
			};
			
			return _ajax(_data,_options);
		};
		
		/**
		 * Обновление данных текущего пользователя
		 * @param {String} _login		- Логин
		 * @param {String} _firstName	- Имя
		 * @param {String} _lastName	- Фамилия
		 * @param {String} _sex			- Пол
		 * @param {String} _birthDay	- День рождения
		 * @param {String} _phone		- Телефон
		 * @param {String} _photo		- Фото
		 */
		pub.updateUserData = function(_login, _firstName, _lastName, _sex, _birthDay, _phone, _photo){
			var _ajax 		= Enaza.Core.ajax;
			var _options 	= {
				url 	: "/user/updateUserData/",
				type	: "POST",
				dataType: 'json'
			};
			
			var _data 		= {
				login 		: _login,
				firstName 	: _firstName,
				lastName 	: _lastName,
				sex 		: _sex,
				birthDay 	: _birthDay,
				phone 		: _phone,
				photo 		: _photo
			};
			
			return _ajax(_data,_options);
		};
		
		/**
		 * Поиск пользователя
	 	 * @param {String} _query		- Запрос
		 */
		pub.search 		= function(_query){
			var _ajax 		= Enaza.Core.ajax;
			var _options 	= {
				url 	: "/user/search/",
				type	: "POST",
				dataType: 'json'
			};
			var _data 		= {
				query: _query
			};
			
			return _ajax(_data,_options);
		};
		
		/**
		 * Поиск по jabber логину 
	     * @param {Object} _login 		- Имя пользователя
		 */
		pub.userByJabberLogin 	= function(_login){
			var _ajax 		= Enaza.Core.ajax;
			var _options 	= {
				url 	: "/user/userByJabberLogin/",
				type	: "POST",
				dataType: 'json'
			};
			
			var _data 		= {
				login: _login
			};
			
			return _ajax(_data,_options);
		};
		
		/**
		 * Получение данных по идентификаору пользователя
	  	 * @param {Object} _ids			- идентификаторы пользователей через запятую
		 */
		pub.getUsersData 	= function(_ids, _full){
			var _ajax 		= Enaza.Core.ajax;
			var _options 	= {
				url 	: "/user/getUsersData/",
				type	: "POST",
				dataType: 'json'
			};
			var _data 		= {
				ids		: _ids,
				full 	: (_full || false)
			};
			
			return _ajax(_data,_options);
		};
		
		/**
		 * Чекин пользователя
	 	 * @param {Object} _place		- Идентификатор места
		 */	
		pub.checkIn 		= function(_place){
			var _ajax 		= Enaza.Core.ajax;
			var _options 	= {
				url 	: "/user/checkIn/",
				type	: "POST",
				dataType: 'json'
			};
			
			var _data 		= {
				place: _place
			};
			
			return _ajax(_data,_options);
		};
		
		/**
		 * 
		 */
		pub.unCheckIn 		= function(){
			var _ajax 		= Enaza.Core.ajax;
			var _options 	= {
				url 	: "/user/unCheckIn/",
				type	: "POST",
				dataType: 'json'
			};
			
			var _data 		= {};
			
			return _ajax(_data,_options);
		};
		
			/**
		 * 
		 */
		pub.searchAround 		= function(_latitude, _longitude, _showFriends, _sex){
			var _ajax 		= Enaza.Core.ajax;
			var _options 	= {
				url 	: "/user/searchAround/",
				type	: "POST",
				dataType: 'json'
			};
			
			var _data 		= {
				latitude 	: _latitude,
				longitude 	: _longitude,
				showFriends : _showFriends,
				sex 		: _sex
			};
			
			return _ajax(_data,_options);
		};

		
		return pub;
		
	}(Enaza.Models.User || {}, jQuery));

});