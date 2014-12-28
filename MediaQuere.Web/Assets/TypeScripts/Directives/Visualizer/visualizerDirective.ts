﻿// Directive to allow the resizing of a layer
appDirectives.directive('visualizer', ($rootScope, safeApply) => {
	return {
		link: ($scope, element: JQuery, attr) => new visualizerDirective($scope, $rootScope, element, attr, safeApply)
	};
});

class visualizerDirective {
	constructor(private $scope, private $rootScope: IAppRootScope, private element, private attr, private safeApply) {
		this.$scope.vis = this;

		this.$rootScope.$watch('layers', () => { this.applyLayerTheme(); });
		this.$rootScope.$watch('settings.layerOpts.curLayerTheme', () => { this.applyLayerTheme(); });

		this.element.on('DOMMouseScroll', (event) => { this.scroll(event.originalEvent.detail); });
		this.element.on('mousewheel', (event) => { this.scroll(event.originalEvent.wheelDelta); });

		angular.element(window).on('resize', () => { this.setCanvasSize(); }).trigger('resize');
	}

	scroll(delta) {
		var factor = ((10 * (Math.min(80, Math.max(-80, delta / 2)) / 80)));
		this.$rootScope.canvas.zoom = Math.min(appConfiguration.canvas.maxZoom,
			Math.max(appConfiguration.canvas.minZoom, Math.round(this.$rootScope.canvas.zoom + factor)));
		this.safeApply(this.$scope);
	}

	setCanvasSize() {
		this.$rootScope.canvas.width = this.element.width();
		this.$rootScope.canvas.height = this.element.height();
		this.safeApply(this.$rootScope);
	}

	applyLayerTheme() {
		if (angular.isDefined(this.$rootScope.layers)) {
			for (var i = 0; i < this.$rootScope.layers.length; i++) {
				var index = (i % this.$rootScope.layerThemes[this.$rootScope.settings.layerOpts.curLayerTheme].layers.length);
				var theme = this.$rootScope.layerThemes[this.$rootScope.settings.layerOpts.curLayerTheme].layers[index];

				this.$rootScope.layers[i].bgColor = theme.bgColor;
				this.$rootScope.layers[i].borderColor = theme.borderColor;
				this.$rootScope.layers[i].hoverBgColor = theme.hoverBgColor;
			}
		}
	}

	getLayerStyle(layer) {
		var zoom = (this.$rootScope.canvas.zoom / 100);
		return ((!layer.enabled) || ((!this.$rootScope.settings.layerOpts.showDuplicates) && (layer.duplicate)) ||
			(((this.$rootScope.settings.layerOpts.showMatchedInViewport) && (!this.layerOptIsMatchedInViewport(layer)))) ? 'display: none; ' : '') +
			((layer.maxWidth != -1) ? 'width: ' + (layer.maxWidth * zoom) + 'px; margin-left: -' + ((layer.maxWidth * zoom) / 2) + 'px; ' : '') +
			((layer.maxHeight != -1) ? 'height: ' + (layer.maxHeight * zoom) + 'px; margin-top: -' + ((layer.maxHeight * zoom) / 2) + 'px; ' : '') +
			((layer.minWidth != -1 || layer.minHeight != -1) ? '' : 'background-color: ' + (layer.hover ? layer.hoverBgColor : layer.bgColor));
	}

	layerOptIsMatchedInViewport(layer: LayerModel) {
		return !(((layer.maxWidth != -1) && (layer.maxWidth <= this.$rootScope.canvas.viewport.width))
			|| ((layer.minWidth != -1) && (layer.minWidth >= this.$rootScope.canvas.viewport.width))
			|| ((layer.maxHeight != -1) && (layer.maxHeight <= this.$rootScope.canvas.viewport.height))
			|| ((layer.minHeight != -1) && (layer.minHeight >= this.$rootScope.canvas.viewport.height))
			|| false);
	}

	getInnerLayerStyle(layer: LayerModel) {
		var zoom = (this.$rootScope.canvas.zoom / 100);
		return ((layer.minWidth != -1) ? 'width: ' + (layer.minWidth * zoom) + 'px; margin-left: -' + ((layer.minWidth * zoom) / 2) + 'px; ' : '') +
			((layer.minHeight != -1) ? 'height: ' + (layer.minHeight * zoom) + 'px; margin-top: -' + ((layer.minHeight * zoom) / 2) + 'px;' : '');
	}

	getViewportStyle(canvas: CanvasModel) {
		var zoom = (canvas.zoom / 100);
		var width = (canvas.viewport.width * zoom);
		var height = (canvas.viewport.height * zoom);
		return 'width: ' + width + 'px; margin-left: -' + (width / 2) + 'px; ' +
			'height: ' + height + 'px; margin-top: -' + (height / 2) + 'px;';
	}
}