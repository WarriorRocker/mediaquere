// Directive to allow the resizing of a layer
appDirectives.directive('visualizerZoom', (safeApply) => {
	return {
		scope: {
			zoom: '='
		},
		link: ($scope, element: JQuery, attr) => new visualizerZoom($scope, element, attr, safeApply)
	};
});

class visualizerZoom {
	constructor(private $scope, private element, private attr, private safeApply) {
		this.element.on('DOMMouseScroll', (event) => { this.scroll(event.originalEvent.detail); });
		this.element.on('mousewheel', (event) => { this.scroll(event.originalEvent.wheelDelta); });
	}

	scroll(delta) {
		var factor = ((10 * (Math.min(80, Math.max(-80, delta / 2)) / 80)));
		this.$scope.zoom = Math.min(appConfiguration.canvas.maxZoom, Math.max(appConfiguration.canvas.minZoom, Math.round(this.$scope.zoom + factor)));
		this.safeApply(this.$scope);
	}
}