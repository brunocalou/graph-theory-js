var GraphBase = require("./graph_base");
var AdjacencyVectorGraph = require("./adjacency_vector_graph");

var DataStructure = {
	ADJACENCY_LIST: 0,
	ADJACENCY_MATRIX: 1,
	ADJACENCY_VECTOR: 2
};

function Graph(data_structure) {

	if (data_structure === DataStructure.ADJACENCY_LIST) {

	} else if (data_structure === DataStructure.ADJACENCY_VECTOR) {
		return new AdjacencyVectorGraph();

	} else if (data_structure === DataStructure.ADJACENCY_MATRIX) {

	}
}

module.exports.Graph = Graph;
module.exports.DataStructure = DataStructure;