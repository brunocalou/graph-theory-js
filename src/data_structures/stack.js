/**@module dataStructures */

'use strict';

var LinkedList = require('./linked_list');

/**
 * Stack class (LIFO)
 * @constructor
 */
function Stack() {
    /**@private */
    this._elements = new LinkedList();
}

/**
 * Adds the element to the top of the stack
 * This method is equivalent to push
 * @see push
 * @param {any} element - The element to be added
 */
Stack.prototype.add = function(element) {
    this.push(element);
};

/**
 * Returns if the stack contains the element
 * @param {any} element - The element to be searched
 * @returns {boolean} True if the stack contains the element
 */
Stack.prototype.contains = function(element) {
    return this._elements.contains(element);
};

/**
 * Returns if the stack is empty
 * @returns {boolean} If the stack is empty
 */
Stack.prototype.isEmpty = function(element) {
    return this._elements.isEmpty();
};

/**
 * Returns the length of the list
 * This method is equivalent to size
 * @see size
 * @returns {number} The size of the stack
 */
Stack.prototype.length = function() {
    return this._elements.length();
};

/**
 * Retrieves the first element of the stack without removing it
 * @returns {any} The first element of the stack. Returns undefined if the stack is empty
 */
Stack.prototype.peek = function() {
    return this._elements.getLast();
};

/**
 * Retrieves and removes the first element of the stack
 * @returns {any} The removed element of the stack
 */
Stack.prototype.pop = function() {
    return this._elements.removeLast();
};

/**
 * Adds the element to the top of the stack
 * @param {any} element - The element to be added
 */
Stack.prototype.push = function(element) {
    this._elements.addLast(element);
};

/**
 * Retrieves and removes the first element of the stack
 * This method is equivalent to pop
 * @see pop
 * @returns {any} The removed element of the stack
 */
Stack.prototype.remove = function() {
    return this._elements.removeLast();
};

/**
 * Returns the size of the stack
 * @returns {number} The size of the stack
 */
Stack.prototype.size = function() {
    return this._elements.size();
};

/**
 * Converts the stack to an array
 * @returns {array} The converted stack in an array format
 */
Stack.prototype.toArray = function() {
    return this._elements.toArray();
};

module.exports = Stack;