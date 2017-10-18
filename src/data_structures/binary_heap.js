/**@module dataStructures */

'use strict';

var Comparator = require('../util/comparator');
var util = require('../util/util');

/**
 * Min Binary Heap Class
 * @constructor
 * @classdesc The MinBinaryHeap class implements a minimum binary heap data structure
 * @param {function} comparator_fn - The comparator function
 */
function MinBinaryHeap(comparator_fn) {
    /**@private
     * @type {array} */
    this._elements = [null];// will not use the first index
    
    /**@public
     * @type {Comparator} */
    this.comparator = new Comparator(comparator_fn);
    
    /**@private
     * @type {number}
     */
    this._length = 0;

    Object.defineProperty(this, 'length', {
        get: function () {
            return this._length;
        }
    });
}

/**
 * Changes the value of the element
 * @param {any} old_element - The element to be replaced
 * @param {any} new_element - The new element
 */
MinBinaryHeap.prototype.changeElement = function (old_element, new_element) {
    for (var i = 1; i <= this._length; i += 1) {
        if (this.comparator.equal(old_element, this._elements[i])) {
            this._elements[i] = new_element;
            break;
        }
    }
    this._elements.shift(); //Removes the null from the first index
    this.heapify(this._elements);
};

/**
 * Removes all the elements in the heap
 */
MinBinaryHeap.prototype.clear = function () {
    this._elements.length = 0;
    this._elements[0] = null;
    this._length = 0;
};

/**
 * The function called by the forEach method.
 * @callback MinBinaryHeap~iterateCallback
 * @function
 * @param {any} element - The current element
 * @param {number} [index] - The index of the current element
 * @param {MinBinaryHeap} [binary_heap] - The binary heap it is using
 */

/**
 * Performs the fn function for all the elements of the heap, untill the callback function returns false
 * @param {iterateCallback} fn - The function the be executed on each element
 * @param {object} [this_arg] - The object to use as this when calling the fn function 
 */
MinBinaryHeap.prototype.every = function (fn, this_arg) {
    var ordered_array = this.toArray();
    var index = 0;

    while (ordered_array[0] !== undefined) {
        if (!fn.call(this_arg, ordered_array.shift(), index, this)) {
            break;
        }

        index += 1;
    }
};

/**
 * Performs the fn function for all the elements of the list
 * @param {iterateCallback} fn - The function the be executed on each element
 * @param {object} [this_arg] - The object to use as this when calling the fn function
 */
MinBinaryHeap.prototype.forEach = function (fn, this_arg) {
    var ordered_array = this.toArray();
    var index = 0;

    while (ordered_array[0] !== undefined) {
        fn.call(this_arg, ordered_array.shift(), index, this);
        index += 1;
    }
};

/**
 * Transforms an array into a binary heap
 * @param {array} array - The array to transform
 */
MinBinaryHeap.prototype.heapify = function (array) {
    this._length = array.length;
    this._elements = array;
    this._elements.unshift(null);
    for (var i = Math.floor(this._length / 2); i >= 1; i -= 1) {
        this._shiftDown(i);
    }
};

/**
 * Inserts the element to the heap
 * @param {any} element - The element to be inserted
 */
MinBinaryHeap.prototype.insert = function (element) {
    this._elements.push(element);
    this._shiftUp();
    this._length += 1;
};

/**
 * Returns if the heap is empty
 * @returns If the heap is empty
 */
MinBinaryHeap.prototype.isEmpty = function () {
    return !this._length;
};

/**
 * Returns the first element without removing it
 * @returns The first element without removing it
 */
MinBinaryHeap.prototype.peek = function () {
    return this._elements[1];
};

/**
 * Inserts the element to the heap
 * This method is equivalent to insert
 * @see insert
 */
MinBinaryHeap.prototype.push = function (element) {
    this.insert(element);
};

/**
 * Returns the first element while removing it
 * @returns {any} The first element while removing it, undefined if the heap is empty
 */
MinBinaryHeap.prototype.pop = function () {
    var removed_element = this._elements[1];

    if (this._length === 1) {
        this._elements.pop();
        this._length -= 1;

    } else if (this._length > 1) {
        this._elements[1] = this._elements.pop();
        this._length -= 1;

        this._shiftDown();
    }

    return removed_element;
};

/**
 * Shifts the index to a correct position below
 * @param {number} index - The index to shift down
 */
MinBinaryHeap.prototype._shiftDown = function (index) {
    if (index === undefined) index = 1;

    var parent_index = index;
    var left_child_index = parent_index * 2;
    var right_child_index = parent_index * 2 + 1;
    var smallest_child_index;
    var array_length = this._length + 1;
    while (parent_index < array_length &&
        (left_child_index < array_length || right_child_index < array_length)) {

        if (right_child_index < array_length) {
            if (left_child_index < array_length) {
                if (this.comparator.lessThan(this._elements[left_child_index], this._elements[right_child_index])) {
                    smallest_child_index = left_child_index;
                } else {
                    smallest_child_index = right_child_index;
                }
            }
        } else {
            if (left_child_index < array_length) {
                smallest_child_index = left_child_index;
            }
        }

        if (this.comparator.greaterThan(this._elements[parent_index], this._elements[smallest_child_index])) {
            this._swap(parent_index, smallest_child_index);
        }

        parent_index = smallest_child_index;

        left_child_index = parent_index * 2;
        right_child_index = parent_index * 2 + 1;
    }
};

/**
 * Shifts the index to a correct position above
 * @param {number} index - The index to shift up
 */
MinBinaryHeap.prototype._shiftUp = function (index) {
    if (index === undefined) index = this._elements.length - 1;

    var child_index = index;
    var parent_index = Math.floor(child_index / 2);

    while (child_index > 1 &&
        this.comparator.greaterThan(this._elements[parent_index], this._elements[child_index])) {
        this._swap(parent_index, child_index);
        child_index = parent_index;
        parent_index = Math.floor(child_index / 2);
    }
};

/**
 * Returns the size of the heap
 * @returns {number} The size of the heap
 */
MinBinaryHeap.prototype.size = function () {
    return this._length;
};

/**
 * Swaps two elements
 * @private
 * @param {number} a - The index of the first element
 * @param {number} b - The index of the second element
 */
MinBinaryHeap.prototype._swap = function (a, b) {
    var aux = this._elements[a];
    this._elements[a] = this._elements[b];
    this._elements[b] = aux;
};

/**
 * Converts the heap to an ordered array, without changing the heap.
 * Note that if the heap contains objects, the generated array will
 * contain references to the same objects
 * @returns {array} The converted heap in an ordered array format
 */
MinBinaryHeap.prototype.toArray = function () {
    var array = [];
    var min_binary_heap = new MinBinaryHeap(this.comparator.compare);
    min_binary_heap._elements = this._elements.slice();
    min_binary_heap._length = this._length;

    while (min_binary_heap.peek() !== undefined) {
        array.push(min_binary_heap.pop());
    }

    return array;
};

/**
 * Max Binary Heap Class
 * @constructor
 * @extends MinBinaryHeap
 */
function MaxBinaryHeap(comparator) {
    MinBinaryHeap.call(this, comparator);
    this.comparator.invert();
}

MaxBinaryHeap.prototype.toArray = function () {
    var array = [];
    var max_binary_heap = new MaxBinaryHeap();
    max_binary_heap._elements = this._elements.slice();
    max_binary_heap._length = this._length;
    max_binary_heap._comparator = this.comparator;

    while (max_binary_heap.peek() !== undefined) {
        array.push(max_binary_heap.pop());
    }

    return array;
};

util.inherit(MinBinaryHeap, MaxBinaryHeap);

module.exports = {
    MinBinaryHeap: MinBinaryHeap,
    MaxBinaryHeap: MaxBinaryHeap
};