var Prim = require('./prim.js');

/**
 * SteinerTreeHeuristic - Calculate the steiner tree of a graph using the following heuristic:
 * It will first use the prim algorithm to calculate the minimum spanning tree, then
 * it will remove leaves of the tree that are not essential
 * @param  {Graph} graph - The graph to use. This algorithm will mess with the original graph, so don't expect to reuse it
 * @param  {Array} steiner_vertices - The steiner vertices (the vertices that may or may not be part of the solution)
 */
function SteinerTreeHeuristic (graph, initial_vertex, steiner_vertices) {
  // Convert the steiner vertices from array to object to O(1) search
  var removable_vertices = {};
  
  for (var i = 0; i < steiner_vertices.length; i += 1) {
    removable_vertices[steiner_vertices[i]] = true;
  }
  
  // Apply the prim algorithm
  var spanning_tree = Prim(graph, initial_vertex);
  var steiner_graph = spanning_tree.toGraph();

  // Mark neighbors of the steiner vertex to be removed
  var remaining_steiner_vertices = steiner_vertices.map( _ => _);

  function removeLeaves () {
    var removed_leaves_num = 0;
    var removed_leaves = {};

    do {
      removed_leaves_num = 0;

      steiner_graph.forEach(function (vertex) {
        if (steiner_graph.neighbors(vertex).length === 1 && removable_vertices[vertex]) {
          steiner_graph.removeVertex(vertex);
          graph.removeVertex(vertex);
          removed_leaves[vertex] = true;
          removed_leaves_num += 1;
          var idx = remaining_steiner_vertices.indexOf(vertex);
          if (idx > -1) {
            remaining_steiner_vertices.splice(idx, 1);
          }
        }
      });

    } while (removed_leaves_num)

    return removed_leaves;
  }

  /**
   * Apply the heuristic to the graph
   * @param {number} steiner_vertex The vertex to be removed
   */
  function applyHeuristic () {
    var steiner_vertex = remaining_steiner_vertices.pop();

    // Copy the steiner vertex
    var steiner_vertex_neighbors = steiner_graph.neighbors(steiner_vertex).map( n => n.slice() );

    // Remove current steiner vertex
    graph.removeVertex(steiner_vertex);
    steiner_graph.removeVertex(steiner_vertex);

    // Remove leaves
    removed_leaves = removeLeaves();

    // Apply Prim to a neighbor of the removed vertex
    var initial_vertex;
    if (steiner_vertex_neighbors.length === 0) {
      initial_vertex = steiner_graph.getRandomVertex();
    } else {
      initial_vertex = steiner_vertex_neighbors[steiner_vertex_neighbors.length * Math.random() << 0][0];
    }
    var temp_spanning_tree = Prim(graph, initial_vertex);

    if (temp_spanning_tree.length !== graph.number_of_vertices || spanning_tree.getWeight() < temp_spanning_tree.getWeight()) {
      // The graph became disjoint OR the new weight is worst than the previous one. Add the removed vertex to the graph
      for (var i = 0; i < steiner_vertex_neighbors.length; i += 1) {
        steiner_graph.addEdge(steiner_vertex, steiner_vertex_neighbors[i][0], steiner_vertex_neighbors[i][1]);
        graph.addEdge(steiner_vertex, steiner_vertex_neighbors[i][0], steiner_vertex_neighbors[i][1]);
      }

      // Add the removed leaves
      for (var leaf in removed_leaves) {
        if (removed_leaves.hasOwnProperty(leaf)) {
          graph.forEachNeighbor(leaf, (neighbor, weight) => {
            steiner_graph.addEdge(leaf, neighbor, weight);
          })
          remaining_steiner_vertices.push(Number(leaf));
        }
      }
    } else {
      // The temp spanning tree is a better solution than the current one. Update it
      spanning_tree = temp_spanning_tree;
      steiner_graph = temp_spanning_tree.toGraph();
    }
  }

  // Remove the leaves on the initial tree
  removeLeaves();
  var temp_spanning_tree = Prim(graph, initial_vertex);
  if (temp_spanning_tree.length === graph.number_of_vertices && temp_spanning_tree.getWeight() < spanning_tree.getWeight()) {
    // Update the spanning tree
    spanning_tree = temp_spanning_tree;
  }

  // Apply the heuristic
  do {
    applyHeuristic();

  } while (remaining_steiner_vertices.length > 0)

  return spanning_tree;
}

module.exports = SteinerTreeHeuristic;