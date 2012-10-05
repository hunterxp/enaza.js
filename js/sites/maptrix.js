//default params
var _params = {
	core 		: {},
    console		: {debug : true, types : ['log','init','warn','info','time']},
	//model components
	models 		: [
					"models/friend.model"
					,"models/geo.model"
					,"models/instrument.model"
					,"models/place.model"
					,"models/user.model"
	],
	//module components
	modules 	: [
				    "modules/fullAjax/module"
				   ,"modules/tooltip/module"
				   ,"modules/map/module"
				   ,"modules/user/module"
				   ,"modules/chat/module"
				   ,"modules/notify/module"
	],
	//components for load
	extensions 	: [
				    "modules/fullAjax/ext/maptrix"
	]
};

//set require config
require.config({
	baseUrl	: "/web/static/enaza.js/js/",
	paths	: {
		jQuery 		: "external/jquery-1.7.2.min",
		underscore	: "external/underscore-min",
		tmpl		: "external/jquery.tmpl.min",
		Enaza		: "enaza.bundle",
		external 	: "external",
		models 		: "models/maptrix/",
		modules 	: "modules"
	}
});

define(["Enaza","jQuery","underscore"],function(Enaza, $, _){
	Enaza.init("maptrix", _params);
});