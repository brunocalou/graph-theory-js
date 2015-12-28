/**@module graph */

var GraphBase = require("./graph_base");
var AdjacencyVectorGraph = require("./adjacency_vector_graph");
var AdjacencyListGraph = require("./adjacency_list_graph");
var AdjacencyMatrixGraph = require("./adjacency_matrix_graph");

/**
 * Data structure enum
 * @typedef {object} DataStructure
 * @property {number} ADJACENCY_LIST - Store the graph using adjacency list
 * @property {number} ADJACENCY_MATRIX - Store the graph using adjacency matrix
 * @property {number} ADJACENCY_VECTOR - Store the graph using adjacency vector
 */
var DataStructure = {
	ADJACENCY_LIST: 0,
	ADJACENCY_MATRIX: 1,
	ADJACENCY_VECTOR: 2
};

/**
 * Graph factory function
 * @constructor
 * @param {DataStructure} data_structure - The datastructure
 * to use when creating the graph
 * @returns The graph with the specified datastructure
 */
function Graph(data_structure) {

	if (data_structure === DataStructure.ADJACENCY_LIST) {
		return new AdjacencyListGraph();
        
	} else if (data_structure === DataStructure.ADJACENCY_VECTOR) {
		return new AdjacencyVectorGraph();

	} else if (data_structure === DataStructure.ADJACENCY_MATRIX) {
		return new AdjacencyMatrixGraph();
	}
}

module.exports.Graph = Graph;
module.exports.DataStructure = DataStructure;