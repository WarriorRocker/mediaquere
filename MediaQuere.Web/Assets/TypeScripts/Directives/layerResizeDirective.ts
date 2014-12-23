// Directive to allow the resizing of a layer
appDirectives.directive('layerResize', ['safeApply', (safeApply) => {
	return {
		scope: {
			width: '=',
			height: '=',
			zoom: '='
		},
		link: ($scope, element: JQuery, attr) => new layerResize($scope, element, attr, safeApply)
	};
}]);

class layerResize {
	constructor(private $scope, private element, private attr, private safeApply) {
		var sizeProps = {
			n: { y: 'height', y2: 1 }, s: { y: 'height', y2: -1 }, e: { x: 'width', x2: 1 }, w: { x: 'width', x2: -1 },
			ne: { x: 'width', x2: 1, y: 'height', y2: 1 }, se: { x: 'width', x2: 1, y: 'height', y2: -1 },
			nw: { x: 'width', x2: -1, y: 'height', y2: 1 }, sw: { x: 'width', x2: -1, y: 'height', y2: -1 }
		};

		this.element.on('mousedown', (event) => {
			var handleProp = sizeProps[event.target.className];
			var mouseX = event.pageX;
			var mouseY = event.pageY;
			var width = this.$scope.width;
			var height = this.$scope.height;
			var zoom = (100 / this.$scope.zoom);

			$(window).on('mousemove.sizer', (event) => {
				if (angular.isDefined(handleProp['x'])) {
					this.$scope[handleProp['x']] = Math.round(width + ((event.pageX - mouseX) * handleProp['x2'] * zoom * 2));
				}

				if (angular.isDefined(handleProp['y'])) {
					this.$scope[handleProp['y']] = Math.round(height - ((event.pageY - mouseY) * handleProp['y2'] * zoom * 2));
				}

				this.safeApply(this.$scope);
			});

			$(window).on('mouseup.sizer', () => { $(window).off('.sizer'); });
		});
	}
}