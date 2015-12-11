var SpanningTree = require('../trees/spanning_tree.js');
var BFS = require('./breadth_first_search');

function findClusters (graph) {
	var cluster = {
		total: 0;
		biggest: 0;
		smallest: Infinity;
	};
	var discovered_vertices = new Array(graph.number_of_vertices);
	var vertices_found;
	var bfs_spanning_tree;
	
	for (i = 1 ; i <= graph.number_of_vertices ; i += 1) {
		if(!discovered_vertices[i]) {
			cluster.total += 1
			vertices_found = 1;
			discovered_vertices[i] = true;
			bfs_spanning_tree = BFS(graph, i);
			
			for (j = i + 1; j <= bfs_spanning_tree.tree[j] ; j += 1) {
				if(bfs_spanning_tree.tree[j]) {
					discovered_vertices[j] = true;
					vertices_found += 1;
				}
			}
			
			if (cluster.biggest < vertices_found) {
				cluster.biggest = vertices_found;
			}
			
			if (cluster.smallest > vertices_found) {
				cluster.smallest = vertices_found;
			}
		}
	}
	
	return cluster;
};

module.exports = findClusters;