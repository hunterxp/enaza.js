define(['jQuery', 'Enaza','tmpl','external/bootstrap.min'], function($, Enaza){
	
	return Enaza.Modules.User  = (function(pub, $) {

		var _options = {
				possibleFriends : {
					states 		: "approve,possible",
					limit 		: 3,
					tpl 		: "#possibleFriendsTpl",
					container 	: ".possibleFriendsContainer"
				},
				addFriend 		: {
					handler 	: ".addFriend",
					action 		: "click",
					id 			: "rel"
				}
			}
			,_bind 	= {}
			//Загружаем список возможных друзей
			,_loadPossibleFriends = function(){
				Enaza.Models.Friend.get(_options.possibleFriends.states, _options.possibleFriends.limit).success(function(_response){

					$(_options.possibleFriends.container).find(".possibleFriends").remove();
					
					if(_.keys(_response.data.friends.possible).length > 0) {
						
						$(_options.possibleFriends.container).removeClass("hide");
						_template = _.template($(_options.possibleFriends.tpl).html());
						$(_template(_response)).appendTo(_options.possibleFriends.container);
					}

				});	
			};

		pub.name 		= "user";

		/**
		 * Module was loaded
		 */
		pub.init 		= function(){};
		
		/**
		 * DOM is ready
		 */
		pub.domReady	= function(){
			
			
			var _bind 		= Enaza.Events.bind;
			
			pub.Action 		= new Action(this, $);
			
			_bind(".nav-tabs a","click",function (e) {
				$(this).tab('show');
				e.preventDefault();
			});
			
			_bind(".addUser","click", function(e){
				Enaza.Modules.User.Action.add(this, $(this).attr("rel"));
				e.preventDefault();
			});
			
			_bind(".approveUser","click", function(e){
				Enaza.Modules.User.Action.approve(this, $(this).attr("rel"));
				e.preventDefault();
			});
			
			_bind(".blockUser","click", function(e){
				Enaza.Modules.User.Action.block(this, $(this).attr("rel"));
				e.preventDefault();
			});
			
			_bind(".unblockUser","click", function(e){
				Enaza.Modules.User.Action.unblock(this, $(this).attr("rel"));
				e.preventDefault();
			});
			
			_bind(".deleteUser","click", function(e){
				Enaza.Modules.User.Action.deleteFriend(this, $(this).attr("rel"));
				e.preventDefault();
			});
			
			_bind(".rejectUser","click", function(e){
				Enaza.Modules.User.Action.reject(this, $(this).attr("rel"));
				e.preventDefault();
			});
			
			_loadPossibleFriends();
			
			$(window).on('fullAjax.ready',function () {
				_loadPossibleFriends();
			});
			
		};
		
		var Action 		= function(self, $){
			
			this.add 		= function(element, id){
				Enaza.Models.Friend.add(id).success(function(_response){
					if(_response.success == true)
						$(element).parents(".enterGroup-message").toggle();
				});
			};
			
			this.approve 		= function(element, id){
				Enaza.Models.Friend.approve(id).success(function(_response){
					if(_response.success == true)
						$(element).parents(".enterGroup-message").toggle();
				});
			};
			
			this.block			= function(element, id){
				Enaza.Models.Friend.block(id).success(function(_response){
					if(_response.success == true)
						$(element).parents(".enterGroup-message").toggle();
				});
			};
			
			this.unblock		= function(element, id){
				Enaza.Models.Friend.unblock(id).success(function(_response){
					if(_response.success == true)
						$(element).parents(".enterGroup-message").toggle();
				});	
			};
			
			this.deleteFriend	= function(element, id){
				Enaza.Models.Friend.deleteFriend(id).success(function(_response){
					if(_response.success == true)
						$(element).parents(".enterGroup-message").toggle();
				});
			};
			
			this.reject			= function(element, id){
				Enaza.Models.Friend.reject(id).success(function(_response){
					if(_response.success == true)
						$(element).parents(".enterGroup-message").toggle();
				});
			};
			
		};
		
						
		return pub;
		
	}(Enaza.Modules.User || {}, jQuery));
	
});