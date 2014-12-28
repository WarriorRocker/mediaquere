// Directive to allow the resizing of a layer
appDirectives.directive('layersInfo', ($rootScope, safeApply) => {
	return {
		scope: true,
		link: ($scope, element: JQuery, attr) => new layersInfo($scope, $rootScope, element, attr, safeApply)
	};
});

class layersInfo {
	maxWidth: number = 0;
	minWidth: number = 0;
	maxHeight: number = 0;
	minHeight: number = 0;

	constructor(private $scope, private $rootScope: IAppRootScope, private element, private attr, private safeApply) {
		this.$scope.info = this;

		this.$rootScope.$watch('layers', () => {
			this.setLayerStats();
		});
	}

	setLayerStats() {
		var maxWidth = 0,
			minWidth = Number.MAX_VALUE,
			maxHeight = 0,
			minHeight = Number.MAX_VALUE;

		for (var i = 0; i < this.$rootScope.layers.length; i++) {
			maxWidth = Math.max(maxWidth, ((this.$rootScope.layers[i].maxWidth != -1) ? this.$rootScope.layers[i].maxWidth : maxWidth));
			minWidth = Math.min(minWidth, ((this.$rootScope.layers[i].minWidth != -1) ? this.$rootScope.layers[i].minWidth : minWidth));
			maxHeight = Math.max(maxHeight, ((this.$rootScope.layers[i].maxHeight != -1) ? this.$rootScope.layers[i].maxHeight : maxHeight));
			minHeight = Math.min(minHeight, ((this.$rootScope.layers[i].minHeight != -1) ? this.$rootScope.layers[i].minHeight : minHeight));
		}

		this.maxWidth = maxWidth;
		this.minWidth = Math.min(minWidth, maxWidth);
		this.maxHeight = maxHeight;
		this.minHeight = Math.min(minHeight, maxHeight);
	}
}