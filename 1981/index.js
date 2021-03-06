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

function rotate() {
	d3.select('svg')
		.select('g')
		.selectAll('path')
		.each(function (d) {
			const plusOrMinus = Math.random() < 0.5 ? -1 : 1;
			const rand = Math.random() * 2 * plusOrMinus;
			const centerX = Math.random() * width;
			const centerY = Math.random() * height;
			const path = d3.select(this);
			path.attr('transform', () => {
				return `rotate(${rand} ${centerX} ${centerY})`;
			});
		});
}

function color() {
	const colors = [
		'#' + parseInt(Math.random() * 0xFFFFFF).toString(16),
		'#' + parseInt(Math.random() * 0xFFFFFF).toString(16),
		'#' + parseInt(Math.random() * 0xFFFFFF).toString(16),
		'#' + parseInt(Math.random() * 0xFFFFFF).toString(16)
	];

	d3.select('svg')
		.select('g')
		.selectAll('path')
		.each(function (d) {
			const path = d3.select(this);
			path.attr('opacity', '0.7');
			path.attr('fill', () => {
				const num = Math.floor(Math.random() * 4);
				return colors[num];
				// return `url(#${hatch[num]})`;
			});
			path.attr('stroke', 'none');
		});
}

function hatch() {
	const hatches = [
		{
			name: 'diagonalHatchR',
			color: 'cyan'
		},
		{
			name: 'diagonalHatchL',
			color: 'magenta'
		},
		{
			name: 'horiz',
			color: 'yellow'
		},
		{
			name: 'vert',
			color: 'black'
		}
	];
	svg.select('g')
		.selectAll('path')
		.each(function (d) {
			const int = Math.floor(Math.random() * 4);
			const path = d3.select(this);
			path.attr({
				fill: `url(#${hatches[int].name})`,
				opacity: 0.7,
				stroke: hatches[int].color,
				'stroke-width': 2
			});
		});
}

function scale() {
	d3.select('svg')
		.select('g')
		.selectAll('path')
		.each(function (d) {
			const plusOrMinus = Math.random() < 0.5 ? -1 : 1;
			const rand = Math.random() * plusOrMinus;
			const path = d3.select(this);
			const x = Math.random() * width;
			const y = Math.random() * height;
			path.attr('transform',
				'translate(' + x / 2 + ',' + y / 2 + ')' +
			'scale(' + rand + ')' +
			'translate(' + -x + ',' + -y + ')'
			);
		});
}

function move() {
	d3.select('svg')
		.select('g')
		.selectAll('path')
		.each(function (d) {
			const plusOrMinus = Math.random() < 0.5 ? -1 : 1;
			const path = d3.select(this);
			const x = Math.random() * width * 0.05 * plusOrMinus;
			const y = Math.random() * height * 0.05 * plusOrMinus;
			path.attr('transform',
				'translate(' + x / 2 + ',' + y / 2 + ')'
			);
		});
}

document.getElementById('color').addEventListener('click', () => {
	color();
});
document.getElementById('hatch').addEventListener('click', () => {
	hatch();
});
document.getElementById('rotate').addEventListener('click', () => {
	rotate();
});
document.getElementById('scale').addEventListener('click', () => {
	scale();
});
document.getElementById('move').addEventListener('click', () => {
	move();
});

document.addEventListener('DOMContentLoaded', () => {
	const svg = d3.select('svg');

	svg.append('defs');

	const defs = d3.select('defs');

	defs.append('pattern')
		.attr({
			id: 'diagonalHatchR',
			width: 10,
			height: 10,
			patternUnits: 'userSpaceOnUse'
		})
		.append('path')
		.attr({
			d: 'M-1,1 l2,-2 M0,10 l10,-10 M9,11 l2,-2',
			stroke: 'cyan',
			'stroke-width': 2
		});

	defs.append('pattern')
		.attr({
			id: 'diagonalHatchL',
			width: 10,
			height: 10,
			patternUnits: 'userSpaceOnUse'
		})
		.append('path')
		.attr({
			d: 'M1 11l-2-2m11 1L0 0m11 1L9-1',
			stroke: 'magenta',
			'stroke-width': 2
		});

	defs.append('pattern')
		.attr({
			id: 'horiz',
			width: 10,
			height: 10,
			patternUnits: 'userSpaceOnUse'
		})
		.append('path')
		.attr({
			d: 'M0 0h10M0 5h10M0 10h10',
			stroke: 'yellow',
			'stroke-width': 2
		});

	defs.append('pattern')
		.attr({
			id: 'vert',
			width: 10,
			height: 10,
			patternUnits: 'userSpaceOnUse'
		})
		.append('path')
		.attr({
			d: 'M0 10V0M5 10V0M10 10V0',
			stroke: 'black',
			'stroke-opacity': 0.7,
			'stroke-width': 2
		});
});
