// Directive to open the CSS input modal
appDirectives.directive('urlInputModal', ['$rootScope', '$compile', '$timeout', 'httpService', ($rootScope, $compile, $timeout, httpService) => {
	return {
		scope: true,
		link: ($scope, element: JQuery, attr) => new urlInputModal($scope, $rootScope, element, attr, $compile, $timeout, httpService)
	};
}]);

class urlInputModal extends modalController {

	constructor(public $scope, public $rootScope, public element, public attr, public $compile, public $timeout, public httpService) {
		super($scope, $rootScope, $compile, $timeout, httpService);
		this.templateUrl = 'Views/Modals/urlInput.html';

		this.element.on('click', () => { this.load(); });
	}
}