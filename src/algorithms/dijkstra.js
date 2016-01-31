/**@module algorithms */

/**
 * Callbacks used by the Dijkstra algorithm
 * @typedef {object} dijkstra_callbacks
 * @property {onVertexVisited} onVertexVisited
 * @property {onVertexFound} onVertexFound
 */

/**
 * Called when a vertex was visited
 * @typedef {function} onVertexVisited
 * @param {number} vertex - The visited vertex
 * @param {number} vertex_depth - The depth of the vertex on the generated spanning tree
 * @param {number} distance - The distance of the vertex to the initial vertex
 */

/**
 * Called when a vertex was found
 * @typedef {function} onVertexFound
 * @param {number} vertex - The vertex that was found / discovered
 * @param {number} vertex_depth - The depth of the vertex on the generated spanning tree
 * @param {number} distance - The distance of the vertex to the initial vertex
 */

var SpanningTree = require('../data_structures/spanning_tree');
var BinaryHeap = require('../data_structures/binary_heap');

/**
 * @function
 * @param {Graph} graph - The graph to use
 * @param {number} initial_vertex - The vertex to start
 * @param {dijkstra_callbacks} callbacks - The callback object
 * @throws Will throw an error if the graph has a negative edge
 * @returns {SpanningTree}
 */
function Dijkstra(graph, initial_vertex, callbacks) {
    //callbacks is an object with the following properties
    // {
    // 	onVertexVisited = function (vertex, vertex_depth, distance),
    // 	onVertexFound = function (vertex, vertex_depth, distance)
    // }
    
    if (!callbacks) { callbacks = {}; }

    function comparatorFn(a, b) {
        //Compare the weights
        return a[1] - b[1];
    }

    var distance = {};
    var spanning_tree = {};
    var heap = new BinaryHeap.MinBinaryHeap(comparatorFn);
    var explored_vertices = {};
    var depths = {};
    var discovered_vertices = {};

    heap.comparator.equal = function (a, b) {
        //The comparator must not assign equal to two different edges with the same weight.
        //The comparison must be made for the vertex and the weight
        return a[0] == b[0] && a[1] == b[1];
    };

    graph.forEach(function (vertex) {
        distance[vertex] = Infinity;
    });

    distance[initial_vertex] = 0;
    spanning_tree[initial_vertex] = null;
    depths[initial_vertex] = 0;
    heap.push([initial_vertex, distance[initial_vertex]]);
    discovered_vertices[initial_vertex] = true;

    function applyDijkstra(neighbor, weight) {
        if (!explored_vertices[neighbor]) {

            if (weight < 0) {
                throw ('Dijkstra algorithm cannot be used to negative weighted graphs!');
            }

            if (distance[neighbor] > distance[vertex] + weight) {
                var aux = distance[neighbor];
                distance[neighbor] = distance[vertex] + weight;

                spanning_tree[neighbor] = vertex;
                depths[neighbor] = depths[vertex] + 1;

                if (!discovered_vertices[neighbor]) {
                    discovered_vertices[neighbor] = true;
                    heap.push([neighbor, distance[neighbor]]);

                    if (callbacks.onVertexFound) callbacks.onVertexFound(neighbor, depths[neighbor], distance[neighbor]);

                } else {
                    heap.changeElement([neighbor, aux], [neighbor, distance[neighbor]]);
                }
            }
        }
    }

    while (!heap.isEmpty()) {

        var vertex = heap.pop()[0];

        if (callbacks.onVertexVisited) callbacks.onVertexVisited(vertex, depths[vertex], distance[vertex]);

        explored_vertices[vertex] = true;

        graph.forEachNeighbor(vertex, applyDijkstra);
    }

    return new SpanningTree(initial_vertex, spanning_tree, depths, graph);
}

module.exports = Dijkstra;