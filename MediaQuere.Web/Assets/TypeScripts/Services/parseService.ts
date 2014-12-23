appServices.factory('parseService', ['httpService',
	(httpService) => new parseService(httpService)
]);

class parseService {

	constructor(private httpService: httpService) {
	}

	css2layers(css: string): Array<LayerModel> {
		var layers = [];
		if ((angular.isDefined(css)) && (css)) {
			var queries = css.match(/@media(.*?){/g);
			console.log(queries);

			if (queries) {
				for (var i = 0; i < queries.length; i++) {
					var nested = queries[i].split(',');

					for (var n = 0; n < nested.length; n++) {
						var layer: LayerModel = { enabled: true };

						var maxWidth = nested[n].match(/\(max-width:(.*?)px\)/);
						if (maxWidth) layer.maxWidth = parseInt(maxWidth[1]);

						var maxHeight = nested[n].match(/\(max-height:(.*?)px\)/);
						if (maxHeight) layer.maxHeight = parseInt(maxHeight[1]);

						var minWidth = nested[n].match(/\(min-width:(.*?)px\)/);
						if (minWidth) layer.minWidth = parseInt(minWidth[1]);

						var minHeight = nested[n].match(/\(min-height:(.*?)px\)/);
						if (minHeight) layer.minHeight = parseInt(minHeight[1]);

						if ((layer.maxWidth) || (layer.maxHeight) || (layer.minWidth) || (layer.minHeight)) {
							layers.push(layer);
						}
					}
				}
			}

			for (i = 0; i < layers.length; i++) {
				for (n = i + 1; n < layers.length; n++) {
					if (angular.equals(layers[i], layers[n])) {
						layers[n].enabled = false;
					}
				}
			}
		}

		return layers;
	}

	url2css(url: string) {
		return this.httpService.requestData(appConfiguration.app.apiUrl + '?url=' + url);
	}
}