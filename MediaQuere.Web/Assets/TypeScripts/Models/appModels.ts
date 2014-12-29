interface IAppRootScope extends ng.IScope {
	canvas: CanvasModel;
	layers: Array<LayerModel>;
	settings: SettingsModel;
	viewportPresets: Array<PresetSectionModel>;
	layerThemes: Array<LayerThemeSectionModel>;
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
	viewport: ViewportModel;
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

interface ViewportModel {
	width: number;
	height: number;
	density: number;
}

interface LayerThemeSectionModel {
	name: string;
	layers: Array<LayerThemeModel>;
}

interface LayerThemeModel {
	name: string;
	bgColor: string;
	hoverBgColor: string;
	borderColor: string;
}

interface SettingsModel {
	viewOpts: ViewOptsModel;
	layerOpts: LayerOptsModel;
	viewportOpts: ViewportOptsModel;
}

interface ViewOptsModel {
	showDesignAndCode: boolean;
}

interface LayerOptsModel {
	curLayerTheme: number;
	showMatchedInViewport: boolean;
	showDuplicates: boolean;
}

interface ViewportOptsModel {
	curViewportPreset: number;
	orientationSwitched: boolean;
}