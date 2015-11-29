var Queue = require('datastructures-js').queue;
var SpanningTree = require('../trees/spanning_tree.js');

function BFS(graph, initial_vertex) {
	var queue = new Queue();
	var explored_vertices = new Array(graph.number_of_vertices);
	var spanning_tree = new Array(graph.number_of_vertices);
	var degrees = new Array(graph.number_of_vertices);
	
	queue.enqueue(initial_vertex);
	spanning_tree[initial_vertex] = null;
	degrees[initial_vertex] = 0;
	explored_vertices[initial_vertex] = true;
	
	while(!queue.isEmpty()) {
		var vertex = queue.dequeue();
		console.log("Vertex " + vertex + " removed from the queue.");
			
			graph.forEachNeighbor(vertex, function (neighbor) {
				if (!explored_vertices[neighbor]) {
					explored_vertices[neighbor] = true;
					queue.enqueue(neighbor);
					console.log("Vertex" + neighbor + " added to the queue.");
					
					spanning_tree[neighbor] = vertex;
					degrees[neighbor] = degrees[vertex] + 1;
				}
			});
	}
	
	console.log("Spanning tree = ");
	console.log(spanning_tree);
	console.log("Degrees = ");
	console.log(degrees);
	return new SpanningTree(initial_vertex, spanning_tree, degrees);
};

module.exports = BFS;