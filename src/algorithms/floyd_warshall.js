/**@module algorithms */

/**
 * @function
 * @param {Graph} graph - The graph to use
 */
function FloydWarshall(graph) {

    var shortest_path_matrix = [];
    var distance_matrix = [];
    for (var i = 1; i < graph.number_of_vertices + 1; i++) {
        distance_matrix[i] = new Array(graph.number_of_vertices);
        shortest_path_matrix[i] = new Array(graph.number_of_vertices);
        for (j = 1; j < graph.number_of_vertices + 1; j++) {
            distance_matrix[i][j] = Infinity;
            shortest_path_matrix[i][j] = null;
        }
        distance_matrix[i][i] = 0;
    }

    graph.forEach(function (vertex) {
        graph.forEachNeighbor(vertex, function (neighbor, weight) {
            distance_matrix[vertex][neighbor] = weight;
            shortest_path_matrix[vertex][neighbor] = neighbor;
        });
    });

    graph.forEach(function (vertex) {
        graph.forEach(function (vertex1) {
            graph.forEach(function (vertex2) {
                if (distance_matrix[vertex1][vertex2] > distance_matrix[vertex1][vertex] + distance_matrix[vertex][vertex2]) {
                    distance_matrix[vertex1][vertex2] = distance_matrix[vertex1][vertex] + distance_matrix[vertex][vertex2];
                    shortest_path_matrix[vertex1][vertex2] = shortest_path_matrix[vertex1][vertex];
                }
            });
        });
    });

    var average_distance = 0;
    var average = 0;
    for (var i = 1; i < distance_matrix.length + 1; i++) {
        for (var j = i + 1; j < distance_matrix.length + 1; j++) {
            if (distance_matrix[i][j] < Infinity) {
                average++;
                average_distance += distance_matrix[i][j];
            }
        }
    }

    average_distance = average_distance / average;

    var FW_matrices = {
        shortest_path: shortest_path_matrix,
        distance: distance_matrix,
        average_distance: average_distance
    };

    return FW_matrices;
}

module.exports = FloydWarshall;