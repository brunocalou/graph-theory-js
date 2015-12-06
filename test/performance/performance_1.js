var
	util = require('util'),
	graphtheoryjs = require('../../index'),
	Benchmark = graphtheoryjs.benchmark.Benchmark,
	Memory = graphtheoryjs.memory.Memory,
	chalk = require('chalk'),
	argv = require('yargs').usage('Usage: $0 <command> [options]')
		.example('$0 -f foo.txt --vector --list', 'Load the foo.txt graph file using adjacency vector and list data structures and perform the tests')
		.example('$0 -f foo.txt -vl', 'Load the foo.txt graph file using adjacency vector and list data structures and perform the tests')
		.example('$0 -f foo.txt -m -v', 'Load the foo.txt graph file using matrix and vector data structures and perform the tests')
		.option('f', {
			alias: 'file',
			nargs: 1,
			type: 'string',
			describe: 'Load a file'
		})
		.option('v', {
			alias: 'vector',
			describe: 'Use adjacency vector data structure'
		})
		.option('l', {
			alias: 'list',
			describe: 'Use adjacency list data structure'
		})
		.option('m', {
			alias: 'matrix',
			describe: 'Use adjacency matrix data structure'
		})
		.help('h')
		.alias('h', 'help')
		.epilog('copyright 2015')
		.argv;

var
	benchmark = new Benchmark(),
	memory = new Memory(),
	list_graph = new graphtheoryjs.graph.Graph(graphtheoryjs.graph.DataStructure.ADJACENCY_LIST),
	vector_graph = new graphtheoryjs.graph.Graph(graphtheoryjs.graph.DataStructure.ADJACENCY_VECTOR),
	matrix_graph = new graphtheoryjs.graph.Graph(graphtheoryjs.graph.DataStructure.ADJACENCY_MATRIX),
	graph_list = [],
	graph_file = argv.file || '../graph_files/small_graph.txt';

//If the data structure was not specified, use the vector
if (!argv.vector && !argv.list && !argv.matrix) {
	argv.vector = true;
}

console.log(argv);

// Compare the memory used by the data structures
var memory_diff = memory.getDiff();

console.log(chalk.yellow("\n==== CURRENT MEMORY USAGE ====\n"));
graphtheoryjs.util.printMemory();
console.log(chalk.yellow("\n==============================\n"));

if (argv.list) {
	graph_list.push(list_graph);
	// Load the list graph
	memory_diff = memory.run(function () {
		list_graph.loadFromFile(graph_file);
	});

	console.log(chalk.yellow("\nLOADED GRAPH USING LIST"));
	graphtheoryjs.util.printMemory(memory_diff);
}

if (argv.vector) {
	graph_list.push(vector_graph);
	// Load the vector graph
	memory_diff = memory.run(function () {
		vector_graph.loadFromFile(graph_file);
	});

	console.log(chalk.yellow("\nLOADED GRAPH USING VECTOR"));
	graphtheoryjs.util.printMemory(memory_diff);
}

if (argv.matrix) {
	graph_list.push(matrix_graph);
	// Load the matrix graph
	memory_diff = memory.run(function () {
		matrix_graph.loadFromFile(graph_file);
	});

	console.log(chalk.yellow("\nLOADED GRAPH USING MATRIX"));
	graphtheoryjs.util.printMemory(memory_diff);
}
