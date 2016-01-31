/**@module dataStructures */

/**
 * SpanningTree class
 * @constructor
 * @param {number} root - The root of the tree
 * @param {object} tree - Array that holds the parent of each vertex
 * @param {object} depths - Stores de depth of every vertex. The root has depth 0
 * @param {GraphBase} graph - Stores a reference to the original graph   
 * @param {number} total_weight - The total weight of the tree
 */
function SpanningTree(root, tree, depths, graph, total_weight) {
    this.root = root;
    this.tree = tree; //Array that holds the parent of each vertex
    this.depths = depths; //Stores de depth of every vertex. The root has depth 0
    this.graph = graph; //Stores a reference to the original graph
    this._total_weight = total_weight; // Stores the total weight of the tree
    this.length = Object.keys(this.tree).length; //Number of vertices on the tree
};

/**
 * Path object
 * typedef {object} path_obj
 * @property {array} path - The path
 * @property {number} distance - The distance of the path
 * @property {number} unweighted_distance - The distance of the path ignoring the weights
 */

/**
 * Returns the path and the distance from the root to a vertex
 * @param {number} vertex - The vertex to look for
 * @returns {path_obj} The path and the distance from the root to a vertex or undefined if the vertex does not exist
 */
SpanningTree.prototype.getPath = function (vertex) {

    if (!this.graph.exists(vertex)) return;
    
    if (this.tree[vertex] === undefined) return;

    var path = [vertex];
    var distance = 0;
    var current_element = vertex;
    var unweighted_distance = 0;

    while (current_element != this.root) {
        distance += this.graph.weight(current_element, this.tree[current_element]);// Add the distance of the vertex and its parent
        unweighted_distance += 1; // Add one to the unweighted distance
        current_element = this.tree[current_element]; // Get the parent
        path.unshift(current_element);
    }

    return {
        path: path,
        distance: distance,
        unweighted_distance: unweighted_distance
    };
};

/**
 * Returns the weight of the tree (sum of edges). If the weight was not computed before,
 * the method will calculate it and return the result. Otherwise, it will return the previously
 * computed value
 * @returns {number} Returns the weight of the tree
 */
SpanningTree.prototype.getWeight = function () {

    if (this._total_weight !== undefined) {
        return this._total_weight;
    } else {
        var weight = 0;
        for (var key in this.tree) {
            if (this.tree.hasOwnProperty(key)) {
                if (this.tree[key] !== null) {
                    weight += this.graph.weight(this.tree[key], key);
                }
            }
        }
        this._total_weight = weight;
        return weight;
    }
};

module.exports = SpanningTree;