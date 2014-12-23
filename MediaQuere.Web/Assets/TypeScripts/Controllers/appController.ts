// Controller for application
appControllers.controller('appController', ['$scope', 'safeApply', 'parseService',
	($scope, safeApply, parseService) => new appController($scope, safeApply, parseService)
]);

class appController {
	layerThemes: Array<any>;
	layerTheme: number;

	cssInput: string;
	urlInput: string;

	layers: Array<LayerModel> = [];
	canvas: CanvasModel;
	presets: Array<PresetSectionModel>;

	constructor(private $scope, private safeApply, private parseService: parseService) {
		this.$scope.app = this;

		this.canvas = {
			width: 720,
			height: 480,
			zoom: 100,
			density: 1
		};

		this.layerThemes = appConfiguration.layerThemes;
		this.presets = appConfiguration.canvasPresets;

		this.layerTheme = 0;

		this.$scope.$watchGroup(['app.layers', 'app.layerTheme'], () => {
			this.setLayersTheme(this.layers);
		});
	}

	importCssInput() {
		this.layers = this.parseService.css2layers(this.cssInput);
	}

	importCssUrl() {
		this.parseService.url2css(this.urlInput).success((data) => {
			//todo implement multiple sheets
			console.log(data);
			for (var i = 0; i < data.length; i++) {
				console.log(data[i].data);
				this.layers = this.layers.concat(this.layers, this.parseService.css2layers(data[i].data));
			}
		});
	}

	getLayerStyle(layer, zoom) {
		zoom = (zoom / 100);
		return (layer.maxWidth ? 'width: ' + (layer.maxWidth * zoom) + 'px; margin-left: -' + ((layer.maxWidth * zoom) / 2) + 'px; ' : '') +
			(layer.maxHeight ? 'height: ' + (layer.maxHeight * zoom) + 'px; margin-top: -' + ((layer.maxHeight * zoom) / 2) + 'px; ' : '');
	}

	getInnerLayerStyle(layer, zoom) {
		zoom = (zoom / 100);
		return (layer.minWidth ? 'width: ' + (layer.minWidth * zoom) + 'px; margin-left: -' + ((layer.minWidth * zoom) / 2) + 'px; ' : '') +
			(layer.minHeight ? 'height: ' + (layer.minHeight * zoom) + 'px; margin-top: -' + ((layer.minHeight * zoom) / 2) + 'px;' : '');
	}

	setLayersTheme(layers) {
		if (angular.isDefined(layers)) {
			for (var i = 0; i < layers.length; i++) {
				var theme = this.layerThemes[this.layerTheme].layers[(i % this.layerThemes[this.layerTheme].layers.length)];

				layers[i].bgColor = theme.bgColor;
				layers[i].borderColor = theme.borderColor;
				layers[i].hoverBgColor = theme.hoverBgColor;
			}
		}
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
		var temp = this.canvas.width;
		this.canvas.width = this.canvas.height;
		this.canvas.height = temp;
	}
}