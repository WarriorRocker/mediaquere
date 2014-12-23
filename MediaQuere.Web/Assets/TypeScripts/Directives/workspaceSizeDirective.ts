// Directive to update canvas size when browser is resized
appDirectives.directive('workspaceSize', ['safeApply', (safeApply) => {
	return {
		scope: {
			width: '=',
			height: '='
		},
		link: ($scope, element: JQuery, attr) => new workspaceSize($scope, element, attr, safeApply)
	};
}]);

class workspaceSize {
	constructor(private $scope, private element, private attr, private safeApply) {
		$(window).on('resize', () => { this.$scope.$digest(); });

		this.$scope.$watch(() => this.getSizeWatch(), (value) => {
			console.log(value);
			this.$scope.width = value[0];
			this.$scope.height = value[1];
			this.safeApply(this.$scope);
		}, true);
	}

	getSizeWatch() {
		return [this.element.width(), this.element.height()];
	}
}