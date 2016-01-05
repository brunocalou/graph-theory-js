var testGraph = require('./testGraph');
var adjacency_matrix = require('../../../index').Graph.DataStructure.ADJACENCY_MATRIX;

describe('Adjacency Matrix Graph', testGraph(adjacency_matrix));