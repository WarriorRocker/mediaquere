appServices.factory('parseService',
	(httpService) => new parseService(httpService)
	);

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
						var layer: LayerModel = {
							enabled: true,
							duplicate: false
						};

						var maxWidth = nested[n].match(/\(max-width:(.*?)px\)/);
						layer.maxWidth = ((maxWidth) ? parseInt(maxWidth[1]) : -1);

						var maxHeight = nested[n].match(/\(max-height:(.*?)px\)/);
						layer.maxHeight = ((maxHeight) ? parseInt(maxHeight[1]) : -1);

						var minWidth = nested[n].match(/\(min-width:(.*?)px\)/);
						layer.minWidth = ((minWidth) ? parseInt(minWidth[1]) : -1);

						var minHeight = nested[n].match(/\(min-height:(.*?)px\)/);
						layer.minHeight = ((minHeight) ? parseInt(minHeight[1]) : -1);

						if ((layer.maxWidth != -1) || (layer.maxHeight != -1) || (layer.minWidth != -1) || (layer.minHeight != -1)) {
							layers.push(layer);
						}
					}
				}
			}

			for (i = 0; i < layers.length; i++) {
				for (n = i + 1; n < layers.length; n++) {
					if (angular.equals(layers[i], layers[n])) {
						layers[n].duplicate = true;
					}
				}
			}
		}

		return layers;
	}

	url2css(url: string) {
		return this.httpService.post(appConfiguration.app.apiUrl + 'import/domain', { url: url });
	}
}