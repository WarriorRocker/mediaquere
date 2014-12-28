class toolbarController {
	constructor(public $scope, public $rootScope: IAppRootScope, public safeApply) {
		this.$scope.toolbar = this;
	}
}