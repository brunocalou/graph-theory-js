'use strict';

var SpanningTree = require('../../index').DataStructures.SpanningTree;
var assert = require('assert');
var Graph = require('../../index').Graph.AdjacencyVectorGraph;
var Algorithms = require('../../index').Algorithms;

describe('Spanning Tree', function () {
    describe('getPath', function () {

        it('should return undefined if the vertex does not exist', function () {
            var g = new Graph();

            g.addEdge(1, 2, 3);

            var tree = Algorithms.BFS(g, 1);

            assert.equal(tree.getPath(3), undefined);

        });

        it('should return the correct path and distance for the BFS', function () {
            var g = new Graph();

            g.addEdge(1, 2, 3);
            g.addEdge(1, 5, 2);
            g.addEdge(2, 3, 1);
            g.addEdge(2, 4, 6);
            g.addEdge(3, 4, 2);

            var tree = Algorithms.BFS(g, 1);
            var path = tree.getPath(4);

            assert.equal(path.path[0], 1);
            assert.equal(path.path[1], 2);
            assert.equal(path.path[2], 4);
            assert.equal(path.distance, 9);
            assert.equal(path.unweighted_distance, 2);
        });

        it('should return the correct path and distance for the DFS', function () {
            var g = new Graph();

            g.addEdge(1, 2, 3);
            g.addEdge(1, 5, 2);
            g.addEdge(2, 3, 1);
            g.addEdge(2, 4, 6);
            g.addEdge(3, 4, 2);

            var tree = Algorithms.DFS(g, 1);
            var path = tree.getPath(4);

            assert.equal(path.path[0], 1);
            assert.equal(path.path[1], 2);
            if (path.path[2] == 3) {
                //Next must be 4
                assert.equal(path.path[3], 4);
                assert.equal(path.distance, 6);
                assert.equal(path.unweighted_distance, 3);
            } else {
                assert.equal(path.path[2], 4);
                assert.equal(path.distance, 9);
                assert.equal(path.unweighted_distance, 2);
            }
        });

        it('should return the correct path and distance for the Dijkstra algorithm', function () {
            var g = new Graph();

            g.addEdge(1, 2, 3);
            g.addEdge(1, 5, 2);
            g.addEdge(2, 3, 1);
            g.addEdge(2, 4, 6);
            g.addEdge(3, 4, 2);

            var tree = Algorithms.Dijkstra(g, 1);
            var path = tree.getPath(4);

            assert.equal(path.path[0], 1);
            assert.equal(path.path[1], 2);
            assert.equal(path.path[2], 3);
            assert.equal(path.path[3], 4);
            assert.equal(path.distance, 6);
            assert.equal(path.unweighted_distance, 3);
        });

        it('should return the correct path and distance for the Prim algorithm', function () {
            var g = new Graph();

            g.addEdge(1, 2, 3);
            g.addEdge(1, 5, 2);
            g.addEdge(2, 3, 1);
            g.addEdge(2, 4, 6);
            g.addEdge(3, 4, 2);

            var tree = Algorithms.Prim(g, 1);
            var path = tree.getPath(4);

            assert.equal(path.path[0], 1);
            assert.equal(path.path[1], 2);
            assert.equal(path.path[2], 3);
            assert.equal(path.path[3], 4);
            assert.equal(path.distance, 6);
            assert.equal(path.unweighted_distance, 3);
        });
    });

    describe('getWeight', function () {

        it('should get the correct weight for the BFS', function () {
            var g = new Graph();

            g.addEdge(1, 2, 3);
            g.addEdge(1, 5, 2);
            g.addEdge(2, 3, 1);
            g.addEdge(2, 4, 6);
            g.addEdge(3, 4, 2);

            var tree = Algorithms.BFS(g, 1);

            assert.equal(tree.getWeight(), 12);
        });

        it('should get the correct weight for the DFS', function () {
            var g = new Graph();

            g.addEdge(1, 2, 3);
            g.addEdge(1, 5, 2);
            g.addEdge(2, 3, 1);
            g.addEdge(2, 4, 6);
            g.addEdge(3, 4, 2);

            var tree = Algorithms.DFS(g, 1);

            if (tree.getPath(4).path[2] == 3) {
                //Next must be 4
                assert.equal(tree.getWeight(), 8);
            } else {
                assert.equal(tree.getWeight(), 13);
            }
        });

        it('should return the correct weight for the Dijkstra algorithm', function () {
            var g = new Graph();

            g.addEdge(1, 2, 3);
            g.addEdge(1, 5, 2);
            g.addEdge(2, 3, 1);
            g.addEdge(2, 4, 6);
            g.addEdge(3, 4, 2);

            var tree = Algorithms.Dijkstra(g, 1);

            assert.equal(tree.getWeight(), 8);
        });

        it('should return the correct weight for the Prim algorithm', function () {
            var g = new Graph();

            g.addEdge(1, 2, 3);
            g.addEdge(1, 5, 2);
            g.addEdge(2, 3, 1);
            g.addEdge(2, 4, 6);
            g.addEdge(3, 4, 2);

            var tree = Algorithms.Prim(g, 1);

            assert.equal(tree.getWeight(), 8);
        });
    });
});