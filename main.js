var graph = require('./src/graph/graph');
var DFS = require('./src/algorithms/depth_first_search');
var BFS = require('./src/algorithms/breadth_first_search');
//Temporary debug tests

// var my_graph = new graph.Graph(graph.DataStructure.ADJACENCY_VECTOR);
// var my_graph = new graph.Graph(graph.DataStructure.ADJACENCY_LIST);
var my_graph = new graph.Graph(graph.DataStructure.ADJACENCY_MATRIX);
// my_graph.loadFromFile('./src/test/graph_files/as_graph.txt');
my_graph.loadFromFile('./test/graph_files/small_graph.txt');
my_graph.saveGraphStatisticsToFile();
my_graph.print();
console.log("Neighbors of vertex 1 = ");
console.log(my_graph.neighbors(1));
console.log("Iterate over all the vertices");
my_graph.forEach(function (vertex) {
	console.log("Iterate over all the neighbors of vertex " + vertex);
	my_graph.forEachNeighbor(vertex, function (neighbor) {
		console.log(neighbor);
	});
});

console.log(DFS(my_graph, 1));
console.log(BFS(my_graph, 1));