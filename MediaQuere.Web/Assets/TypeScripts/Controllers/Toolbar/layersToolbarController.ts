// Controller for application
appControllers.controller('layersToolbarController',
	($scope, $rootScope, safeApply) => new layersToolbarController($scope, $rootScope, safeApply)
	);

class layersToolbarController extends toolbarController {
	layerThemes: Array<any>;
	layerTheme: number = 0;

	constructor(public $scope, public $rootScope: IAppRootScope, public safeApply) {
		super($scope, $rootScope, safeApply);

		//todo move this to api call
		this.layerThemes = appConfiguration.layerThemes;

		this.$rootScope.$watch('layers', () => {
			this.applyTheme();
		});
	}

	setTheme(index) {
		this.layerTheme = index;
		this.applyTheme();
	}

	applyTheme() {
		if (angular.isDefined(this.$rootScope.layers)) {
			for (var i = 0; i < this.$rootScope.layers.length; i++) {
				var theme = this.layerThemes[this.layerTheme].layers[(i % this.layerThemes[this.layerTheme].layers.length)];

				this.$rootScope.layers[i].bgColor = theme.bgColor;
				this.$rootScope.layers[i].borderColor = theme.borderColor;
				this.$rootScope.layers[i].hoverBgColor = theme.hoverBgColor;
			}
		}
	}
}