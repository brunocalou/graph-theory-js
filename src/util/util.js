/**@module util */

'use strict';

var
    chalk = require('chalk'),
    MemorySize = Object.freeze({
        BYTE: 1,
        KB: 1024,
        MB: 1024 * 1024
    });
/**
 * The memory size unity object
 * @typedef {object} memory_size
 * @property {number} BYTE
 * @property {number} KB - Kilobytes
 * @property {number} MB - Megabytes
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

module.exports = {
    inherit: inherit,
    printObject: printObject,
    printMemory: printMemory,
    MemorySize: MemorySize
};