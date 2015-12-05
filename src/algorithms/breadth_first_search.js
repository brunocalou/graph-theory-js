var Queue = require('datastructures-js').queue;
var SpanningTree = require('../trees/spanning_tree.js');

function BFS(graph, initial_vertex, callbacks) {
	var queue = new Queue();
	var explored_vertices = new Array(graph.number_of_vertices);
	var spanning_tree = new Array(graph.number_of_vertices);
	var degrees = new Array(graph.number_of_vertices);
	
	if (!callbacks) {
		callbacks = {};
	}
	
	callbacks.onVertexFound = callbacks.onVertexFound || function(){};
	callbacks.onVertexVisited = callbacks.onVertexVisited || function(){};
	
	queue.enqueue(initial_vertex);
	spanning_tree[initial_vertex] = null;
	degrees[initial_vertex] = 0;
	explored_vertices[initial_vertex] = true;
	
	while(!queue.isEmpty()) {
		var vertex = queue.dequeue();
		callbacks.onVertexVisited(vertex);
			
			graph.forEachNeighbor(vertex, function (neighbor) {
				if (!explored_vertices[neighbor]) {
					explored_vertices[neighbor] = true;
					queue.enqueue(neighbor);
					callbacks.onVertexFound(neighbor);
					
					spanning_tree[neighbor] = vertex;
					degrees[neighbor] = degrees[vertex] + 1;
				}
			});
	}

	return new SpanningTree(initial_vertex, spanning_tree, degrees, graph);
};

module.exports = BFS;