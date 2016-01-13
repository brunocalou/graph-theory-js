var testGraph = require('./testGraph');
var adjacency_matrix = require('../../../index').Graph.DataStructure.ADJACENCY_MATRIX;
var Graph = require('../../../index').Graph.AdjacencyMatrixGraph;
var assert = require('assert');

describe('Adjacency Matrix Graph', function () {
    testGraph(adjacency_matrix)();

    describe('addVertex', function () {
        it('should refactor the matrix', function () {
            var g = new Graph();

            g.addVertex(1);

            assert.equal(g.data[0], undefined);
            assert.equal(g.data[1].length, 2);

            g.addVertex(3);

            assert.equal(g.data[0], undefined);
            assert.equal(g.data[2], undefined);
            assert.equal(g.data[1].length, 4);
            assert.equal(g.data[3].length, 4);
        });
    });
});