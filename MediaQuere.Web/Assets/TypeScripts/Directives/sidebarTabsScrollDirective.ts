// Directive to setup scrollbar on sidebar tabs
appDirectives.directive('sidebarTabsScroll', (safeApply) => {
	return {
		link: ($scope, element: JQuery, attr) => new sidebarTabsScroll($scope, element, attr, safeApply)
	};
});

class sidebarTabsScroll {
	scrollObj;

	constructor(private $scope, private element, private attr, private safeApply) {
		this.scrollObj = this.element.niceScroll(angular.copy(appConfiguration.layers.niceScrollOpts));
	}
}