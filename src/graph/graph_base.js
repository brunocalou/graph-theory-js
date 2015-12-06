var fs = require('fs');

function GraphBase() {
	//Stores the graph
	this.data = {};

	this.path = '';

	this.number_of_vertices = 0;
	this.number_of_edges = 0;
	this.medium_degree = 0;
	this.degree_distribution = []; // holds the number of vertices with the degree equals to the index

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
	this.degree_distribution = [];
	
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
	for (var i = 0, degree_length = this.degree_distribution.length; i < degree_length; i += 1) {
		if (this.degree_distribution[i] !== undefined) {
			this.medium_degree += i * this.degree_distribution[i];
			this.degree_distribution[i] /= this.number_of_vertices;
		} else {
			this.degree_distribution[i] = 0;
		}
	}

	this.medium_degree /= this.number_of_vertices;

	// console.log("Medium degree = " + this.medium_degree);
	// console.log("Degree distribution = ");
	// console.log(this.degree_distribution);
};

GraphBase.prototype.saveGraphStatisticsToFile = function (path) {
	this.calculateDegreeStatistics();
	
	//Create an output folder. The name of the folder is the name of the file plus '_output'
	var folder = this.path.substr(0, this.path.lastIndexOf('.')) + '_output';
	var filename = 'statistics.txt';
	var file_content = '';
	
	//Creates the folder if it doesn't exist
	try {
		var stats = fs.accessSync(folder);
	} catch (err) {
		console.log("Folder " + folder + " doesn't exist. Will create it");
		fs.mkdirSync(folder);
	}
	
	//Fill the content
	file_content += '# n = ';
	file_content += this.number_of_vertices;
	file_content += '\n';
	
	file_content += '# m = ';
	file_content += this.number_of_edges;
	file_content += '\n';
	
	file_content += '# medium_d = ';
	file_content += this.medium_degree;
	file_content += '\n';
	
	//Fill in with the degree distribution
	for (var i = 0, degree_length = this.degree_distribution.length; i < degree_length; i += 1) {
		file_content += i;
		file_content += ' ';
		file_content += this.degree_distribution[i];
		file_content += '\n';
	}
	
	fs.writeFileSync(folder + '/' + filename, file_content);
};

GraphBase.prototype.loadFromFile = function (path) {
	//Load the data from the file
	//Store the data according to the data structure
	this.path = path;
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