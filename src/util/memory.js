/**@module util */

'use strict';

/**
 * The memory usage object
 * @typedef {object} memory_usage_obj
 * @property {number} rss
 * @property {number} heapTotal
 * @property {number} heapUsed
 */

/**
 * Memory class
 * @constructor
 * @classdesc The memory class measures the memory difference. It used the nodejs'
 * memory usage object.
 */
function Memory() {
    this.memory_usage = process.memoryUsage();
}

/**
 * Starts the memory usage measurement
 */
Memory.prototype.start = function () {
    /**@type  memory_usage_obj*/
    this.memory_usage = process.memoryUsage();
};

/**
 * Gets the memory usage difference between two moments
 * @param {memory_usage_obj} initial_usage - The initial usage
 * @param {memory_usage_obj} last_usage - The last usage
 * @returns {memory_usage_obj} The memory usage difference
 */
Memory.prototype.getDiff = function (initial_usage, last_usage) {
    // Get the difference in bytes
    var diff = {};

    if (!initial_usage) initial_usage = this.memory_usage;
    if (!last_usage) last_usage = process.memoryUsage();

    diff.rss = last_usage.rss - initial_usage.rss;
    diff.heapTotal = last_usage.heapTotal - initial_usage.heapTotal;
    diff.heapUsed = last_usage.heapUsed - initial_usage.heapUsed;

    return diff;
};

/**
 * Gets the current memory usage
 * @returns {memory_usage_obj} The current memory usage
 */
Memory.prototype.getCurrentUsage = function () {
    return process.memoryUsage();
};

/**
 * Runs a fresh memory usage test. It is a helper function to avoid using the start and getDiff methods
 * @param {function} fn - The function to be called. The memory usage is measured before and
 * after calling it
 * @returns {memory_usage_obj} The memory usage difference
 */
Memory.prototype.run = function (fn) {
    // Get the memory used after calling the function
    var current_usage = this.getCurrentUsage();
    fn();
    return this.getDiff(current_usage);
};

module.exports = Memory;