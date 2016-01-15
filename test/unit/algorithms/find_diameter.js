'use strict';

var findDiameter = require('../../../index').Algorithms.FindDiameter;
var Graph = require('../../../index').Graph.AdjacencyVectorGraph;
var assert = require('assert');
var appRoot = require('app-root-path');

function applyFindDiameter(graph_file, callbacks) {
    var g = new Graph();

    g.loadFromFile(appRoot + '/test/assets/graph_files/' + graph_file);

    return findDiameter(g, callbacks);
}

describe('findDiameter', function () {
    it('should find the diameter', function () {
        var diameter = applyFindDiameter('small_graph.txt');

        assert.equal(diameter.size, 2);

        diameter = applyFindDiameter('small_graph_2.txt');

        assert.equal(diameter.size, 2);

        diameter = applyFindDiameter('small_graph_3.txt');

        assert.equal(diameter.size, 4);
    });

    it('should find an infinite diameter for a graph with more than one cluster', function () {
        var diameter = applyFindDiameter('small_multicluster_graph.txt');

        assert.equal(diameter.size, Infinity);
    });

    it('should find zero diameter for a graph of size one', function () {
        var g = new Graph();

        g.addVertex(1);

        var diameter = findDiameter(g);

        assert.equal(diameter.size, 0);
    });
});