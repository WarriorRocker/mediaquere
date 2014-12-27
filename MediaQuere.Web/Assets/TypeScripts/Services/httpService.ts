appServices.factory('httpService',
	($http) => new httpService($http)
	);

interface IMessage {
	field: string;
	text: string;
	type: string;
}

interface IOperationResult {
	success: boolean;
	messages: IMessage[];
}

class httpService {
	constructor(private $http: ng.IHttpService) { }

	requestData(url: string, data?): ng.IHttpPromise<any> {
		return this.$http({
			url: url,
			method: "GET",
			data: data
		}).error((response) => this.onError(response));
	}

	onError(response: string) {
		console.log(response);
	}

	saveData(data, url: string): ng.IHttpPromise<any> {
		return this.$http.put(url, data).error((response) => this.onError(response));
	}

	createNew(data, url: string): ng.IHttpPromise<any> {
		return this.$http.post(url, data).error((response) => this.onError(response));
	}

	deleteData(url: string): ng.IHttpPromise<any> {
		return this.$http['delete'](url).error((response) => this.onError(response));
	}

	post(url: string, data): ng.IHttpPromise<any> {
		var post = this.$http.post(url, data);
		return post.error((response) => this.onError(response));
	}
} 