var BFS = require('./breadth_first_search');

function findClusters (graph) {
	var cluster_statistics = {
		total: 0,
		biggest: 0,
		smallest: Infinity
	};
	var discovered_vertices = new Array(graph.number_of_vertices);
	var vertices_found;
	var bfs_spanning_tree;
	
	graph.forEach(function (vertex){
		if(!discovered_vertices[vertex]) {
			cluster_statistics.total += 1
			vertices_found = 1;
			discovered_vertices[vertex] = true;
			bfs_spanning_tree = BFS(graph, vertex);

			for (var i = 0, tree_length = bfs_spanning_tree.tree.length; i < tree_length ; i += 1) {
				if(bfs_spanning_tree.tree[i]) {
					discovered_vertices[i] = true;
					vertices_found += 1;
				}
			}
			
			if (cluster_statistics.biggest < vertices_found) {
				cluster_statistics.biggest = vertices_found;
			}
			
			if (cluster_statistics.smallest > vertices_found) {
				cluster_statistics.smallest = vertices_found;
			}
		}
	});
	
	return cluster_statistics;
};

module.exports = findClusters;