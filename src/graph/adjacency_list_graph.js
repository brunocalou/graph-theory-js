/**@module graph */

var GraphBase = require("./graph_base");
var util = require('../util/util');
var LinkedList = require('../data_structures/linked_list');

/**
 * AdjacencyListGraph class
 * @constructor
 * @classdesc This class uses a Linked List to store the graph. The graph
 * is represented by an array of linked lists
 * @extends GraphBase
 */
function AdjacencyListGraph(directed) {
    GraphBase.call(this, directed);
};

util.inherit(GraphBase, AdjacencyListGraph);

AdjacencyListGraph.prototype.addVertex = function (vertex) {
    if (!this.data[vertex]) {
        if (Number.isFinite(vertex)) {
            this.data[vertex] = new LinkedList();
            this.number_of_vertices += 1;
        }
    }
};

AdjacencyListGraph.prototype.addEdge = function (vertex_1, vertex_2, weight) {
    if (weight === undefined) weight = 1;
    if (Number.isFinite(vertex_1) && Number.isFinite(vertex_2) && Number.isFinite(weight)) {

        var added_edge = false;


        this.addVertex(vertex_1);
        this.addVertex(vertex_2);

        var vertex_1_is_neighbor = false;
        var vertex_2_is_neighbor = false;

        this.data[vertex_1].every(function (element) {
            if (element[0] === vertex_2) {
                vertex_2_is_neighbor = true;
                return false;
            }
            return true;
        });

        if (!vertex_2_is_neighbor) {
            this.data[vertex_1].addLast([vertex_2, weight]);
            added_edge = true;
        }

        if (!this.directed) {
            this.data[vertex_2].every(function (element) {
                if (element[0] === vertex_1) {
                    vertex_1_is_neighbor = true;
                    return false;
                }
                return true;
            });

            if (!vertex_1_is_neighbor) {
                this.data[vertex_2].addLast([vertex_1, weight]);
                added_edge = true;
            }
        }

        if (added_edge) {
            this.number_of_edges += 1;
        }
    }
};

AdjacencyListGraph.prototype.print = function (max_width, max_height) {
    var line = '';
    var line_counter = 0;
    var horizontal_vertex_counter = 0; //Counts how many vertices were printed on the current line

    function printNeighbor(neighbor, weight) {
        line += ' --> ';
        line += neighbor;
        line += '~' + weight;
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

        horizontal_vertex_counter = 0;
        this.everyNeighbor(vertex, printNeighbor);

        console.log(line);
        line = '';

        line_counter += 1;
        return true;
    }, this);
};

AdjacencyListGraph.prototype.neighbors = function (vertex) {
    var neighbors = [];

    if (this.exists(vertex)) {
        neighbors = this.data[vertex].toArray();
    }

    return neighbors;
};

AdjacencyListGraph.prototype.hasNeighbors = function (vertex) {
    var has_neighbors = false;
    if (this.exists(vertex)) {
        has_neighbors = !!this.data[vertex].size();
    }
    return has_neighbors;
};

AdjacencyListGraph.prototype.forEachNeighbor = function (vertex, fn) {
    if (this.exists(vertex)) {
        this.data[vertex].forEach(function (element) {
            fn(element[0], element[1]); //vertex, weight
        });
    }
};

AdjacencyListGraph.prototype.degree = function (vertex) {
    if (this.exists(vertex)) {
        return this.data[vertex].size();
    }
    return 0;
};

AdjacencyListGraph.prototype.everyNeighbor = function (vertex, fn) {
    if (this.exists(vertex)) {
        this.data[vertex].every(function (element) {
            return fn(element[0], element[1]); //vertex, weight
        });
    }
};

module.exports = AdjacencyListGraph;