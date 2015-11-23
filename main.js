var graph = require('./src/graph/graph');

//Temporary debug tests

var my_graph = new graph.Graph(graph.DataStructure.ADJACENCY_VECTOR);
// my_graph.loadFromFile('./src/test/graph_files/as_graph.txt');
my_graph.loadFromFile('./test/graph_files/small_graph.txt');
my_graph.saveGraphStatisticsToFile();
console.log(my_graph.data);