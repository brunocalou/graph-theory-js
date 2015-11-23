var graph = require('./src/graph/graph');

//Temporary debug tests

var my_graph = new graph.Graph(graph.DataStructure.ADJACENCY_VECTOR);
// var my_graph = new graph.Graph(graph.DataStructure.ADJACENCY_LIST);
// my_graph.loadFromFile('./src/test/graph_files/as_graph.txt');
my_graph.loadFromFile('./test/graph_files/small_graph.txt');
my_graph.saveGraphStatisticsToFile();
my_graph.print();