define(['jQuery', 'Enaza','modules/catalog/module'], function($, Enaza){

	return Enaza.Modules.Catalog = (function(pub, $) {

		'use strict';

		/**
		 * Поменять вид продуктов на странице каталога
		 * @return {[type]} [description]
		 */
		var _changeView = function () {

			$(document).on('click','.view>a',function (e) {
				e.preventDefault();
				var view = 	$(this).data('view');

				$('.view>a').removeClass('active');
				$(this).addClass('active');

				$(pub.options.catalog_box).removeClass('view-full view-short view-text');
				$(pub.options.catalog_box).addClass(view);

			});
		};


		var _menuOpen = function ()  {
			$(document).on('click','.filter-inner-heading>a',function (e) {
				e.preventDefault();

				var id = $(this).attr('href');
				$(id).slideToggle();

			});
		};

		var _filterCatalog = function () {

			var _clearCatalog  = function (category) {

				var catId = category.length > 0 ? category : siteParams.categoryId;

				var param  = {
					offset	   : 0,
					category   : catId
				};

				$.extend(ENAZA_ajaxCatalog,param);
				$(pub.options.catalog_box).empty();
				pub.getProduct();

			};

			
			var checkbox = $('.filter-variants input');
			checkbox.on('change',function () {
				var result 	 = [];
				checkbox.filter(':checked').each(function (k,v) {
					result.push($(this).val());
				});
				_clearCatalog(result.join(','));
			});
		};

		
		pub.name 		= 'Catalog';

		pub.domReady 	= function () {
			_changeView();
			_menuOpen();
			_filterCatalog();
		};


		return pub;

	}(Enaza.Modules.Catalog  || {}, jQuery));
	
});
