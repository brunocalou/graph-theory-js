var testGraph = require('./testGraph');
var adjacency_vector = require('../../../index').Graph.DataStructure.ADJACENCY_VECTOR;

describe('Adjacency Vector Graph', testGraph(adjacency_vector));