var Queue = require('datastructures-js').queue;
var SpanningTree = require('../trees/spanning_tree.js');

function BFS(graph, initial_vertex, callbacks) {
	//callbacks is an object with the following properties
	// {
	// 	onVertexVisited = function (vertex, vertex_degree),
	// 	onVertexFound = function (vertex, vertex_degree)
	// }
	
	if (!callbacks) { callbacks = {}; }

	var queue = new Queue();
	var explored_vertices = new Array(graph.number_of_vertices);
	var spanning_tree = new Array(graph.number_of_vertices);
	var degrees = new Array(graph.number_of_vertices);

	queue.enqueue(initial_vertex);
	spanning_tree[initial_vertex] = null;
	degrees[initial_vertex] = 0;
	explored_vertices[initial_vertex] = true;

	while (!queue.isEmpty()) {
		var vertex = queue.dequeue();
		if (callbacks.onVertexVisited) callbacks.onVertexVisited(vertex, degrees[vertex]);

		graph.forEachNeighbor(vertex, function (neighbor) {
			if (!explored_vertices[neighbor]) {
				explored_vertices[neighbor] = true;
				queue.enqueue(neighbor);

				spanning_tree[neighbor] = vertex;
				degrees[neighbor] = degrees[vertex] + 1;

				if (callbacks.onVertexFound) callbacks.onVertexFound(neighbor, degrees[neighbor]);
			}
		});
	}

	return new SpanningTree(initial_vertex, spanning_tree, degrees, graph);
};

module.exports = BFS;