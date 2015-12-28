/**@module algorithms */

var BFS = require('./breadth_first_search');
var findClusters = require('./find_clusters');

function findDiameter(graph, callbacks) {
	//callbacks is an object with the following properties
	// {
	// 	onDiameterUpdated = function (diameter)
	// }
	
	if (!callbacks) { callbacks = {}; }

	var diameter = {
		size: -Infinity,
		initial_vertex: 0,
		last_vertex: 0
	};
	var clusters = findClusters(graph);
	var initial_vertex_aux;
	var bfs_callbacks = {
		onVertexVisited: function (vertex_visited, degree) {
			if (diameter.size < degree) {
				diameter.size = degree;
				diameter.last_vertex = vertex_visited;
				diameter.initial_vertex = initial_vertex_aux;

				if (callbacks.onDiameterUpdated) callbacks.onDiameterUpdated(diameter);
			}
		}
	};

	if (clusters.total > 1) {
		diameter.size = Infinity;
		diameter.initial_vertex = null;
		diameter.last_vertex = null;
	}
	else {
		graph.forEach(function (vertex) {
			initial_vertex_aux = vertex;
			BFS(graph, vertex, bfs_callbacks);
		});
	}

	return diameter;
}

module.exports = findDiameter;