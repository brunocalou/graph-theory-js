'use strict';

var Graph = require('../../../index').Graph.Graph;
var DataStructures = require('../../../index').Graph.DataStructure;
var fs = require('fs');
var assert = require('assert');
var appRoot = require('app-root-path');
var util = require('../../../index').Util.Util;

function getGraphFile(filename) {
    return appRoot + '/test/assets/graph_files/' + filename;
}

/**
 * Function to test the graphs
 * @param {DataStructure} graph - The graph to instantiate
 */
function testGraph(graph) {
    function deleteOutputFolder(graph) {
        try {
            fs.accessSync(graph.output.folder);
            fs.rmdirSync(graph.output.folder);
        } catch (err) {
        }
    }

    return function () {

        describe('addVertex', function () {
            it('should add a vertex', function () {
                var g = Graph(graph);

                g.addVertex(0);
                g.addVertex(1);

                assert.equal(g.exists(0), true);
                assert.equal(g.exists(1), true);
                assert.equal(g.exists(2), false);
                assert.equal(g.number_of_vertices, 2);

                g.addVertex(3);

                assert.equal(g.exists(3), true);
                assert.equal(g.exists(2), false);
                assert.equal(g.number_of_vertices, 3);
            });

            it('should not add duplicate vertices', function () {
                var g = Graph(graph);
                var value = [undefined, '123'];

                g.addVertex(0);
                g.data[0] = value;
                g.addVertex(0);
                assert.equal(g.data[0][1], value[1]);
                assert.equal(g.number_of_vertices, 1);
            });

            it('should add just the specified vertex', function () {
                var g = Graph(graph);

                g.addVertex(2);

                assert.equal(g.exists(0), false);
                assert.equal(g.exists(1), false);
                assert.equal(g.exists(2), true);
                assert.equal(g.number_of_vertices, 1);
            });

            it('should not add an invalid vertex', function () {
                var g = Graph(graph);
                
                g.addVertex('a');
                
                assert.equal(g.exists('a'), false);
            });
        });

        describe('addEdge', function () {
            it('should add an edge', function () {
                var g = Graph(graph);

                g.addEdge(1, 2);

                assert.equal(g.exists(1), true);
                assert.equal(g.exists(2), true);
                assert.equal(g.neighbors(1)[0][0], 2);
                assert.equal(g.neighbors(2)[0][0], 1);
                assert.equal(g.number_of_edges, 1);
                assert.equal(g.number_of_vertices, 2);

                g.addEdge(1, 4);

                assert.equal(g.exists(4), true);
                assert.equal(g.neighbors(1)[0][0], 2);
                assert.equal(g.neighbors(1)[1][0], 4);
                assert.equal(g.number_of_edges, 2);
                assert.equal(g.number_of_vertices, 3);
            });

            it('should not add duplicate edges', function () {
                var g = Graph(graph);

                g.addEdge(1, 2);
                g.addEdge(1, 2);

                assert.equal(g.exists(1), true);
                assert.equal(g.exists(2), true);
                assert.equal(g.neighbors(1).length, 1);
                assert.equal(g.neighbors(2).length, 1);
                assert.equal(g.number_of_edges, 1);
                assert.equal(g.number_of_vertices, 2);
            });

            it('should add a weighted edge', function () {
                var g = Graph(graph);

                g.addEdge(1, 2, 3);

                assert.equal(g.exists(1), true);
                assert.equal(g.exists(2), true);
                assert.equal(g.neighbors(1).length, 1);
                assert.equal(g.neighbors(2).length, 1);
                assert.equal(g.number_of_edges, 1);
                assert.equal(g.number_of_vertices, 2);
                assert.equal(g.neighbors(1)[0][0], 2);
                assert.equal(g.neighbors(1)[0][1], 3);
                assert.equal(g.neighbors(2)[0][0], 1);
                assert.equal(g.neighbors(2)[0][1], 3);
            });

            it('should add a negative weighted edge', function () {
                var g = Graph(graph);

                g.addEdge(1, 2, 3);
                g.addEdge(1, 3, -4);

                assert.equal(g.exists(3), true);
                assert.equal(g.neighbors(1).length, 2);
                assert.equal(g.neighbors(3).length, 1);
                assert.equal(g.number_of_edges, 2);
                assert.equal(g.number_of_vertices, 3);
                assert.equal(g.neighbors(1)[1][0], 3);
                assert.equal(g.neighbors(1)[1][1], -4);
                assert.equal(g.neighbors(3)[0][0], 1);
                assert.equal(g.neighbors(3)[0][1], -4);
            });

            it('should add a directed edge', function () {
                var g = Graph(graph, true);

                g.addEdge(1, 2, 3);
                g.addEdge(3, 1, -4);

                assert.equal(g.number_of_edges, 2);
                assert.equal(g.neighbors(1).length, 1);
                assert.equal(g.neighbors(1)[0][0], 2);
                assert.equal(g.neighbors(1)[0][1], 3);
                assert.equal(g.neighbors(2).length, 0);
                assert.equal(g.neighbors(3)[0][0], 1);
                assert.equal(g.neighbors(3)[0][1], -4);
                assert.equal(g.neighbors(3).length, 1);
            });
            
            it('should not add an invalid edge', function () {
                var g = Graph(graph);
                
                g.addEdge(1, 'a');
                
                assert.equal(g.exists(1), false);
                assert.equal(g.exists('a'), false);
            });
            
            it('should not add an edge with an invalid weight', function () {
                var g = Graph(graph);
                
                g.addEdge(1, 2, 'a');
                
                assert.equal(g.exists(1), false);
                assert.equal(g.exists(2), false);
            });
        });

        describe('calculateDegreeStatistics', function () {
            it('should calculate the medium degree correctly', function () {
                var g = Graph(graph);

                g.addEdge(1, 2);
                g.addEdge(2, 3);
                g.calculateDegreeStatistics();

                assert.equal(g.medium_degree, 4 / 3);

                g.addEdge(1, 3);
                g.calculateDegreeStatistics();

                assert.equal(g.medium_degree, 2);
            });

            it('should calculate the medium degree as equals to zero', function () {
                var g = Graph(graph);

                g.addVertex(1);
                g.addVertex(2);

                g.medium_degree = 123;

                g.calculateDegreeStatistics();

                assert.equal(g.medium_degree, 0);
            });

            it('should calculate the degree distribution correctly', function () {
                var g = Graph(graph);

                g.addEdge(1, 2);
                g.addEdge(2, 3);
                g.calculateDegreeStatistics();

                assert.equal(g.degree_distribution[0], 0);
                assert.equal(g.degree_distribution[1], 2 / 3);
                assert.equal(g.degree_distribution[2], 1 / 3);
                assert.equal(g.degree_distribution.length, 3);
            });
        });

        describe('createOutputFolder', function () {
            it('should create the output folder', function () {
                var g = Graph(graph);
                var created_output_folder = false;

                deleteOutputFolder(g);

                g.createOutputFolder();

                try {
                    fs.accessSync(g.output.folder);
                    created_output_folder = true;
                } catch (err) {
                    //Folder does not exist
                }

                assert.equal(created_output_folder, true);

                deleteOutputFolder(g);
            });
        });

        describe('saveGraphStatisticsToFile', function () {
            it('should save the statistics to the file', function () {
                var g = Graph(graph);
                var created_file = false;

                g.addEdge(1, 2);
                g.addVertex(3);

                deleteOutputFolder(g);

                g.saveGraphStatisticsToFile();

                try {
                    fs.accessSync(g.output.destination);
                    created_file = true;
                } catch (err) {
                    //Folder does not exist
                }
                
                //Delete the file
                fs.unlinkSync(g.output.destination);

                deleteOutputFolder(g);

                assert.equal(created_file, true);
            });

            it('should calculate the statistics correctly', function () {
                var g = Graph(graph);

                g.addEdge(1, 2);
                g.addEdge(2, 3);
                g.saveGraphStatisticsToFile();
                
                //Delete the file
                fs.unlinkSync(g.output.destination);

                deleteOutputFolder(g);

                assert.equal(g.degree_distribution[0], 0);
                assert.equal(g.degree_distribution[1], 2 / 3);
                assert.equal(g.degree_distribution[2], 1 / 3);
                assert.equal(g.degree_distribution.length, 3);
                assert.equal(g.medium_degree, 4 / 3);
            });
        });

        describe('loadFromFile', function () {
            it('should set the output object correctly', function () {
                var g = Graph(graph);
                var folder = appRoot + '/test/assets/graph_files/';

                g.loadFromFile(folder + 'small_graph.txt');
                assert.equal(g.output.folder, folder + 'small_graph_output');
                assert.equal(g.output.filename, 'statistics.txt');
                assert.equal(g.output.destination, g.output.folder + '/' + g.output.filename);
            });

            it('should load the graph', function () {
                var g = Graph(graph);

                g.loadFromFile(getGraphFile('small_graph.txt'));

                assert.equal(g.number_of_vertices, 5);
                assert.equal(g.number_of_edges, 5);
                assert.equal(g.neighbors(1)[0][0], 2);
                assert.equal(g.neighbors(1)[1][0], 5);
            });

            it('should load a graph with a zero degree vertex', function () {
                var g = Graph(graph);

                g.loadFromFile(getGraphFile('small_multicluster_graph.txt'));

                assert.equal(g.number_of_vertices, 11);
                assert.equal(g.number_of_edges, 7);
                assert.equal(g.neighbors(1)[0][0], 2);
                assert.equal(g.neighbors(9).length, 0);
            });

            it('should ignore the number of vertices on the file and count it while adding the vertices', function () {
                var g = Graph(graph);

                g.loadFromFile(getGraphFile('wrong_number_of_vertices_graph.txt'));

                assert.equal(g.number_of_vertices, 3);
                assert.equal(g.number_of_edges, 2);
                assert.equal(g.neighbors(1)[0][0], 2);
                assert.equal(g.neighbors(2)[1][0], 3);
            });

            it('should load a weighted graph', function () {
                var g = Graph(graph);
                var expected_graph = [
                    undefined,
                    [
                        [2, 0.1],
                        [5, 1]
                    ],
                    [
                        [1, 0.1],
                        [5, 0.2]
                    ],
                    [
                        [4, -9.5],
                        [5, 5]
                    ],
                    [
                        [3, -9.5],
                        [5, 2.3]
                    ], [
                        [1, 1],
                        [2, 0.2],
                        [3, 5],
                        [4, 2.3]
                    ]
                ];

                g.loadFromFile(getGraphFile('small_weighted_graph.txt'));

                g.forEach(function (vertex) {
                    g.forEachNeighbor(vertex, function (neighbor, weight) {
                        var contains_neighbor = false;
                        var contains_weight = false;

                        for (var i = 0, length = expected_graph[vertex].length; i < length; i += 1) {
                            if (expected_graph[vertex][i][0] === neighbor) {
                                contains_neighbor = true;
                                contains_weight = util.nearEquals(expected_graph[vertex][i][1], weight, 0.1);
                            }
                        }

                        assert.equal(contains_neighbor, true);
                        assert.equal(contains_weight, true);
                    });
                });
            });

            it('should throw an error if the first line of the file is invalid', function () {
                var g = Graph(graph);
                var error = false;

                try {
                    g.loadFromFile(getGraphFile('bad_file_format_graph.txt'));
                } catch (e) {
                    error = true;
                }

                assert.equal(error, true);
            });

            it('should load a graph using a predefined token', function () {
                var g = Graph(graph);

                g.loadFromFile(getGraphFile('small_token_graph.txt'), ',');

                assert.equal(g.number_of_vertices, 4);
                assert.equal(g.number_of_edges, 5);
            });

            it('should load a directed graph', function () {
                var g = Graph(graph, true);

                g.loadFromFile(getGraphFile('small_directed_graph.txt'));

                assert.equal(g.neighbors(1)[0][0], 2);
                assert.equal(util.nearEquals(0.4, g.neighbors(1)[0][1], 0.1), true);
                assert.equal(g.neighbors(1)[1][0], 3);
                assert.equal(g.neighbors(1)[1][1], -5);
                assert.equal(g.neighbors(2)[0][0], 1);
                assert.equal(g.neighbors(2)[0][1], -7);
                assert.equal(g.neighbors(3).length, 0);
            });
            
            it('should not add an invalid edge', function () {
                var g = Graph(graph);
                
                g.loadFromFile(getGraphFile('invalid_vertex_graph.txt'));
                
                assert.equal(g.exists(5), false);
                assert.equal(g.exists('f'), false);
                assert.equal(g.exists('a'), false);
            });
        });

        describe('neighbors', function () {
            it('should return an array of neighbors', function () {
                var g = Graph(graph);

                g.addEdge(1, 2);

                assert.equal(g.neighbors(1)[0][0], 2);
                assert.equal(g.neighbors(2)[0][0], 1);
            });

            it('should return an empty array', function () {
                var g = Graph(graph);

                g.addVertex(1);

                assert.equal(typeof g.neighbors(0), 'object');
                assert.equal(typeof g.neighbors(1), 'object');
                assert.equal(g.neighbors(0).length, 0);
                assert.equal(g.neighbors(1).length, 0);
            });
        });

        describe('hasNeighbors', function () {
            it('should return true if the vertex has neighbors and false otherwise', function () {
                var g = Graph(graph);

                g.addEdge(1, 2);
                g.addVertex(3);

                assert.equal(g.hasNeighbors(1), true);
                assert.equal(g.hasNeighbors(2), true);
                assert.equal(g.hasNeighbors(3), false);
            });

            it('should return false if the vertex does not exist', function () {
                var g = Graph(graph);

                g.addVertex(3);

                assert.equal(g.hasNeighbors(1), false);
            });
        });

        describe('forEachNeighbor', function () {
            it('should iterate over all the neighbors', function () {
                var g = Graph(graph);
                var neighbors = [];

                g.addEdge(1, 2);
                g.addEdge(1, 3);
                g.addEdge(1, 5);

                g.forEachNeighbor(1, function (neighbor) {
                    neighbors.push(neighbor);
                });

                assert.equal(2, neighbors[0]);
                assert.equal(3, neighbors[1]);
                assert.equal(5, neighbors[2]);
                assert.equal(g.neighbors(1).length, neighbors.length);
            });

            it('should not iterate a vertex that does not exist', function () {
                var g = Graph(graph);
                var loop_counter = 0;

                g.addEdge(1, 3);

                g.forEachNeighbor(2, function (neighbor) {
                    loop_counter += 1;
                });

                assert.equal(loop_counter, 0);
            });

            it('should not call the function for a vertex with no neighbors', function () {
                var g = Graph(graph);
                var loop_counter = 0;

                g.addEdge(1, 3);
                g.addVertex(2);

                g.forEachNeighbor(2, function (neighbor) {
                    loop_counter += 1;
                });

                assert.equal(loop_counter, 0);
            });
        });

        describe('forEach', function () {
            it('should iterate over all the existing vertices', function () {
                var g = Graph(graph);
                var vertices = [];

                g.addVertex(1);
                g.addEdge(2, 4);

                g.forEach(function (vertex) {
                    vertices += vertex;
                });

                assert.equal(vertices[0], 1);
                assert.equal(vertices[1], 2);
                assert.equal(vertices[2], 4);
                assert.equal(vertices.length, 3);
            });
        });

        describe('degree', function () {
            it('should return the degree of a vertex', function () {
                var g = Graph(graph);

                g.addEdge(1, 2);
                g.addEdge(1, 3);
                g.addEdge(1, 4);
                g.addEdge(2, 3);
                g.addVertex(5);

                assert.equal(g.degree(1), 3);
                assert.equal(g.degree(2), 2);
                assert.equal(g.degree(3), 2);
                assert.equal(g.degree(4), 1);
                assert.equal(g.degree(5), 0);
            });

            it('should return zero if the vertex does not exist', function () {
                var g = Graph(graph);

                assert.equal(g.degree(3), 0);
            });
        });

        describe('getRandomVertex', function () {
            it('should get a random valid vertex', function () {
                var g = Graph(graph);

                g.addVertex(1);
                g.addVertex(3);
                g.addVertex(5);

                for (var i = 0; i < 10; i += 1) {
                    assert.equal(g.exists(g.getRandomVertex()), true);
                }
            });

            it('should return a valid vertex', function () {
                var g = Graph(graph);

                g.addVertex(5);

                for (var i = 0; i < 10; i += 1) {
                    assert.equal(g.getRandomVertex(), 5);
                }
            });

            it('should return undefined if the graph is empty', function () {
                var g = Graph(graph);
                assert.equal(g.getRandomVertex(), undefined);
            });
        });

        describe('exists', function () {
            it('should return true if a vertex exists and false otherwise', function () {
                var g = Graph(graph);
                g.addVertex(1);

                assert.equal(g.exists(1), true);
                assert.equal(g.exists(0), false);
            });
        });

        describe('every', function () {
            it('should iterate over all the vertices', function () {
                var g = Graph(graph);
                var expected_vertices = [false, true, true, true, false, true, true];
                var called_callback = false;

                g.addEdge(1, 2);
                g.addEdge(2, 3);
                g.addEdge(5, 6);

                g.every(function (vertex) {
                    assert.equal(expected_vertices[vertex], true);
                    called_callback = true;
                    return true;
                });

                assert.equal(called_callback, true);
            });

            it('should stop when the callback returns false', function () {
                var g = Graph(graph);
                var expected_vertices = [false, true, true, true, false, true, false, false];
                var called_callback = false;
                var stopped = false;

                g.addEdge(1, 2);
                g.addEdge(2, 3);
                g.addEdge(5, 6);
                g.addEdge(6, 7);

                g.every(function (vertex) {
                    assert.equal(expected_vertices[vertex], true);
                    called_callback = true;
                    if (vertex == 5) {
                        stopped = true;
                        return false;
                    }
                    assert.equal(stopped, false);
                    return true;
                });

                assert.equal(called_callback, true);
                assert.equal(stopped, true);
            });
        });

        describe('everyNeighbor', function () {
            it('should iterate over all the neighbors of a vertex', function () {
                var g = Graph(graph);
                var expected_vertices = [false, false, true, true, false, true];
                var called_callback = false;

                g.addEdge(1, 2);
                g.addEdge(1, 3);
                g.addEdge(1, 5);

                g.everyNeighbor(1, function (vertex) {
                    assert.equal(expected_vertices[vertex], true);
                    called_callback = true;
                    return true;
                });

                assert.equal(called_callback, true);
            });

            it('should stop when the callback returns false', function () {
                var g = Graph(graph);
                var expected_vertices = [false, false, true, true, false, true, false];
                var called_callback = false;
                var stopped = false;

                g.addEdge(1, 2);
                g.addEdge(1, 3);
                g.addEdge(1, 5);
                g.addEdge(1, 6);

                g.everyNeighbor(1, function (vertex) {
                    assert.equal(expected_vertices[vertex], true);
                    called_callback = true;
                    if (vertex === 5) {
                        stopped = true;
                        return false;
                    }
                    assert.equal(stopped, false);
                    return true;
                });

                assert.equal(called_callback, true);
                assert.equal(stopped, true);
            });
        });

        describe('weight', function () {
            it('should return the weight of an edge', function () {
                var g = Graph(graph);

                g.addEdge(1, 2, 3);

                assert.equal(g.weight(1, 2), 3);
            });

            it('should return undefined if the edge does not exist', function () {
                var g = Graph(graph);

                g.addEdge(1, 2, 3);
                g.addEdge(1, 3, 0);

                assert.equal(g.weight(2, 3), undefined);
            });

            it('should return the correct weight of an edge on a directed graph', function () {
                var g = Graph(graph, true);

                g.addEdge(1, 2, 3);
                g.addEdge(2, 1, -2);

                assert.equal(g.weight(1, 2), 3);
                assert.equal(g.weight(2, 1), -2);
            });

            it('should return zero for the distance between a vertex and itself', function () {
                var g = Graph(graph);

                g.addEdge(1, 2, 3);

                assert.equal(g.weight(1, 1), 0);
            });
        });
    };
}

module.exports = testGraph;