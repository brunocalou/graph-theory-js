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
 * @returns {SpanningTree}
 */
function Prim(graph, initial_vertex, callbacks) {

    if (graph.isDirected()) {
        throw ('Prim algorithm cannot be used to directed graphs!');
    }

    if (!callbacks) { callbacks = {}; }

    function comparatorFn(a, b) {
        return a[1] - b[1];
    }

    var cost = {};
    var spanning_tree = {};
    var depths = {};
    var heap = new BinaryHeap.MinBinaryHeap(comparatorFn);
    var explored_vertices = {};
    var discovered_vertices = {};
    var total_weight = 0;

    heap.comparator.equal = function (a, b) {
        //The comparator must not assign equal to two different edges with the same weight.
        //The comparison must be made for the vertex and the weight
        return a[0] == b[0] && a[1] == b[1];
    };

    graph.forEach(function (vertex) {
        cost[vertex] = Infinity;
    });

    cost[initial_vertex] = 0;
    spanning_tree[initial_vertex] = null;
    depths[initial_vertex] = 0;
    heap.push([initial_vertex, cost[initial_vertex]]);
    discovered_vertices[initial_vertex] = true;

    function applyPrim(neighbor, weight) {
        if (!explored_vertices[neighbor]) {

            if (cost[neighbor] > weight) {
                var aux = cost[neighbor];
                cost[neighbor] = weight;

                spanning_tree[neighbor] = vertex;
                depths[neighbor] = depths[vertex] + 1;

                if (!discovered_vertices[neighbor]) {
                    discovered_vertices[neighbor] = true;
                    heap.push([neighbor, cost[neighbor]]);

                    if (callbacks.onVertexFound) callbacks.onVertexFound(neighbor, depths[neighbor], cost[neighbor]);
                }
                else {
                    heap.changeElement([neighbor, aux], [neighbor, cost[neighbor]]);
                }
            }
        }
    }

    while (!heap.isEmpty()) {

        var element = heap.pop();
        var vertex = element[0];
        total_weight += element[1];

        explored_vertices[vertex] = true;

        if (callbacks.onVertexVisited) callbacks.onVertexVisited(vertex, depths[vertex], cost[vertex]);

        graph.forEachNeighbor(vertex, applyPrim);
    }

    return new SpanningTree(initial_vertex, spanning_tree, depths, graph, total_weight);
}

module.exports = Prim;