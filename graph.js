var DataStructure = {
	ADJACENCY_LIST: 0,
	ADJACENCY_MATRIX: 1,
	ADJACENCY_VECTOR: 2
};

function Graph (data_structure) {

	//Stores the graph
	this.data = [];

	if(data_structure) {
		this.data_structure = data_structure
	} else {
		this.data_structure = DataStructure.ADJACENCY_LIST;
	}

	this.path = '';

	this.number_of_vertices = 0;
	this.number_of_edges = 0;
	this.medium_degree = 0;

	//load the data from the file
}

Graph.prototype.loadFromFile = function(path) {
	//Load the data from the file
	//Store the data according to the data structure
	console.log("Loading graph from file");
};

Graph.prototype.loadFromGraph = function(data) {
	//Load the data from another graph
	//Must find the data structure before loading it
	console.log("Loading graph from graph");
};

Graph.prototype.BFS = function() {
	console.log("BFS");
};

Graph.prototype.DFS = function() {
	console.log("DFS");
};

Graph.prototype.findClusters = function() {
	console.log("Find clusters");
};

module.exports.Graph = Graph;
module.exports.DataStructure = DataStructure;