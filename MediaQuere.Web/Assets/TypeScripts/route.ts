// Setup Route Configuration
mediaQuereApp.config(['$routeProvider', ($routeProvider: ng.route.IRouteProvider) => {
	$routeProvider.when('/', {
	});

	$routeProvider.otherwise({
		templateUrl: '/Views/404.html',
	});
}]);