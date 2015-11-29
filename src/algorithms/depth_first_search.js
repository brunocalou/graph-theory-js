var Stack = require('datastructures-js').stack;
var SpanningTree = require('../trees/spanning_tree.js');

function DFS(graph, initial_vertex) {
	var stack = new Stack();
	var visited_vertices = new Array(graph.number_of_vertices);
	var spanning_tree = new Array(graph.number_of_vertices);
	var degrees = new Array(graph.number_of_vertices);

	stack.push(initial_vertex);
	spanning_tree[initial_vertex] = null; //Mark the root
	degrees[initial_vertex] = 0;

	while (!stack.isEmpty()) {
		var vertex = stack.pop();
		console.log("Removed " + vertex + " from the stack");

		if (!visited_vertices[vertex]) {
			visited_vertices[vertex] = true;

			graph.forEachNeighbor(vertex, function (neighbor) {
				if (!visited_vertices[neighbor]) {
					stack.push(neighbor);
					console.log("Added " + neighbor);
					
					//Add the vertex as the parent of the neighbor on the spaning tree
					spanning_tree[neighbor] = vertex;
					//The degree of a neighbor is the degree of its parent +1
					degrees[neighbor] = degrees[vertex] + 1;
				}
			});
		}
	}
	console.log("Spanning tree = ");
	console.log(spanning_tree);
	console.log("Degrees = ");
	console.log(degrees);
	return new SpanningTree(initial_vertex, spanning_tree, degrees);
};

module.exports = DFS;