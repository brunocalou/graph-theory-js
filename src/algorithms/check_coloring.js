

function checkColoring(graph, colors){
	var visited_vertex = new Array(graph.number_of_vertices);
	var valid_coloring = true;

	graph.every(function (vertex){
		visited_vertex[vertex] = true;

		graph.everyNeighbor(vertex, function (neighbor){
			if (!visited_vertex[neighbor]) {
				if (color[vertex] == colors[neighbor]) {
					valid_coloring = false;
					return false;
				}
			}
			return true;
		});

		if (!valid_coloring){
			return false;
		}
		return true;
	});

	return valid_coloring;
}

module.exports = checkColoring;