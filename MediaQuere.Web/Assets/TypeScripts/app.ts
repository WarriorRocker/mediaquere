// Controller Object
var appControllers = angular.module('appControllers', []);

// Services Object
var appServices = angular.module('appServices', ['ngResource']);

// Directives Object
var appDirectives = angular.module('appDirectives', []);

// Declare Application
var mediaQuereApp = angular.module('MediaQuere', ['ngRoute', 'ngAnimate', 'appControllers', 'appServices', 'appDirectives', 'ui.codemirror']);

// Disable Strict Contextual Escaping
mediaQuereApp.config(['$sceProvider', function ($sceProvider) {
	$sceProvider.enabled(false);
}]);

// Enable HTML5 History API
mediaQuereApp.config(['$locationProvider', function ($locationProvider) {
	$locationProvider.html5Mode(true);
}]);