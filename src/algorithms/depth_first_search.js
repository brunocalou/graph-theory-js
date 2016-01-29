/**@module algorithms */

/**
 * Callbacks used by the DFS algorithm
 * @typedef {object} DFS_callbacks
 * @property {onVertexVisited} onVertexVisited
 * @property {onVertexFound} onVertexFound
 */

var Stack = require('../data_structures/stack');
var SpanningTree = require('../data_structures/spanning_tree.js');

/**
 * @function
 * @param {Graph} graph - The graph to use
 * @param {number} initial_vertex - The vertex to start
 * @param {DFS_callbacks} callbacks - The callback object
 * @returns {SpanningTree}
 */
function DFS(graph, initial_vertex, callbacks) {
    //callbacks is an object with the following properties
    // {
    // 	onVertexVisited = function (vertex, vertex_depth),
    // 	onVertexFound = function (vertex, vertex_depth)
    // }
	
    if (!callbacks) { callbacks = {}; }

    var stack = new Stack();
    var visited_vertices = new Array(graph.number_of_vertices);
    var spanning_tree = {};
    var depths = {};

    stack.push(initial_vertex);
    spanning_tree[initial_vertex] = null; //Mark the root
    depths[initial_vertex] = 0;

    function dfsLoop(neighbor) {
        if (!visited_vertices[neighbor]) {
            stack.push(neighbor);
					
            //Add the vertex as the parent of the neighbor on the spaning tree
            spanning_tree[neighbor] = vertex;

            if (callbacks.onVertexFound) callbacks.onVertexFound(neighbor, depths[neighbor]);
        }
    }

    while (!stack.isEmpty()) {
        var vertex = stack.pop();

        if (!visited_vertices[vertex]) {
            graph.forEachNeighbor(vertex, dfsLoop);
            
            //The depth of a neighbor is the depth of its parent +1
            if (vertex !== initial_vertex) {
                depths[vertex] = depths[spanning_tree[vertex]] + 1;
            }

            visited_vertices[vertex] = true;
            if (callbacks.onVertexVisited) callbacks.onVertexVisited(vertex, depths[vertex]);
        }
    }

    return new SpanningTree(initial_vertex, spanning_tree, depths, graph);
}

module.exports = DFS;