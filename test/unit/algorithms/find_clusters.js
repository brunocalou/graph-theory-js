'use strict';

var findClustes = require('../../../index').Algorithms.FindClusters;
var Graph = require('../../../index').Graph.AdjacencyVectorGraph;
var assert = require('assert');

function applyFindClusters(graph_file, callbacks) {
    var g = new Graph();

    g.loadFromFile(__dirname + '/../../assets/graph_files/' + graph_file);

    return findClustes(g, callbacks);
}

describe('findClusters', function() {
    it('should succeed for a graph with one cluster', function() {
        var cluster_statistics = applyFindClusters('small_graph.txt');
        
        assert.equal(cluster_statistics.total, 1);
        assert.equal(cluster_statistics.biggest, 5);
        assert.equal(cluster_statistics.smallest, 5);
    });
    
    it('should succeed for a graph with more than one cluster', function() {
        var cluster_statistics = applyFindClusters('small_multicluster_graph.txt');
        
        assert.equal(cluster_statistics.total, 4);
        assert.equal(cluster_statistics.biggest, 5);
        assert.equal(cluster_statistics.smallest, 1);
    });
});