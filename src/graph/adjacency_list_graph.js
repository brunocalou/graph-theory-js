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
var AdjacencyListGraph = function () {
    GraphBase.call(this);
};

util.inherit(GraphBase, AdjacencyListGraph);

AdjacencyListGraph.prototype.createDataStructure = function (number_of_vertices) {
    //var array = new Array(size_of_array) is almost 5 times faster to insert elements than
    //var array = [], according to local benchmark using nodejs
    //the +1 is used because, on the test files, there were no vertices with index 0, but
    //there were indexes equal to the total number of vertices. The first element will be undefined
    //on the case (index = 0)
    this.data = new Array(number_of_vertices + 1);
};

AdjacencyListGraph.prototype.addVertex = function (vertex) {
    if (!this.data[vertex]) {
        this.data[vertex] = new LinkedList();
        this.number_of_vertices += 1;
    }
};

AdjacencyListGraph.prototype.addEdge = function (vertex_1, vertex_2) {
    var added_edge = false;

    this.addVertex(vertex_1);
    this.addVertex(vertex_2);

    if (!this.data[vertex_1].contains(vertex_2)) {
        this.data[vertex_1].addLast(vertex_2);
        added_edge = true;
    }
    if (!this.data[vertex_2].contains(vertex_1)) {
        this.data[vertex_2].addLast(vertex_1);
        added_edge = true;
    }

    if (added_edge) {
        this.number_of_edges += 1;
    }
};

AdjacencyListGraph.prototype.print = function () {
    var line = '';
    var data_length = this.data.length;

    function printNeighbor(neighbor) {
        line += ' --> ';
        line += neighbor;
    }
    for (var i = 0; i < data_length; i += 1) {

        if (this.exists(i)) {
            line += '| ' + i + ' |';

            this.forEachNeighbor(i, printNeighbor);

            console.log(line);
            line = '';
        }
    }
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
        this.data[vertex].forEach(fn);
    }
};

AdjacencyListGraph.prototype.degree = function (vertex) {
    if (this.exists(vertex)) {
        return this.data[vertex].size();
    }
    return 0;
};

module.exports = AdjacencyListGraph;