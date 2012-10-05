define(['jQuery', 'Enaza'], function($, Enaza){
	
	/**
	 * Enaza.Models.Friends - work with friend API object
	 */
	return Enaza.Models.Friend = (function(pub, $) {
		
		pub.name 		= "friend";
		
		pub.add 	= function(_friend){
			var _ajax 		= Enaza.Core.ajax;
			var _options 	= {
				url 	: "/friend/add/",
				type	: "POST",
				dataType: 'json'
			};
			var _data 		= {
				id: _friend
			};
			
			return _ajax(_data,_options);
		};
		
		/**
		 * 
	 	 * @param {Object} _friend
		 */
		pub.approve 		= function(_friend){
			var _ajax 		= Enaza.Core.ajax;
			var _options 	= {
				url 	: "/friend/approve/",
				type	: "POST",
				dataType: 'json'
			};
			var _data 		= {
				id: _friend
			};
			
			return _ajax(_data,_options);
		};
		
		/**
		 * 
	 	 * @param {Object} _friend
		 */
		pub.block 			= function(_friend){
			var _ajax 		= Enaza.Core.ajax;
			var _options 	= {
				url 	: "/friend/block/",
				type	: "POST",
				dataType: 'json'
			};
			var _data 		= {
				id: _friend
			};
			
			return _ajax(_data,_options);
		};
		
		/**
		 * OD
	 	 * @param {Object} _friend
		 */
		pub.unblock 		= function(_friend){
			var _ajax 		= Enaza.Core.ajax;
			var _options 	= {
				url 	: "/friend/unblock/",
				type	: "POST",
				dataType: 'json'
			};
			var _data 		= {
				id: _friend
			};
			
			return _ajax(_data,_options);
		};
		
		/**
		 * 
	 	 * @param {Object} _friend
		 */
		pub.deleteFriend	= function(_friend){
			var _ajax 		= Enaza.Core.ajax;
			var _options 	= {
				url 	: "/friend/delete/",
				type	: "POST",
				dataType: 'json'
			};
			var _data 		= {
				id: _friend
			};
			
			return _ajax(_data,_options);
		};
		
		/**
		 * 
	 	 * @param {Object} _friend
		 */
		pub.reject 		= function(_friend){
			var _ajax 		= Enaza.Core.ajax;
			var _options 	= {
				url 	: "/friend/reject/",
				type	: "POST",
				dataType: 'json'
			};
			var _data 		= {
				id: _friend
			};
			
			return _ajax(_data,_options);
		};
		
		/**
		 * 
	 	 * @param {Object} _states
		 */
		pub.get 			= function(_states, _limit){
			var _ajax 		= Enaza.Core.ajax;
			var _options 	= {
				url 	: "/friend/get/",
				type	: "POST",
				dataType: 'json'
			};
			var _data 		= {
				states: _states,
				limit : _limit
			};
			
			return _ajax(_data,_options);
		};
		
		return pub;
	
	}(Enaza.Models.Friend || {}, jQuery));

});