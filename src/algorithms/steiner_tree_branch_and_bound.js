/**
 * Callbacks used by the SteinerTree algorithm
 * @typedef {object} steiner_tree_callbacks
 * @property {onVertexVisited} onVertexVisited
 * @property {onVertexFound} onVertexFound
 */

var Prim = require('./prim.js');
var Graph = require('../graph.js').AdjacencyVectorGraph;
var Util = require('../util.js').Util;

/**
 * SteinerTreeBranchAndBound - Calculate the steiner tree of a graph using the following a branch and bound algorithm
 * @param  {Graph} graph - The graph to use
 * @param  {Array} steiner_vertices - The steiner vertices (the vertices that may or may not be part of the solution)
 * @param  {steiner_tree_callbacks} callbacks - The callback object
 */
function SteinerTreeBranchAndBound (graph, initial_vertex, steiner_vertices, callbacks) {
  // Convert the steiner vertices from array to object to O(1) search
  var removable_vertices = {};
  var non_removable_vertices = {};
  
  for (var i = 0; i < steiner_vertices.length; i += 1) {
    removable_vertices[steiner_vertices[i]] = true;
  }
  
  graph.forEach (vertex => {
    if (removable_vertices[vertex] === undefined) {
      non_removable_vertices[vertex] = true;
    }
  })

  // Create a graph containing just the essential vertices
  var steiner_graph = new Graph(false);
    graph.forEach(vertex => {
      if (removable_vertices[vertex] === undefined) {
        // Add the vertex to the graph
        steiner_graph.addVertex(vertex);

        // Add the neighbors
        graph.forEachNeighbor(vertex, (neighbor, weight) => {
          if (removable_vertices[neighbor] === undefined) {
            steiner_graph.addEdge(vertex, neighbor, weight);
          }
        })
      }
  })

  // Apply the prim algorithm for the essential vertices
  var spanning_tree = Prim(steiner_graph, initial_vertex);
  // console.log(spanning_tree.tree);
  
  // Do the branch and bound
  var best_weight = Infinity;
  function branchAndBound (steiner_vertex_index) {
    var vertex = steiner_vertices[steiner_vertex_index];

    if (steiner_vertex_index === steiner_vertices.length) {
      var print_vertices = '';
      // steiner_graph.forEach( v => {
      //   if (steiner_graph.exists(v)) print_vertices += (v + ' ')
      // });
      // console.log(print_vertices);

      // console.log("\nvertex index = " + steiner_vertex_index);
      // console.log("vertex = " + vertex);

      var tree = Prim(steiner_graph, initial_vertex);

      // Check if the tree is valid
      var is_tree_valid = (tree.length === steiner_graph.number_of_vertices);

      if (is_tree_valid && tree.getWeight() < best_weight) {
        // console.log("Found a better weight (old = " + best_weight + " new = " + tree.getWeight() + ")");
        spanning_tree = tree;
        // console.log(spanning_tree[0]);
        best_weight = tree.getWeight();
      }

      // console.log("best weight = " + best_weight);
      // console.log("\ncurrent graph");
      // steiner_graph.print();
      // console.log("\nresult tree");
      // console.log(spanning_tree.tree);
    } else if (steiner_vertex_index < steiner_vertices.length) {

      // Find a solution without the vertex
      // console.log("Find a solution without vertex " + vertex);
      branchAndBound(steiner_vertex_index + 1);
      
      if (vertex !== undefined) {
        // Add the vertex
        steiner_graph.addVertex(vertex);
        graph.forEachNeighbor(vertex, (neighbor, weight) => {
          if (steiner_graph.exists(neighbor)) {
            steiner_graph.addEdge(vertex, neighbor, weight);
          }
        });

        // console.log("Find a solution with vertex " + vertex);
        // Find a solution with the vertex
        branchAndBound(steiner_vertex_index + 1);

        // Remove the added vertex
        steiner_graph.removeVertex(vertex);
      }
    }
  }

  // console.log("Start of branch and bound");
  branchAndBound(0);
  // console.log("End of branch and bound");
  // console.log(result);
  return spanning_tree;
}

module.exports = SteinerTreeBranchAndBound;