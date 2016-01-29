'use strict';

var FloydWarshall = require('../../../index').Algorithms.FloydWarshall;
var Graph = require('../../../index').Graph.AdjacencyVectorGraph;
var assert = require('assert');
var appRoot = require('app-root-path');
var util = require('../../../index').Util.Util;

function applyFloydWarshall(graph_file) {
    var g = new Graph();

    g.loadFromFile(appRoot + '/test/assets/graph_files/' + graph_file);

    return FloydWarshall(g);
}

describe('FloydWarshall', function () {

    it('should compute the correct average distance', function() {
        var average_distance = applyFloydWarshall('small_positive_weighted_graph.txt').average_distance;
        var expected_average = 26.5/10;

        assert.equal(util.nearEquals(average_distance, expected_average, 0.0001), true)
    });

    describe('Result Matrices', function() {

        it('should create the correct distances', function() {
            var distances = applyFloydWarshall('small_positive_weighted_graph.txt').distance;
            var expected_distances = [undefined,
            [undefined, 0.0, 0.1, 5.3, 2.6, 0.3],
            [undefined, 0.1, 0.0, 5.2, 2.5, 0.2],
            [undefined, 5.3, 5.2, 0.0, 3.0, 5.0],
            [undefined, 2.6, 2.5, 3.0, 0.0, 2.3],
            [undefined, 0.3, 0.2, 5.0, 2.3, 0.0]
            ];

            for (var i = 1; i < distances.length; i++) {
                for( var j = 1; j < distances.length; j++) {
                    assert.equal(util.nearEquals(distances[i][j], expected_distances[i][j] , 0.0001), true);
                }
            }
        });

        it('should create the correct shortest paths', function() {
            var shortest_paths = applyFloydWarshall('small_positive_weighted_graph.txt').shortest_path;
            var expected_paths = [undefined,
            [undefined, null, 2, 2, 2, 2],
            [undefined, 1, null, 5, 5, 5],
            [undefined, 5, 5, null, 4, 5],
            [undefined, 5, 5, 3, null, 5],
            [undefined, 2, 2, 3, 4, null]
            ];

            for (var i = 1; i < shortest_paths.length; i++) {
                for( var j = 1; j < shortest_paths.length; j++) {
                    assert.equal(shortest_paths[i][j],expected_paths[i][j]);
                }
            }
        });
    });
});