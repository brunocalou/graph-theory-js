var GraphBase = require("./graph_base");
var util = require('../util/util');

var AdjacencyMatrixGraph = function () {
	GraphBase.call(this);
};

util.inherit(GraphBase, AdjacencyMatrixGraph);

AdjacencyMatrixGraph.prototype.createDataStructure = function (number_of_vertices) {
	//var array = new Array(size_of_array) is almost 5 times faster to insert elements than
	//var array = [], according to local benchmark using nodejs
	//the +1 is used because, on the test files, there were no vertices with index 0, but
	//there were indexes equal to the total number of vertices. The first element will be undefined
	//on the case (index = 0)
	this.data = new Array(number_of_vertices + 1);
};

AdjacencyMatrixGraph.prototype.addVertex = function (vertex) {
	if (!this.data[vertex]) {
		this.data[vertex] = new Uint8Array(this.number_of_vertices + 1);
	}
};

AdjacencyMatrixGraph.prototype.addEdge = function (vertex_1, vertex_2) {
	this.addVertex(vertex_1);
	this.addVertex(vertex_2);
	this.data[vertex_1][vertex_2] = 1;
	this.data[vertex_2][vertex_1] = 1;
};

AdjacencyMatrixGraph.prototype.print = function () {
	var line = '';
	var data_length = this.data.length;

	//Print the colums header
	//Get the space used by the representation of the first column header
	line = new Array((data_length + '').length + 1).join(' ');
	line += ' | ';

	for (var k = 0; k < data_length; k += 1) {
		if (this.data[k] !== undefined) {
			line += k;
			line += ' ';
		}
	}
	console.log(line);
	var line_length = line.length;
	line = '';

	for (var k = 0; k < line_length; k += 1) {
		if (k % 2) {
			line += ' ';
		} else {
			line += '-';
		}
	}
	console.log(line);
	line = '';
	
	//Print the rows. The first element is the vertex
	for (var i = 0; i < data_length; i += 1) {
		if (this.data[i] !== undefined) {
			line += i + ' | ';

			for (var j = 0; j < data_length; j += 1) {
				if (this.data[i][j]) {
					line += '1 ';
				} else {
					if (this.data[j] !== undefined) {
						line += '0 ';
					}
				}
			}

			console.log(line);
			line = '';
		}
	}
};

AdjacencyMatrixGraph.prototype.neighbors = function (vertex) {
	var neighbors;
	var data_length = this.data.length;

	if (this.exists(vertex)) {
		neighbors = [];

		for (var i = 0; i < data_length; i += 1) {
			if (this.data[vertex][i]) {
				neighbors.push(i);
			}
		}
	}

	return neighbors;
};

AdjacencyMatrixGraph.prototype.hasNeighbors = function (vertex) {
	var has_neighbors = false;
	var data_length = this.data.length;

	if (this.exists(vertex)) {
		for (var i = 0; i < data_length; i += 1) {
			if (this.data[vertex][i]) {
				has_neighbors = true;
				break;
			}
		}
	}
	return has_neighbors;
};

AdjacencyMatrixGraph.prototype.forEachNeighbor = function (vertex, fn) {
	var data_length = this.data.length;

	if (this.exists(vertex)) {
		for (var i = 0; i < data_length; i += 1) {
			if (this.data[vertex][i]) {
				fn(i);
			}
		}
	}
};

AdjacencyMatrixGraph.prototype.degree = function (vertex) {
	return this.neighbors(vertex).length;
};

module.exports = AdjacencyMatrixGraph;