var BFS = require('./breadth_first_search');

function findColor(graph) {
    var initial_vertex = graph.getRandomVertex();
    var current_color = 1;
    var colors = new Array(graph.number_of_vertices);
    colors[initial_vertex] = current_color;
    var colored_vertices = 1;
    var total_number_of_vertices = graph.number_of_vertices;

    function onVertexVisited(vertex) {
        number_of_vertices_counter += 1;
        if (!colors[vertex]) {
            var can_paint_vertex = true;
            graph.everyNeighbor(vertex, function (neighbor) {
                if (colors[neighbor] == current_color) {
                    can_paint_vertex = false;
                    return false;
                }
                return true;
            });
            if (can_paint_vertex) {
                colors[vertex] = current_color;
                colored_vertices += 1;
            }
        }
    }

    var number_of_vertices_counter = 1;

    while (colored_vertices !== total_number_of_vertices) {
        BFS(graph, initial_vertex, {
            onVertexVisited: onVertexVisited
        });
        number_of_vertices_counter = 1;
        current_color += 1;
    }
    return {
        number_of_colors: current_color,
        colors: colors
    };
}

module.exports = findColor;