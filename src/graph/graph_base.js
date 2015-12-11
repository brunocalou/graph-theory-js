var fs = require('fs');

function GraphBase() {
	//Stores the graph
	this.data = {};

	this.path = '';//The path to the graph file
	
	this.output = {
		folder: '', //The destination folder
		filename: '', //The name of the statistics file
		destination: '' //The full path of the file
	}

	this.number_of_vertices = 0;
	this.number_of_edges = 0;
	this.medium_degree = 0;
	this.degree_distribution = []; //The number of vertices with the degree equals to the index

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
};

GraphBase.prototype.createOutputFolder = function () {
	//Creates the folder if it doesn't exist
	try {
		var stats = fs.accessSync(this.output.folder);
	} catch (err) {
		console.log("Folder " + this.output.folder + " doesn't exist. Will create it\n");
		fs.mkdirSync(this.output.folder);
	}
};

GraphBase.prototype.saveGraphStatisticsToFile = function () {
	// Save the statistics to file. It returns the output object
	
	this.calculateDegreeStatistics();

	var file_content = '';

	this.createOutputFolder();
	
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

	fs.writeFileSync(this.output.destination, file_content);

	return this.output;
};

GraphBase.prototype.loadFromFile = function (path) {
	//Load the data from the file
	//Store the data according to the data structure
	this.path = path;
	
	//Create an output folder. The name of the folder is the name of the file plus '_output'
	this.output.folder = this.path.substr(0, this.path.lastIndexOf('.')) + '_output';
	this.output.filename = 'statistics.txt';
	this.output.destination = this.output.folder + '/' + this.output.filename;

	var
		file = fs.readFileSync(path).toString(),
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
				if (vertex_1 > 0 && vertex_2 > 0) {
					this.number_of_edges += 1;
					this.addEdge(vertex_1, vertex_2);
				} else if (vertex_1 < 0) {
					if (vertex_2 > 0) {
						this.addVertex(vertex_2);
					}
				} else if (vertex_2 < 0) {
					if (vertex_1 > 0) {
						this.addVertex(vertex_1);
					}
				}
			}
			vertex_1 = -1;
			vertex_2 = -1;
		} else if (file[i] === ' ') {
			vertex_1 = parseInt(current_number);
			current_number = '';
		} else {
			current_number += file[i];
		}
	}
};

GraphBase.prototype.loadFromGraph = function (data) {
	//Load the data from another graph
	//Must find the data structure before loading it
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
		//Check if the vertex exists and then call the function
		if (this.exists(vertex)) {
			fn(vertex);
		}
	}
};

GraphBase.prototype.degree = function (vertex) {
	//Returns the degree of the vertex
};

GraphBase.prototype.getRandomVertex = function () {
	//Returns a random valid vertex
	var
		data_length = this.data.length,
		found_vertex = false,
		vertex = 0;

	if (data_length > 0 && this.number_of_vertices > 0) {
		while (!found_vertex) {
			vertex = parseInt(Math.random() * (data_length));
			if (this.exists(vertex)) {
				found_vertex = true;
			}
		}
	}
	return vertex;
};

GraphBase.prototype.exists = function (vertex) {
	//Returns if the vertex exists
	return !!this.data[vertex];
};

module.exports = GraphBase;