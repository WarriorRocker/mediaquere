appServices.factory('reportService', ['httpService',
	(httpService) => new reportService(httpService)
]);

class reportService {
	apiUrl: string;

	constructor(private httpService: httpService) {
		//this.apiUrl = appConfiguration.app.apiUrl + appConfiguration.report.apiController + '/';
	}

	addReport(model: Array<ReportModel>) {
		//return this.httpService.post(this.apiUrl + appConfiguration.report.addReportAction, { report: model });
	}
}

interface ReportModel {
	title: string;
	items: Array<ReportItemModel>;
}

interface ReportItemModel {
	hours: number;
	text: string;
}