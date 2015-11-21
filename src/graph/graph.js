var fs = require('fs');

var DataStructure = {
	ADJACENCY_LIST: 0,
	ADJACENCY_MATRIX: 1,
	ADJACENCY_VECTOR: 2
};

function Graph (data_structure) {

	//Stores the graph
	this.data = {};

	if(data_structure) {
		this.data_structure = data_structure
	} else {
		this.data_structure = DataStructure.ADJACENCY_VECTOR;
	}

	this.path = '';

	this.number_of_vertices = 0;
	this.number_of_edges = 0;
	this.medium_degree = 0;
	this.degree_distribution = {}; // {degree_1: number_of_vertices_with_degree_1 / number_of_vertices, ...}

}

Graph.prototype.addVertex = function (vertex) {
	if (this.data_structure === DataStructure.ADJACENCY_VECTOR) {
		if (!this.data[vertex]) {
			this.data[vertex] = [];
		}
	}
};

Graph.prototype.addEdge = function (vertex_1, vertex_2) {
	this.addVertex(vertex_1);
	this.addVertex(vertex_2);
	if (this.data_structure === DataStructure.ADJACENCY_VECTOR) {
		this.data[vertex_1].push(vertex_2);
		this.data[vertex_2].push(vertex_1);
	}
};

Graph.prototype.calculateDegreeStatistics = function() {
	if (this.data_structure === DataStructure.ADJACENCY_VECTOR) {
		var
			vertice,
			degree = 0;
			
		//Clear the variables
		this.medium_degree = 0;
		this.degree_distribution = {};
		console.log(this.data);

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
	}
	
	console.log("Medium degree = " + this.medium_degree);
	console.log("Degree distribution = ");
	console.log(this.degree_distribution);
};

Graph.prototype.saveGraphStatisticsToFile = function(path) {
	this.calculateDegreeStatistics();
};

Graph.prototype.loadFromFile = function(path) {
	//Load the data from the file
	//Store the data according to the data structure
	console.log("Loading graph from file");
	var file = fs.readFileSync(path).toString();

	//Read every character
	var
		current_number = '',
		second_line_start = file.indexOf('\n'),
		final_character = file.length,
		vertex_1 = 0,
		vertex_2 = 0;

	this.number_of_vertices = file.substr(0, ++second_line_start);
	
	for (var i = second_line_start; i < final_character + 1; i += 1) {
		
		if (file[i] === '\n' || i === final_character) {
			vertex_2 = parseInt(current_number);
			current_number = '';
			if (!isNaN(vertex_1) && !isNaN(vertex_2)) {
				this.number_of_edges += 1;
				this.addEdge(vertex_1, vertex_2);
			}
		} else if (file[i] === ' ') {
			vertex_1 = parseInt(current_number);
			current_number = '';
		} else {
			current_number += file[i];
		}
	}
	
	
	console.log("Finished loading graph");
	console.log("Number of vertices = " + this.number_of_vertices);
	console.log("Number of edges = " + this.number_of_edges);
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