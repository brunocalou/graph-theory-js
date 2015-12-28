/**@module algorithms */

/**
 * Callbacks used by the find clusters function
 * @typedef {object} cluster_callbacks
 * @property {cluster_size} cluster_size
 * @property {cluster_statistics} cluster_statistics
 */

/**
 * The cluster statistics
 * @typedef {object} cluster_statistics
 * @property {number} total - The total number of clusters
 * @property {number} biggest - The biggest cluster
 * @property {number} smallest - The smallest cluster
 */

/**
 * Called when a cluster was found
 * @typedef {function} onClusterFound
 * @param {number} cluster_size - The size of the found cluster
 * @param {cluster_statistics} cluster_statistics - The cluster statistics object
 */

var BFS = require('./breadth_first_search');

/**
 * @function
 * @param {Graph} graph - The graph to use
 * @param {cluster_callbacks} callbacks - The callback object
 */
function findClusters(graph, callbacks) {
	//callbacks is an object with the following properties
	// {
	// 	onClusterFound = function (cluster_size, cluster_statistics)
	// }
	
	if (!callbacks) { callbacks = {}; }

	var cluster_statistics = {
		total: 0,
		biggest: 0,
		smallest: Infinity
	};
	var discovered_vertices = new Array(graph.number_of_vertices);
	var vertices_found;
	var bfs_spanning_tree;

	graph.forEach(function (vertex) {
		if (!discovered_vertices[vertex]) {
			cluster_statistics.total += 1;
			vertices_found = 1;
			discovered_vertices[vertex] = true;
			bfs_spanning_tree = BFS(graph, vertex);

			for (var i = 0, tree_length = bfs_spanning_tree.tree.length; i < tree_length; i += 1) {
				if (bfs_spanning_tree.tree[i]) {
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

			if (callbacks.onClusterFound) callbacks.onClusterFound(vertices_found, cluster_statistics);
		}
	});

	return cluster_statistics;
}

module.exports = findClusters;