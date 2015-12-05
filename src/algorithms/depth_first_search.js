var Stack = require('datastructures-js').stack;
var SpanningTree = require('../trees/spanning_tree.js');

function DFS(graph, initial_vertex, callbacks) {
	var stack = new Stack();
	var visited_vertices = new Array(graph.number_of_vertices);
	var spanning_tree = new Array(graph.number_of_vertices);
	var degrees = new Array(graph.number_of_vertices);
	
	if (!callbacks) {
		callbacks = {};
	}
	
	callbacks.onVertexFound = callbacks.onVertexFound || function(){};
	callbacks.onVertexVisited = callbacks.onVertexVisited || function(){};

	stack.push(initial_vertex);
	spanning_tree[initial_vertex] = null; //Mark the root
	degrees[initial_vertex] = 0;

	while (!stack.isEmpty()) {
		var vertex = stack.pop();

		if (!visited_vertices[vertex]) {
			visited_vertices[vertex] = true;
			callbacks.onVertexVisited(vertex);

			graph.forEachNeighbor(vertex, function (neighbor) {
				if (!visited_vertices[neighbor]) {
					stack.push(neighbor);
					callbacks.onVertexFound(neighbor);
					
					//Add the vertex as the parent of the neighbor on the spaning tree
					spanning_tree[neighbor] = vertex;
					//The degree of a neighbor is the degree of its parent +1
					degrees[neighbor] = degrees[vertex] + 1;
				}
			});
		}
	}

	return new SpanningTree(initial_vertex, spanning_tree, degrees, graph);
};

module.exports = DFS;