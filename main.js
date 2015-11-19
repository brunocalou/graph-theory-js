var graph = require('./graph');

//Temporary debug tests

var my_graph = new graph.Graph(graph.DataStructure.ADJACENCY_LIST);
my_graph.loadFromFile('my_graph.txt');
my_graph.BFS();
my_graph.DFS();
my_graph.findClusters();

var my_graph_2 = new graph.Graph(graph.DataStructure.ADJACENCY_MATRIX);