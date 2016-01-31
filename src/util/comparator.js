/**@module util */

'use strict';

/**
 * The function to use when comparing variables
 * @typedef {function} comparatorFunction
 * @param {any} a - The first element to compare
 * @param {any} b - The second element to compare
 * @returns {number} A negative number, zero, or a positive number
 * as the first argument is less than, equal to, or greater than the second
 */

/**
 * Comparator class
 * @constructor
 * @classdesc The Comparator class is a helper class that compares two variables
 * according to a comparator function.
 * @param {comparatorFunction} fn - The comparator function
 */
function Comparator(compareFn) {
    if (compareFn) {
        /**@type {comparatorFunction} */
        this.compare = compareFn;
    }
};

/**
 * Default comparator function
 * @param {any} a - The first element to compare
 * @param {any} b - The second element to compare
 * @returns {number} A negative number, zero, or a positive number
 * as the first argument is less than, equal to, or greater than the second
 * @see comparatorFunction
 */
Comparator.prototype.compare = function (a, b) {
    if (a === b) return 0;
    return a < b ? -1 : 1;
};

/**
 * Compare if the first element is equal to the second one.
 * Override this method if you are comparing arrays, objects, ...
 * @example
 * function compare (a,b) {
 *   return a[0] - b[0];
 * }
 * var a = [1,2];
 * var b = [1,2];
 * 
 * var comparator = new Comparator(compare);
 * 
 * //Compare just the values
 * comparator.equal(a,b);//true
 * 
 * comparator.equal = function(a,b) {
 *   return a == b;
 * }
 * 
 * //Compare the refecence too
 * comparator.equal(a,b);//false
 * 
 * var c = a;
 * comparator.equal(a,c);//true
 * 
 * @param {any} a - The first element to compare
 * @param {any} b - The second element to compare
 * @returns {boolean} True if the first element is equal to
 * the second one, false otherwise
 */
Comparator.prototype.equal = function (a, b) {
    return this.compare(a, b) === 0;
};

/**
 * Compare if the first element is less than the second one
 * @param {any} a - The first element to compare
 * @param {any} b - The second element to compare
 * @returns {boolean} True if the first element is less than
 * the second one, false otherwise
 */
Comparator.prototype.lessThan = function (a, b) {
    return this.compare(a, b) < 0;
};

/**
 * Compare if the first element is less than or equal the second one
 * @param {any} a - The first element to compare
 * @param {any} b - The second element to compare
 * @returns {boolean} True if the first element is less than or equal
 * the second one, false otherwise
 */
Comparator.prototype.lessThanOrEqual = function (a, b) {
    return this.compare(a, b) < 0 || this.equal(a, b);
};

/**
 * Compare if the first element is greater than the second one
 * @param {any} a - The first element to compare
 * @param {any} b - The second element to compare
 * @returns {boolean} True if the first element is greater than
 * the second one, false otherwise
 */
Comparator.prototype.greaterThan = function (a, b) {
    return this.compare(a, b) > 0;
};

/**
 * Compare if the first element is greater than or equal the second one
 * @param {any} a - The first element to compare
 * @param {any} b - The second element to compare
 * @returns {boolean} True if the first element is greater than or equal
 * the second one, false otherwise
 */
Comparator.prototype.greaterThanOrEqual = function (a, b) {
    return this.compare(a, b) > 0 || this.equal(a, b);
};

/**
 * Change the compare function to return the opposite results
 * @example
 * // false
 * Comparator.greaterThan(1, 2);
 * @example
 * // true
 * Comparator.invert();
 * Comparator.greaterThan(1, 2);
 */
Comparator.prototype.invert = function () {
    this._originalCompare = this.compare;
    this.compare = function (a, b) {
        return this._originalCompare(b, a);
    }.bind(this);
};

module.exports = Comparator;