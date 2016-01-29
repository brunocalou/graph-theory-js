/**@module algorithms */

/**
 * Callbacks used by the Prim algorithm
 * @typedef {object} prim_callbacks
 * @property {onVertexVisited} onVertexVisited
 * @property {onVertexFound} onVertexFound
 */

/**
 * Called when a vertex was visited
 * @typedef {function} onVertexVisited
 * @param {number} vertex - The visited vertex
 * @param {number} vertex_depth - The depth of the vertex on the generated spanning tree
 * @param {number} cost - The current cost to vertex
 */

/**
 * Called when a vertex was found
 * @typedef {function} onVertexFound
 * @param {number} vertex - The vertex that was found / discovered
 * @param {number} vertex_depth - The depth of the vertex on the generated spanning tree
 * @param {number} cost - The current cost to vertex
 */

var SpanningTree = require('../data_structures/spanning_tree');
var BinaryHeap = require('../data_structures/binary_heap');

/**
 * @function
 * @param {Graph} graph - The graph to use
 * @param {number} initial_vertex - The vertex to start
 * @param {prim_callbacks} callbacks - The callback object
 * @throws Will throw an error if the graph is directed
 */
function Prim(graph, initial_vertex, callbacks) {

    if (graph.isDirected()) {
        throw ('Prim algorithm cannot be used to directed graphs!');
    }

    if (!callbacks) { callbacks = {}; }

    function comparator(a, b) {
        return a[1] - b[1];
    }

    var cost = new Array(graph.number_of_vertices);
    var spanning_tree = {};
    var depths = {};
    var set = new BinaryHeap.MinBinaryHeap(comparator);
    var explored_vertices = new Array(graph.number_of_vertices);
    var discovered_vertices = new Array(graph.number_of_vertices);
    var totalWeight = 0;

    for (var i = 1; i < graph.number_of_vertices + 1; i++) {
        cost[i] = Infinity;
    }

    cost[initial_vertex] = 0;
    spanning_tree[initial_vertex] = null;
    depths[initial_vertex] = 0;
    set.push([initial_vertex, cost[initial_vertex]]);
    discovered_vertices[initial_vertex] = true;

    while (!set.isEmpty()) {

        var element = set.pop();
        var vertex = element[0];
        totalWeight += element[1];

        explored_vertices[vertex] = true;

        if (callbacks.onVertexVisited) callbacks.onVertexVisited(vertex, depths[vertex], cost[vertex]);

        graph.forEachNeighbor(vertex, function (neighbor, weight) {

            if (!explored_vertices[neighbor]) {

                if (cost[neighbor] > weight) {
                    var aux = cost[neighbor];
                    cost[neighbor] = weight;

                    spanning_tree[neighbor] = vertex;
                    depths[neighbor] = depths[vertex] + 1;

                    if (!discovered_vertices[neighbor]) {
                        discovered_vertices[neighbor] = true;
                        set.push([neighbor, cost[neighbor]]);

                        if (callbacks.onVertexFound) callbacks.onVertexFound(neighbor, depths[neighbor], cost[neighbor]);
                    }
                    else {
                        set.changeElement([neighbor, aux], [neighbor, cost[neighbor]]);
                    }
                }
            }
        });
    }

    return new SpanningTree(initial_vertex, spanning_tree, depths, totalWeight, graph);
}

module.exports = Prim;