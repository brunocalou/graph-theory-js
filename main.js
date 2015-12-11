var graph = require('./src/graph/graph');
var DFS = require('./src/algorithms/depth_first_search');
var BFS = require('./src/algorithms/breadth_first_search');
var findClusters = require('./src/algorithms/find_clusters');
//Temporary debug tests

var my_graph = new graph.Graph(graph.DataStructure.ADJACENCY_VECTOR);
// var my_graph = new graph.Graph(graph.DataStructure.ADJACENCY_LIST);
// var my_graph = new graph.Graph(graph.DataStructure.ADJACENCY_MATRIX);
// my_graph.loadFromFile('./test/graph_files/small_graph.txt');
my_graph.loadFromFile('./test/graph_files/small_multicluster_graph.txt');
// my_graph.loadFromFile('./test/graph_files/as_graph.txt');
// my_graph.saveGraphStatisticsToFile();
// my_graph.print();
// console.log("Neighbors of vertex 1 = ");
// console.log(my_graph.neighbors(1));
// console.log("Iterate over all the vertices");
// my_graph.forEach(function (vertex) {
// 	console.log("Iterate over all the neighbors of vertex " + vertex);
// 	my_graph.forEachNeighbor(vertex, function (neighbor) {
// 		console.log(neighbor);
// 	});
// });

my_graph.print();
// console.log(my_graph.data);

// function foundVertex(vertex, degree) {
// 	console.log("Found vertex " + vertex + " with degree " + degree);
// }

// function visitedVertex(vertex, degree) {
// 	console.log("Visited vertex " + vertex + " with degree " + degree);
// }

// var callbacks = {
// 	onVertexFound: foundVertex,
// 	onVertexVisited: visitedVertex 
// };

// console.log("DFS");
// var dfs_spanning_tree = DFS(my_graph, 7, callbacks);
// // console.log(dfs_spanning_tree);

// console.log("\nBFS");
// var bfs_spanning_tree = BFS(my_graph, 7, callbacks);

console.log("\nFind Clusters");
var cluster_statistics = findClusters(my_graph);
console.log(cluster_statistics);
// console.log(bfs_spanning_tree);
// for (i = 0; i < 20; i += 1) {
// 	console.log(my_graph.getRandomVertex());
// }