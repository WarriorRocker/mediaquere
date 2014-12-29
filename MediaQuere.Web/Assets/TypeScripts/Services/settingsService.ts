appServices.factory('settingsService',
	() => new settingsService()
	);

class settingsService {
	constructor() {
	}

	getDefaultSettings(): SettingsModel {
		return {
			viewOpts: {
				showDesignAndCode: true
			},
			layerOpts: {
				curLayerTheme: 0,
				showMatchedInViewport: false,
				showDuplicates: false
			},
			viewportOpts: {
				curViewportPreset: 0,
				orientationSwitched: false
			}
		};
	}
}