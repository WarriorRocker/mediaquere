appServices.factory('canvasService',
	() => new canvasService()
	);

class canvasService {
	constructor() {
	}

	getDefaultCanvas(): CanvasModel {
		return {
			width: 0,
			height: 0,
			zoom: 100,
			density: 1,
			viewport: {
				width: 0,
				height: 0,
				density: 1
			}
		};
	}
}