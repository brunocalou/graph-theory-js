function getResource(name) {
	return './src/' + name;
}

var
	algorithms = {},
	benchmark = {},
    dataStructures = {},
	memory = {},
	graph = {},
	timer = {},
	trees = {},
	util = {};

algorithms.BFS = require(getResource('algorithms/breadth_first_search'));
algorithms.DFS = require(getResource('algorithms/depth_first_search'));
algorithms.FindClusters = require(getResource('algorithms/find_clusters'));
algorithms.FindDiameter = require(getResource('algorithms/find_diameter'));

benchmark.Benchmark = require(getResource('benchmark/benchmark'));

dataStructures.LinkedList = require(getResource('data_structures/linked_list'));

memory.Memory = require(getResource('memory/memory'));

graph.AdjacencyListGraph = require(getResource('graph/adjacency_list_graph'));
graph.AdjacencyVectorGraph = require(getResource('graph/adjacency_vector_graph'));
graph.AdjacencyMatrixGraph = require(getResource('graph/adjacency_matrix_graph'));
graph.Graph = require(getResource('graph/graph')).Graph;
graph.DataStructure = require(getResource('graph/graph')).DataStructure;
graph.GraphBase = require(getResource('graph/graph_base'));

timer.Timer = require(getResource('timer/timer'));

trees.SpanningTree = require(getResource('trees/spanning_tree'));

util = require(getResource('util/util'));

module.exports = {
	algorithms,
	benchmark,
    dataStructures,
	memory,
	graph,
	timer,
	trees,
	util
};