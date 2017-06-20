var Prim = require('./prim.js');
var Graph = require('../graph.js').AdjacencyVectorGraph;
var Util = require('../util.js').Util;
var SpanningTree = require('../data_structures.js').SpanningTree;

/**
 * SteinerTreeBranchAndBound - Calculate the steiner tree of a graph using the following a branch and bound algorithm
 * @param  {Graph} graph - The graph to use
 * @param  {Array} steiner_vertices - The steiner vertices (the vertices that may or may not be part of the solution)
 */
function SteinerTreeBranchAndBound (graph, steiner_vertices) {
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

  // Do the branch and bound
  var spanning_tree = Prim(steiner_graph);
  var best_weight = Infinity;
  function branchAndBound (steiner_vertex_index) {
    var vertex = steiner_vertices[steiner_vertex_index];

    if (steiner_vertex_index >= steiner_vertices.length - 1) {
      var tree = Prim(steiner_graph, Util.randomKey(non_removable_vertices));

      // Check if the tree is valid
      var is_tree_valid = (tree.length === steiner_graph.number_of_vertices);
      
      if (is_tree_valid && tree.getWeight() < best_weight) {
        spanning_tree = tree;
        best_weight = tree.getWeight();
      }

    } else if (steiner_vertex_index < steiner_vertices.length) {

      // Find a solution without the vertex
      branchAndBound(steiner_vertex_index + 1);
      
      if (vertex !== undefined) {
        // Add the vertex
        steiner_graph.addVertex(vertex);
        graph.forEachNeighbor(vertex, (neighbor, weight) => {
          if (steiner_graph.exists(neighbor)) {
            steiner_graph.addEdge(vertex, neighbor, weight);
          }
        });

        // Find a solution with the vertex
        branchAndBound(steiner_vertex_index + 1);

        // Remove the added vertex
        steiner_graph.removeVertex(vertex);
      }
    }
  }

  branchAndBound(0);
  return spanning_tree;
}

module.exports = SteinerTreeBranchAndBound;