appServices.factory('settingsService',
	() => new settingsService()
	);

class settingsService {
	constructor() {
	}

	getDefaultSettings(): SettingsModel {
		return {
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