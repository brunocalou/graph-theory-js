/**@module graph */

var GraphBase = require("./graph_base");
var util = require('../util/util');

/**
 * AdjacencyVectorGraph class
 * @constructor
 * @classdesc This class uses an array of vertices to store the graph. The graph
 * is represented by an array of vertices
 * @extends GraphBase
 */
var AdjacencyVectorGraph = function (directed) {
    GraphBase.call(this, directed);
};

util.inherit(GraphBase, AdjacencyVectorGraph);

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
        this.number_of_vertices += 1;
    }
};

AdjacencyVectorGraph.prototype.addEdge = function (vertex_1, vertex_2, weight) {
    var added_edge = false;

    if (weight === undefined) weight = 1;

    this.addVertex(vertex_1);
    this.addVertex(vertex_2);

    var vertex_1_is_neighbor = false;
    var vertex_2_is_neighbor = false;

    for (var i = 0, length = this.data[vertex_1].length; i < length; i += 1) {
        if (this.data[vertex_1][i][0] === vertex_2) {
            vertex_2_is_neighbor = true;
            break;
        }
    }

    if (!vertex_2_is_neighbor) {
        this.data[vertex_1].push([vertex_2, weight]);
        added_edge = true;
    }

    if (!this.directed) {
        for (i = 0, length = this.data[vertex_2].length; i < length; i += 1) {
            if (this.data[vertex_2][i][0] === vertex_1) {
                vertex_1_is_neighbor = true;
                break;
            }
        }

        if (!vertex_1_is_neighbor) {
            this.data[vertex_2].push([vertex_1, weight]);
            added_edge = true;
        }
    }

    if (added_edge) {
        this.number_of_edges += 1;
    }
};

AdjacencyVectorGraph.prototype.print = function (max_width, max_height) {
    var line = '';
    var data_length = this.data.length;
    var horizontal_vertex_counter = 0; //Counts how many vertices were printed on the current line

    if (max_height) {
        if (max_height < data_length) {
            data_length = max_height + 1;
        }
    }

    function printNeighbor(neighbor, weight) {
        line += '| ';
        line += neighbor;
        line += '~' + weight;
        line += ' ';
        horizontal_vertex_counter += 1;
        if (max_width) {
            if (horizontal_vertex_counter >= max_width) {
                return false;
            }
        }
        return true;
    }

    for (var i = 0; i < data_length; i += 1) {

        if (this.exists(i)) {
            line += '| ' + i + ' |';
            if (this.hasNeighbors(i)) {
                line += " --> ";

                horizontal_vertex_counter = 0;
                this.everyNeighbor(i, printNeighbor);

                line += '|';
            }
            console.log(line);
            line = '';
        }
    }
};

AdjacencyVectorGraph.prototype.neighbors = function (vertex) {
    var neighbors = [];

    if (this.exists(vertex)) {
        return this.data[vertex];
    }
    return neighbors;
};

AdjacencyVectorGraph.prototype.hasNeighbors = function (vertex) {
    var has_neighbors = false;
    if (this.exists(vertex)) {
        has_neighbors = !!this.data[vertex].length;
    }
    return has_neighbors;
};

AdjacencyVectorGraph.prototype.forEachNeighbor = function (vertex, fn) {
    if (this.exists(vertex)) {
        for (var i = 0, neighbors_length = this.data[vertex].length; i < neighbors_length; i += 1) {
            fn(this.data[vertex][i][0], this.data[vertex][i][1]);
        }
    }
};

AdjacencyVectorGraph.prototype.degree = function (vertex) {
    if (this.exists(vertex)) {
        return this.data[vertex].length;
    }
    return 0;
};

AdjacencyVectorGraph.prototype.everyNeighbor = function (vertex, fn) {
    if (this.exists(vertex)) {
        for (var i = 0, neighbors_length = this.data[vertex].length; i < neighbors_length; i += 1) {
            if (!fn(this.data[vertex][i][0], this.data[vertex][i][1])) {
                break;
            }
        }
    }
};

module.exports = AdjacencyVectorGraph;