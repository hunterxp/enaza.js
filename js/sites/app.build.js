/**
 * Application builder file
 */
({
    appDir	: "",
    baseUrl	: "../",
    dir		: "../../webapp-build",
    optimize: "true",
    out: "main-built.js",
    paths	: {
        "jquery": "require-jquery"
    },
    modules: [
        {
            name: "main",
            exclude: ["jquery"]
        }
    ]
})