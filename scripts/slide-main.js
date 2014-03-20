requirejs.config({
    baseUrl: "../scripts",
    paths: {
        jquery: "libs/jquery-2.1.0.min"
    }
});

require(["jquery"], function ($) {});
