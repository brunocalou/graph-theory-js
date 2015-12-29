/**@module algorithms */

/**
 * Callbacks used by the BFS algorithm
 * @typedef {object} BFS_callbacks
 * @property {onVertexVisited} onVertexVisited
 * @property {onVertexFound} onVertexFound
 */

/**
 * Called when a vertex was visited
 * @typedef {function} onVertexVisited
 * @param {number} vertex - The visited vertex
 * @param {number} vertex_depth - The depth of the vertex on the generated spanning tree
 */

/**
 * Called when a vertex was found
 * @typedef {function} onVertexFound
 * @param {number} vertex - The vertex that was found / discovered
 * @param {number} vertex_depth - The depth of the vertex on the generated spanning tree
 */

var Queue = require('../data_structures/queue');
var SpanningTree = require('../data_structures/spanning_tree.js');

/**
 * @function
 * @param {Graph} graph - The graph to use
 * @param {number} initial_vertex - The vertex to start
 * @param {BFS_callbacks} callbacks - The callback object
 */
function BFS(graph, initial_vertex, callbacks) {
    //callbacks is an object with the following properties
    // {
    // 	onVertexVisited = function (vertex, vertex_depth),
    // 	onVertexFound = function (vertex, vertex_depth)
    // }
	
    if (!callbacks) { callbacks = {}; }

    var queue = new Queue();
    var explored_vertices = new Array(graph.number_of_vertices);
    var spanning_tree = new Array(graph.number_of_vertices);
    var depths = new Array(graph.number_of_vertices);

    queue.push(initial_vertex);
    spanning_tree[initial_vertex] = null;
    depths[initial_vertex] = 0;
    explored_vertices[initial_vertex] = true;

    function bfsLoop(neighbor) {
        if (!explored_vertices[neighbor]) {
            explored_vertices[neighbor] = true;
            queue.push(neighbor);

            spanning_tree[neighbor] = vertex;
            depths[neighbor] = depths[vertex] + 1;

            if (callbacks.onVertexFound) callbacks.onVertexFound(neighbor, depths[neighbor]);
        }
    }

    while (!queue.isEmpty()) {
        var vertex = queue.pop();
        if (callbacks.onVertexVisited) callbacks.onVertexVisited(vertex, depths[vertex]);

        graph.forEachNeighbor(vertex, bfsLoop);
    }

    return new SpanningTree(initial_vertex, spanning_tree, depths, graph);
}

module.exports = BFS;