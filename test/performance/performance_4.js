var
    util = require('util'),
    graphtheoryjs = require('../../index'),
    Benchmark = graphtheoryjs.Util.Benchmark,
    Memory = graphtheoryjs.Util.Memory,
    Timer = graphtheoryjs.Util.Timer,
    chalk = require('chalk'),
    steinerTreeHeuristic = require('../../index').Algorithms.SteinerTreeHeuristic,
    steinerTreeBranchAndBound = require('../../index').Algorithms.SteinerTreeBranchAndBound,
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
    graph_file = argv.file,
    steiner_vertices = [];
    // steiner_vertices = [2, 4, 5, 6, 8, 10];
    // steiner_vertices = [1, 3, 5, 6, 7];
    // steiner_vertices = [1, 4, 5, 6];
    // steiner_vertices = [1, 3, 4, 6, 8];
    // steiner_vertices = [1, 6, 8, 9];

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

function runSteinerTreeTest() {
    var current_graph = graph_list[0];
    console.log(chalk.yellow('STEINER TREE TEST USING ' + current_graph.name.toUpperCase()) + '\n');
    
    // Copy the graph
    var graph = new graphtheoryjs.Graph.AdjacencyVectorGraph();
    current_graph.graph.forEach( vertex => {
        graph.addVertex(vertex);
        current_graph.graph.forEachNeighbor(vertex, (neighbor, weight) => {
            graph.addEdge(vertex, neighbor, weight);
        })
    });
    
    var timer = new Timer();
    timer.start();
    var steiner_tree = steinerTreeHeuristic(graph, 1, steiner_vertices);
    console.log("Weight: " + steiner_tree.getWeight());

    var results = {};
    results.steiner_tree = steiner_tree;
    results.time = timer.getElapsedTime();
    results['time unity'] = 's';
    
    console.log(chalk.yellow(' TIME : ') + results.time + ' ' + results['time unity']);
    
    saveJSON(current_graph, results, 'steiner_tree_heuristic', false);

    printSeparator();
}

function runSteinerTreeBranchAndBoundTest() {
    var current_graph = graph_list[0];
    console.log(chalk.yellow('STEINER TREE BRANCH AND BOUND TEST USING ' + current_graph.name.toUpperCase()) + '\n');

    // Copy the graph
    var graph = new graphtheoryjs.Graph.AdjacencyVectorGraph();
    current_graph.graph.forEach( vertex => {
        graph.addVertex(vertex);
        current_graph.graph.forEachNeighbor(vertex, (neighbor, weight) => {
            graph.addEdge(vertex, neighbor, weight);
        })
    });
    
    var timer = new Timer();
    timer.start();
    var steiner_tree = steinerTreeBranchAndBound(graph, steiner_vertices);
    console.log("Weight: " + steiner_tree.getWeight());

    var results = {};
    results.steiner_tree = steiner_tree;
    results.time = timer.getElapsedTime();
    results['time unity'] = 's';
    
    console.log(chalk.yellow(' TIME : ') + results.time + ' ' + results['time unity']);
    
    saveJSON(current_graph, results, 'steiner_tree_branch_and_bound', false);

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

function initSteinerVertices() {
    var current_graph = graph_list[0];
    var max_number_of_steiner_vertices = current_graph.graph.number_of_vertices * Math.random() << 0;
    // console.log('max number of steiner vertices = ' + max_number_of_steiner_vertices);
    var vertices = {};
    for (var i = 0; i < max_number_of_steiner_vertices; i += 1) {
        vertices[1 + (current_graph.graph.number_of_vertices - 1) * Math.random() << 0] = true;
    }
    
    var total = 0;
    for (var key in vertices) {
        if (vertices.hasOwnProperty(key)) {
            steiner_vertices.push(Number(key));
            total += 1;
        }
    }
    console.log("Number of steiner vertices = " + total);
    console.log('\n');
}

//Init and run
init();
runMemoryTest();
saveGraphStatistics();
initSteinerVertices();
runSteinerTreeTest();
runSteinerTreeBranchAndBoundTest();