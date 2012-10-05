var _params = {
	core 		: [],
	models 		: ["models/topsales.model"],
	modules 	: [
		"modules/fullAjax/module",
		"modules/silderDragdealer/module",
		"modules/preloader/module",
		"modules/shopwindow/module",
		"modules/catalog/module"
	],
	extensions 	: [
		"modules/fullAjax/ext/enaza",
		"modules/shopwindow/ext/enaza",
		"modules/catalog/ext/enaza"
	]
};

requirejs.onError = function (err) {
    console.log(err.requireType);
    if (err.requireType === 'timeout') {
        console.log('modules: ' + err.requireModules);
    }
    throw err;
};

//set require config
require.config({
	baseUrl	: siteParams.staticDomain+"js3/",
	paths	: {
		jQuery 		: "external/jquery-1.7.2.min",
		underscore	: "external/underscore-min",
		Enaza		: "enaza.bundle",
		external 	: "external",
		models 		: "models",
		modules 	: "modules"
	}
});

//use Enaza, Jquery and Underscore JS
define(["Enaza","jQuery","underscore"],function(Enaza, $, _){
	Enaza.init("enaza", _params);
});
