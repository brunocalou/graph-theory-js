var Stack = require('datastructures-js').stack;
var SpanningTree = require('../trees/spanning_tree.js');

function DFS(graph, initial_vertex, callbacks) {
    //callbacks is an object with the following properties
    // {
    // 	onVertexVisited = function (vertex, vertex_degree),
    // 	onVertexFound = function (vertex, vertex_degree)
    // }
	
    if (!callbacks) { callbacks = {}; }

    var stack = new Stack();
    var visited_vertices = new Array(graph.number_of_vertices);
    var spanning_tree = new Array(graph.number_of_vertices);
    var degrees = new Array(graph.number_of_vertices);

    stack.push(initial_vertex);
    spanning_tree[initial_vertex] = null; //Mark the root
    degrees[initial_vertex] = 0;

    function dfsLoop(neighbor) {
        if (!visited_vertices[neighbor]) {
            stack.push(neighbor);
					
            //Add the vertex as the parent of the neighbor on the spaning tree
            spanning_tree[neighbor] = vertex;
            //The degree of a neighbor is the degree of its parent +1
            degrees[neighbor] = degrees[vertex] + 1;

            if (callbacks.onVertexFound) callbacks.onVertexFound(neighbor, degrees[neighbor]);
        }
    }

    while (!stack.isEmpty()) {
        var vertex = stack.pop();

        if (!visited_vertices[vertex]) {
            visited_vertices[vertex] = true;
            if (callbacks.onVertexVisited) callbacks.onVertexVisited(vertex, degrees[vertex]);

            graph.forEachNeighbor(vertex, dfsLoop);
        }
    }

    return new SpanningTree(initial_vertex, spanning_tree, degrees, graph);
}

module.exports = DFS;