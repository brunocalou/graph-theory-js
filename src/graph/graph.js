var fs = require('fs');
var utils = require('../utils/utils');
var GraphBase = require("./graph_base");
var AdjacencyVectorGraph = require("./adjacency_vector_graph");

var DataStructure = {
	ADJACENCY_LIST: 0,
	ADJACENCY_MATRIX: 1,
	ADJACENCY_VECTOR: 2
};

function Graph (data_structure) {
	GraphBase.call(this);
	
	this.graph;

	if(data_structure === DataStructure.ADJACENCY_LIST) {
		
	} else if(data_structure === DataStructure.ADJACENCY_VECTOR) {
		this.graph = new AdjacencyVectorGraph();
		
	} else if(data_structure === DataStructure.ADJACENCY_MATRIX) {
	
	}
}

utils.inherit(GraphBase, Graph);

Graph.prototype.addVertex = function (vertex) {
	return this.graph.addVertex(vertex);
};

Graph.prototype.addEdge = function (vertex_1, vertex_2) {
	return this.graph.addEdge(vertex_1, vertex_2);
};

Graph.prototype.calculateDegreeStatistics = function() {
	return this.graph.calculateDegreeStatistics();
};

Graph.prototype.saveGraphStatisticsToFile = function(path) {
	return this.graph.saveGraphStatisticsToFile(path);
};

Graph.prototype.loadFromFile = function(path) {
	return this.graph.loadFromFile(path);
};

Graph.prototype.loadFromGraph = function(data) {
	return this.graph.loadFromGraph(data);
};

module.exports.Graph = Graph;
module.exports.DataStructure = DataStructure;