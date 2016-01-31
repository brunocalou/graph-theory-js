'use strict';

var Dijkstra = require('../../../index').Algorithms.Dijkstra;
var Graph = require('../../../index').Graph.AdjacencyVectorGraph;
var assert = require('assert');
var appRoot = require('app-root-path');
var util = require('../../../index').Util.Util;

function applyDijkstra(graph_file, initial_vertex, callbacks) {
    var g = new Graph();

    g.loadFromFile(appRoot + '/test/assets/graph_files/' + graph_file);

    return Dijkstra(g, initial_vertex, callbacks);
}

describe('Dijkstra', function () {

    it('should throw an error if there is a negative edge on the graph', function () {
        var g = new Graph();
        var error = false;

        g.addEdge(1, 2, 1);
        g.addEdge(1, 3, 0.1);
        g.addEdge(2, 3, -3);

        try {
            Dijkstra(g, 1);
        } catch (e) {
            error = true;
        }

        assert.equal(error, true);
    });

    describe('Spanning Tree', function () {

        it('should attribute the root to the first vertex', function () {
            var g = new Graph();

            g.addEdge(1, 2);

            assert.equal(Dijkstra(g, 1).root, 1);
        });

        it('should create the correct tree', function () {
            var root = 1;
            var spanning_tree = applyDijkstra('small_positive_weighted_graph.txt', root);

            assert.equal(spanning_tree.root, root);
            assert.equal(spanning_tree.tree[0], undefined);
            assert.equal(spanning_tree.tree[1], null);
            assert.equal(spanning_tree.tree[2], 1);
            assert.equal(spanning_tree.tree[3], 5);
            assert.equal(spanning_tree.tree[4], 5);
            assert.equal(spanning_tree.tree[5], 2);
        });

        it('should create the correct depths', function () {
            var root = 1;
            var spanning_tree = applyDijkstra('small_positive_weighted_graph.txt', root);

            assert.equal(spanning_tree.depths[0], undefined);
            assert.equal(spanning_tree.depths[1], 0);
            assert.equal(spanning_tree.depths[2], 1);
            assert.equal(spanning_tree.depths[3], 3);
            assert.equal(spanning_tree.depths[4], 3);
            assert.equal(spanning_tree.depths[5], 2);
        });

    });

    describe('Callbacks', function () {

        it('should not find a visited vertex', function () {
            var root = 1;
            var visited_vertices = [];
            var called_the_callback = false;

            var onVertexFound = function (vertex, vertex_depth, vertex_distance) {
                assert.equal(visited_vertices[vertex], undefined);
                called_the_callback = true;
            };

            var onVertexVisited = function (vertex, vertex_depth, vertex_distance) {
                visited_vertices[vertex] = true;
            };

            applyDijkstra('small_positive_weighted_graph.txt', root, {
                onVertexFound: onVertexFound,
                onVertexVisited: onVertexVisited
            });

            assert.equal(called_the_callback, true);
        });

        describe('onVertexVisited', function () {
            it('should pass the correct depths', function () {
                var root = 1;
                var expected_depths = [undefined, 0, 1, 3, 3, 2];
                var called_the_callback = false;

                var onVertexVisited = function (vertex, vertex_depth, vertex_distance) {
                    assert.equal(vertex_depth, expected_depths[vertex]);
                    called_the_callback = true;
                };

                applyDijkstra('small_positive_weighted_graph.txt', root, { onVertexVisited: onVertexVisited });

                assert.equal(called_the_callback, true);
            });

            it('should pass all the vertices', function () {
                var root = 1;
                var expected_vertices = [false, true, true, true, true, true];
                var called_the_callback = false;

                var onVertexVisited = function (vertex, vertex_depth, vertex_distance) {
                    assert.equal(expected_vertices[vertex], true);
                    called_the_callback = true;
                };

                applyDijkstra('small_positive_weighted_graph.txt', root, { onVertexVisited: onVertexVisited });

                assert.equal(called_the_callback, true);
            });

            it('should pass the correct depths', function () {
                var root = 1;
                var expected_distances = [undefined, 0, 0.1, 5.3, 2.6, 0.3];
                var called_the_callback = false;

                var onVertexVisited = function (vertex, vertex_depth, vertex_distance) {
                    assert.equal(util.nearEquals(vertex_distance, expected_distances[vertex], 0.0001), true);
                    called_the_callback = true;
                };

                applyDijkstra('small_positive_weighted_graph.txt', root, { onVertexVisited: onVertexVisited });

                assert.equal(called_the_callback, true);
            });
        });

        describe('onVertexFound', function () {
            it('should pass the correct depths', function () {
                var root = 1;
                var expected_depths = [undefined, 0, 1, 3, 3, 1];
                var called_the_callback = false;

                var onVertexFound = function (vertex, vertex_depth, vertex_distance) {
                    assert.equal(vertex_depth, expected_depths[vertex]);
                    called_the_callback = true;
                };

                applyDijkstra('small_positive_weighted_graph.txt', root, { onVertexFound: onVertexFound });

                assert.equal(called_the_callback, true);
            });

            it('should pass all the vertices, but the initial vertex', function () {
                var root = 1;
                var expected_vertices = [false, false, true, true, true, true];
                var called_the_callback = false;

                var onVertexFound = function (vertex, vertex_depth, vertex_distance) {
                    assert.equal(expected_vertices[vertex], true);
                    called_the_callback = true;
                };

                applyDijkstra('small_positive_weighted_graph.txt', root, { onVertexFound: onVertexFound });

                assert.equal(called_the_callback, true);
            });

            it('should pass the correct distances', function () {
                var root = 1;
                var expected_distances = [undefined, 0, 0.1, 5.3, 2.6, 1];
                var called_the_callback = false;

                var onVertexFound = function (vertex, vertex_depth, vertex_distance) {
                    assert.equal(util.nearEquals(vertex_distance, expected_distances[vertex], 0.0001), true);
                    called_the_callback = true;
                };

                applyDijkstra('small_positive_weighted_graph.txt', root, { onVertexFound: onVertexFound });

                assert.equal(called_the_callback, true);
            });
        });

        describe('stop', function () {
            it('should stop running', function () {
                var root = 1;
                var must_stop = false;

                var onVertexFound = function (vertex, vertex_depth, vertex_distance) {
                    if (must_stop) {
                        assert(false);
                    }
                };

                var onVertexVisited = function (vertex, vertex_depth, vertex_distance) {
                    if (!must_stop) {
                        if (vertex === 2) {
                            must_stop = true;
                        }
                    } else {
                        assert(false);
                    }
                };

                var stop = function () {
                    if (must_stop) {
                        return true;
                    }
                    return false;
                }

                applyDijkstra('small_positive_weighted_graph.txt', root, {
                    onVertexFound: onVertexFound,
                    onVertexVisited: onVertexVisited,
                    stop: stop
                });
                
                assert.equal(must_stop, true);
            });
        });
    });
});