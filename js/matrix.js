// p5.disableFriendlyErrors = true; // disables FES

var streams = [];
var fadeInterval = 1.6;
var symbolSize = 20;
var spawnRate = 3;
var canvasParent = document.querySelector('#about');

var minStreamSpeed = 2;
var maxStreamSpeed = 5;

var minSymbolsCount = 5;
var maxSymbolsCount = 12;

function setup() {
	var canvas = createCanvas(
		window.innerWidth,
		canvasParent.clientHeight
	);
	canvas.parent("about");
	canvas.id('matrix');

	background(0);
	
	var x = 0;
	for (var i = 0; i <= width / symbolSize; i++) {
		if (i % spawnRate == 0) {
			var stream = new Stream();
			stream.generateSymbols(x, getRandomNumber(-2000, 0));
			streams.push(stream);
		}
		
		x += symbolSize;
	}

	textFont('Consolas');
	textSize(symbolSize);
}

function draw() {
	background(0, 150);
	streams.forEach(function(stream) {
		stream.render();
	});
}

function MatrixSymbol(x, y, speed, first, opacity) {
	this.x = x;
	this.y = y;
	this.value;

	this.speed = speed;
	this.first = first;
	this.opacity = opacity;

	this.switchInterval = round(getRandomNumber(2, 25));

	this.setToRandomSymbol = function() {
		var charType = round(getRandomNumber(0, 5));

		if (frameCount % this.switchInterval == 0) {
			if (charType > 1) {
				// set it to Katakana
				this.value = String.fromCharCode(
					0x30A0 + floor(getRandomNumber(0, 97))
				);
			} else {
				// set it to numeric
				this.value = floor(getRandomNumber(0, 10));
			}
		}
	}

	this.rain = function() {
		this.y = (this.y >= height) ? 0 : this.y += this.speed;
	}
}

function Stream() {
	this.symbols = [];
	this.totalSymbols = round(getRandomNumber(minSymbolsCount, maxSymbolsCount));
	this.speed = getRandomNumber(minStreamSpeed, maxStreamSpeed);

	this.generateSymbols = function(x, y) {
		var opacity = 100;
		var first = round(getRandomNumber(0, 4)) == 1;
		for (var i = 0; i <= this.totalSymbols; i++) {
			var symbol = new MatrixSymbol(
				x,
				y,
				this.speed,
				first,
				opacity
			);
			symbol.setToRandomSymbol();
			this.symbols.push(symbol);
			opacity -= (255 / this.totalSymbols) / fadeInterval;
			y -= symbolSize;
			first = false;
		}
	}

	this.render = function() {
		this.symbols.forEach(function(symbol) {
			if (symbol.first) {
				fill(183, 255, 183, symbol.opacity);
			} else {
				fill(48, 229, 47, symbol.opacity);
			}
			text(symbol.value, symbol.x, symbol.y);
			symbol.rain();
			symbol.setToRandomSymbol();
		});
	}
}
