/**@module util */

/**
 * The options object used on the benchmark class
 * @typedef {object} benchmark_options
 * @property {number} cycles - The number of cycles to run each function
 * @property {function} onFinishedFunctionTest - The function called when a function test is finished
*/

/**
 * The object that holds the function to be tested
 * @typedef {object} function_list_item
 * @property {function} fn - The function to be tested
 * @property {name} - The name or key to refer to the function  
*/

/**
 * Called when a function test was finished
 * @typedef {function} onFinishedFunctionTest
 * @param {function_list_item} function_list_item
 */

'use strict';

/**
 * Benchmark class
 * @constructor
 * @classdesc The Benchmark class performs several function callings and measures the average time.
 * The user can define the number of cycles a function will run and the functions to be tested
 */
function Benchmark() {
    /**Stores the functions to be tested
     * @type {array}
     */
    this.functions_list = [];
}

/**
 * Adds a function to the benchmark
 * @param {string} name - The name or key to refer to the function
 * @param {function} fn - The function to be tested
 */
Benchmark.prototype.add = function (name, fn) {
    if (typeof fn === 'function') {
        this.functions_list.push({
            fn: fn,
            name: name,
            time: 0, //Milliseconds
        });
    }
};

/**
 * Runs the benchmark test
 * @param {benchmark_options} options
 * @param {object} context - The context to run the function
 * @returns {array} An array with the function_list_item objects
 */
Benchmark.prototype.run = function (options, context) {
	/*
		options is expected to be on the following format
		options = {
			cycles: number, //The number of times each function will run
			onFinishedFunctionTest: function(function_list_item) //The callback function to call when the test for each function is finished
		}
	 */

    if (!context) {
        context = this;
    }

    // Initialize the options object
    if (!options) options = {};
    if (!options.cycles) options.cycles = 100;
    if (!options.onFinishedFunctionTest) options.onFinishedFunctionTest = function () { };

    var
        fn_list_length = this.functions_list.length, // Stores the length of the functions list
        times = new Array(fn_list_length), // Stores all the measured times
        i;

    // Initialize the array with zeros
    for (i = 0; i < fn_list_length; i += 1) {
        times[i] = 0;
    }
	
    // Performs the benchmark test
    for (i = 0, fn_list_length = this.functions_list.length; i < fn_list_length; i += 1) {

        var
            fn = this.functions_list[i].fn.bind(context),
            initial_time = process.hrtime(),
            diff = process.hrtime();

        // Iterates the number of times according to the options
        for (var j = 0; j < options.cycles; j += 1) {
            initial_time = process.hrtime();

            fn();

            diff = process.hrtime(initial_time);
            times[i] += diff[0] * 1e9 + diff[1]; // Time in nanoseconds
        }

        // Converts the time to milliseconds and calculate the average
        this.functions_list[i].time = times[i] / (options.cycles * 1000000);
        //Call the onFinishedFunctionTest callback
        options.onFinishedFunctionTest(this.functions_list[i]);
    }

    return this.functions_list;
};

/**
 * Clears the benchmark, removing all the added functions
 */
Benchmark.prototype.clear = function () {
    // Empty the functions list array
    this.functions_list.splice(0, this.functions_list.length);
};

module.exports = Benchmark;