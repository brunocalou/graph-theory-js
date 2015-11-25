var GraphBase = require("./graph_base");
var util = require('../util/util');

var AdjacencyVectorGraph = function () {
	GraphBase.call(this);
};

util.inherit(GraphBase, AdjacencyVectorGraph);

AdjacencyVectorGraph.prototype.createDataStructure = function (number_of_vertices) {
	//var array = new Array(size_of_array) is almost 5 times faster to insert elements than
	//var array = [], according to local benchmark using nodejs
	//the +1 is used because, on the test files, there were no vertices with index 0, but
	//there were indexes equal to the total number of vertices. The first element will be undefined
	//on the case (index = 0)
	this.data = new Array(number_of_vertices + 1);
};

AdjacencyVectorGraph.prototype.addVertex = function (vertex) {
	if (!this.data[vertex]) {
		this.data[vertex] = [];
	}
};

AdjacencyVectorGraph.prototype.addEdge = function (vertex_1, vertex_2) {
	this.addVertex(vertex_1);
	this.addVertex(vertex_2);
	this.data[vertex_1].push(vertex_2);
	this.data[vertex_2].push(vertex_1);
};

AdjacencyVectorGraph.prototype.calculateDegreeStatistics = function () {
	var
		vertex,
		degree = 0;
			
	//Clear the variables
	this.medium_degree = 0;
	this.degree_distribution = {};
	
	//Fill the degree distribution with the degree as the key and the number of vertices with the degree as the value
	for (vertex in this.data) {
		if (this.data.hasOwnProperty(vertex)) {
			degree = this.data[vertex].length;
			if (this.degree_distribution[degree]) {
				this.degree_distribution[degree] += 1;
			} else {
				this.degree_distribution[degree] = 1;
			}
		}
	}
		
	//Divides all the previous values by the number of vertices
	//Calculate the medium degree on the process
	for (var degree_key in this.degree_distribution) {
		if (this.degree_distribution.hasOwnProperty(degree_key)) {
			this.medium_degree += parseFloat(degree_key) * this.degree_distribution[degree_key];
			this.degree_distribution[degree_key] /= this.number_of_vertices;
		}
	}

	this.medium_degree /= this.number_of_vertices;

	console.log("Medium degree = " + this.medium_degree);
	console.log("Degree distribution = ");
	console.log(this.degree_distribution);
};

AdjacencyVectorGraph.prototype.print = function () {
	var line = '';
	var data_length = this.data.length;

	for (var i = 0; i < data_length; i += 1) {

		if (this.data[i] != undefined) {
			line += '| ' + i + ' |' + " --> ";

			this.forEachNeighbor(i, function (neighbor) {
				line += '| ';
				line += neighbor;
				line += ' ';
			});

			line += '|';
			console.log(line);
			line = '';
		}
	}
};

AdjacencyVectorGraph.prototype.neighbors = function (vertex) {
	return this.data[vertex];
};

AdjacencyVectorGraph.prototype.hasNeighbors = function (vertex) {
	return !!this.data[vertex];
};

AdjacencyVectorGraph.prototype.forEachNeighbor = function (vertex, fn) {
	if (this.data[vertex] !== undefined) {
		for (var i = 0, neighbors_length = this.data[vertex].length; i < neighbors_length; i += 1) {
			fn(this.data[vertex][i]);
		}
	}
};

// AdjacencyVectorGraph.prototype.forEach = function (fn) {
// 	this.data.forEach(fn);
// };

module.exports = AdjacencyVectorGraph;