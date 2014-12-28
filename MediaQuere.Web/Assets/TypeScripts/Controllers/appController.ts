// Controller for application
appControllers.controller('appController',
	($scope, $rootScope, safeApply, parseService) => new appController($scope, $rootScope, safeApply, parseService)
	);

class appController {
	cssInput: string;
	urlInput: string;

	canvas: CanvasModel;
	presets: Array<PresetSectionModel>;

	layerOpts: any;
	viewportOpts: any;

	layerStats: any;

	constructor(private $scope, private $rootScope: IAppRootScope, private safeApply, private parseService: parseService) {
		this.$scope.app = this;

		this.$rootScope.layers = [];

		this.canvas = {
			width: 720,
			height: 480,
			zoom: 100,
			density: 1
		};

		this.layerOpts = {
			showMatchedInViewport: false,
			showDuplicates: false
		};

		this.viewportOpts = {
			orientationSwitched: false
		};

		this.layerStats = {
			maxWidth: 0,
			minWidth: 0,
			maxHeight: 0,
			minHeight: 0
		};

		//todo move to api call
		this.presets = appConfiguration.canvasPresets;
	}

	importCssInput() {
		this.$rootScope.layers = this.parseService.css2layers(this.cssInput);
	}

	importCssUrl() {
		this.parseService.url2css(this.urlInput).success((data) => {
			//todo implement multiple sheets
			console.log(data);
			for (var i = 0; i < data.length; i++) {
				this.$rootScope.layers = this.$rootScope.layers.concat(this.$rootScope.layers, this.parseService.css2layers(data[i].data));
			}
		});
	}

	getLayerStyle(layer, zoom) {
		zoom = (zoom / 100);
		return ((!layer.enabled) || ((!this.layerOpts.showDuplicates) && (layer.duplicate)) ||
			(((this.layerOpts.showMatchedInViewport) && (!this.layerOptIsMatchedInViewport(layer)))) ? 'display: none; ' : '') +
			((layer.maxWidth != -1) ? 'width: ' + (layer.maxWidth * zoom) + 'px; margin-left: -' + ((layer.maxWidth * zoom) / 2) + 'px; ' : '') +
			((layer.maxHeight != -1) ? 'height: ' + (layer.maxHeight * zoom) + 'px; margin-top: -' + ((layer.maxHeight * zoom) / 2) + 'px; ' : '');
	}

	layerOptIsMatchedInViewport(layer) {
		return !(((layer.maxWidth != -1) && (layer.maxWidth <= this.canvas.width))
			|| ((layer.minWidth != -1) && (layer.minWidth >= this.canvas.width))
			|| ((layer.maxHeight != -1) && (layer.maxHeight <= this.canvas.height))
			|| ((layer.minHeight != -1) && (layer.minHeight >= this.canvas.height))
			|| false);
	}

	getInnerLayerStyle(layer, zoom) {
		zoom = (zoom / 100);
		return ((layer.minWidth != -1) ? 'width: ' + (layer.minWidth * zoom) + 'px; margin-left: -' + ((layer.minWidth * zoom) / 2) + 'px; ' : '') +
			((layer.minHeight != -1) ? 'height: ' + (layer.minHeight * zoom) + 'px; margin-top: -' + ((layer.minHeight * zoom) / 2) + 'px;' : '');
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

		this.layerStats.maxWidth = maxWidth;
		this.layerStats.minWidth = Math.min(minWidth, maxWidth);
		this.layerStats.maxHeight = maxHeight;
		this.layerStats.minHeight = Math.min(minHeight, maxHeight);
	}

	zoom(factor) {
		this.canvas.zoom = Math.min(appConfiguration.canvas.maxZoom, Math.max(appConfiguration.canvas.minZoom, Math.round(this.canvas.zoom + factor)));
		this.safeApply(this.$scope);
	}

	getViewportStyle() {
		var zoom = (this.canvas.zoom / 100);
		return 'width: ' + (this.canvas.width * zoom) + 'px; margin-left: -' + ((this.canvas.width * zoom) / 2) + 'px; ' +
			'height: ' + (this.canvas.height * zoom) + 'px; margin-top: -' + ((this.canvas.height * zoom) / 2) + 'px;';
	}

	setCanvas(preset) {
		this.canvas.width = preset.width;
		this.canvas.height = preset.height;
		this.canvas.density = preset.density;
		console.log(this.canvas);
	}

	getCanvasWidth() {
		return Math.round(this.canvas.canvasWidth * (100 / this.canvas.zoom));
	}

	getCanvasHeight() {
		return Math.round(this.canvas.canvasHeight * (100 / this.canvas.zoom));
	}

	switchOrientation() {
		this.viewportOpts.orientationSwitched = !this.viewportOpts.orientationSwitched;
		var temp = this.canvas.width;
		this.canvas.width = this.canvas.height;
		this.canvas.height = temp;
	}
}