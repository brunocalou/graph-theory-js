/**@module graph */

var GraphBase = require("./graph_base");
var util = require('../util/util');


/**
 * AdjacencyMatrixGraph class
 * @constructor
 * @classdesc This class uses a matrix of vertices to store the graph. The graph
 * is represented by an array of array of vertices
 * @extends GraphBase
 */
function AdjacencyMatrixGraph(directed) {
    GraphBase.call(this, directed);

    this.data = [];
    
    /**
     * Stores the array type to use. It will be changed automatically according to the graph
     * @type {Int8Array | Uint8Array | Int16Array | Uint16Array | Int32Array | Uint32Array | Float32Array | Float64Array}
     */
    this.ArrayType = Uint8Array;
    
    /**
     * Stores the maximum size of an array element, in bits
     * @type {number}
     */
    this.array_max_element_size = util.MaxNumberSize.UINT_8;
    
    /**
     * Stores if the array is signed
     * @type {boolean}
     */
    this.array_is_signed = false;
    
    /**
     * Stores if the array is an integer
     * @type {boolean} 
     */
    this.array_is_integer = true;
    
    /**
     * Stores if the array must be refactored
     * @type {boolean}
     */
    this.array_must_be_refactored = false;
};

util.inherit(GraphBase, AdjacencyMatrixGraph);

AdjacencyMatrixGraph.prototype.createDataStructure = function (number_of_vertices) {
    //var array = new Array(size_of_array) is almost 5 times faster to insert elements than
    //var array = [], according to local benchmark using nodejs
    //the +1 is used because, on the test files, there were no vertices with index 0, but
    //there were indexes equal to the total number of vertices. The first element will be undefined
    //on the case (index = 0)
    this.data = new Array(number_of_vertices + 1);
};

/**
 * Refactors the matrix
 */
AdjacencyMatrixGraph.prototype.refactor = function (data_length) {

    if (!data_length) data_length = this.data.length;
    
    //Must recreate all the other vertices to fit the new matrix size
    this.forEach(function (v) {
        var aux = new this.ArrayType(data_length);

        for (var i = 0, length = this.data[v].length; i < length; i += 1) {
            aux[i] = this.data[v][i];
        }

        this.data[v] = aux;

    }, this);

    this.array_must_be_refactored = false;
};

AdjacencyMatrixGraph.prototype.addVertex = function (vertex) {
    if (!this.data[vertex]) {
        var data_length = this.data.length;

        this.number_of_vertices += 1;

        if (data_length <= vertex) {
            this.array_must_be_refactored = true;
            data_length += vertex - data_length + 1;
        }

        this.data[vertex] = new this.ArrayType(data_length);

        if (this.array_must_be_refactored) {
            this.refactor(data_length);
        }
    }

    if (this.array_must_be_refactored) {
        this.refactor();
    }
};

AdjacencyMatrixGraph.prototype.addEdge = function (vertex_1, vertex_2, weight) {
    var added_edge = false;

    if (weight === undefined) weight = 1;
        
    //Change the array type, if needed
    if (this.array_is_integer && weight % 1 === 0) {
        //The array holds integers
        if (Math.abs(weight) > this.array_max_element_size || (!this.array_is_signed && weight < 0)) {
            //The array cannot hold the weight, must change the array type
            this.array_must_be_refactored = true;
            if (weight < 0 || this.array_is_signed) {
                this.array_is_signed = true;
                //The array is signed
                if (Math.abs(weight) > util.MaxNumberSize.INT_8) { //8 bits
                    if (Math.abs(weight) > util.MaxNumberSize.INT_16) {// 16 bits
                        if (Math.abs(weight) > util.MaxNumberSize.INT_32) { // 32 bits
                            // 64 bits
                            this.ArrayType = Float64Array;
                            this.array_max_element_size = util.MaxNumberSize.FLOAT_64;
                            this.array_is_integer = false;
                        } else {
                            // 32 bits
                            this.ArrayType = Int32Array;
                            this.array_max_element_size = util.MaxNumberSize.INT_32;
                        }
                    } else {
                        // 16 bits
                        this.ArrayType = Int16Array;
                        this.array_max_element_size = util.MaxNumberSize.INT_16;
                    }
                } else {
                    // 8 bits
                    this.ArrayType = Int8Array;
                    this.array_max_element_size = util.MaxNumberSize.INT_8;
                }
            } else {
                //The array is not signed
                if (Math.abs(weight) > util.MaxNumberSize.UINT_8) { //8 bits
                    if (Math.abs(weight) > util.MaxNumberSize.UINT_16) {// 16 bits
                        if (Math.abs(weight) > util.MaxNumberSize.UINT_32) { // 32 bits
                            // 64 bits
                            this.ArrayType = Float64Array;
                            this.array_max_element_size = util.MaxNumberSize.FLOAT_64;
                            this.array_is_integer = false;
                            this.array_is_signed = true;
                        } else {
                            // 32 bits
                            this.ArrayType = Uint32Array;
                            this.array_max_element_size = util.MaxNumberSize.UINT_32;
                        }
                    } else {
                        // 16 bits
                        this.ArrayType = Uint16Array;
                        this.array_max_element_size = util.MaxNumberSize.UINT_16;
                    }
                } else {
                    // 8 bits
                    this.ArrayType = Uint8Array;
                    this.array_max_element_size = util.MaxNumberSize.UINT_8;
                }
            }
        }
    } else {
        //The array holds float numbers

        if (this.ArrayType !== Float32Array && this.ArrayType !== Float64Array) {
            //If the array was holding integers, change it to hold floats
            this.ArrayType = Float32Array;
            this.array_max_element_size = util.MaxNumberSize.FLOAT_32;
            this.array_is_integer = false;
            this.array_is_signed = true;
            this.array_must_be_refactored = true;
        }

        if (Math.abs(weight) > this.array_max_element_size) {
            this.array_must_be_refactored = true;

            if (Math.abs(weight) > util.MaxNumberSize.FLOAT_32) { // 32 bits
                // 64 bits
                this.ArrayType = Float64Array;
                this.array_max_element_size = util.MaxNumberSize.FLOAT_64;
            } else {
                // 32 bits
                this.ArrayType = Float32Array;
                this.array_max_element_size = util.MaxNumberSize.FLOAT_32;
            }
        }
    }

    this.addVertex(vertex_1);
    this.addVertex(vertex_2);
    if (!this.data[vertex_1][vertex_2]) {
        this.data[vertex_1][vertex_2] = weight;
        added_edge = true;
    }

    if (!this.data[vertex_2][vertex_1] && !this.directed) {
        this.data[vertex_2][vertex_1] = weight;
        added_edge = true;
    }

    if (added_edge) {
        this.number_of_edges += 1;
    }
};

AdjacencyMatrixGraph.prototype.print = function (max_width, max_height) {
    var line = '';
    var data_length = this.data.length;
    var number_of_rows = data_length;
    var number_of_columns = data_length;

    if (max_height) {
        if (max_height < number_of_rows) {
            number_of_rows = max_height + 1;
        }
    }

    if (max_width) {
        if (max_width < number_of_columns) {
            number_of_columns = max_width;
        }
    }

    //Print the colums header
    //Get the space used by the representation of the first column header
    line = new Array((number_of_rows + '').length + 1).join(' ');
    line += ' | ';

    var vertex_counter = 0;
    for (var k = 0; k < data_length; k += 1) {
        if (this.data[k] !== undefined) {
            line += k;
            line += ' ';
            vertex_counter += 1;
            if (vertex_counter >= number_of_columns) {
                break;
            }
        }
    }
    console.log(line);
    var line_length = line.length;
    line = '';

    for (k = 0; k < line_length; k += 1) {
        if (k % 2) {
            line += ' ';
        } else {
            line += '-';
        }
    }
    console.log(line);
    line = '';
	
    //Print the rows. The first element is the vertex
    for (var i = 0; i < number_of_rows; i += 1) {
        if (this.data[i] !== undefined) {
            line += i + ' | ';

            var horizontal_vertex_counter = 0; //Counts how many vertices were printed on the current line
            
            for (var j = 0; j < number_of_columns + 1; j += 1) {
                if (this.data[i][j]) {
                    line += '1 ';
                    horizontal_vertex_counter += 1;
                } else {
                    if (this.data[j] !== undefined) {
                        line += '0 ';
                        horizontal_vertex_counter += 1;
                    }
                }
                if (max_width) {
                    if (horizontal_vertex_counter > max_width + 1) {
                        break;
                    }
                }
            }

            console.log(line);
            line = '';
        }
    }
};

AdjacencyMatrixGraph.prototype.neighbors = function (vertex) {
    var neighbors = [];
    var data_length = this.data.length;

    if (this.exists(vertex)) {
        neighbors = [];

        for (var i = 0; i < data_length; i += 1) {
            if (this.data[vertex][i]) {
                neighbors.push([i, this.data[vertex][i]]);
            }
        }
    }

    return neighbors;
};

AdjacencyMatrixGraph.prototype.hasNeighbors = function (vertex) {
    var has_neighbors = false;
    var data_length = this.data.length;

    if (this.exists(vertex)) {
        for (var i = 0; i < data_length; i += 1) {
            if (this.data[vertex][i]) {
                has_neighbors = true;
                break;
            }
        }
    }
    return has_neighbors;
};

AdjacencyMatrixGraph.prototype.forEachNeighbor = function (vertex, fn) {
    var data_length = this.data.length;
    if (this.exists(vertex)) {
        for (var i = 0; i < data_length; i += 1) {
            if (this.data[vertex][i]) {
                fn(i, this.data[vertex][i]);
            }
        }
    }
};

AdjacencyMatrixGraph.prototype.degree = function (vertex) {
    if (this.exists(vertex)) {
        return this.neighbors(vertex).length;
    }
    return 0;
};

AdjacencyMatrixGraph.prototype.everyNeighbor = function (vertex, fn) {
    var data_length = this.data.length;

    if (this.exists(vertex)) {
        for (var i = 0; i < data_length; i += 1) {
            if (this.data[vertex][i]) {
                if (!fn(i, this.data[vertex][i])) {
                    break;
                }
            }
        }
    }
};

AdjacencyMatrixGraph.prototype.weight = function (vertex_1, vertex_2) {
    var weight = this.data[vertex_1][vertex_2];
    if (vertex_1 === vertex_2) {
        if (this.exists(vertex_1)) {
            return 0;
        }
    }
    if (weight == 0) {
        weight = undefined;
    }
    return weight;
};

module.exports = AdjacencyMatrixGraph;