var
	util = require('util'),
	graphtheoryjs = require('../../index'),
	Benchmark = graphtheoryjs.benchmark.Benchmark,
	Memory = graphtheoryjs.memory.Memory,
	Timer = graphtheoryjs.timer.Timer,
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
	timer = new Timer(),
	list_graph = new graphtheoryjs.graph.Graph(graphtheoryjs.graph.DataStructure.ADJACENCY_LIST),
	vector_graph = new graphtheoryjs.graph.Graph(graphtheoryjs.graph.DataStructure.ADJACENCY_VECTOR),
	matrix_graph = new graphtheoryjs.graph.Graph(graphtheoryjs.graph.DataStructure.ADJACENCY_MATRIX),
	graph_list = [],
	graph_file = argv.file || '../graph_files/small_graph.txt';

function printSeparator() {
	console.log(chalk.yellow("==============================\n"));
}

function init() {
	//If the data structure was not specified, use the vector
	if (!argv.vector && !argv.list && !argv.matrix) {
		argv.vector = true;
	}
	
	// Compare the memory used by the data structures
	var memory_diff = memory.getDiff();
	
	console.log(chalk.yellow("\n==== CURRENT MEMORY USAGE ===="));
	graphtheoryjs.util.printMemory();
	printSeparator();
	
	if (argv.list) {
		graph_list.push(
			{
				graph: list_graph,
				name: 'list'
			});
	}
	
	if (argv.vector) {
		graph_list.push(
			{
				graph: vector_graph,
				name: 'vector'
			});
	}
	
	if (argv.matrix) {
		graph_list.push(
			{
				graph: matrix_graph,
				name: 'matrix'
			});
	}
}

function run() {
	//Run the performance test
	var
		time_to_load = 0,
		current_graph;

	for (var i = 0, graph_list_length = graph_list.length; i < graph_list_length; i += 1) {
		current_graph = graph_list[i];
		
		//Load the graphs and measure time and memory
		timer.start();
		memory_diff = memory.run(function () {
			current_graph.graph.loadFromFile(graph_file);
		});
		time_to_load = timer.getElapsedTime();

		console.log(chalk.yellow("LOADED GRAPH USING " + current_graph.name.toUpperCase()));
		graphtheoryjs.util.printMemory(memory_diff);
		console.log(chalk.yellow("LOAD TIME: ") + time_to_load + " s\n");
		
		printSeparator();
	}
}

//Init and run
init();
run();
