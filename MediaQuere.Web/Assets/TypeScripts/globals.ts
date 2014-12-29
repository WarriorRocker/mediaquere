var appConfiguration = {
	app: {
		apiUrl: '/api/',
		assetsUrl: '/Assets/',
		version: '0.0.1'
	},
	layerThemes: [
		{
			name: 'Soft Colors',
			layers: [
				{ name: 'Red', bgColor: 'rgba(255, 0, 0, .3)', hoverBgColor: 'rgba(255, 0, 0, .8)', borderColor: 'rgba(255, 0, 0, 1)' },
				{ name: 'Orange', bgColor: 'rgba(255, 153, 0, 0.3)', hoverBgColor: 'rgba(255, 153, 0, 0.8)', borderColor: 'rgba(221, 133, 0, 1)' },
				{ name: 'Yellow', bgColor: 'rgba(255, 255, 0, 0.3)', hoverBgColor: 'rgba(255, 255, 0, 0.8)', borderColor: 'rgba(255, 255, 0, 1)' },
				{ name: 'Green', bgColor: 'rgba(0, 204, 0, 0.3)', hoverBgColor: 'rgba(0, 204, 0, 0.8)', borderColor: 'rgba(0, 136, 0, 1)' },
				{ name: 'Blue', bgColor: 'rgba(0, 0, 255, 0.3)', hoverBgColor: 'rgba(0, 0, 255, 0.8)', borderColor: 'rgba(0, 0, 255, 1)' },
				{ name: 'Purple', bgColor: 'rgba(155, 42, 155, 0.3)', hoverBgColor: 'rgba(155, 42, 155, 0.8)', borderColor: 'rgba(138, 0, 138, 1)' },
				{ name: 'Pink', bgColor: 'rgba(255, 0, 255, 0.3)', hoverBgColor: 'rgba(255, 0, 255, 0.8)', borderColor: 'rgba(219, 0, 219, 1)' }
			]
		},
		{
			name: 'Grey',
			layers: [
				{ name: 'Grey', bgColor: 'rgba(0, 0, 0, .1)', hoverBgColor: 'rgba(0, 0, 0, .8)', borderColor: 'rgba(0, 0, 0, 1)' }
			]
		},
		{
			name: 'Black Lines',
			layers: [
				{ name: 'Line', bgColor: 'rgba(0, 0, 0, 0)', hoverBgColor: 'rgba(0, 0, 0, .2)', borderColor: 'rgba(0, 0, 0, 1)' }
			]
		}
	],
	canvasPresets: [
		{
			name: 'Apple',
			presets: [
				{ name: 'iPhone', width: 320, height: 480, density: 1 },
				{ name: 'iPhone 4', width: 320, height: 480, density: 2 },
				{ name: 'iPhone 5', width: 320, height: 568, density: 2 },
				{ name: 'iPhone 6', width: 375, height: 667, density: 2 },
				{ name: 'iPhone 6 Plus', width: 414, height: 736, density: 2 },
				{ name: 'iPad', width: 768, height: 1024, density: 1 },
				{ name: 'iPad 2', width: 768, height: 1024, density: 2 }
			]
		},
		{
			name: 'HTC',
			presets: [
				{ name: 'One', width: 360, height: 640, density: 1 }
			]
		},
		{
			name: 'Samsung',
			presets: [
				{ name: 'Galaxy S2', width: 320, height: 533, density: 1 },
				{ name: 'Galaxy S3', width: 360, height: 640, density: 1 },
				{ name: 'Galaxy Note 3', width: 360, height: 640, density: 1 },
				{ name: 'Galaxy Note 8.0', width: 601, height: 962, density: 1 },
				{ name: 'Galaxy Note 10.1', width: 800, height: 1280, density: 1 }
			]
		}
	],
	canvas: {
		minZoom: 10,
		maxZoom: 250
	},
	layers: {
		niceScrollOpts: {
			autohidemode: false,
			background: '#888',
			cursorborder: 0,
			cursorborderradius: 0,
			cursoropacitymin: .4,
			cursorcolor: '#AAA'
		}
	},
	codemirror: {
		autofocus: true,
		lineNumbers: true,
		matchBrackets: true,
		mode: 'text/x-less'
	}
};