appServices.factory('parseService',
	(httpService) => new parseService(httpService)
	);

class parseService {

	constructor(private httpService: httpService) {
	}

	url2css(url: string) {
		return this.httpService.post(appConfiguration.app.apiUrl + 'import/domain', { url: url });
	}

	css2layers(css: string): Array<LayerModel> {
		var layers: Array<LayerModel> = [];
		if ((angular.isDefined(css)) && (css)) {
			var queries = css.match(/@media(.*?){/g);

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
					if ((layers[n].maxWidth == layers[i].maxWidth) && (layers[n].minWidth == layers[i].minWidth) &&
						(layers[n].maxHeight == layers[i].maxHeight) && (layers[n].minHeight == layers[i].minHeight)) {
						layers[n].duplicate = true;
					}
				}
			}
		}

		return layers;
	}

	layers2css(layers: Array<LayerModel>): string {
		var css = '';
		for (var i = 0; i < layers.length; i++) {
			if (!layers[i].duplicate) {
				if (css) css += "\n\n";
				css += '@media screen';

				if (layers[i].minWidth != -1) css += ' and (min-width: ' + layers[i].minWidth + 'px)';
				if (layers[i].maxWidth != -1) css += ' and (max-width: ' + layers[i].maxWidth + 'px)';
				if (layers[i].minHeight != -1) css += ' and (min-height: ' + layers[i].minHeight + 'px)';
				if (layers[i].maxHeight != -1) css += ' and (max-height: ' + layers[i].maxHeight + 'px)';

				css += " {\n\n}";
			}
		}
		return css;
	}
}