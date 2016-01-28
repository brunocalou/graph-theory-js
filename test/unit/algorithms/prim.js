'use strict';

var Prim = require('../../../index').Algorithms.Prim;
var Graph = require('../../../index').Graph.AdjacencyVectorGraph;
var assert = require('assert');
var appRoot = require('app-root-path');
var util = require('../../../index').Util.Util;

function applyPrim(graph_file, initial_vertex, callbacks) {
    var g = new Graph();

    g.loadFromFile(appRoot + '/test/assets/graph_files/' + graph_file);

    return Prim(g, initial_vertex, callbacks);
}

describe('Prim', function () {

    it('should throw an error if the graph is directed', function () {
        var g = new Graph(true);
        var error = false;

        g.addEdge(1, 2, 2);

        try {
            Prin(g, 1);
        } catch (e) {
            error = true;
        }

        assert.equal(error, true);
    });

    describe('Spanning Tree', function () {

        it('should attribute the root to the first vertex', function () {
            var g = new Graph();

            g.addEdge(1, 2);

            assert.equal(Prim(g, 1).root, 1);
        });

        it('should create the correct tree', function () {
            var root = 1;
            var spanning_tree = applyPrim('small_positive_weighted_graph.txt', root);

            assert.equal(spanning_tree.root, root);
            assert.equal(spanning_tree.tree.pop(), 2);
            assert.equal(spanning_tree.tree.pop(), 5);
            assert.equal(spanning_tree.tree.pop(), 4);
            assert.equal(spanning_tree.tree.pop(), 1);
            assert.equal(spanning_tree.tree.pop(), null);
            assert.equal(spanning_tree.tree.pop(), undefined);
        });

        it('should create the correct depths', function () {
            var root = 1;
            var spanning_tree = applyPrim('small_positive_weighted_graph.txt', root);

            assert.equal(spanning_tree.depths.pop(), 2);
            assert.equal(spanning_tree.depths.pop(), 3);
            assert.equal(spanning_tree.depths.pop(), 4);
            assert.equal(spanning_tree.depths.pop(), 1);
            assert.equal(spanning_tree.depths.pop(), 0);
            assert.equal(spanning_tree.depths.pop(), undefined);
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

            applyPrim('small_positive_weighted_graph.txt', root, {
                onVertexFound: onVertexFound,
                onVertexVisited: onVertexVisited
            });

            assert.equal(called_the_callback, true);
        });

        describe('onVertexVisited', function () {
            it('should pass the correct depths', function () {
                var root = 1;
                var expected_depths = [undefined, 0, 1, 4, 3, 2];
                var called_the_callback = false;

                var onVertexVisited = function (vertex, vertex_depth, vertex_distance) {
                    assert.equal(vertex_depth, expected_depths[vertex]);
                    called_the_callback = true;
                };

                applyPrim('small_positive_weighted_graph.txt', root, { onVertexVisited: onVertexVisited });

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

                applyPrim('small_positive_weighted_graph.txt', root, { onVertexVisited: onVertexVisited });

                assert.equal(called_the_callback, true);
            });

            it('should pass the correct costs', function () {
                var root = 1;
                var expected_distances = [undefined, 0, 0.1, 3, 2.3, 0.2];
                var called_the_callback = false;

                var onVertexVisited = function (vertex, vertex_depth, vertex_distance) {
                    assert.equal(util.nearEquals(vertex_distance, expected_distances[vertex], 0.0001), true);
                    called_the_callback = true;
                };

                applyPrim('small_positive_weighted_graph.txt', root, { onVertexVisited: onVertexVisited });

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

                applyPrim('small_positive_weighted_graph.txt', root, { onVertexFound: onVertexFound });

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

                applyPrim('small_positive_weighted_graph.txt', root, { onVertexFound: onVertexFound });

                assert.equal(called_the_callback, true);
            });

            it('should pass the correct distances', function () {
                var root = 1;
                var expected_distances = [undefined, 0, 0.1, 5, 2.3, 1];
                var called_the_callback = false;

                var onVertexFound = function (vertex, vertex_depth, vertex_distance) {
                    assert.equal(util.nearEquals(vertex_distance, expected_distances[vertex], 0.0001), true);
                    called_the_callback = true;
                };

                applyPrim('small_positive_weighted_graph.txt', root, { onVertexFound: onVertexFound });

                assert.equal(called_the_callback, true);
            });
        });
    });
});