function Benchmark() {
	this.functions_list = [];
}

Benchmark.prototype.add = function (name, fn) {
	if (typeof fn === 'function') {
		this.functions_list.push({
			fn: fn,
			name: name,
			time: 0,
		});
	}
};

Benchmark.prototype.run = function (options, context) {
	/*
		options is expected to be on the following format
		options = {
			cycles: number, //The number of times each function will run
		}
	 */

	if (!context) {
		context = this;
	}

	// Initialize the options object
	if (!options) options = {};
	if (!options.cycles) options.cycles = 100;

	var
		fn_list_length = this.functions_list.length, // Stores the length of the functions list
		times = new Array(fn_list_length); // Stores all the measured times

	// Initialize the array with zeros
	for (var i = 0; i < fn_list_length; i += 1) {
		times[i] = 0;
	}
	
	// Performs the benchmark test
	for (var i = 0, fn_list_length = this.functions_list.length; i < fn_list_length; i += 1) {

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

	}

	// Converts the time to milliseconds and calculate the average
	for (var i = 0; i < fn_list_length; i += 1) {
		this.functions_list[i].time = times[i] / (options.cycles * 1000000);
	}

	return this.functions_list;
};

module.exports = Benchmark;