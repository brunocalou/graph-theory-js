/**@module util */

'use strict';

var
    chalk = require('chalk'),
    MemorySize = Object.freeze({
        BYTE: 1,
        KB: 1024,
        MB: 1024 * 1024
    }),
    MaxNumberSize = Object.freeze({
        UINT_8: 127,
        INT_8: 255,
        UINT_16: 32767,
        INT_16: 65535,
        UINT_32: 4294967295,
        INT_32: 2147483647,
        FLOAT_32: 4294967295,
        FLOAT_64: Infinity
    });
/**
 * The memory size unity object
 * @typedef {object} memory_size
 * @property {number} BYTE
 * @property {number} KB - Kilobytes
 * @property {number} MB - Megabytes
 */

/**
 * The max value a number type can hold
 * @typedef {object} max_number_size
 * @property {number} UINT_8
 * @property {number} INT_8
 * @property {number} UINT_16
 * @property {number} INT_16
 * @property {number} UINT_32
 * @property {number} INT_32
 * @property {number} FLOAT_32
 * @property {number} FLOAT_64
 */

/**
 * Performs an OOP like inheritance
 * @param {function} parent - The parent class
 * @param {function} child - The child class
 */
function inherit(parent, child) {
    var parent_copy = Object.create(parent.prototype);
    child.prototype = parent_copy;
    child.prototype.constructor = child;
}

/**
 * Prints an object
 * @param {object} object - The object to be printed
 */
function printObject(object) {
    for (var property in object) {
        if (object.hasOwnProperty(property)) {
            console.log(property + ':' + object[property]);
        }
    }
}

/**
 * Prints the memory usage
 * @param {memory_usage_obj} memory_usage - The memory usage object. If none is specified, will use the current memory usage
 * @param {memory_size} size - The memory size unity to be used
 * @param {string} color - The color to print
 */
function printMemory(memory_usage, size, color) {
    if (!memory_usage) memory_usage = process.memoryUsage();
    if (!size) size = MemorySize.KB;
    if (!color) color = 'yellow';

    var size_name = "Bytes";
    if (size === MemorySize.KB) {
        size_name = "KB";
    } else if (size === MemorySize.MB) {
        size_name = "MB";
    }

    console.log('');
    console.log(' ' + chalk[color]("RSS" + ' : ') + memory_usage.rss / size + ' ' + size_name);
    console.log(' ' + chalk[color]("Total Heap" + ' : ') + memory_usage.heapTotal / size + ' ' + size_name);
    console.log(' ' + chalk[color]("Used Heap" + ' : ') + memory_usage.heapUsed / size + ' ' + size_name);
    console.log('');
}

/**
 * Checks if one number is equal to other according to an error margin
 * @param {number} x1 - The first number
 * @param {number} x2 - The second number
 * @param {number} error - The error
 * @returns {boolean} If one number is equal to other according to an error margin
 */
function nearEquals(x1, x2, error) {
    return Math.abs(Math.abs(x1) - Math.abs(x2)) < error;
}

/**
 * Gets a random property from an object.
 * See https://stackoverflow.com/questions/2532218/pick-random-property-from-a-javascript-object
 * @param {object} obj - The object to use
 */
function randomProperty(obj) {
    var keys = Object.keys(obj)
    return obj[keys[ keys.length * Math.random() << 0]];
}

module.exports = {
    inherit: inherit,
    printObject: printObject,
    printMemory: printMemory,
    MemorySize: MemorySize,
    MaxNumberSize: MaxNumberSize,
    nearEquals: nearEquals,
    randomProperty: randomProperty
};