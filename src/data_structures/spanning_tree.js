/**@module dataStructures */

/**
 * SpanningTree class
 * @constructor
 * @param {number} root - The root of the tree
 * @param {array} tree - Array that holds the parent of each vertex (vertices are defined by the index on the array)
 * @param {array} depths - Stores de depth of every vertex. The root has depth 0
 * @param {graph.GraphBase} graph - Stores a reference to the original graph   
 */
var SpanningTree = function (root, tree, depths, graph) {
	this.root = root;
	this.tree = tree; //Array that holds the parent of each vertex (vertices are defined by the index on the array)
	this.depths = depths; //Stores de depth of every vertex. The root has depth 0
	this.graph = graph; //Stores a reference to the original graph
};

module.exports = SpanningTree;