interface IAppRootScope extends ng.IScope {
	layers: Array<LayerModel>;
}

interface PresetSectionModel {
	name: string;
	presets: Array<PresetModel>;
}

interface PresetModel {
	name: string;
	width: number;
	height: number;
	density: number;
}

interface CanvasModel {
	width: number;
	height: number;
	zoom: number;
	density: number;
	canvasWidth?: number;
	canvasHeight?: number;
}

interface LayerModel {
	maxWidth?: number;
	maxHeight?: number;
	minWidth?: number;
	minHeight?: number;
	bgColor?: string;
	borderColor?: string;
	hoverBgColor?: string;
} 