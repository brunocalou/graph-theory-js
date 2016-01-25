var SpanningTree = require('../data_structures/spanning_tree.js');
var BinaryHeap = require('../data_structures/binary_heap.js');

function Prim(graph, initial_vertex, callbacks) {

	if (!callbacks) { callbacks = {}; }

	function comparator(a,b) {
		return a[1] - b[1];
	}

	var cost = new Array(graph.number_of_vertices);
	var spanning_tree = new Array(graph.number_of_vertices);
	var set = new BinaryHeap.MinBinaryHeap(comparator);
	var explored_vertices = new Array(graph.number_of_vertices);
	var depths = new Array(graph.number_of_vertices);
	var discovered_vertices = new Array(graph.number_of_vertices);

	for (i = 1; i < graph.number_of_vertices + 1; i++) {
		cost[i] = Infinity;
	}

	cost[initial_vertex] = 0;
	spanning_tree[initial_vertex] = null;
	depths[initial_vertex] = 0;
	set.push( [initial_vertex, cost[initial_vertex]] );
	discovered_vertices[initial_vertex] = true;

	while(!set.isEmpty()) {

		var vertex;

		vertex = set.pop()[0];

		explored_vertices[vertex] = true;

		if (callbacks.onVertexVisited) callbacks.onVertexVisited(vertex, depths[vertex], cost[vertex]);

		graph.forEachNeighbor(vertex, function (neighbor, weight) {

			if(!explored_vertices[neighbor]) {

				if(cost[neighbor] > weight){
					var aux = cost[neighbor];
					cost[neighbor] = weight;

					spanning_tree[neighbor] = vertex;
					depths[neighbor] = depths[vertex] + 1;

					if(!discovered_vertices[neighbor]) {
						discovered_vertices[neighbor] = true;
						set.push( [neighbor, cost[neighbor]] );

						if (callbacks.onVertexFound) callbacks.onVertexFound(neighbor, depths[neighbor], cost[neighbor]);
					}
					else {
						set.changeElement( [neighbor, aux] , [neighbor, cost[neighbor]] );
					}
				}
			}
		});

	}

	return new SpanningTree(initial_vertex, spanning_tree, depths, graph);
}

module.exports = Prim;