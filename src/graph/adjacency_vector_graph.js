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
var AdjacencyVectorGraph = function () {
    GraphBase.call(this);
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

AdjacencyVectorGraph.prototype.addEdge = function (vertex_1, vertex_2) {
    var added_edge = false;

    this.addVertex(vertex_1);
    this.addVertex(vertex_2);

    if (this.data[vertex_1].lastIndexOf(vertex_2) == -1) {
        this.data[vertex_1].push(vertex_2);
        added_edge = true;
    }

    if (this.data[vertex_2].lastIndexOf(vertex_1) == -1) {
        this.data[vertex_2].push(vertex_1);
        added_edge = true;
    }

    if (added_edge) {
        this.number_of_edges += 1;
    }
};

AdjacencyVectorGraph.prototype.print = function () {
    var line = '';
    var data_length = this.data.length;

    function printNeighbor(neighbor) {
        line += '| ';
        line += neighbor;
        line += ' ';
    }

    for (var i = 0; i < data_length; i += 1) {

        if (this.exists(i)) {
            line += '| ' + i + ' |' + " --> ";

            this.forEachNeighbor(i, printNeighbor);

            line += '|';
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
            fn(this.data[vertex][i]);
        }
    }
};

AdjacencyVectorGraph.prototype.degree = function (vertex) {
    if (this.exists(vertex)) {
        return this.data[vertex].length;
    }
    return 0;
};

module.exports = AdjacencyVectorGraph;