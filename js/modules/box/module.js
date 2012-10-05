define(["jQuery", "Enaza", "external/jquery.colorbox-min"], function ($, Enaza) {
	return Enaza.Modules.Box  = (function (pub, $) {
		var _options = {
			"resize": true
		};

		/**
		 * Colorboxes history object
		 * @type {Object}
		 */
		var _history = {
			back : function (depth) {},
			clear : function () {},
			pop : function () {}
		};

		/**
		 * I called this module box
		 * @type {String}
		 */
		pub.name = "Box";

		/**
		 * Module was loaded
		 */
		pub.init = function () {};
		
		/**
		 * DOM is ready
		 */
		pub.domReady	= function () {
			var params = pub.options || {};

			$.each(params, function (key, value) {
				_options = $.extend(true, {}, _options, value);
			});

			/**
			 * Add close handler
			 */
			$(document).on("click", ".js_cancel", function (e) {
				e.preventDefault();

				Enaza.Modules.Box.close();
			});

			/**
			 * Open colorbox by id in data-boxId attr
			 */
			$(document).on("click", ".js_showboxID", function (e) {
				e.preventDefault();

				Enaza.Modules.Box.open({
					title: $(this).data().boxTitle,
					inline: true,
					scrolling: false,
					speed: 300,
					href: "#" + $(this).data().boxId
				});
			});

			/**
			 * Close colorbox on ajax starting
			 */
			$(window).on("ajaxUrl_start", function () {
				Enaza.Modules.Box.close();
			});
		};

		/**********************************************************************
		 * Standard Colorbox methods wrapper                                  *
		 **********************************************************************/
		/**
		 * Public colorbox open method 
		 * @param  {Object} opt Options object
		 * @return {Object}     Colorbox object
		 */
		pub.open = function (opt) {
			var param = $.extend(true, {}, _options, opt);

			$.colorbox(param);
			if (param.resize) {
				$("#colorbox").on("cbox_complete", function (e) {
					$.colorbox.resize();
				});
			} else {
				$("#colorbox").off("cbox_complete"});
			};
		};

		/**
		 * Method that initiates the close sequence. 
		 * NB! The lightbox will be completely closed only 
		 * when the cbox_closed event / onClosed callback is fired
		 */
		pub.close = function () {
			$.colorbox.close();
		};

		/**
		 * Method to move previous item in a group
		 */
		pub.prev = function () {
			$.colorbox.prev();
		};

		/**
		 * Method to move next item in a group
		 */
		pub.next = function () {
			$.colorbox.next();
		};

		/**
		 * Method that allows Colorbox to be resized automatically
		 * or to a specific size
		 * @param  {Object} param Colorbox resize parameters: width, height, 
		 *                        innerWidth, innerHeight
		 */
		pub.resize = function (param) {
			$.colorbox.resize(param);
		};

		/**
		 * Removes all traces of Colorbox from document
		 * @return {[type]} [description]
		 */
		pub.remove = function () {
			$.colorbox.remove();
		};

		/**
		 * Fetch the current HTML element that Colorbox is associated with
		 * @return {Object} jQuery Object containing the element
		 */
		pub.element = function () {
			return $.colorbox.element();
		};

		/**********************************************************************
		 * Custom Colorbox methods to call alert, confirm and messages boxes  *
		 **********************************************************************/
		/**
		 * Shows alert Colorbox
		 * @param  {Object} params Alert message box parametes: title, message etc
		 */
		pub.alert = function (params) {
			this.open({});
		};

		/**
		 * Show confirm Colorbox
		 * @param  {Object} params Confirm message box parametes
		 */
		pub.confirm = function (params) {
			this.open({});
		};

		/**
		 * Message box
		 * @param  {Object} params Simple message box parameters
		 */
		pub.message = function (params) {
			this.open({});
		};

		pub.history = _history;
		
		return pub;
	}(Enaza.Modules.Box || {}, jQuery));
});
