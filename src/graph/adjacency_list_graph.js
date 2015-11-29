var GraphBase = require("./graph_base");
var util = require('../util/util');
var linkedList = require('datastructures-js').linkedList;

var AdjacencyListGraph = function () {
	GraphBase.call(this);
};

util.inherit(GraphBase, AdjacencyListGraph);

AdjacencyListGraph.prototype.createDataStructure = function (number_of_vertices) {
	//var array = new Array(size_of_array) is almost 5 times faster to insert elements than
	//var array = [], according to local benchmark using nodejs
	//the +1 is used because, on the test files, there were no vertices with index 0, but
	//there were indexes equal to the total number of vertices. The first element will be undefined
	//on the case (index = 0)
	this.data = new Array(number_of_vertices + 1);
};

AdjacencyListGraph.prototype.addVertex = function (vertex) {
	if (!this.data[vertex]) {
		this.data[vertex] = linkedList();
	}
};

AdjacencyListGraph.prototype.addEdge = function (vertex_1, vertex_2) {
	this.addVertex(vertex_1);
	this.addVertex(vertex_2);
	this.data[vertex_1].addLast(vertex_2);
	this.data[vertex_2].addLast(vertex_1);
};

AdjacencyListGraph.prototype.print = function () {
	var line = '';
	var data_length = this.data.length;

	for (var i = 0; i < data_length; i += 1) {
		
		if (this.data[i] != undefined) {
			line += '| ' + i + ' |';
			
			this.forEachNeighbor(i, function (neighbor) {
				line += ' --> ';
				line += neighbor;
			});
			
			console.log(line);
			line = '';
		}
	}
};

AdjacencyListGraph.prototype.neighbors = function (vertex) {
	var neighbors;

	if (this.data[vertex] != undefined) {
		neighbors = [];

		var node = this.data[vertex].findFirst();
		while (node) {
			neighbors.push(node.getValue());
			node = node.getNext();
		}
	}

	return neighbors;
};

AdjacencyListGraph.prototype.hasNeighbors = function (vertex) {
	var has_neighbors = false;
	if (this.data[vertex] !== undefined) {
		has_neighbors = !!this.data[vertex].count();
	}
	return has_neighbors;
};

AdjacencyListGraph.prototype.forEachNeighbor = function (vertex, fn) {
	if (this.data[vertex] !== undefined) {
		var node = this.data[vertex].findFirst();
		while (node) {
			fn(node.getValue());
			node = node.getNext();
		}
	}
}

AdjacencyListGraph.prototype.degree = function (vertex) {
	return this.data[vertex].count();
};
module.exports = AdjacencyListGraph;