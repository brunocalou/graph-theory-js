var BFS = require('./breadth_first_search');
var findClusters = require('./find_clusters');

function findDiameter (graph) {
	var diameter = {
		size: -Infinity,
		initial_vertex: 0,
		last_vertex: 0
	};
	var clusters = new findClusters(graph);
	var initial_vertex_aux;
	var callback = {
		onVertexVisited:  function visitedVertex(vertex_visited, degree) {
			if (degree === 0) {
				initial_vertex_aux = vertex_visited;
			}
			if (diameter.size < degree) {
				diameter.size = degree;
				diameter.last_vertex = vertex_visited;
				diameter.initial_vertex = initial_vertex_aux;
			}
		}
	};
	
	if (clusters.total > 1) {
		diameter.size = Infinity;
		diameter.initial_vertex = null;
		diameter.last_vertex = null;
	}
	else {
		graph.forEach (function (vertex) {
			BFS(graph, vertex, callback);
		});
	}
	
	return diameter;
};

module.exports = findDiameter;