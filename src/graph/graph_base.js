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

module.exports = GraphBase;