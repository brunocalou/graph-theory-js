/**@module dataStructures */

/**
 * SpanningTree class
 * @constructor
 * @param {number} root - The root of the tree
 * @param {object} tree - Array that holds the parent of each vertex
 * @param {number} totalWeight - The total weight of the tree
 * @param {object} depths - Stores de depth of every vertex. The root has depth 0
 * @param {graph.GraphBase} graph - Stores a reference to the original graph   
 */
function SpanningTree (root, tree, depths, totalWeight, graph) {
	this.root = root;
	this.tree = tree; //Array that holds the parent of each vertex
	this.depths = depths; //Stores de depth of every vertex. The root has depth 0
	this.totalWeight = totalWeight; // Stores the total weight of the tree
	this.graph = graph; //Stores a reference to the original graph
    this.length = Object.keys(this.tree).length; //Number of vertices on the tree
};

module.exports = SpanningTree;