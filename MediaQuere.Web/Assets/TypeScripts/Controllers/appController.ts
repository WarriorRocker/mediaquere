// Controller for application
appControllers.controller('appController',
	($scope, $rootScope, safeApply, parseService, settingsService, canvasService) =>
		new appController($scope, $rootScope, safeApply, parseService, settingsService, canvasService)
	);

class appController {
	cssInput: string;
	urlInput: string;

	constructor(private $scope, private $rootScope: IAppRootScope, private safeApply,
		private parseService: parseService, private settingsService: settingsService, private canvasService: canvasService) {
		this.$scope.app = this;

		this.$rootScope.layers = [];
		this.$rootScope.canvas = this.canvasService.getDefaultCanvas();
		this.$rootScope.settings = this.settingsService.getDefaultSettings();

		//todo move to api call
		this.$rootScope.viewportPresets = appConfiguration.canvasPresets;
		this.$rootScope.layerThemes = appConfiguration.layerThemes;
		this.setViewportPreset(this.$rootScope.viewportPresets[0].presets[0]);
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

	zoom(factor) {
		this.$rootScope.canvas.zoom = Math.min(appConfiguration.canvas.maxZoom,
			Math.max(appConfiguration.canvas.minZoom, Math.round(this.$rootScope.canvas.zoom + factor)));
		this.safeApply(this.$scope);
	}

	setViewportPreset(preset: PresetModel) {
		this.$rootScope.canvas.viewport.width = preset.width;
		this.$rootScope.canvas.viewport.height = preset.height;
		this.$rootScope.canvas.viewport.density = preset.density;
		console.log(this.$rootScope.canvas);
	}

	switchOrientation() {
		this.$rootScope.settings.viewportOpts.orientationSwitched = !this.$rootScope.settings.viewportOpts.orientationSwitched;
		var temp = this.$rootScope.canvas.viewport.width;
		this.$rootScope.canvas.viewport.width = this.$rootScope.canvas.viewport.height;
		this.$rootScope.canvas.viewport.height = temp;
	}
}