class modalController {
	templateUrl: string;
	isLoaded: boolean = false;
	modalElm;

	constructor(public $scope, public $rootScope, public $compile, public $timeout, public httpService) {
		this.$scope.modal = this;
	}

	load() {
		if ((!this.isLoaded) && (this.templateUrl)) {
			this.httpService.requestData(this.templateUrl).success((data) => this.onSuccess(data));
		}
	}

	onSuccess(data) {
		$('body').append(this.$compile(data)(this.$scope));
		this.modalElm = $('#modal');
		this.$timeout(() => {
			this.open();
		});
	}

	open() {
		this.modalElm.fadeIn();
	}

	close() {
		this.modalElm.fadeOut(() => {
			this.modalElm.remove();
			this.isLoaded = false;
		});
	}
}