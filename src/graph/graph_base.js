/**@module graph */

var fs = require('fs');

/**
 * Output object used by the GraphBase class
 * @typedef {object} output_obj
 * @property {string} folder - The folder to save the file
 * @property {string} filename - The name of the statistics file
 * @property {string} destination - The full path of the file
*/
    
/**
 * GraphBase class
 * @constructor
 * @classdesc The GraphBase class is the base of all the other graph classes.
 * It holds every method and implements just the ones that are datastructure-agnostic
 */
function GraphBase() {
    /**
     * Stores the graph
     * @type {array}
     */
    this.data = [];

    /**
     * Stores the path to the graph file
     * @type {string}
     */
    this.path = '';

    /**@type {output_obj} */
    this.output = {
        folder: '_out',
        filename: 'statistics.txt',
        destination: '_out/out.txt'
    };

    /**@type {number} */
    this.number_of_vertices = 0;
    
    /**@type {number} */
    this.number_of_edges = 0;
    
    /**@type {number} */
    this.medium_degree = 0;
    
    /**
     * The number of vertices with the degree equals to the index
     * @type {array}
     */
    this.degree_distribution = [];
}

/**
 * Creates the data structure to hold the graph
 * @param {number} number_of_vertices - Set the size of the graph
 */
GraphBase.prototype.createDataStructure = function (number_of_vertices) {
};

/**
 * Adds the vertex to the graph
 * @param {number} vertex - The vertex to be added
 */
GraphBase.prototype.addVertex = function (vertex) {
};

/**
 * Adds an edge to the graph
 * @param {number} vertex_1 - The first vertex
 * @param {number} vertex_2 - The second vertex
 * @param {number} weight - The weight of the edge. The default is 1
 */
GraphBase.prototype.addEdge = function (vertex_1, vertex_2, weight) {
};

/**
 * Calculates the medium degree and the degree distribution
 */
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

/**
 * Creates the folder to contain the graph statistics file
 */
GraphBase.prototype.createOutputFolder = function () {
    //Creates the folder if it doesn't exist
    try {
        fs.accessSync(this.output.folder);
    } catch (err) {
        fs.mkdirSync(this.output.folder);
    }
};

/**
 * Calculates and saves the graph statistics as on the output folder.
 * The file will contain the number of vertices, number of edges, medium degree
 * and the degree distribution
 * @returns {output_obj} The output object, member of the GraphBase class
 */
GraphBase.prototype.saveGraphStatisticsToFile = function () {

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

/**
 * Loads the graph from a file. The graph file must be on the following format:
 * number_of_vertices
 * vertex_1 vertex_2
 * vertex_1 vertex_3
 * ...
 * Where each line is an edge
 * @param {string} path - The path to the graph file
 */
GraphBase.prototype.loadFromFile = function (path) {
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
    
    //Reset the number of vertices, because the file can be wrong
    this.number_of_vertices = 0;

    for (var i = second_line_start; i < final_character + 1; i += 1) {

        if (file[i] === '\n' || i === final_character) {
            vertex_2 = parseInt(current_number);
            current_number = '';
            if (!isNaN(vertex_1) && !isNaN(vertex_2)) {
                if (vertex_1 > 0 && vertex_2 > 0) {
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

/**
 * Loads the graph from another graph
 * Not implemented yet
 * @param {GraphBase} data - The graph to use as the base
 */
GraphBase.prototype.loadFromGraph = function (data) {
    //Must find the data structure before loading it
};

/**
 * Prints the graph
 * @param {number} max_width - The max number of vertices to print horizontally
 * @param {number} max_height - The max number of vertices to print vertically
 */
GraphBase.prototype.print = function (max_width, max_height) {
};

/**
 * Returns an array of vertices that are neighbors of the specified vertex
 * @param {number} vertex - The vertex to get the neighbors
 * @returns An array with the neighbors of the specified vertex
 */
GraphBase.prototype.neighbors = function (vertex) {
};

/**
 * Returns if the vertex has neighbors
 * @param {number} vertex - The vertex to use
 * @returns {boolean} True if the vertex has neighbors
 */
GraphBase.prototype.hasNeighbors = function (vertex) {
};

/**
 * For each neighbor callback
 * @callback GraphBase~forEachNeighborCallback
 * @param {number} neighbor - The current neighbor
 * @param {number} weight - The weight of the edge
 */

/**
 * Iterates over each neighbor of the specified vertex and calls
 * the specified callback function
 * @param {number} vertex - The vertex to use
 * @param {forEachNeighborCallback} fn - The callback function
 */
GraphBase.prototype.forEachNeighbor = function (vertex, fn) {
};

/**
 * For each callback
 * @callback GraphBase~forEachCallback
 * @param {number} vertex - The current vertex
 */

/**
 * Iterates over each valid vertex
 * @param {forEachCallback} fn - The callback function
 * @param {object} [this_arg] - The object to use as this when calling the fn function
 */
GraphBase.prototype.forEach = function (fn, this_arg) {
    for (var vertex = 0, vertices_length = this.data.length; vertex < vertices_length; vertex += 1) {
        //Check if the vertex exists and then call the function
        if (this.exists(vertex)) {
            fn.call(this_arg, vertex);
        }
    }
};

/**
 * Returns the degree of the vertex. If the vertex does not exist,
 * it returns 0
 * @param {number} vertex - The vertex to be used
 * @returns {number} The degree of the vertex, or 0 if it does not exist
 */
GraphBase.prototype.degree = function (vertex) {
};

/**
 * Returns a random valid vertex
 * @returns {number} A random valid vertex or undefined if the graph is empty
 */
GraphBase.prototype.getRandomVertex = function () {
    var
        data_length = this.data.length,
        found_vertex = false,
        vertex;

    if (data_length > 0 && this.number_of_vertices > 0) {
        while (!found_vertex) {
            vertex = Math.floor(Math.random() * (data_length));
            if (this.exists(vertex)) {
                found_vertex = true;
            }
        }
    }
    return vertex;
};

/**
 * Checks if the vertex exists
 * @param {number} vertex - The vertex to be checked
 * @returns {boolean} True if the vertex exists
 */
GraphBase.prototype.exists = function (vertex) {
    return !!this.data[vertex];
};

/**
 * For each callback
 * @callback GraphBase~everyCallback
 * @param {number} vertex - The current vertex
 */

/**
 * Iterates over all the valid vertices while the callback function is returning true
 * @param {everyCallback} fn - The callback function
 * @param {object} [this_arg] - The object to use as this when calling the fn function
 */
GraphBase.prototype.every = function (fn, this_arg) {
    for (var vertex = 0, vertices_length = this.data.length; vertex < vertices_length; vertex += 1) {
        //Check if the vertex exists and then call the function
        if (this.exists(vertex)) {
            if (!fn.call(this_arg, vertex)) {
                break;
            }
        }
    }
};

/**
 * For each Neighbor callback
 * @callback GraphBase~everyNeighborCallback
 * @param {number} neighbor - The current neighbor
 * @param {number} weight - The weight of the edge
 */

/**
 * Iterates over all the valid vertices while the callback function is returning true
 * @param {number} vertex - The vertex to use
 * @param {everyNeighborCallback} fn - The callback function
 */
GraphBase.prototype.everyNeighbor = function (vertex, fn) {
};

module.exports = GraphBase;