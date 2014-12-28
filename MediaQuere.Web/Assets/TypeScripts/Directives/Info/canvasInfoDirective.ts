// Directive to allow the resizing of a layer
appDirectives.directive('canvasInfo', ($rootScope, safeApply) => {
	return {
		scope: true,
		link: ($scope, element: JQuery, attr) => new canvasInfoDirective($scope, $rootScope, element, attr, safeApply)
	};
});

class canvasInfoDirective {
	width: number = 0;
	height: number = 0;

	constructor(private $scope, private $rootScope: IAppRootScope, private element, private attr, private safeApply) {
		this.$scope.info = this;

		this.$rootScope.$watchCollection('canvas', () => {
			console.log(this.$rootScope.canvas);
			this.setCanvasStats();
		});
	}

	setCanvasStats() {
		this.width = Math.round(this.$rootScope.canvas.width * (100 / this.$rootScope.canvas.zoom));
		this.height = Math.round(this.$rootScope.canvas.height * (100 / this.$rootScope.canvas.zoom));
	}
}