var SpanningTree = function (root, tree, degrees, graph) {
	this.root = root;
	this.tree = tree; //Array that holds the parent of each vertex (vertices are defined by the index on the array)
	this.degrees = degrees; //Stores de degree of every vertex. The root has degree 0
	this.graph = graph; //Stores the a reference to the original graph
};

module.exports = SpanningTree;