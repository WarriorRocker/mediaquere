// Directive to open the CSS input modal
appDirectives.directive('cssInputModal', ['$rootScope', '$compile', '$timeout', 'httpService', ($rootScope, $compile, $timeout, httpService) => {
	return {
		link: ($scope, element: JQuery, attr) => new cssInputModal($scope, $rootScope, element, attr, $compile, $timeout, httpService)
	};
}]);

class cssInputModal extends modalController {

	constructor(public $scope, public $rootScope, public element, public attr, public $compile, public $timeout, public httpService) {
		super($scope, $rootScope, $compile, $timeout, httpService);
		this.templateUrl = 'Views/Modals/cssInput.html';

		this.element.on('click', () => { this.load(); });
	}
}