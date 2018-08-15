const color = [
	'#' + parseInt(Math.random() * 0xFFFFFF).toString(16),
	'#' + parseInt(Math.random() * 0xFFFFFF).toString(16),
	'#' + parseInt(Math.random() * 0xFFFFFF).toString(16),
	'#' + parseInt(Math.random() * 0xFFFFFF).toString(16)
];

const hatch = [
	'diagonalHatchR',
	'diagonalHatchL',
	'horiz',
	'vert'
];

const width = 900;
const height = 900;

const projection = d3.geo.mercator()
	.scale(350)
	.center([49, 33])
	.translate([width / 2, height / 2]);

const path = d3.geo.path()
	.projection(projection);

// Set svg width & height
const svg = d3.select('svg')
	.attr('width', width)
	.attr('height', height);

// Add background
svg.append('rect')
	.attr('class', 'background')
	.attr('width', width)
	.attr('height', height);

const g = svg.append('g');

const mapLayer = g.append('g')
	.classed('map-layer', true);

// Load map data
d3.json('Admin_0_polygons.geojson', (error, mapData) => {
	const features = mapData.features;

	// Draw each province as a path
	mapLayer.selectAll('path')
		.data(features)
		.enter().append('path')
		.attr('d', path)
		.attr('stroke', 'black')
		.attr('stroke-width', '2px')
		.attr({
			stroke: 'grey',
			'stroke-width': '2px',
			fill: 'none'
		});
});
