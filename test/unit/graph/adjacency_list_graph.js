var testGraph = require('./testGraph');
var adjacency_list = require('../../../index').Graph.DataStructure.ADJACENCY_LIST;

describe('Adjacency List Graph', testGraph(adjacency_list));