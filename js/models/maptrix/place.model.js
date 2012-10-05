define(['jQuery', 'Enaza'], function($, Enaza){
	
	return Enaza.Models.Place = (function(pub, $) {
		
		pub.name 		= "place";
		
		pub.getCategory 	= function(_fromDate){
			var _ajax 		= Enaza.Core.ajax;
			var _options 	= {
				url 	: "/place/getCategory/",
				type	: "POST",
				dataType: 'json'
				
			};
			var _data 		= {
				fromDate			: _fromDate,
			};
			
			return _ajax(_data,_options);
		};
		
		/**
		 * 
	 	 * @param {Object} _latitude
	 	 * @param {Object} _longitude
	 	 * @param {Object} _name
	 	 * @param {Object} _tags
	 	 * @param {Object} _category
		 */
		pub.add 			= function(_latitude, _longitude, _name, _tags, _category){
			var _ajax 		= Enaza.Core.ajax;
			var _options 	= {
				url 	: "/place/add/",
				type	: "POST",
				dataType: 'json'
			};
			
			var _data 		= {
				latitude			: _latitude,
				longitude			: _longitude,
				name				: _name,
				tags				: _tags,
				category			: _category
			};
			
			return _ajax(_data,_options);		
		};
		
		/**
		 * 
	 	 * @param {Object} _latitude
	 	 * @param {Object} _longitude
	 	 * @param {Object} _radius
	 	 * @param {Object} _query
	 	 * @param {Object} _category
		 */	
		pub.search 		= function(_latitude, _longitude, _radius, _query, _category){
			var _ajax 		= Enaza.Core.ajax;
			var _options 	= {
				url 	: "/place/search/",
				type	: "POST",
				dataType: 'json'
			};
			var _data 		= {
				latitude			: _latitude,
				longitude			: _longitude,
				radius 				: _radius,
				query 				: _query,
				category			: _category
			};
			
			return _ajax(_data,_options);
		};
		
		/**
		 * 
	 	 * @param {Object} _latitude1
	 	 * @param {Object} _longitude1
	 	 * @param {Object} _latitude2
	 	 * @param {Object} _longitude2
	 	 * @param {Object} _query
	 	 * @param {Object} _category
		 */
		pub.searchByRectangle 	= function(_latitude1, _longitude1, _latitude2, _longitude2, _query, _category){
			var _ajax 		= Enaza.Core.ajax;
			var _options 	= {
				url 	: "/place/searchByRectangle/",
				type	: "POST",
				dataType: 'json'
			};
			var _data 		= {
				latitude			: _latitude,
				longitude			: _longitude,
				radius 				: _radius,
				query 				: _query,
				category			: _category
			};
			
			return _ajax(_data,_options);
		};
		
		/**
		 * 
	 	 * @param {Object} _placeId
	 	 * @param {Object} _file
	 	 * @param {Object} _comment
	 	 * @param {Object} _privacy
		 */
		pub.addPhoto			= function(_placeId, _file, _comment, _privacy){
			var _ajax 		= Enaza.Core.ajax;
			var _options 	= {
				url 	: "/place/addPhoto/",
				type	: "POST",
				dataType: 'json'
			};
			var _data 		= {
				placeId : _placeId,
				file 	: _file,
		 		comment	: _comment,
		 		privacy : _privacy
			};
			
			return _ajax(_data,_options);
			
		};
		
		/**
		 * 
	 	 * @param {Object} _id
	 	 * @param {Object} _photoLimit
	 	 * @param {Object} _commentLimit
	 	 * @param {Object} _whoWasHereLimit
		 */
		pub.getFullPlaceData 	= function(_id, _photoLimit, _commentLimit, _whoWasHereLimit){
			var _ajax 		= Enaza.Core.ajax;
			var _options 	= {
				url 	: "/place/getFullPlaceData/",
				type	: "POST",
				dataType: 'json'
			};
			var _data 		= {
				id 				: _id,
				photoLimit 		: _photoLimit,
				commentLimit 	: _commentLimit,
		 		whoWasHereLimit	: _whoWasHereLimit
			};
			
			return _ajax(_data,_options);
		};
		
		/**
		 * 
	 	 * @param {Object} _offset
	 	 * @param {Object} _limit
		 */
		pub.getPhotos			= function(_offset, _limit){
			var _ajax 		= Enaza.Core.ajax;
			var _options 	= {
				url 	: "/place/getPhotos/",
				type	: "POST",
				dataType: 'json'
			};
			var _data 		= {
				offset	: _offset,
				limit 	: _limit
			};
			
			return _ajax(_data,_options);
		};
		
		/**
		 * 
	 	 * @param {Object} _id
	 	 * @param {Object} _offset
	 	 * @param {Object} _limit
		 */
		pub.getComments		= function(_id, _offset, _limit){
			var _ajax 		= Enaza.Core.ajax;
			var _options 	= {
				url 	: "/place/getComments/",
				type	: "POST",
				dataType: 'json'
			};
			var _data 		= {
				id		: _id,
				offset 	: _offset,
				limit 	: _limit
			};
			
			return _ajax(_data,_options);
		};
		
		/**
		 * 
	 	 * @param {Object} _id
	 	 * @param {Object} _offset
	 	 * @param {Object} _limit
		 */
		pub.getVisitors 	 	= function(_id, _offset, _limit){
			var _ajax 		= Enaza.Core.ajax;
			var _options 	= {
				url 	: "/place/getVisitors/",
				type	: "POST",
				dataType: 'json'
			};
			var _data 		= {
				id		: _id,
				offset 	: _offset,
				limit 	: _limit
			};
			
			return _ajax(_data,_options);
		};
		
		return pub;
		
	}(Enaza.Models.Place || {}, jQuery));

});