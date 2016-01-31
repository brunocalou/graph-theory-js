/**@module algorithms */

/**
 * Object returned by the Floyd-Warshall algorithm
 * @typedef {object} fw_obj
 * @property {object} shortest_paths - Matrix containing the shortest paths from a vertex i to a vertex j
 * To discover the paths you must follow the vertices until you find the last vertex
 * @property {object} distances - Matrix containing the distances between a vertex i and a vertex j
 * @property {number} average_distance - The average distance of all the paths
 */

/**
 * @function
 * @param {Graph} graph - The graph to use
 * @returns {fw_obj}
 */
function FloydWarshall(graph) {

    var shortest_paths_matrix = {};
    var distances_matrix = {};

    graph.forEach(function (i) {
        distances_matrix[i] = {};
        shortest_paths_matrix[i] = {};
        graph.forEach(function (j) {
            distances_matrix[i][j] = Infinity;
            shortest_paths_matrix[i][j] = null;
        });
        distances_matrix[i][i] = 0;
    });

    graph.forEach(function (vertex) {
        graph.forEachNeighbor(vertex, function (neighbor, weight) {
            distances_matrix[vertex][neighbor] = weight;
            shortest_paths_matrix[vertex][neighbor] = neighbor;
        });
    });

    graph.forEach(function (vertex) {
        graph.forEach(function (vertex1) {
            graph.forEach(function (vertex2) {
                if (distances_matrix[vertex1][vertex2] > distances_matrix[vertex1][vertex] + distances_matrix[vertex][vertex2]) {
                    distances_matrix[vertex1][vertex2] = distances_matrix[vertex1][vertex] + distances_matrix[vertex][vertex2];
                    shortest_paths_matrix[vertex1][vertex2] = shortest_paths_matrix[vertex1][vertex];
                }
            });
        });
    });

    var average_distance = 0;
    var max_number_of_edges = graph.number_of_vertices * (graph.number_of_vertices - 1) / 2;

    for (var vertex_from in distances_matrix) {
        if (distances_matrix.hasOwnProperty(vertex_from)) {
            for (var vertex_to in distances_matrix) {
                if (distances_matrix.hasOwnProperty(vertex_to)) {
                    if (vertex_from != vertex_to) {
                        if (distances_matrix[vertex_from][vertex_to] < Infinity) {
                            average_distance += distances_matrix[vertex_from][vertex_to];
                        }
                    }
                }
            }
        }
    }

    average_distance = average_distance / max_number_of_edges;

    var FW_matrices = {
        shortest_paths: shortest_paths_matrix,
        distances: distances_matrix,
        average_distance: average_distance
    };
    return FW_matrices;
}

module.exports = FloydWarshall;