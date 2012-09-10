//default params
var _params = {
	core 		: [],
	models 		: ["models/example.model"],
	modules 	: ["modules/fullAjax/module","modules/highlight/module"],
	extensions 	: ["modules/fullAjax/ext/default", "modules/highlight/ext/default"]
};

//set require config
require.config({
	baseUrl	: "/js/",
	paths	: {
		jQuery 		: "external/jquery-1.7.2.min",
		underscore	: "external/underscore-min",
		Enaza		: "enaza.bundle",
		external 	: "external",
		models 		: "models/default",
		modules 	: "modules"
	}
});

define(["Enaza","jQuery","underscore"],function(Enaza, $, _){
	Enaza.init("maptrix", _params);
});