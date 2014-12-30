// Directive to open the CSS input modal
appDirectives.directive('newLayerModal', ($rootScope, $compile, $timeout, httpService) => {
	return {
		scope: true,
		link: ($scope, element: JQuery, attr) => new newLayerModalDirective($scope, $rootScope, element, attr, $compile, $timeout, httpService)
	};
});

class newLayerModalDirective extends modalController {
	layerForm: LayerFormModel;

	constructor(public $scope, public $rootScope: IAppRootScope, public element, public attr, public $compile, public $timeout, public httpService) {
		super($scope, $rootScope, $compile, $timeout, httpService);
		this.templateUrl = 'Views/Modals/newLayer.html';

		this.element.on('click', () => { this.load(); });
	}

	addLayer() {
		var layer: LayerModel = {
			minWidth: ((this.layerForm.minWidth) ? parseInt(this.layerForm.minWidth) : -1),
			maxWidth: ((this.layerForm.maxWidth) ? parseInt(this.layerForm.maxWidth) : -1),
			minHeight: ((this.layerForm.minHeight) ? parseInt(this.layerForm.minHeight) : -1),
			maxHeight: ((this.layerForm.maxHeight) ? parseInt(this.layerForm.maxHeight) : -1),
			enabled: true,
			duplicate: false
		};

		this.$rootScope.layers.push(layer);
		this.close();
	}
}

interface LayerFormModel {
	maxWidth: string;
	maxHeight: string;
	minWidth: string;
	minHeight: string;
}