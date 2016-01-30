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
function AdjacencyVectorGraph(directed) {
    GraphBase.call(this, directed);
};

util.inherit(GraphBase, AdjacencyVectorGraph);

AdjacencyVectorGraph.prototype.addVertex = function (vertex) {
    if (!this.data[vertex]) {
        if (Number.isFinite(vertex)) {
            this.data[vertex] = [];
            this.number_of_vertices += 1;
        }
    }
};

AdjacencyVectorGraph.prototype.addEdge = function (vertex_1, vertex_2, weight) {
    if (weight === undefined) weight = 1;

    if (Number.isFinite(vertex_1) && Number.isFinite(vertex_2) && Number.isFinite(weight)) {
        var added_edge = false;


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
    }
};

AdjacencyVectorGraph.prototype.print = function (max_width, max_height) {
    var line = '';
    var horizontal_vertex_counter = 0; //Counts how many vertices were printed on the current line
    var line_counter = 0;

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

    this.every(function (vertex) {
        if (line_counter >= max_height) {
            return false;
        }
        line += '| ' + vertex + ' |';
        if (this.hasNeighbors(vertex)) {
            line += " --> ";

            horizontal_vertex_counter = 0;
            this.everyNeighbor(vertex, printNeighbor);

            line += '|';
        }
        console.log(line);
        line = '';

        line_counter += 1;
        return true;
    }, this);
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