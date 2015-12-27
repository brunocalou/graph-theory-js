'use strict';

var LinkedList = require('./linked_list');

/**
 * Queue class (FIFO)
 * @constructor
 */
function Queue() {
    /**@private */
    this._elements = new LinkedList();
}

/**
 * Adds the element to the end of the queue
 * This method is equivalent to push
 * @see push
 * @param {any} element - The element to be added
 */
Queue.prototype.add = function(element) {
    this.push(element);
};

/**
 * Returns if the queue contains the element
 * @param {any} element - The element to be searched
 * @returns {boolean} True if the queue contains the element
 */
Queue.prototype.contains = function(element) {
    return this._elements.contains(element);
};

/**
 * Returns if the queue is empty
 * @returns {boolean} If the queue is empty
 */
Queue.prototype.isEmpty = function(element) {
    return this._elements.isEmpty();
};

/**
 * Returns the length of the list
 * This method is equivalent to size
 * @see size
 * @returns {number} The size of the queue
 */
Queue.prototype.length = function() {
    return this._elements.length();
};

/**
 * Retrieves the first element of the queue without removing it
 * @returns {any} The first element of the queue
 */
Queue.prototype.peek = function() {
    return this._elements.peek();
};

/**
 * Retrieves and removes the first element of the queue
 * @returns {any} The removed element of the queue
 */
Queue.prototype.pop = function() {
    return this._elements.removeFirst();
};

/**
 * Adds the element to the end of the queue
 * @param {any} element - The element to be added
 */
Queue.prototype.push = function(element) {
    this._elements.addLast(element);
};

/**
 * Retrieves and removes the first element of the queue
 * This method is equivalent to pop
 * @see pop
 * @returns {any} The removed element of the queue
 */
Queue.prototype.remove = function() {
    return this.pop();
};

/**
 * Returns the size of the queue
 * @returns {number} The size of the queue
 */
Queue.prototype.size = function() {
    return this._elements.size();
};

/**
 * Converts the queue to an array
 * @returns {array} The converted queue in an array format
 */
Queue.prototype.toArray = function() {
    return this._elements.toArray();
};

module.exports = Queue;