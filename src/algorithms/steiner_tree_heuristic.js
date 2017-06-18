/**
 * Callbacks used by the SteinerTree algorithm
 * @typedef {object} steiner_tree_callbacks
 * @property {onVertexVisited} onVertexVisited
 * @property {onVertexFound} onVertexFound
 */

// /**
//  * Called when a vertex was visited
//  * @typedef {function} onVertexVisited
//  * @param {number} vertex - The visited vertex
//  * @param {number} vertex_depth - The depth of the vertex on the generated spanning tree
//  * @param {number} cost - The current cost to vertex
//  */

// /**
//  * Called when a vertex was found
//  * @typedef {function} onVertexFound
//  * @param {number} vertex - The vertex that was found / discovered
//  * @param {number} vertex_depth - The depth of the vertex on the generated spanning tree
//  * @param {number} cost - The current cost to vertex
//  */

var Prim = require('./prim.js');

/**
 * SteinerTreeHeuristic - Calculate the steiner tree of a graph using the following heuristic:
 * It will first use the prim algorithm to calculate the minimum spanning tree, then
 * it will remove leaves of the tree that are not essential
 * @param  {Graph} graph - The graph to use. This algorithm will mess with the original graph, so don't expect to reuse it
 * @param  {Array} steiner_vertices - The steiner vertices (the vertices that may or may not be part of the solution)
 * @param  {steiner_tree_callbacks} callbacks - The callback object
 */
function SteinerTreeHeuristic (graph, initial_vertex, steiner_vertices, callbacks) {
  // Convert the steiner vertices from array to object to O(1) search
  var removable_vertices = {};
  
  for (var i = 0; i < steiner_vertices.length; i += 1) {
    removable_vertices[steiner_vertices[i]] = true;
  }
  
  // Apply the prim algorithm
  var spanning_tree = Prim(graph, initial_vertex);
  // console.log(spanning_tree.tree);
  var steiner_graph = spanning_tree.toGraph();
  

  // Mark neighbors of the steiner vertex to be removed
  var remaining_steiner_vertices = steiner_vertices.map( _ => _);

  /**
   * Apply the heuristic to the graph
   * @param {number} steiner_vertex The vertex to be removed
   */
  function applyHeuristic () {
    var steiner_vertex = remaining_steiner_vertices.pop();
    // console.log(`Calculating heuristic to ${steiner_vertex}`);
    // Remove leaves from the original and the steiner graphs
    var removed_leaves = {};
    var removed_leaves_num = 0;

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
          // console.log(`Removed vertex ${vertex} as a leaf`);
        }
      });

    } while (removed_leaves_num)

    // If the current steiner_index was already remove, do not execute the code bellow
    if (removed_leaves[steiner_vertex]) return;

    // Copy the steiner vertex
    var steiner_vertex_neighbors = steiner_graph.neighbors(steiner_vertex).map( n => n.slice() );
    // console.log(steiner_vertex);
    // console.log(steiner_vertex_neighbors);

    // Remove current steiner vertex
    graph.removeVertex(steiner_vertex);
    steiner_graph.removeVertex(steiner_vertex);

    // Apply Prim to a neighbor of the removed vertex
    var initial_vertex = steiner_vertex_neighbors[steiner_vertex_neighbors.length * Math.random() << 0][0];
    var temp_spanning_tree = Prim(graph, initial_vertex);

    if (temp_spanning_tree.length !== graph.number_of_vertices || spanning_tree.getWeight() < temp_spanning_tree.getWeight()) {
      // The graph became disjoint OR the new weight is worst than the previous one. Add the removed vertex to the graph
      for (var i = 0; i < steiner_vertex_neighbors.length; i += 1) {
        steiner_graph.addEdge(steiner_vertex, steiner_vertex_neighbors[i][0], steiner_vertex_neighbors[i][1]);
        graph.addEdge(steiner_vertex, steiner_vertex_neighbors[i][0], steiner_vertex_neighbors[i][1]);
      }
    } else {
      // The temp spanning tree is a better solution than the current one. Update it
      // console.log(`Removed vertex ${steiner_vertex}`)
      spanning_tree = temp_spanning_tree;
      steiner_graph = temp_spanning_tree.toGraph();
    }
  }

  do {
    // console.log(remaining_steiner_vertices);
    applyHeuristic();

  } while (remaining_steiner_vertices.length > 0)


  // console.log("Steiner tree");
  // steiner_graph.print();
  return spanning_tree;
}

module.exports = SteinerTreeHeuristic;