var GraphBase = require("./graph_base");
var utils = require('../utils/utils');

var AdjacencyVectorGraph = function () {
	GraphBase.call(this);
};

utils.inherit(GraphBase, AdjacencyVectorGraph);

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
		vertice,
		degree = 0;
			
	//Clear the variables
	this.medium_degree = 0;
	this.degree_distribution = {};
	
	//Fill the degree distribution with the degree as the key and the number of vertices with the degree as the value
	for (vertice in this.data) {
		if (this.data.hasOwnProperty(vertice)) {
			degree = this.data[vertice].length;
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

module.exports = AdjacencyVectorGraph;