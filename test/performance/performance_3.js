var
    util = require('util'),
    graphtheoryjs = require('../../index'),
    Benchmark = graphtheoryjs.Util.Benchmark,
    Memory = graphtheoryjs.Util.Memory,
    Timer = graphtheoryjs.Util.Timer,
    chalk = require('chalk'),
    findColor = require('../../index').Algorithms.FindColor,
    checkColoring = require('../../index').Algorithms.CheckColoring,
    fs = require('fs'),
    ProgressBar = require('progress'),
    argv = require('yargs').usage('Usage: $0 <command> [options]')
        .example('$0 -f foo.txt --vector --list', 'Load the foo.txt graph file using adjacency vector and list data structures and perform the tests')
        .example('$0 -f foo.txt -vl', 'Load the foo.txt graph file using adjacency vector and list data structures and perform the tests')
        .example('$0 -f foo.txt -m -v', 'Load the foo.txt graph file using matrix and vector data structures and perform the tests')
        .option('f', {
            alias: 'file',
            nargs: 1,
            type: 'string',
            describe: 'Load a file',
            requiresArgs: true,
            demand: true
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
    list_graph = graphtheoryjs.Graph.Graph(graphtheoryjs.Graph.DataStructure.ADJACENCY_LIST),
    vector_graph = graphtheoryjs.Graph.Graph(graphtheoryjs.Graph.DataStructure.ADJACENCY_VECTOR),
    matrix_graph = graphtheoryjs.Graph.Graph(graphtheoryjs.Graph.DataStructure.ADJACENCY_MATRIX),
    graph_list = [],
    graph_file = argv.file;

function printSeparator(color) {
    if (!color) color = 'yellow';
    console.log(chalk[color]("==============================\n"));
}

function saveJSON(graph_obj, data, suffix, use_graph_name_as_prefix) {

    if (use_graph_name_as_prefix === undefined) use_graph_name_as_prefix = true;
	
    //Save the data on the file
    graph_obj.graph.createOutputFolder();

    var name = '';

    if (use_graph_name_as_prefix) {
        name = graph_obj.name;
    }

    fs.writeFileSync(
        graph_obj.graph.output.folder + '/' + name + suffix + '.json',
        JSON.stringify(data, null, 4)
        );
}

function createProgressBar(options) {
    if (!options.clear) options.clear = true;
    return new ProgressBar('running [:bar] :percent :elapsed s', options);
}

function init() {
	
    //If the data structure was not specified, use the vector
    if (!argv.vector && !argv.list && !argv.matrix) {
        argv.vector = true;
    }

    console.log(chalk.yellow("\n==== CURRENT MEMORY USAGE ===="));
    graphtheoryjs.Util.Util.printMemory();
    printSeparator();

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

    if (argv.list) {
        graph_list.push(
            {
                graph: list_graph,
                name: 'list'
            });
    }
}

function runMemoryTest() {
    console.log(chalk.yellow("======== MEMORY  TEST ========\n"));
    var
        time_to_load = 0,
        current_graph,
        memory_diff,
        memoryTestFunction = function () {
            current_graph.graph.loadFromFile(graph_file);
        };

    for (var i = 0, graph_list_length = graph_list.length; i < graph_list_length; i += 1) {
        current_graph = graph_list[i];
		
        //Load the graphs and measure time and memory
        
        timer.start();
        memory_diff = memory.run(memoryTestFunction);
        time_to_load = timer.getElapsedTime();

        console.log(chalk.yellow("LOADED GRAPH USING " + current_graph.name.toUpperCase()));
        graphtheoryjs.Util.Util.printMemory(memory_diff);
        console.log(chalk.yellow("LOAD TIME : ") + time_to_load + " s\n");

        saveJSON(current_graph, memory_diff, '_memory_test');

    }
    printSeparator();
}

function runColorTest() {
    var current_graph = graph_list[0];
    console.log(chalk.yellow('COLOR TEST USING ' + current_graph.name.toUpperCase()) + '\n');
    
    var timer = new Timer();
    timer.start();
    var color_results = findColor(current_graph.graph);
    
    var results = {};
    results.color_results = color_results;
    results.time = timer.getElapsedTime();
    results['time unity'] = 's';
    results.color_results.valid_coloring = checkColoring(current_graph.graph, color_results.colors);
    
    console.log(chalk.yellow(' TIME : ') + results.time + ' ' + results['time unity']);
    console.log(chalk.yellow(' COLORS : ') + results.color_results.number_of_colors);
    if (results.color_results.valid_coloring) {
        console.log(chalk.yellow(' Coloring is VALID'));
    }
    else {
        console.log(chalk.yellow(' Coloring is INVALID'));
    }
    
    saveJSON(current_graph, results, 'colors', false);

    printSeparator();
}

function saveGraphStatistics() {
    //Save the graph statistics
	
    var current_graph = graph_list[0];

    console.log(chalk.yellow('====== GRAPH STATISTICS ======\n'));
    current_graph.graph.saveGraphStatisticsToFile();

    console.log(chalk.yellow(' Number of Vertices : ') + current_graph.graph.number_of_vertices);
    console.log(chalk.yellow(' Number of Edges : ') + current_graph.graph.number_of_edges);
    console.log(chalk.yellow(' Medium Degree : ') + current_graph.graph.medium_degree);
    console.log('');
    printSeparator();
}

//Init and run
init();
runMemoryTest();
saveGraphStatistics();
runColorTest();