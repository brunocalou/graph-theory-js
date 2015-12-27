/**@module dataStructures */

"use strict";

/**
 * Node class
 * @constructor
 * @public
 * @param {any} value - The value to be stored
 */
function Node(value) {
    this.value = value;
    this.next = null;
    this.prev = null;
}

module.exports = Node;