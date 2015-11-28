var fs = require('fs');

function GraphBase() {
	//Stores the graph
	this.data = {};

	this.path = '';

	this.number_of_vertices = 0;
	this.number_of_edges = 0;
	this.medium_degree = 0;
	this.degree_distribution = {}; // {degree_1: number_of_vertices_with_degree_1 / number_of_vertices, ...}

}

GraphBase.prototype.createDataStructure = function (number_of_vertices) {
};

GraphBase.prototype.addVertex = function (vertex) {
};

GraphBase.prototype.addEdge = function (vertex_1, vertex_2) {
};

GraphBase.prototype.calculateDegreeStatistics = function () {
	var
		vertex,
		degree = 0;
			
	//Clear the variables
	this.medium_degree = 0;
	this.degree_distribution = {};
	
	//Fill the degree distribution with the degree as the key and the number of vertices with the degree as the value
	for (vertex in this.data) {
		if (this.data.hasOwnProperty(vertex)) {
			degree = this.degree(vertex);
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

GraphBase.prototype.saveGraphStatisticsToFile = function (path) {
	this.calculateDegreeStatistics();
};

GraphBase.prototype.loadFromFile = function (path) {
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

	this.number_of_vertices = parseInt(file.substr(0, ++second_line_start).replace('\n', ''));
	this.createDataStructure(this.number_of_vertices);

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

GraphBase.prototype.loadFromGraph = function (data) {
	//Load the data from another graph
	//Must find the data structure before loading it
	console.log("Loading graph from graph");
};

GraphBase.prototype.print = function () {
};

GraphBase.prototype.neighbors = function (vertex) {
	//Returns an array of vertices
};

GraphBase.prototype.hasNeighbors = function (vertex) {
	//Returns if the vertex has neighbors
};

GraphBase.prototype.forEachNeighbor = function (vertex, fn) {
	//Calls the callback for each neighbor of the chosen vertex.
	//The callback expects a neighbor as parameter:
	//fn(neighbor)
};

GraphBase.prototype.forEach = function (fn) {
	//The callback arguments are:
	//fn(vertex)
	
	for (var vertex = 0, vertices_length = this.data.length; vertex < vertices_length; vertex += 1) {
		//If the vertex neighbors is undefined, it means the vertex doesn't exist. If it
		//existed but had no neighbors, there would be anything but undefined
		if (this.hasNeighbors(vertex)) {
			fn(vertex);
		}
	}
};

GraphBase.prototype.degree = function (vertex) {
	//Returns the degree of the vertex
};

module.exports = GraphBase;