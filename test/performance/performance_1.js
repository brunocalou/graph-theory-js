var
	util = require('util'),
	graphtheoryjs = require('../../index'),
	Benchmark = graphtheoryjs.benchmark.Benchmark,
	Memory = graphtheoryjs.memory.Memory,
	chalk = require('chalk');

var
	benchmark = new Benchmark(),
	memory = new Memory(),
	list_graph = new graphtheoryjs.graph.Graph(graphtheoryjs.graph.DataStructure.ADJACENCY_LIST),
	vector_graph = new graphtheoryjs.graph.Graph(graphtheoryjs.graph.DataStructure.ADJACENCY_VECTOR),
	matrix_graph = new graphtheoryjs.graph.Graph(graphtheoryjs.graph.DataStructure.ADJACENCY_MATRIX),
	graph_file = '../graph_files/small_graph.txt';

// Compare the memory used by the data structures
var memory_diff = memory.getDiff();

console.log(chalk.yellow("\n==== CURRENT MEMORY USAGE ====\n"));
graphtheoryjs.util.printMemory();
console.log(chalk.yellow("\n==============================\n"));

// Load the vector graph
memory_diff = memory.run(function () {
	vector_graph.loadFromFile(graph_file);
});

console.log(chalk.yellow("\nLOADED GRAPH USING VECTOR"));
graphtheoryjs.util.printMemory(memory_diff);

// Load the matrix graph
memory_diff = memory.run(function () {
	matrix_graph.loadFromFile(graph_file);
});

console.log(chalk.yellow("\nLOADED GRAPH USING MATRIX"));
graphtheoryjs.util.printMemory(memory_diff);

// Load the list graph
memory_diff = memory.run(function () {
	list_graph.loadFromFile(graph_file);
});

console.log(chalk.yellow("\nLOADED GRAPH USING LIST"));
graphtheoryjs.util.printMemory(memory_diff);
