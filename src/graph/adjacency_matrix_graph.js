/**@module graph */

var GraphBase = require("./graph_base");
var util = require('../util/util');

/**
 * AdjacencyMatrixGraph class
 * @constructor
 * @classdesc This class uses a matrix of vertices to store the graph. The graph
 * is represented by an array of array of vertices
 * @extends GraphBase
 */
var AdjacencyMatrixGraph = function () {
    GraphBase.call(this);
};

util.inherit(GraphBase, AdjacencyMatrixGraph);

AdjacencyMatrixGraph.prototype.createDataStructure = function (number_of_vertices) {
    //var array = new Array(size_of_array) is almost 5 times faster to insert elements than
    //var array = [], according to local benchmark using nodejs
    //the +1 is used because, on the test files, there were no vertices with index 0, but
    //there were indexes equal to the total number of vertices. The first element will be undefined
    //on the case (index = 0)
    this.data = new Array(number_of_vertices + 1);
};

AdjacencyMatrixGraph.prototype.addVertex = function (vertex) {
    if (!this.data[vertex]) {
        var must_refactor = false;
        var data_length = this.data.length;

        this.number_of_vertices += 1;

        if (data_length <= vertex) {
            must_refactor = true;
            data_length += vertex - data_length + 1;
        }

        this.data[vertex] = new Uint8Array(data_length);

        if (must_refactor) {
            //Must recreate all the other vertices to fit the new matrix size
            this.forEach(function (v) {
                if (this.data[v].length < data_length) {
                    var aux = new Uint8Array(data_length);

                    for (var i = 0, length = this.data[v].length; i < length; i += 1) {
                        aux[i] = this.data[v][i];
                    }

                    this.data[v] = aux;
                }
            }, this);
        }
    }
};

AdjacencyMatrixGraph.prototype.addEdge = function (vertex_1, vertex_2) {
    var added_edge = false;

    this.addVertex(vertex_1);
    this.addVertex(vertex_2);

    if (!this.data[vertex_1][vertex_2]) {
        this.data[vertex_1][vertex_2] = 1;
        added_edge = true;
    }

    if (!this.data[vertex_2][vertex_1]) {
        this.data[vertex_2][vertex_1] = 1;
        added_edge = true;
    }

    if (added_edge) {
        this.number_of_edges += 1;
    }
};

AdjacencyMatrixGraph.prototype.print = function () {
    var line = '';
    var data_length = this.data.length;

    //Print the colums header
    //Get the space used by the representation of the first column header
    line = new Array((data_length + '').length + 1).join(' ');
    line += ' | ';

    for (var k = 0; k < data_length; k += 1) {
        if (this.data[k] !== undefined) {
            line += k;
            line += ' ';
        }
    }
    console.log(line);
    var line_length = line.length;
    line = '';

    for (k = 0; k < line_length; k += 1) {
        if (k % 2) {
            line += ' ';
        } else {
            line += '-';
        }
    }
    console.log(line);
    line = '';
	
    //Print the rows. The first element is the vertex
    for (var i = 0; i < data_length; i += 1) {
        if (this.data[i] !== undefined) {
            line += i + ' | ';

            for (var j = 0; j < data_length; j += 1) {
                if (this.data[i][j]) {
                    line += '1 ';
                } else {
                    if (this.data[j] !== undefined) {
                        line += '0 ';
                    }
                }
            }

            console.log(line);
            line = '';
        }
    }
};

AdjacencyMatrixGraph.prototype.neighbors = function (vertex) {
    var neighbors = [];
    var data_length = this.data.length;

    if (this.exists(vertex)) {
        neighbors = [];

        for (var i = 0; i < data_length; i += 1) {
            if (this.data[vertex][i]) {
                neighbors.push(i);
            }
        }
    }

    return neighbors;
};

AdjacencyMatrixGraph.prototype.hasNeighbors = function (vertex) {
    var has_neighbors = false;
    var data_length = this.data.length;

    if (this.exists(vertex)) {
        for (var i = 0; i < data_length; i += 1) {
            if (this.data[vertex][i]) {
                has_neighbors = true;
                break;
            }
        }
    }
    return has_neighbors;
};

AdjacencyMatrixGraph.prototype.forEachNeighbor = function (vertex, fn) {
    var data_length = this.data.length;
    if (this.exists(vertex)) {
        for (var i = 0; i < data_length; i += 1) {
            if (this.data[vertex][i]) {
                fn(i);
            }
        }
    }
};

AdjacencyMatrixGraph.prototype.degree = function (vertex) {
    if (this.exists(vertex)) {
        return this.neighbors(vertex).length;
    }
    return 0;
};

AdjacencyMatrixGraph.prototype.everyNeighbor = function (vertex, fn) {
    var data_length = this.data.length;

    if (this.exists(vertex)) {
        for (var i = 0; i < data_length; i += 1) {
            if (this.data[vertex][i]) {
                if (!fn(i)) {
                    break;
                }
            }
        }
    }
};

module.exports = AdjacencyMatrixGraph;